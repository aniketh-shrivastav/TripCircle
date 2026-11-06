import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Vote,
  ReceiptIndianRupee,
  CalendarCheck,
  CreditCard,
  Trash2,
  Filter,
  Sparkles
} from 'lucide-react';

export const NotificationsPage = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    currentUser,
    activeTrip
  } = useApp();

  const [activeTab, setActiveTab] = useState('All');

  const filtered = notifications.filter(n => {
    if (activeTab === 'All') return true;
    return n.type === activeTab.toLowerCase();
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'poll':
        return <Vote className="w-4 h-4 text-brand-600" />;
      case 'vote':
        return <Vote className="w-4 h-4 text-emerald-600" />;
      case 'expense':
        return <ReceiptIndianRupee className="w-4 h-4 text-amber-600" />;
      case 'settlement':
        return <CreditCard className="w-4 h-4 text-tealAccent-600" />;
      case 'itinerary':
        return <CalendarCheck className="w-4 h-4 text-indigo-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5 text-slate-500" />
            Activity Stream
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            In-App Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Simulated group travel events including polls, votes, expense entries, and itinerary changes.
          </p>
        </div>

        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shrink-0 self-start sm:self-center"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-500" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Poll', 'Vote', 'Expense', 'Settlement', 'Itinerary'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-700 font-bold text-sm">No notifications found</p>
            <p className="text-slate-400 text-xs mt-1">You're all caught up on trip activities.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !item.read
                  ? 'bg-white border-brand-200 shadow-xs ring-1 ring-brand-100'
                  : 'bg-white/70 border-slate-200/80 opacity-90 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getNotificationIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                      {item.type}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {item.message}
                  </p>
                  <p className="text-[10px] text-slate-400">{item.timestamp}</p>
                </div>
              </div>

              {!item.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationRead(item.id);
                  }}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0"
                >
                  Mark read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
