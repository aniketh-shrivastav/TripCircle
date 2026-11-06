import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  Map,
  Vote,
  CalendarDays,
  ReceiptIndianRupee,
  Bell,
  UserCheck,
  Home,
  CheckCircle2,
  Zap,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { unreadNotificationsCount, tripPolls, activeTrip, aiCredits } = useApp();

  const openPollsCount = tripPolls.filter(p => p.status === 'Open').length;

  const navigationItems = [
    { name: 'Welcome Home', to: '/', icon: Home, exact: true },
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Trip Planner', to: '/planner', icon: Sparkles, badge: 'AI' },
    { name: 'Buy AI Credits', to: '/credits', icon: Zap, badge: `${aiCredits} left` },
    { name: 'Trip Overview', to: '/trips', icon: Map },
    { name: 'Polls & Votes', to: '/polls', icon: Vote, badge: openPollsCount > 0 ? `${openPollsCount} open` : null },
    { name: 'Itinerary', to: '/itinerary', icon: CalendarDays },
    { name: 'Expenses & Split', to: '/expenses', icon: ReceiptIndianRupee },
    { name: 'Notifications', to: '/notifications', icon: Bell, badge: unreadNotificationsCount > 0 ? `${unreadNotificationsCount}` : null },
    { name: 'Profile & Settings', to: '/profile', icon: UserCheck },
  ];

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 w-64 select-none">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-tealAccent-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-slate-800">TripCircle</span>
        </NavLink>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-slate-600 p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </div>

            {item.badge && (
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                item.badge === 'AI'
                  ? 'bg-gradient-to-r from-brand-500 to-tealAccent-500 text-white'
                  : 'bg-brand-100 text-brand-700'
              }`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Active Trip Quick Card in Footer */}
      {activeTrip && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-950 text-white text-xs shadow-lg">
          <div className="flex items-center justify-between text-slate-300 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-tealAccent-400">Current Trip</span>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white">{activeTrip.durationDays} Days</span>
          </div>
          <p className="font-semibold text-white truncate text-sm">{activeTrip.name}</p>
          <p className="text-[11px] text-slate-300 truncate mt-0.5">{activeTrip.destination}</p>
          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Budget / person:</span>
            <span className="font-bold text-tealAccent-300">₹{activeTrip.budgetPerPerson.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative z-50 flex-1 max-w-xs w-full bg-white animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
