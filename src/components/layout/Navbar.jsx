import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Bell,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Plus,
  CheckCircle2,
  Users,
  LogOut,
  MapPin
} from 'lucide-react';

export const Navbar = ({ onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const {
    trips,
    activeTrip,
    activeTripId,
    setActiveTripId,
    currentUser,
    users,
    switchCurrentUser,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    aiCredits
  } = useApp();

  const [showTripMenu, setShowTripMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-tealAccent-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-brand-700 via-brand-600 to-tealAccent-600 bg-clip-text text-transparent">
                TripCircle
              </span>
            </div>
          </Link>

          {/* Active Trip Switcher */}
          {activeTrip && (
            <div className="relative ml-2 sm:ml-4">
              <button
                onClick={() => {
                  setShowTripMenu(!showTripMenu);
                  setShowUserMenu(false);
                  setShowNotifMenu(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100/90 hover:bg-slate-200/80 rounded-full border border-slate-200 transition-colors"
                title="Switch active trip"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span className="max-w-[130px] sm:max-w-[180px] truncate font-semibold text-slate-800">
                  {activeTrip.name}
                </span>
                <span className="hidden md:inline text-[11px] px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 font-semibold">
                  {activeTrip.status}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Trip Switcher Dropdown */}
              {showTripMenu && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Trips</span>
                    <button
                      onClick={() => {
                        setShowTripMenu(false);
                        navigate('/trips');
                      }}
                      className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> New Trip
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {trips.map(trip => (
                      <button
                        key={trip.id}
                        onClick={() => {
                          setActiveTripId(trip.id);
                          setShowTripMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          trip.id === activeTripId ? 'bg-brand-50/70 text-brand-700 font-semibold' : 'text-slate-700'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="text-sm truncate">{trip.name}</p>
                          <p className="text-xs text-slate-400 font-normal">{trip.destination}</p>
                        </div>
                        {trip.id === activeTripId && (
                          <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Credits Top-Up Link */}
          <Link
            to="/credits"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 shadow-xs transition-all"
            title="View or Buy AI Credits"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
            <span className="font-bold">{aiCredits}</span>
            <span className="hidden md:inline text-amber-700">Credits</span>
            <span className="text-[10px] bg-amber-200/90 text-amber-900 font-extrabold px-1 rounded-sm uppercase tracking-wider ml-0.5">
              +Buy
            </span>
          </Link>

          {/* AI Trip Planner Quick CTA */}
          <Link
            to="/planner"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-brand-600 to-tealAccent-500 text-white shadow-sm hover:shadow-brand-500/25 hover:brightness-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Planner</span>
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowTripMenu(false);
                setShowUserMenu(false);
              }}
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800">Notifications</span>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-brand-600 hover:text-brand-700 font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.slice(0, 5).map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                        !n.read ? 'bg-brand-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-100 text-center">
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifMenu(false)}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View all notifications &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Persona Switcher / Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowTripMenu(false);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors"
              title="Change active demo user persona"
            >
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <span className="text-xs font-medium text-slate-700 hidden sm:inline">
                {currentUser?.name?.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Persona Switcher Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Demo Persona Switcher</p>
                  <p className="text-xs text-slate-500 mt-0.5">Switch user to test multi-person voting & splits:</p>
                </div>
                <div className="py-1">
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchCurrentUser(u.id);
                        setShowUserMenu(false);
                      }}
                      className={`w-full px-4 py-2 flex items-center justify-between text-left hover:bg-slate-50 transition-colors ${
                        u.id === currentUser?.id ? 'bg-brand-50 font-semibold text-brand-700' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <p className="text-xs">{u.name}</p>
                          <p className="text-[10px] text-slate-400">{u.preferredBudget}</p>
                        </div>
                      </div>
                      {u.id === currentUser?.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-100">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="text-xs text-slate-600 hover:text-brand-600 font-medium flex items-center gap-1.5"
                  >
                    Manage Profile & Settings
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
