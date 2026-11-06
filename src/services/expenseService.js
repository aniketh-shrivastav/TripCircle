/**
 * Expense & Settlement Calculation Service
 * Deterministic balance and debt minimization (Splitwise greedy algorithm)
 * Handles currency calculations in integer cents/paise to prevent floating-point rounding errors.
 */

// Format currency in Indian Rupees
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Calculates per-member paid amount, share amount, and net balance for a specific trip.
 * Net balance > 0: user is owed money (creditor)
 * Net balance < 0: user owes money (debtor)
 * Net balance = 0: user is settled
 */
export const calculateTripBalances = (tripExpenses, tripMembers, settlements = []) => {
  // Map of userId -> { paid: 0, share: 0, net: 0, user }
  const balanceMap = {};

  tripMembers.forEach(member => {
    balanceMap[member.id] = {
      userId: member.id,
      name: member.name,
      avatar: member.avatar,
      paidPaise: 0,
      sharePaise: 0,
      settledInPaise: 0,  // received from payments
      settledOutPaise: 0, // sent as payments
    };
  });

  // Calculate based on expenses
  tripExpenses.forEach(exp => {
    const totalPaise = Math.round(Number(exp.amount) * 100);
    const participants = exp.participantIds && exp.participantIds.length > 0
      ? exp.participantIds
      : tripMembers.map(m => m.id);

    // Credit payer
    if (balanceMap[exp.paidBy]) {
      balanceMap[exp.paidBy].paidPaise += totalPaise;
    }

    // Debit each participant equally
    const count = participants.length;
    if (count > 0) {
      const shareBase = Math.floor(totalPaise / count);
      const remainder = totalPaise % count;

      participants.forEach((pid, idx) => {
        if (balanceMap[pid]) {
          // distribute remainder to first few participants so sum strictly equals totalPaise
          const exactShare = shareBase + (idx < remainder ? 1 : 0);
          balanceMap[pid].sharePaise += exactShare;
        }
      });
    }
  });

  // Adjust for completed settlements
  settlements.forEach(settlement => {
    if (settlement.status === 'paid') {
      const amountPaise = Math.round(Number(settlement.amount) * 100);
      if (balanceMap[settlement.fromUserId]) {
        balanceMap[settlement.fromUserId].settledOutPaise += amountPaise;
      }
      if (balanceMap[settlement.toUserId]) {
        balanceMap[settlement.toUserId].settledInPaise += amountPaise;
      }
    }
  });

  // Compute final balances in Rupees
  return Object.values(balanceMap).map(item => {
    // Net before settlements: paid - share
    // Net after settlements: (paid - share) + settledOut - settledIn
    const netRawPaise = (item.paidPaise - item.sharePaise) + (item.settledOutPaise - item.settledInPaise);

    return {
      userId: item.userId,
      name: item.name,
      avatar: item.avatar,
      paid: item.paidPaise / 100,
      share: item.sharePaise / 100,
      settledPaid: item.settledOutPaise / 100,
      settledReceived: item.settledInPaise / 100,
      netBalance: netRawPaise / 100,
      netPaise: netRawPaise
    };
  });
};

/**
 * Calculates simplified debts minimizing total transactions (Greedy Debt Simplification)
 * Returns a list of suggested settlements: { fromUserId, toUserId, amount }
 */
export const calculateSuggestedSettlements = (tripBalances) => {
  // Separate into debtors (netPaise < 0) and creditors (netPaise > 0)
  const debtors = [];
  const creditors = [];

  tripBalances.forEach(b => {
    if (b.netPaise < -50) { // threshold of 0.50 INR to avoid micro fractions
      debtors.push({ userId: b.userId, name: b.name, amountPaise: -b.netPaise });
    } else if (b.netPaise > 50) {
      creditors.push({ userId: b.userId, name: b.name, amountPaise: b.netPaise });
    }
  });

  // Sort descending by amount to minimize transaction count
  debtors.sort((a, b) => b.amountPaise - a.amountPaise);
  creditors.sort((a, b) => b.amountPaise - a.amountPaise);

  const transactions = [];
  let dIndex = 0;
  let cIndex = 0;

  while (dIndex < debtors.length && cIndex < creditors.length) {
    const debtor = debtors[dIndex];
    const creditor = creditors[cIndex];

    const settlePaise = Math.min(debtor.amountPaise, creditor.amountPaise);
    if (settlePaise > 50) {
      transactions.push({
        id: `sug-${debtor.userId}-${creditor.userId}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        fromUserId: debtor.userId,
        toUserId: creditor.userId,
        amount: Math.round(settlePaise) / 100,
        status: 'pending'
      });
    }

    debtor.amountPaise -= settlePaise;
    creditor.amountPaise -= settlePaise;

    if (debtor.amountPaise <= 50) dIndex++;
    if (creditor.amountPaise <= 50) cIndex++;
  }

  return transactions;
};
