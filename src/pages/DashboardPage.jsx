import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { calculateTripBalances, formatINR } from '../services/expenseService';
import {
  Compass,
  Sparkles,
  Vote,
  CalendarCheck,
  ReceiptIndianRupee,
  Plus,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Share2,
  Calendar
} from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    users,
    trips,
    activeTrip,
    activeTripId,
    setActiveTripId,
    tripPolls,
    tripItinerary,
    tripExpenses,
    tripSettlements,
    tripMembers,
    createTrip,
    addExpense
  } = useApp();

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [joinSuccess, setJoinSuccess] = useState('');

  // Trip form state
  const [newTripForm, setNewTripForm] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    durationDays: 4,
    budgetPerPerson: 10000,
    travelStyle: 'Beaches & Relaxation',
    description: '',
    memberIds: [currentUser.id]
  });

  // Expense form state
  const [newExpForm, setNewExpForm] = useState({
    description: '',
    amount: '',
    paidBy: currentUser.id,
    category: 'Food',
    participantIds: tripMembers.map(m => m.id)
  });

  // Balance calculations
  const tripBalances = calculateTripBalances(tripExpenses, tripMembers, tripSettlements);
  const myBalanceInfo = tripBalances.find(b => b.userId === currentUser.id) || { netBalance: 0, paid: 0, share: 0 };
  const totalGroupExpense = tripExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  // Pending polls
  const pendingPolls = tripPolls.filter(p => p.status === 'Open');
  const pollsNeedingMyVote = pendingPolls.filter(p => !p.options.some(opt => opt.voterIds.includes(currentUser.id)));

  // Completed itinerary count
  const completedActivitiesCount = tripItinerary.filter(i => i.completed).length;

  const handleCreateTripSubmit = (e) => {
    e.preventDefault();
    if (!newTripForm.name || !newTripForm.destination) return;
    
    // Select all demo users by default for fun collaborative demo
    const allMemberIds = users.slice(0, 4).map(u => u.id);
    const created = createTrip({
      ...newTripForm,
      memberIds: allMemberIds
    });
    setShowCreateModal(false);
    navigate('/trips');
  };

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (!newExpForm.description || !newExpForm.amount) return;
    addExpense({
      ...newExpForm,
      amount: Number(newExpForm.amount)
    });
    setNewExpForm({
      description: '',
      amount: '',
      paidBy: currentUser.id,
      category: 'Food',
      participantIds: tripMembers.map(m => m.id)
    });
    setShowExpenseModal(false);
  };

  const handleJoinTrip = (e) => {
    e.preventDefault();
    if (!joinCode) return;
    setJoinSuccess(`Successfully connected to trip with invite code "${joinCode.toUpperCase()}"!`);
    setTimeout(() => {
      setShowJoinModal(false);
      setJoinSuccess('');
      setJoinCode('');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl object-cover ring-4 ring-brand-50 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">
                Welcome back, {currentUser.name.split(' ')[0]}!
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700">
                Organizer
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              You are viewing <span className="font-semibold text-slate-700">{activeTrip?.name}</span> with {tripMembers.length} group members.
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Trip</span>
          </button>

          <button
            onClick={() => setShowExpenseModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-all"
          >
            <ReceiptIndianRupee className="w-4 h-4" />
            <span>Split Expense</span>
          </button>

          <button
            onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>Join Group</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Trip Card */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Trip</span>
            <MapPin className="w-4 h-4 text-brand-600" />
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-bold text-slate-900 truncate">{activeTrip?.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{activeTrip?.destination}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">{activeTrip?.durationDays} Days Total</span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-brand-50 text-brand-700 text-[11px]">
              {activeTrip?.status}
            </span>
          </div>
        </div>

        {/* Total Group Spend */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Group Spend</span>
            <ReceiptIndianRupee className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-900">{formatINR(totalGroupExpense)}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{tripExpenses.length} shared bills recorded</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Target / person:</span>
            <span className="font-semibold text-slate-700">₹{activeTrip?.budgetPerPerson.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* My Net Balance */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Your Balance</span>
            <TrendingUp className={`w-4 h-4 ${myBalanceInfo.netBalance >= 0 ? 'text-tealAccent-500' : 'text-rose-500'}`} />
          </div>
          <div className="mt-3">
            <h3 className={`text-2xl font-extrabold ${myBalanceInfo.netBalance >= 0 ? 'text-tealAccent-600' : 'text-rose-600'}`}>
              {myBalanceInfo.netBalance >= 0 ? `+${formatINR(myBalanceInfo.netBalance)}` : `-${formatINR(Math.abs(myBalanceInfo.netBalance))}`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {myBalanceInfo.netBalance >= 0 ? 'You are owed by friends' : 'You owe the group pool'}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Paid: ₹{myBalanceInfo.paid.toLocaleString('en-IN')}</span>
            <Link to="/expenses" className="text-brand-600 font-semibold hover:underline">Settle &rarr;</Link>
          </div>
        </div>

        {/* Pending Decisions / Polls */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Open Group Polls</span>
            <Vote className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-900">{pendingPolls.length}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {pollsNeedingMyVote.length > 0 ? (
                <span className="text-amber-600 font-semibold">{pollsNeedingMyVote.length} waiting for your vote!</span>
              ) : (
                'You voted on all open polls'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">{completedActivitiesCount}/{tripItinerary.length} items done</span>
            <Link to="/polls" className="text-brand-600 font-semibold hover:underline">Vote now &rarr;</Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Trip Itinerary Spotlight & Decision Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Active Trip Overview & Next Up Activities */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Trip Hero Banner */}
          {activeTrip && (
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm group">
              <img
                src={activeTrip.coverImage}
                alt={activeTrip.name}
                className="w-full h-56 object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent p-6 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500 text-white shadow-sm">
                    {activeTrip.travelStyle}
                  </span>
                  <span className="text-xs text-slate-300">
                    {activeTrip.startDate} to {activeTrip.endDate}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeTrip.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl line-clamp-2">
                  {activeTrip.description}
                </p>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/20">
                  {/* Group Members Avatars */}
                  <div className="flex items-center -space-x-2">
                    {tripMembers.map(m => (
                      <img
                        key={m.id}
                        src={m.avatar}
                        alt={m.name}
                        title={m.name}
                        className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                      />
                    ))}
                    <span className="text-xs text-slate-300 ml-3">
                      {tripMembers.length} friends collaborating
                    </span>
                  </div>

                  <Link
                    to="/trips"
                    className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-semibold text-white transition-colors"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Today's / Next Up Activities Schedule */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Upcoming Schedule</h3>
                <p className="text-xs text-slate-500">Next activities planned for this trip</p>
              </div>
              <Link
                to="/itinerary"
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                Full itinerary ({tripItinerary.length}) &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {tripItinerary.slice(0, 3).map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex flex-col items-center justify-center shrink-0 font-bold text-xs">
                      <span>D{act.day}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800">{act.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-white border border-slate-200 text-slate-600">
                          {act.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{act.description}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" /> {act.time}
                        </span>
                        <span>•</span>
                        <span className="text-brand-700 font-semibold">
                          ₹{act.estimatedCost.toLocaleString('en-IN')}/person
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    act.completed ? 'bg-tealAccent-100 text-tealAccent-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {act.completed ? 'Completed' : 'Planned'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Decision Polls & AI Quick Assistant */}
        <div className="space-y-6">
          
          {/* AI Travel Assistant Promo Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-700 via-indigo-700 to-tealAccent-700 text-white shadow-lg space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-tealAccent-200">
              <Sparkles className="w-3.5 h-3.5" />
              AI Recommendation Engine
            </div>
            <h3 className="text-xl font-bold leading-snug">Need inspiration for your next weekend trip?</h3>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Ask our assistant to find curated getaways matching your group's budget and travel vibes.
            </p>
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
            >
              <span>Explore AI Suggestions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pending Polls Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Pending Polls</h3>
                <p className="text-xs text-slate-500">Vote on destinations & plans</p>
              </div>
              <Link to="/polls" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                All ({tripPolls.length}) &rarr;
              </Link>
            </div>

            <div className="space-y-4">
              {tripPolls.slice(0, 2).map((poll) => {
                const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voterIds.length, 0);
                return (
                  <div key={poll.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-slate-800 line-clamp-2">{poll.question}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                        poll.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {poll.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {poll.options.slice(0, 2).map(opt => {
                        const percent = totalVotes > 0 ? Math.round((opt.voterIds.length / totalVotes) * 100) : 0;
                        return (
                          <div key={opt.id} className="space-y-1">
                            <div className="flex justify-between text-[11px] text-slate-600">
                              <span className="truncate pr-2">{opt.text}</span>
                              <span className="font-semibold text-slate-800 shrink-0">{percent}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-brand-500 rounded-full transition-all duration-500"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Link
                      to="/polls"
                      className="block text-center text-xs font-semibold text-brand-600 hover:text-brand-700 pt-1"
                    >
                      Cast or change vote &rarr;
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick All Trips Switcher List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900">Your Other Trips</h3>
            <div className="space-y-2">
              {trips.map(trip => (
                <button
                  key={trip.id}
                  onClick={() => setActiveTripId(trip.id)}
                  className={`w-full p-3 rounded-2xl text-left flex items-center justify-between transition-colors border ${
                    trip.id === activeTripId
                      ? 'bg-brand-50/80 border-brand-200 text-brand-900'
                      : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="truncate pr-2">
                    <p className="text-xs font-bold truncate">{trip.name}</p>
                    <p className="text-[10px] text-slate-500">{trip.destination}</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 shrink-0">
                    {trip.durationDays}d
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* CREATE TRIP MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-600" />
                Create New Group Trip
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTripSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Trip Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coorg Monsoon Road Trip"
                  value={newTripForm.name}
                  onChange={(e) => setNewTripForm({ ...newTripForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destination *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coorg, Karnataka"
                  value={newTripForm.destination}
                  onChange={(e) => setNewTripForm({ ...newTripForm, destination: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newTripForm.startDate}
                    onChange={(e) => setNewTripForm({ ...newTripForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newTripForm.endDate}
                    onChange={(e) => setNewTripForm({ ...newTripForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Budget / Person (₹)</label>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    value={newTripForm.budgetPerPerson}
                    onChange={(e) => setNewTripForm({ ...newTripForm, budgetPerPerson: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Travel Style</label>
                  <select
                    value={newTripForm.travelStyle}
                    onChange={(e) => setNewTripForm({ ...newTripForm, travelStyle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                  >
                    <option value="Beaches & Relaxation">Beaches & Relaxation</option>
                    <option value="Adventure & Mountains">Adventure & Mountains</option>
                    <option value="Culture & Food">Culture & Food</option>
                    <option value="Road Trip">Road Trip</option>
                    <option value="Nightlife & Party">Nightlife & Party</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows="2"
                  placeholder="Notes, expectations, or vibe for the group..."
                  value={newTripForm.description}
                  onChange={(e) => setNewTripForm({ ...newTripForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                >
                  Create Trip & Invite Friends
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK SPLIT EXPENSE MODAL */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ReceiptIndianRupee className="w-5 h-5 text-amber-500" />
                Add Shared Expense
              </h3>
              <button
                onClick={() => setShowExpenseModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpenseSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expense Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dinner at Fisherman's Wharf"
                  value={newExpForm.description}
                  onChange={(e) => setNewExpForm({ ...newExpForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 3500"
                    value={newExpForm.amount}
                    onChange={(e) => setNewExpForm({ ...newExpForm, amount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newExpForm.category}
                    onChange={(e) => setNewExpForm({ ...newExpForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Stay">Stay & Villa</option>
                    <option value="Transport">Transport & Fuel</option>
                    <option value="Activities">Activities & Tickets</option>
                    <option value="Shopping">Shopping & Misc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Paid By</label>
                <select
                  value={newExpForm.paidBy}
                  onChange={(e) => setNewExpForm({ ...newExpForm, paidBy: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs"
                >
                  {tripMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} {m.id === currentUser.id ? '(You)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900">
                Split equally among all {tripMembers.length} active group members (
                {newExpForm.amount ? `₹${Math.round(Number(newExpForm.amount) / tripMembers.length).toLocaleString('en-IN')}/person` : '₹0/person'}
                ).
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                >
                  Save & Split Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JOIN TRIP MODAL */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-brand-600" />
                Join Existing Trip
              </h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleJoinTrip} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enter 6-digit Trip Invite Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GOA2026 or MALI44"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-mono tracking-widest uppercase text-center"
                />
              </div>

              {joinSuccess && (
                <div className="p-3 rounded-xl bg-tealAccent-50 border border-tealAccent-200 text-tealAccent-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tealAccent-600 shrink-0" />
                  {joinSuccess}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                >
                  Join Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
