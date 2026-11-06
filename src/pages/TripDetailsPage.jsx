import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatINR } from '../services/expenseService';
import {
  MapPin,
  Calendar,
  Users,
  ReceiptIndianRupee,
  Share2,
  Edit3,
  Vote,
  CalendarCheck,
  CheckCircle2,
  Copy,
  Plus,
  Trash2,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const TripDetailsPage = () => {
  const {
    activeTrip,
    trips,
    setActiveTripId,
    tripMembers,
    users,
    tripExpenses,
    tripPolls,
    tripItinerary,
    updateTrip,
    deleteTrip
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const [editForm, setEditForm] = useState(() => ({
    name: activeTrip?.name || '',
    destination: activeTrip?.destination || '',
    startDate: activeTrip?.startDate || '',
    endDate: activeTrip?.endDate || '',
    budgetPerPerson: activeTrip?.budgetPerPerson || 12000,
    travelStyle: activeTrip?.travelStyle || 'Beaches & Relaxation',
    status: activeTrip?.status || 'Planning',
    description: activeTrip?.description || '',
    coverImage: activeTrip?.coverImage || ''
  }));

  if (!activeTrip) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500 text-sm">No trips found.</p>
        <Link to="/dashboard" className="mt-4 inline-block px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const totalSpent = tripExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalTargetBudget = activeTrip.budgetPerPerson * tripMembers.length;
  const budgetPercent = Math.min(100, Math.round((totalSpent / totalTargetBudget) * 100));

  const handleCopyInviteLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTrip(activeTrip.id, {
      ...editForm,
      budgetPerPerson: Number(editForm.budgetPerPerson)
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Trip Cover & Main Overview */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xs">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={activeTrip.coverImage}
            alt={activeTrip.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {activeTrip.status}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyInviteLink}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 hover:bg-white text-slate-800 shadow-sm backdrop-blur-md flex items-center gap-1.5 transition-colors"
                title="Copy shareable trip invite link"
              >
                <Share2 className="w-3.5 h-3.5 text-brand-600" />
                <span>Share Invite</span>
              </button>

              <button
                onClick={() => {
                  setEditForm({
                    name: activeTrip.name,
                    destination: activeTrip.destination,
                    startDate: activeTrip.startDate,
                    endDate: activeTrip.endDate,
                    budgetPerPerson: activeTrip.budgetPerPerson,
                    travelStyle: activeTrip.travelStyle,
                    status: activeTrip.status,
                    description: activeTrip.description,
                    coverImage: activeTrip.coverImage
                  });
                  setIsEditing(true);
                }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 hover:bg-white text-slate-800 shadow-sm backdrop-blur-md flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                <span>Edit Trip</span>
              </button>
            </div>
          </div>

          {/* Bottom Title Bar */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2 text-xs text-tealAccent-300 font-semibold">
              <MapPin className="w-4 h-4 text-tealAccent-400" />
              <span>{activeTrip.destination}</span>
              <span>•</span>
              <Calendar className="w-4 h-4 text-tealAccent-400" />
              <span>{activeTrip.startDate} to {activeTrip.endDate} ({activeTrip.durationDays} Days)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {activeTrip.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl line-clamp-2">
              {activeTrip.description}
            </p>
          </div>
        </div>

        {/* Copy Toast */}
        {copyToast && (
          <div className="p-3 bg-tealAccent-50 border-t border-tealAccent-200 text-tealAccent-900 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-tealAccent-600" />
            Trip invite link copied to clipboard! Share it with your friends.
          </div>
        )}

        {/* Quick Nav Bar between Itinerary, Polls, Expenses */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              to="/itinerary"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-colors"
            >
              <CalendarCheck className="w-4 h-4 text-tealAccent-600" />
              <span>Itinerary ({tripItinerary.length})</span>
            </Link>

            <Link
              to="/polls"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-colors"
            >
              <Vote className="w-4 h-4 text-indigo-600" />
              <span>Polls ({tripPolls.length})</span>
            </Link>

            <Link
              to="/expenses"
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand-500 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-xs transition-colors"
            >
              <ReceiptIndianRupee className="w-4 h-4 text-amber-600" />
              <span>Expenses ({tripExpenses.length})</span>
            </Link>
          </div>

          <div className="text-xs text-slate-500">
            Travel Style: <span className="font-semibold text-slate-700">{activeTrip.travelStyle}</span>
          </div>
        </div>
      </div>

      {/* Grid: Group Members & Budget Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Group Members Roster */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-600" />
                  Trip Circle Members ({tripMembers.length})
                </h3>
                <p className="text-xs text-slate-500">Active travelers participating in this journey</p>
              </div>

              <button
                onClick={handleCopyInviteLink}
                className="px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Invite Friends
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {tripMembers.map((member, index) => (
                <div key={member.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-800">{member.name}</p>
                        {index === 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-brand-100 text-brand-700">
                            Host
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{member.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {member.preferredBudget}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Budget & Spend Health */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ReceiptIndianRupee className="w-5 h-5 text-amber-500" />
              Budget Health
            </h3>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-slate-900">{formatINR(totalSpent)}</span>
                <span className="text-xs text-slate-400 font-medium">
                  of {formatINR(totalTargetBudget)} goal
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    budgetPercent > 90 ? 'bg-rose-500' : 'bg-gradient-to-r from-tealAccent-500 to-brand-600'
                  }`}
                  style={{ width: `${budgetPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-slate-500 pt-1">
                <span>{budgetPercent}% spent</span>
                <span>₹{(activeTrip.budgetPerPerson).toLocaleString('en-IN')} / person target</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Expenses Logged:</span>
                <span className="font-semibold text-slate-800">{tripExpenses.length} entries</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pending Polls:</span>
                <span className="font-semibold text-slate-800">
                  {tripPolls.filter(p => p.status === 'Open').length} open
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Activities in Itinerary:</span>
                <span className="font-semibold text-slate-800">{tripItinerary.length} activities</span>
              </div>
            </div>

            <Link
              to="/expenses"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors block text-center"
            >
              Manage Expenses & Settlements &rarr;
            </Link>
          </div>
        </div>

      </div>

      {/* EDIT TRIP MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-brand-600" />
                Edit Trip Details
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Trip Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Destination</label>
                <input
                  type="text"
                  required
                  value={editForm.destination}
                  onChange={(e) => setEditForm({ ...editForm, destination: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={editForm.startDate}
                    onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={editForm.endDate}
                    onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Budget / Person (₹)</label>
                  <input
                    type="number"
                    value={editForm.budgetPerPerson}
                    onChange={(e) => setEditForm({ ...editForm, budgetPerPerson: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this trip?")) {
                      deleteTrip(activeTrip.id);
                      setIsEditing(false);
                    }
                  }}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Trip
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
