import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  Save,
  RotateCcw,
  Sparkles,
  Camera,
  CheckCircle2,
  AlertTriangle,
  ReceiptIndianRupee,
  Compass,
  Zap,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProfilePage = () => {
  const { currentUser, updateProfile, resetData, aiCredits } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [preferredBudget, setPreferredBudget] = useState(currentUser.preferredBudget);
  const [interests, setInterests] = useState(currentUser.interests || []);
  const [preferredTripTypes, setPreferredTripTypes] = useState(currentUser.preferredTripTypes || []);
  
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const availableInterests = [
    "Beaches", "Mountains", "Nightlife", "Cafes", "Photography",
    "Culture", "Food & Dining", "Yoga & Wellness", "Adventure",
    "Trekking", "Water Sports", "Road Trips", "History", "Budget Travel"
  ];

  const availableTripTypes = [
    "Weekend Getaways", "Road Trips", "Friends Reunion",
    "Relaxation", "Backpacking", "Coastal Trips", "Luxury Glamping"
  ];

  const sampleAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80"
  ];

  const toggleInterest = (tag) => {
    setInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleTripType = (tag) => {
    setPreferredTripTypes(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      avatar,
      preferredBudget,
      interests,
      preferredTripTypes
    });

    setSaveSuccess(true);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleReset = () => {
    resetData();
    setShowResetConfirm(false);
    setName("Alex Morgan");
    setAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80");
    setPreferredBudget("₹10,000 - ₹20,000");
    setInterests(["Beaches", "Nightlife", "Photography", "Cafes", "Budget Travel"]);
    setPreferredTripTypes(["Weekend Getaways", "Road Trips", "Friends Reunion"]);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5 text-brand-600" />
            Preferences & Settings
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Profile & Travel DNA
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            TripCircle tailors AI recommendations and group matches according to your preferences.
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1.5 self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* AI Credits & Membership Card */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{aiCredits} AI Planning Credits</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Active Tier
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Used for smart multi-day itinerary generation, dispute solving, and hidden fee predictions.
            </p>
          </div>
        </div>

        <Link
          to="/credits"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
        >
          <Zap className="w-3.5 h-3.5" />
          Buy / Top-Up Credits
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-tealAccent-50 border border-tealAccent-200 text-tealAccent-900 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-tealAccent-600 shrink-0" />
          <span>Profile preferences saved successfully!</span>
        </div>
      )}

      {/* Main Profile Form Card */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Avatar & Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={avatar}
              alt={name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-brand-100 shadow-md"
            />
            <div className="absolute inset-0 rounded-3xl bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
              <Camera className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold text-slate-700">Select Profile Avatar</p>
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-2">
                {sampleAvatars.map((avUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatar(avUrl)}
                    className={`w-9 h-9 rounded-full overflow-hidden transition-all ${
                      avatar === avUrl ? 'ring-2 ring-brand-600 ring-offset-2 scale-110' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={avUrl} alt="Avatar option" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full sm:max-w-md px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Budget Preference */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Default Budget Preference Range
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              "₹5,000 - ₹10,000 (Student / Backpacker)",
              "₹10,000 - ₹20,000 (Mid-Range Comfort)",
              "₹20,000+ (Premium Glamping & Luxury)"
            ].map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setPreferredBudget(b)}
                className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                  preferredBudget === b
                    ? 'border-brand-600 bg-brand-50 text-brand-900 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Interests */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Your Travel Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {availableInterests.map(item => {
              const selected = interests.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item} {selected && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Trip Types */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-2">
            Preferred Trip Styles
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTripTypes.map(item => {
              const selected = preferredTripTypes.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleTripType(item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selected
                      ? 'bg-tealAccent-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item} {selected && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      {/* RESET CONFIRMATION MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Reset Demo Data?</h3>
              <p className="text-xs text-slate-500">
                This will restore all trips, polls, expenses, and itinerary items to their clean factory demo state.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
