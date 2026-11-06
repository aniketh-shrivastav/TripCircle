import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  Users,
  Vote,
  ReceiptIndianRupee,
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage = () => {
  const { trips } = useApp();

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-indigo-800/40">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-tealAccent-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-tealAccent-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-tealAccent-400" />
            AI-Powered Group Travel Collaboration
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Plan Together. <br className="hidden sm:inline" />
            Travel Better. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-tealAccent-300 via-cyan-200 to-amber-300 bg-clip-text text-transparent">
              Split Fairly.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Eliminate endless WhatsApp debates, chaotic spreadsheets, and awkward money talks. TripCircle unites group voting, day-by-day itineraries, AI-curated suggestions, and Splitwise-grade expense math into one delightful app.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              to="/dashboard"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-tealAccent-400 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-tealAccent-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-base"
            >
              Open Live Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/planner"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2 text-base"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Try AI Trip Planner
            </Link>

            <Link
              to="/credits"
              className="px-5 py-3.5 rounded-2xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold border border-amber-400/40 backdrop-blur-sm transition-all flex items-center gap-2 text-sm"
            >
              <span>Buy AI Credits</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-tealAccent-400" />
              <span>Zero setup required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-tealAccent-400" />
              <span>Full LocalStorage persistence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-tealAccent-400" />
              <span>Multi-person demo mode</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Groups Love TripCircle
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Every feature was engineered to replace travel chaos with clarity and group alignment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Vote className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Democratic Group Polls</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No more "I don't know, whatever you guys want." Put villas, dates, and dinner options to vote. Lock decisions with a clear winning option.
            </p>
            <Link to="/polls" className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700">
              Try group voting &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-tealAccent-50 text-tealAccent-600 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Day-by-Day Shared Itinerary</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Organize activities with timing, costs, categories, and completion tracking. Everyone knows the morning schedule without asking.
            </p>
            <Link to="/itinerary" className="inline-flex items-center gap-1 text-xs font-bold text-tealAccent-600 hover:text-tealAccent-700">
              Explore itinerary schedule &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ReceiptIndianRupee className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Fair Splits & 1-Click Settlement</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Log group expenses in rupees. Our greedy algorithm minimizes total transactions so nobody owes 5 different people.
            </p>
            <Link to="/expenses" className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700">
              View expense calculator &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Live Sample Trips Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Preloaded Demo Trips</h2>
            <p className="text-xs sm:text-sm text-slate-500">Pick any trip to view its active itinerary, polls, and expenses.</p>
          </div>
          <Link
            to="/trips"
            className="text-xs sm:text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            All trips &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <Link
              key={trip.id}
              to={`/trips`}
              className="group rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={trip.coverImage}
                  alt={trip.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                  {trip.status}
                </div>
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/70 backdrop-blur-md text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-tealAccent-400" />
                  {trip.destination}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-600 transition-colors">
                    {trip.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {trip.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{trip.durationDays} Days</span>
                  <span className="font-bold text-brand-600">₹{trip.budgetPerPerson.toLocaleString('en-IN')}/person</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Banner */}
      <section className="rounded-3xl bg-slate-100/90 border border-slate-200 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-800">Ready to test the workflow?</h3>
          <p className="text-sm text-slate-500">Jump right into the interactive dashboard with demo participants preconfigured.</p>
        </div>
        <Link
          to="/dashboard"
          className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-md transition-all shrink-0"
        >
          Go to Dashboard
        </Link>
      </section>
    </div>
  );
};
