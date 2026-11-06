import {
  initialUsers,
  initialTrips,
  initialPolls,
  initialItinerary,
  initialExpenses,
  initialSettlements,
  initialNotifications,
} from '../data/mockData';

const STORAGE_KEY = 'TRIPCIRCLE_DATA_V1';

export const initialCredits = 25;

export const initialCreditTransactions = [
  {
    id: "tx-welcome",
    amount: 25,
    type: "credit",
    description: "Welcome Bonus AI Credits",
    date: "Active Account Initialized"
  }
];

export const getStoredData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultState = {
        users: initialUsers,
        trips: initialTrips,
        activeTripId: "trip-1",
        currentUserId: "user-1",
        polls: initialPolls,
        itinerary: initialItinerary,
        expenses: initialExpenses,
        settlements: initialSettlements,
        notifications: initialNotifications,
        aiCredits: initialCredits,
        creditTransactions: initialCreditTransactions,
      };
      saveStoredData(defaultState);
      return defaultState;
    }
    const parsed = JSON.parse(raw);
    if (parsed.aiCredits === undefined) {
      parsed.aiCredits = initialCredits;
    }
    if (!parsed.creditTransactions) {
      parsed.creditTransactions = initialCreditTransactions;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to load data from localStorage", err);
    return {
      users: initialUsers,
      trips: initialTrips,
      activeTripId: "trip-1",
      currentUserId: "user-1",
      polls: initialPolls,
      itinerary: initialItinerary,
      expenses: initialExpenses,
      settlements: initialSettlements,
      notifications: initialNotifications,
      aiCredits: initialCredits,
      creditTransactions: initialCreditTransactions,
    };
  }
};

export const saveStoredData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist data to localStorage", err);
  }
};

export const resetStoredData = () => {
  const defaultState = {
    users: initialUsers,
    trips: initialTrips,
    activeTripId: "trip-1",
    currentUserId: "user-1",
    polls: initialPolls,
    itinerary: initialItinerary,
    expenses: initialExpenses,
    settlements: initialSettlements,
    notifications: initialNotifications,
    aiCredits: initialCredits,
    creditTransactions: initialCreditTransactions,
  };
  saveStoredData(defaultState);
  return defaultState;
};
