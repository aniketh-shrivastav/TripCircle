import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredData, saveStoredData, resetStoredData } from '../services/storageService';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(() => getStoredData());

  // Save to localStorage on state change
  useEffect(() => {
    saveStoredData(data);
  }, [data]);

  const {
    users,
    trips,
    activeTripId,
    currentUserId,
    polls,
    itinerary,
    expenses,
    settlements,
    notifications,
    aiCredits: rawCredits,
    creditTransactions: rawCreditTxs,
  } = data;

  const aiCredits = rawCredits !== undefined ? rawCredits : 25;
  const creditTransactions = rawCreditTxs || [];

  const currentUser = users.find(u => u.id === currentUserId) || users[0];
  const activeTrip = trips.find(t => t.id === activeTripId) || trips[0];
  const tripMembers = activeTrip ? users.filter(u => activeTrip.memberIds.includes(u.id)) : [];

  const tripPolls = polls.filter(p => p.tripId === activeTripId);
  const tripItinerary = itinerary.filter(i => i.tripId === activeTripId);
  const tripExpenses = expenses.filter(e => e.tripId === activeTripId);
  const tripSettlements = settlements.filter(s => s.tripId === activeTripId);
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Change active trip
  const setActiveTripId = (id) => {
    setData(prev => ({ ...prev, activeTripId: id }));
  };

  // Switch demo user to simulate collaborative multi-user actions
  const switchCurrentUser = (userId) => {
    setData(prev => ({ ...prev, currentUserId: userId }));
  };

  // Trip operations
  const createTrip = (newTripData) => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      name: newTripData.name,
      destination: newTripData.destination,
      startDate: newTripData.startDate,
      endDate: newTripData.endDate,
      durationDays: newTripData.durationDays || 4,
      budgetPerPerson: Number(newTripData.budgetPerPerson) || 12000,
      memberIds: newTripData.memberIds || [currentUserId],
      travelStyle: newTripData.travelStyle || "Beaches & Relaxation",
      status: "Planning",
      coverImage: newTripData.coverImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      description: newTripData.description || "A new adventure with friends!",
      startingLocation: newTripData.startingLocation || "City Center"
    };

    const notif = {
      id: `notif-${Date.now()}`,
      tripId: newTrip.id,
      title: "New Trip Created",
      message: `${currentUser.name} created '${newTrip.name}'. Start adding activities!`,
      type: "trip",
      timestamp: "Just now",
      read: false
    };

    setData(prev => ({
      ...prev,
      trips: [newTrip, ...prev.trips],
      activeTripId: newTrip.id,
      notifications: [notif, ...prev.notifications]
    }));

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    return newTrip;
  };

  const updateTrip = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      trips: prev.trips.map(t => (t.id === id ? { ...t, ...updatedFields } : t))
    }));
  };

  const deleteTrip = (id) => {
    setData(prev => {
      const remainingTrips = prev.trips.filter(t => t.id !== id);
      return {
        ...prev,
        trips: remainingTrips,
        activeTripId: remainingTrips.length > 0 ? remainingTrips[0].id : null
      };
    });
  };

  // Poll operations
  const createPoll = (pollData) => {
    const newPoll = {
      id: `poll-${Date.now()}`,
      tripId: activeTripId,
      question: pollData.question,
      category: pollData.category || "General",
      status: "Open",
      createdAt: new Date().toISOString(),
      winningOptionId: null,
      options: pollData.options.map((optText, index) => ({
        id: `opt-${Date.now()}-${index}`,
        text: optText,
        voterIds: index === 0 ? [currentUserId] : []
      }))
    };

    const notif = {
      id: `notif-${Date.now()}`,
      tripId: activeTripId,
      title: "New Poll Created",
      message: `${currentUser.name} started a poll: "${newPoll.question}"`,
      type: "poll",
      timestamp: "Just now",
      read: false
    };

    setData(prev => ({
      ...prev,
      polls: [newPoll, ...prev.polls],
      notifications: [notif, ...prev.notifications]
    }));
  };

  const votePoll = (pollId, optionId, voterId = currentUserId) => {
    setData(prev => {
      const updatedPolls = prev.polls.map(poll => {
        if (poll.id !== pollId || poll.status === 'Closed') return poll;

        const updatedOptions = poll.options.map(opt => {
          // Remove voter if already voted for this option
          const hasVoted = opt.voterIds.includes(voterId);
          if (opt.id === optionId) {
            return {
              ...opt,
              voterIds: hasVoted
                ? opt.voterIds.filter(id => id !== voterId) // Toggle off
                : [...opt.voterIds, voterId]                 // Add vote
            };
          } else {
            // Remove from other options to allow single choice
            return {
              ...opt,
              voterIds: opt.voterIds.filter(id => id !== voterId)
            };
          }
        });

        return { ...poll, options: updatedOptions };
      });

      const voter = users.find(u => u.id === voterId);
      const notif = {
        id: `notif-${Date.now()}`,
        tripId: activeTripId,
        title: "Vote Cast",
        message: `${voter ? voter.name : 'A member'} cast a vote in a group poll.`,
        type: "vote",
        timestamp: "Just now",
        read: false
      };

      return {
        ...prev,
        polls: updatedPolls,
        notifications: [notif, ...prev.notifications]
      };
    });
  };

  const closePoll = (pollId, winningOptionId) => {
    setData(prev => {
      const poll = prev.polls.find(p => p.id === pollId);
      const winningOption = poll?.options.find(o => o.id === winningOptionId);

      const notif = {
        id: `notif-${Date.now()}`,
        tripId: activeTripId,
        title: "Poll Closed",
        message: `Decision finalized! Winner: "${winningOption?.text || 'Selected option'}"`,
        type: "poll",
        timestamp: "Just now",
        read: false
      };

      return {
        ...prev,
        polls: prev.polls.map(p =>
          p.id === pollId
            ? { ...p, status: "Closed", winningOptionId }
            : p
        ),
        notifications: [notif, ...prev.notifications]
      };
    });

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    } catch (e) {}
  };

  // Itinerary operations
  const addActivity = (activityData) => {
    const newActivity = {
      id: `act-${Date.now()}`,
      tripId: activeTripId,
      day: Number(activityData.day) || 1,
      time: activityData.time || "10:00 AM",
      title: activityData.title,
      description: activityData.description || "",
      estimatedCost: Number(activityData.estimatedCost) || 0,
      category: activityData.category || "Sightseeing",
      location: activityData.location || "",
      completed: false
    };

    const notif = {
      id: `notif-${Date.now()}`,
      tripId: activeTripId,
      title: "Itinerary Updated",
      message: `${currentUser.name} added "${newActivity.title}" to Day ${newActivity.day}.`,
      type: "itinerary",
      timestamp: "Just now",
      read: false
    };

    setData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, newActivity],
      notifications: [notif, ...prev.notifications]
    }));
  };

  const updateActivity = (id, fields) => {
    setData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map(item => item.id === id ? { ...item, ...fields } : item)
    }));
  };

  const deleteActivity = (id) => {
    setData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter(item => item.id !== id)
    }));
  };

  const toggleActivityCompleted = (id) => {
    setData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  // Expense operations
  const addExpense = (expenseData) => {
    const newExp = {
      id: `exp-${Date.now()}`,
      tripId: activeTripId,
      description: expenseData.description,
      amount: Math.round(Number(expenseData.amount)),
      paidBy: expenseData.paidBy || currentUserId,
      participantIds: expenseData.participantIds && expenseData.participantIds.length > 0
        ? expenseData.participantIds
        : (activeTrip?.memberIds || [currentUserId]),
      splitType: "equal",
      category: expenseData.category || "General",
      createdAt: new Date().toISOString()
    };

    const payer = users.find(u => u.id === newExp.paidBy);
    const notif = {
      id: `notif-${Date.now()}`,
      tripId: activeTripId,
      title: "New Expense Added",
      message: `${payer ? payer.name : 'Someone'} added "${newExp.description}" (₹${newExp.amount.toLocaleString('en-IN')}).`,
      type: "expense",
      timestamp: "Just now",
      read: false
    };

    setData(prev => ({
      ...prev,
      expenses: [newExp, ...prev.expenses],
      notifications: [notif, ...prev.notifications]
    }));
  };

  const deleteExpense = (id) => {
    setData(prev => ({
      ...prev,
      expenses: prev.expenses.filter(e => e.id !== id)
    }));
  };

  // Settlement operations
  const markSettlementPaid = (settlementInfo) => {
    const newSettlement = {
      id: settlementInfo.id || `set-${Date.now()}`,
      tripId: activeTripId,
      fromUserId: settlementInfo.fromUserId,
      toUserId: settlementInfo.toUserId,
      amount: Number(settlementInfo.amount),
      status: "paid",
      paidAt: new Date().toISOString()
    };

    const fromUser = users.find(u => u.id === settlementInfo.fromUserId);
    const toUser = users.find(u => u.id === settlementInfo.toUserId);

    const notif = {
      id: `notif-${Date.now()}`,
      tripId: activeTripId,
      title: "Settlement Paid",
      message: `${fromUser?.name || 'A friend'} paid ₹${newSettlement.amount.toLocaleString('en-IN')} to ${toUser?.name || 'friend'}. Debt settled!`,
      type: "settlement",
      timestamp: "Just now",
      read: false
    };

    setData(prev => {
      // If settlement already exists in list, update status; otherwise add
      const exists = prev.settlements.some(s => s.id === newSettlement.id);
      return {
        ...prev,
        settlements: exists
          ? prev.settlements.map(s => s.id === newSettlement.id ? { ...s, status: "paid", paidAt: new Date().toISOString() } : s)
          : [newSettlement, ...prev.settlements],
        notifications: [notif, ...prev.notifications]
      };
    });

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  // Notifications
  const markNotificationRead = (id) => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    }));
  };

  const markAllNotificationsRead = () => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true }))
    }));
  };

  // Profile
  const updateProfile = (profileFields) => {
    setData(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === currentUserId ? { ...u, ...profileFields } : u)
    }));
  };

  // Reset to initial demo data
  const resetData = () => {
    const reset = resetStoredData();
    setData(reset);
  };

  const addCredits = (amount, packName = "Custom Top-up", pricePaid = "₹0") => {
    const newTx = {
      id: `tx-${Date.now()}`,
      amount: Number(amount),
      type: "credit",
      description: `Purchased ${packName} (${pricePaid})`,
      date: "Just now"
    };

    const notif = {
      id: `notif-${Date.now()}`,
      tripId: activeTripId,
      title: "AI Credits Added!",
      message: `Successfully added ${amount} AI Credits via ${packName}. Ready to plan your next dream trip!`,
      type: "credits",
      timestamp: "Just now",
      read: false
    };

    setData(prev => ({
      ...prev,
      aiCredits: (prev.aiCredits !== undefined ? prev.aiCredits : 25) + Number(amount),
      creditTransactions: [newTx, ...(prev.creditTransactions || [])],
      notifications: [notif, ...prev.notifications]
    }));

    try {
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
    } catch (e) {}

    return true;
  };

  const useCredits = (amount = 1, featureName = "AI Recommendation") => {
    if (aiCredits < amount) {
      return false;
    }

    const newTx = {
      id: `tx-${Date.now()}`,
      amount: -Number(amount),
      type: "debit",
      description: `Used for ${featureName}`,
      date: "Just now"
    };

    setData(prev => ({
      ...prev,
      aiCredits: Math.max(0, (prev.aiCredits !== undefined ? prev.aiCredits : 25) - Number(amount)),
      creditTransactions: [newTx, ...(prev.creditTransactions || [])]
    }));

    return true;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentUserId,
        users,
        trips,
        activeTripId,
        activeTrip,
        tripMembers,
        tripPolls,
        tripItinerary,
        tripExpenses,
        tripSettlements,
        notifications,
        unreadNotificationsCount,
        aiCredits,
        creditTransactions,
        addCredits,
        useCredits,
        setActiveTripId,
        switchCurrentUser,
        createTrip,
        updateTrip,
        deleteTrip,
        createPoll,
        votePoll,
        closePoll,
        addActivity,
        updateActivity,
        deleteActivity,
        toggleActivityCompleted,
        addExpense,
        deleteExpense,
        markSettlementPaid,
        markNotificationRead,
        markAllNotificationsRead,
        updateProfile,
        resetData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
