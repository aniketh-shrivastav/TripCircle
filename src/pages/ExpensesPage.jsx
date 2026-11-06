import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  calculateTripBalances,
  calculateSuggestedSettlements,
  formatINR
} from '../services/expenseService';
import {
  ReceiptIndianRupee,
  Plus,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Trash2,
  Calendar,
  Users,
  Tag,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExpensesPage = () => {
  const {
    activeTrip,
    tripExpenses,
    tripMembers,
    tripSettlements,
    currentUser,
    users,
    addExpense,
    deleteExpense,
    markSettlementPaid
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Form state
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(currentUser.id);
  const [category, setCategory] = useState('Food');
  const [selectedParticipants, setSelectedParticipants] = useState(() =>
    tripMembers.map(m => m.id)
  );

  // Exact calculations
  const tripBalances = calculateTripBalances(tripExpenses, tripMembers, tripSettlements);
  const suggestedSettlements = calculateSuggestedSettlements(tripBalances);
  const totalTripSpent = tripExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  const myBalance = tripBalances.find(b => b.userId === currentUser.id) || {
    netBalance: 0,
    paid: 0,
    share: 0,
    settledPaid: 0,
    settledReceived: 0
  };

  const handleParticipantToggle = (userId) => {
    if (selectedParticipants.includes(userId)) {
      if (selectedParticipants.length > 1) {
        setSelectedParticipants(selectedParticipants.filter(id => id !== userId));
      }
    } else {
      setSelectedParticipants([...selectedParticipants, userId]);
    }
  };

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (!desc.trim() || !amount) return;

    addExpense({
      description: desc.trim(),
      amount: Number(amount),
      paidBy,
      category,
      participantIds: selectedParticipants
    });

    setDesc('');
    setAmount('');
    setSelectedParticipants(tripMembers.map(m => m.id));
    setShowAddModal(false);
  };

  const handleSettleDebt = (settlement) => {
    markSettlementPaid(settlement);
  };

  const filteredExpenses = tripExpenses.filter(e => {
    if (selectedCategoryFilter === 'All') return true;
    return e.category === selectedCategoryFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ReceiptIndianRupee className="w-3.5 h-3.5 text-amber-600" />
            Group Expense Splitting & Debt Minimizer
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Expenses for {activeTrip?.name || 'Group Trip'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Track who paid, distribute shares fairly, and settle debts with the minimum number of transactions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Expense</span>
        </button>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Group Spend */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Group Spending</span>
          <div className="text-3xl font-extrabold text-slate-900">{formatINR(totalTripSpent)}</div>
          <p className="text-xs text-slate-500 pt-1">
            Across {tripExpenses.length} receipts in {activeTrip?.name}
          </p>
        </div>

        {/* Your Total Contribution */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">You Paid Out-of-Pocket</span>
          <div className="text-3xl font-extrabold text-brand-700">{formatINR(myBalance.paid)}</div>
          <p className="text-xs text-slate-500 pt-1">
            Your computed fair share: <span className="font-semibold text-slate-800">{formatINR(myBalance.share)}</span>
          </p>
        </div>

        {/* Your Net Position */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Net Balance</span>
          <div className={`text-3xl font-extrabold flex items-center gap-1.5 ${
            myBalance.netBalance >= 0 ? 'text-tealAccent-600' : 'text-rose-600'
          }`}>
            {myBalance.netBalance >= 0 ? (
              <>
                <TrendingUp className="w-6 h-6" />
                <span>+{formatINR(myBalance.netBalance)}</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-6 h-6" />
                <span>-{formatINR(Math.abs(myBalance.netBalance))}</span>
              </>
            )}
          </div>
          <p className="text-xs text-slate-500 pt-1">
            {myBalance.netBalance > 0
              ? 'Group members owe you this balance'
              : myBalance.netBalance < 0
              ? 'You owe this amount to settle up'
              : 'You are completely all square!'}
          </p>
        </div>
      </div>

      {/* Suggested Settlements Box (The Star Feature!) */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tealAccent-500/20 text-tealAccent-300 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-tealAccent-400" />
              Smart Debt Minimization Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Suggested Settlements
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Using the Splitwise greedy algorithm to consolidate multiple mutual balances into the few simplest transactions.
            </p>
          </div>

          <div className="text-xs bg-white/10 px-3 py-1.5 rounded-xl text-slate-300 font-semibold self-start sm:self-center">
            {suggestedSettlements.length === 0 ? 'All Settled Up' : `${suggestedSettlements.length} Transfers Required`}
          </div>
        </div>

        {suggestedSettlements.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-tealAccent-400 mx-auto" />
            <p className="font-bold text-white text-base">Everyone is fully settled!</p>
            <p className="text-xs text-slate-400">No outstanding debts remain for this trip.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedSettlements.map((settlement) => {
              const fromUser = users.find(u => u.id === settlement.fromUserId);
              const toUser = users.find(u => u.id === settlement.toUserId);
              const isMePaying = currentUser.id === settlement.fromUserId;
              const isMeReceiving = currentUser.id === settlement.toUserId;

              return (
                <div
                  key={settlement.id}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={fromUser?.avatar}
                      alt={fromUser?.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-400/50"
                    />
                    
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-bold text-white">
                          {fromUser?.name.split(' ')[0]} {isMePaying && '(You)'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold text-tealAccent-300">
                          {toUser?.name.split(' ')[0]} {isMeReceiving && '(You)'}
                        </span>
                      </div>
                      
                      <div className="text-lg font-black text-amber-300">
                        {formatINR(settlement.amount)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSettleDebt(settlement)}
                    className="px-3.5 py-2 rounded-xl bg-tealAccent-400 hover:bg-tealAccent-300 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 hover:scale-105 active:scale-95"
                  >
                    Mark as Paid ✓
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Settled History */}
        {tripSettlements.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Completed Settlement History ({tripSettlements.length})
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {tripSettlements.map((s) => {
                const f = users.find(u => u.id === s.fromUserId);
                const t = users.find(u => u.id === s.toUserId);
                return (
                  <div
                    key={s.id}
                    className="text-xs text-slate-300 flex items-center justify-between p-2 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tealAccent-400" />
                      <span><strong>{f?.name}</strong> paid <strong>{t?.name}</strong></span>
                    </div>
                    <span className="font-bold text-tealAccent-300">{formatINR(s.amount)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Member Balances Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-600" />
          Member Balance Summary
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                <th className="pb-3 pl-2">Participant</th>
                <th className="pb-3 text-right">Total Paid</th>
                <th className="pb-3 text-right">Fair Share</th>
                <th className="pb-3 text-right">Settled Sent</th>
                <th className="pb-3 text-right">Settled Recv</th>
                <th className="pb-3 text-right pr-2">Net Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tripBalances.map((b) => (
                <tr key={b.userId} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pl-2 flex items-center gap-2.5">
                    <img src={b.avatar} alt={b.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-slate-800">{b.name}</span>
                      {b.userId === currentUser.id && (
                        <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 font-bold">
                          You
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 text-right font-medium text-slate-700">{formatINR(b.paid)}</td>
                  <td className="py-3.5 text-right font-medium text-slate-700">{formatINR(b.share)}</td>
                  <td className="py-3.5 text-right font-medium text-slate-500">{formatINR(b.settledPaid)}</td>
                  <td className="py-3.5 text-right font-medium text-slate-500">{formatINR(b.settledReceived)}</td>
                  <td className="py-3.5 text-right pr-2">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                      b.netBalance > 0
                        ? 'bg-tealAccent-50 text-tealAccent-700'
                        : b.netBalance < 0
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {b.netBalance > 0
                        ? `Gets ${formatINR(b.netBalance)}`
                        : b.netBalance < 0
                        ? `Owes ${formatINR(Math.abs(b.netBalance))}`
                        : 'Settled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recorded Receipts List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recorded Expenses ({tripExpenses.length})</h3>
            <p className="text-xs text-slate-500">Every shared item and who paid for it</p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['All', 'Stay', 'Food', 'Transport', 'Activities'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategoryFilter(c)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategoryFilter === c
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No expenses in this category.
            </div>
          ) : (
            filteredExpenses.map((exp) => {
              const payer = users.find(u => u.id === exp.paidBy);
              const participantCount = exp.participantIds ? exp.participantIds.length : tripMembers.length;
              const perPersonShare = Math.round(exp.amount / participantCount);

              return (
                <div
                  key={exp.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={payer?.avatar}
                      alt={payer?.name}
                      title={`Paid by ${payer?.name}`}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-200"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800">{exp.description}</h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                          {exp.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Paid by <strong className="text-slate-700">{payer?.name}</strong> • Split with {participantCount} people ({formatINR(perPersonShare)}/each)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-base font-extrabold text-slate-900">{formatINR(exp.amount)}</span>
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete expense"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ADD EXPENSE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ReceiptIndianRupee className="w-5 h-5 text-amber-500" />
                Add Shared Expense
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpenseSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Assagao Cafe Brunch"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Total Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 2400"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Stay">Stay & Villa</option>
                    <option value="Transport">Transport & Fuel</option>
                    <option value="Activities">Activities & Tickets</option>
                    <option value="Shopping">Shopping & Groceries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Who Paid?</label>
                <select
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  {tripMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} {m.id === currentUser.id ? '(You)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Multi-select Participants */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Who Participated in this Expense:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tripMembers.map(m => {
                    const isChecked = selectedParticipants.includes(m.id);
                    return (
                      <div
                        key={m.id}
                        onClick={() => handleParticipantToggle(m.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                          isChecked
                            ? 'bg-amber-50/70 border-amber-300 font-semibold text-amber-900'
                            : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={m.avatar} alt={m.name} className="w-5 h-5 rounded-full object-cover" />
                          <span>{m.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          readOnly
                          className="accent-amber-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Split calculation preview */}
              {amount && selectedParticipants.length > 0 && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex justify-between">
                  <span>Each participant owes:</span>
                  <span className="font-bold text-slate-900">
                    {formatINR(Math.round(Number(amount) / selectedParticipants.length))}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
