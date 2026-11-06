import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { quickPrompts, getRecommendations } from '../services/recommendationService';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  ReceiptIndianRupee,
  Compass,
  CheckCircle2,
  Vote,
  Plus,
  Send,
  Loader2,
  ArrowRight,
  Info,
  Zap,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PlannerPage = () => {
  const navigate = useNavigate();
  const { currentUser, createTrip, createPoll, activeTrip, aiCredits, useCredits } = useApp();

  const [startingCity, setStartingCity] = useState("Mumbai / Pune");
  const [region, setRegion] = useState("");
  const [budget, setBudget] = useState(12000);
  const [duration, setDuration] = useState("3 - 4 Days");
  const [groupSize, setGroupSize] = useState(4);
  const [selectedInterests, setSelectedInterests] = useState(["Beaches", "Cafes", "Nightlife"]);
  
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState(() =>
    getRecommendations({
      startLocation: "Mumbai / Pune",
      budget: 12000,
      duration: "3 - 4 Days",
      groupSize: 4,
      interests: ["Beaches", "Cafes", "Nightlife"]
    })
  );

  const [notificationMsg, setNotificationMsg] = useState("");

  const allInterestTags = [
    "Beaches", "Mountains", "Adventure", "Food", "Culture", "Nightlife",
    "Trekking", "Relaxation", "Water Sports", "Photography", "Heritage"
  ];

  const handleInterestToggle = (tag) => {
    setSelectedInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = (customCriteria = null) => {
    if (aiCredits <= 0) {
      setNotificationMsg("⚠️ You have 0 AI credits remaining! Please top-up to generate new personalized itineraries.");
      return;
    }

    useCredits(1, "Generated AI Trip Recommendations");
    setIsGenerating(true);
    setNotificationMsg("");

    setTimeout(() => {
      const activeFilters = customCriteria || {
        startLocation: startingCity,
        preferredRegion: region,
        budget,
        duration,
        groupSize,
        interests: selectedInterests
      };

      const results = getRecommendations(activeFilters);
      setRecommendations(results);
      setIsGenerating(false);
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      } catch (e) {}
    }, 600);
  };

  const handleQuickPromptClick = (prompt) => {
    setCustomPrompt(prompt.query);
    if (prompt.criteria.maxBudget) setBudget(prompt.criteria.maxBudget);
    if (prompt.criteria.styles) setSelectedInterests(prompt.criteria.styles);
    handleGenerate({
      startLocation: startingCity,
      budget: prompt.criteria.maxBudget,
      groupSize,
      interests: prompt.criteria.styles
    });
  };

  const handleSelectAsTrip = (rec) => {
    const newTrip = createTrip({
      name: `${rec.destination} Group Getaway`,
      destination: rec.destination,
      startDate: "2026-11-20",
      endDate: "2026-11-24",
      durationDays: 4,
      budgetPerPerson: rec.estimatedCostPerPerson,
      travelStyle: rec.vibe.join(', '),
      description: rec.whyItFits,
      coverImage: rec.coverImage,
      startingLocation: startingCity,
      memberIds: [currentUser.id]
    });

    setNotificationMsg(`Trip created for "${rec.destination}"! Redirecting to Trip Overview...`);
    setTimeout(() => {
      navigate('/trips');
    }, 1200);
  };

  const handleAddToPoll = (rec) => {
    const alternativeRecs = recommendations.filter(r => r.id !== rec.id);
    const options = [
      `${rec.destination} (₹${rec.estimatedCostPerPerson.toLocaleString('en-IN')}/person - ${rec.vibe.slice(0, 2).join(', ')})`,
      ...(alternativeRecs.map(r => `${r.destination} (₹${r.estimatedCostPerPerson.toLocaleString('en-IN')}/person - ${r.vibe.slice(0, 2).join(', ')})`))
    ];

    createPoll({
      question: `Where should we head for our next ${duration} group trip?`,
      category: "Destination",
      options: options.slice(0, 3)
    });

    setNotificationMsg(`Added "${rec.destination}" as a group poll in ${activeTrip ? activeTrip.name : 'active trip'}! Redirecting to Polls...`);
    setTimeout(() => {
      navigate('/polls');
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            AI Travel Assistant
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Smart Destination Recommender
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Input your group's budget, departure hub, and preferred vibes to receive tailored, cost-estimated travel itineraries.
          </p>
        </div>

        {/* Credits & Disclaimer Badge */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link
            to="/credits"
            className="flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/80 hover:from-amber-100 hover:to-amber-200/80 border border-amber-300/80 text-amber-950 text-xs font-semibold shadow-xs transition-all"
            title="Manage AI Credits"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-400" />
              <span><strong>{aiCredits}</strong> Credits</span>
            </div>
            <span className="text-[10px] bg-amber-500 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              +Buy
            </span>
          </Link>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-600 text-xs shrink-0 max-w-xs">
            <Info className="w-4 h-4 text-slate-500 shrink-0" />
            <span>1 credit per AI itinerary generated.</span>
          </div>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-4 rounded-2xl bg-tealAccent-50 border border-tealAccent-200 text-tealAccent-900 font-semibold text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-tealAccent-600 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Conversational Assistant & Quick Prompts Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Suggested Conversational Prompts:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPromptClick(p)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 text-slate-700 border border-slate-200 transition-all text-left"
            >
              💬 "{p.label}"
            </button>
          ))}
        </div>

        {/* Custom Prompt Input */}
        <div className="relative pt-2">
          <input
            type="text"
            placeholder="Type your own prompt (e.g. 'Plan a 3-day trek near Bangalore under ₹7,000 for 5 friends')..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-xs sm:text-sm bg-slate-50/60"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            className="absolute right-2 top-3.5 p-2 rounded-xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 transition-colors shadow-xs"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Filter Parameters Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Compass className="w-4 h-4 text-brand-600" />
          Customize Your Group's Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Starting Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Starting Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={startingCity}
                onChange={(e) => setStartingCity(e.target.value)}
                placeholder="e.g. Mumbai, Delhi, Bengaluru"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          {/* Group Size */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Group Size: <span className="font-bold text-brand-600">{groupSize} Friends</span>
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <select
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
              >
                {[2, 3, 4, 5, 6, 8, 10].map(num => (
                  <option key={num} value={num}>{num} Travelers</option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Trip Duration
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
              >
                <option value="Weekend (2 Days)">Weekend (2 Days)</option>
                <option value="3 - 4 Days">3 - 4 Days</option>
                <option value="5 - 7 Days">5 - 7 Days (Full Week)</option>
                <option value="Extended 10+ Days">Extended 10+ Days</option>
              </select>
            </div>
          </div>

          {/* Budget per Person */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Budget / Person</span>
              <span className="font-bold text-brand-600">₹{budget.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="4000"
              max="35000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 mt-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹4,000 (Budget)</span>
              <span>₹35,000 (Luxury)</span>
            </div>
          </div>
        </div>

        {/* Travel Interests Tags */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Select Group Vibe & Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {allInterestTags.map(tag => {
              const active = selectedInterests.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleInterestToggle(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag} {active && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-tealAccent-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center gap-2"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Refresh Recommendations</span>
          </button>
        </div>
      </div>

      {/* 3 Detailed Recommendation Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Top 3 Group Matches ({recommendations.length})
          </h2>
          <span className="text-xs text-slate-500">Sorted by group match compatibility</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Cover Image & Match Badge */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={rec.coverImage}
                    alt={rec.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-brand-700 shadow-md backdrop-blur-sm flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{rec.matchPercentage}% Match</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white">
                    {rec.duration}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {rec.destination}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{rec.region}</p>
                  </div>

                  {/* Vibe Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {rec.vibe.map((v, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700">
                        {v}
                      </span>
                    ))}
                  </div>

                  {/* Pricing Box */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Est. Cost / Person</p>
                      <p className="text-lg font-extrabold text-slate-900">
                        ₹{rec.estimatedCostPerPerson.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Total for {groupSize} friends</p>
                      <p className="text-sm font-bold text-tealAccent-600">
                        ₹{rec.calculatedGroupTotal.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Why it suits */}
                  <div>
                    <p className="text-xs font-bold text-slate-700 mb-1">Why It Suits Your Group:</p>
                    <p className="text-xs text-slate-600 leading-relaxed bg-brand-50/40 p-2.5 rounded-xl border border-brand-100/50">
                      {rec.whyItFits}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="text-xs font-bold text-slate-700 mb-1.5">Curated Activity Highlights:</p>
                    <ul className="space-y-1">
                      {rec.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-tealAccent-500 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Select Destination / Add to Poll */}
              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => handleSelectAsTrip(rec)}
                  className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Select Destination & Create Trip</span>
                </button>

                <button
                  onClick={() => handleAddToPoll(rec)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Vote className="w-3.5 h-3.5" />
                  <span>Add to Group Decision Poll</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
