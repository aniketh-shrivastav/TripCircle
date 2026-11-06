import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../services/expenseService';
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  Trash2,
  Edit3,
  ReceiptIndianRupee,
  Utensils,
  Camera,
  Car,
  Compass,
  Smile,
  Tag
} from 'lucide-react';

export const ItineraryPage = () => {
  const {
    activeTrip,
    tripItinerary,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleActivityCompleted
  } = useApp();

  const [selectedDay, setSelectedDay] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const durationDays = activeTrip?.durationDays || 4;
  const dayTabs = Array.from({ length: durationDays }, (_, i) => i + 1);

  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    day: 1,
    time: '10:00 AM',
    estimatedCost: '',
    category: 'Sightseeing',
    location: ''
  });

  const filteredActivities = tripItinerary.filter(act => act.day === selectedDay);
  
  // Calculate day total cost
  const dayTotalCost = filteredActivities.reduce((acc, curr) => acc + Number(curr.estimatedCost || 0), 0);
  const allItineraryCost = tripItinerary.reduce((acc, curr) => acc + Number(curr.estimatedCost || 0), 0);

  const handleOpenAddModal = () => {
    setForm({
      title: '',
      description: '',
      day: selectedDay,
      time: '10:00 AM',
      estimatedCost: '',
      category: 'Sightseeing',
      location: ''
    });
    setEditingActivity(null);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (act) => {
    setEditingActivity(act);
    setForm({
      title: act.title,
      description: act.description,
      day: act.day,
      time: act.time,
      estimatedCost: act.estimatedCost,
      category: act.category,
      location: act.location || ''
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingActivity) {
      updateActivity(editingActivity.id, {
        ...form,
        day: Number(form.day),
        estimatedCost: Number(form.estimatedCost) || 0
      });
    } else {
      addActivity({
        ...form,
        day: Number(form.day),
        estimatedCost: Number(form.estimatedCost) || 0
      });
    }

    setShowAddModal(false);
    setEditingActivity(null);
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'food':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'sightseeing':
        return <Camera className="w-4 h-4 text-brand-600" />;
      case 'transport':
        return <Car className="w-4 h-4 text-blue-600" />;
      case 'adventure':
        return <Compass className="w-4 h-4 text-emerald-600" />;
      default:
        return <Tag className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tealAccent-50 text-tealAccent-700 text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarDays className="w-3.5 h-3.5 text-tealAccent-600" />
            Day-by-Day Shared Schedule
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Itinerary for {activeTrip?.name || 'Trip'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Coordinate activities, approximate times, estimated costs, and mark items completed as you travel.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-2.5 rounded-xl bg-tealAccent-600 hover:bg-tealAccent-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </button>
      </div>

      {/* Days Tabs & Cost Summary Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {dayTabs.map(dayNum => {
            const countForDay = tripItinerary.filter(i => i.day === dayNum).length;
            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  selectedDay === dayNum
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>Day {dayNum}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedDay === dayNum ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {countForDay}
                </span>
              </button>
            );
          })}
        </div>

        {/* Day Total Cost Pill */}
        <div className="flex items-center gap-4 text-xs font-semibold px-2">
          <div className="text-slate-500">
            Day {selectedDay} Planned: <span className="font-bold text-slate-800">{formatINR(dayTotalCost)}/person</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="text-slate-500">
            Trip Total: <span className="font-bold text-tealAccent-600">{formatINR(allItineraryCost)}/person</span>
          </div>
        </div>
      </div>

      {/* Day Schedule Activities List */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <CalendarDays className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-slate-800 font-bold text-base">No activities planned for Day {selectedDay}</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              Add your morning breakfast spot, afternoon beach cruise, or evening sunset viewpoint.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-tealAccent-600 text-white text-xs font-semibold hover:bg-tealAccent-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Day {selectedDay} Activity
            </button>
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className={`rounded-3xl p-5 sm:p-6 bg-white border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                act.completed ? 'border-tealAccent-200 bg-tealAccent-50/15' : 'border-slate-200/90 shadow-xs'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-start gap-4">
                {/* Complete checkbox button */}
                <button
                  onClick={() => toggleActivityCompleted(act.id)}
                  className={`mt-1 transition-colors ${
                    act.completed ? 'text-tealAccent-600' : 'text-slate-300 hover:text-slate-500'
                  }`}
                  title={act.completed ? 'Mark as incomplete' : 'Mark as completed'}
                >
                  {act.completed ? (
                    <CheckCircle2 className="w-6 h-6 fill-tealAccent-100" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700">
                      {getCategoryIcon(act.category)}
                      <span>{act.category}</span>
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{act.time}</span>
                    </span>

                    {act.location && (
                      <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{act.location}</span>
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold ${
                    act.completed ? 'line-through text-slate-400' : 'text-slate-900'
                  }`}>
                    {act.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {act.description}
                  </p>
                </div>
              </div>

              {/* Right Info: Cost and Action buttons */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Cost / Person</span>
                  <span className="text-base font-extrabold text-slate-900">
                    {act.estimatedCost > 0 ? formatINR(act.estimatedCost) : 'Free'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(act)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Edit Activity"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => deleteActivity(act.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Activity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD/EDIT ACTIVITY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-tealAccent-600" />
                {editingActivity ? 'Edit Itinerary Activity' : 'Add Itinerary Activity'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Activity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scuba Diving at Grand Island"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-tealAccent-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Day</label>
                  <select
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-tealAccent-500 outline-none"
                  >
                    {dayTabs.map(d => (
                      <option key={d} value={d}>Day {d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Approximate Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 09:30 AM"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-tealAccent-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-tealAccent-500 outline-none"
                  >
                    <option value="Sightseeing">Sightseeing</option>
                    <option value="Food">Food & Dining</option>
                    <option value="Adventure">Adventure & Sports</option>
                    <option value="Transport">Transport</option>
                    <option value="Leisure">Leisure & Relax</option>
                    <option value="Nightlife">Nightlife</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Est. Cost / Person (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    placeholder="e.g. 800"
                    value={form.estimatedCost}
                    onChange={(e) => setForm({ ...form, estimatedCost: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-tealAccent-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Palolem Beach, South Goa"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-tealAccent-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Notes</label>
                <textarea
                  rows="2"
                  placeholder="What to wear, meeting point, ticket details..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-tealAccent-500 outline-none"
                />
              </div>

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
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-tealAccent-600 hover:bg-tealAccent-700 text-white shadow-sm"
                >
                  {editingActivity ? 'Update Activity' : 'Save Activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
