import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Vote,
  Plus,
  CheckCircle2,
  Lock,
  Sparkles,
  Users,
  Trophy,
  Filter,
  Trash2,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PollsPage = () => {
  const {
    currentUser,
    users,
    tripPolls,
    activeTrip,
    createPoll,
    votePoll,
    closePoll,
    switchCurrentUser
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Poll form state
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollCategory, setNewPollCategory] = useState('Activities');
  const [pollOptions, setPollOptions] = useState(['', '', '']);

  const categories = ['All', 'Stay', 'Activities', 'Transport', 'Dining', 'Destination'];

  const filteredPolls = tripPolls.filter(p => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  const handleAddOptionField = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handleOptionChange = (idx, value) => {
    const updated = [...pollOptions];
    updated[idx] = value;
    setPollOptions(updated);
  };

  const handleRemoveOptionField = (idx) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== idx));
    }
  };

  const handleCreatePollSubmit = (e) => {
    e.preventDefault();
    const cleanOptions = pollOptions.map(o => o.trim()).filter(Boolean);
    if (!newPollQuestion.trim() || cleanOptions.length < 2) return;

    createPoll({
      question: newPollQuestion,
      category: newPollCategory,
      options: cleanOptions
    });

    setNewPollQuestion('');
    setPollOptions(['', '', '']);
    setShowCreateModal(false);
  };

  const handleCloseAndDeclareWinner = (pollId, winningOptionId) => {
    closePoll(pollId, winningOptionId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Vote className="w-3.5 h-3.5 text-brand-600" />
            Group Decision Making
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Polls & Votes for {activeTrip?.name || 'Group'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Cast votes on stays, dining spots, and excursions. Watch percentages adjust in real time as group members vote.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Poll</span>
        </button>
      </div>

      {/* Demo Collaboration Helper Pill */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-50 to-tealAccent-50 border border-brand-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Users className="w-4 h-4 text-brand-600 shrink-0" />
          <span>
            Currently voting as <strong className="text-brand-700 font-bold">{currentUser.name}</strong>.
            Switch persona to test multi-member group voting:
          </span>
        </div>

        {/* Quick Persona Switcher Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {users.map(u => (
            <button
              key={u.id}
              onClick={() => switchCurrentUser(u.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                u.id === currentUser.id
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <img src={u.avatar} alt={u.name} className="w-3.5 h-3.5 rounded-full object-cover" />
              <span>{u.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilter === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Poll Cards List */}
      <div className="space-y-6">
        {filteredPolls.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
            <Vote className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-600 font-bold text-sm">No polls in this category</p>
            <p className="text-slate-400 text-xs mt-1">Create a poll to start deciding with your group.</p>
          </div>
        ) : (
          filteredPolls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voterIds.length, 0);
            const isClosed = poll.status === 'Closed';

            // Find highest voted option
            let highestVoteCount = -1;
            let leaderOptionId = null;
            poll.options.forEach(opt => {
              if (opt.voterIds.length > highestVoteCount) {
                highestVoteCount = opt.voterIds.length;
                leaderOptionId = opt.id;
              }
            });

            return (
              <div
                key={poll.id}
                className={`bg-white rounded-3xl p-6 border transition-all ${
                  isClosed ? 'border-slate-200 opacity-95' : 'border-slate-200/90 shadow-xs'
                }`}
              >
                {/* Poll Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-50 text-brand-700">
                        {poll.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isClosed ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {poll.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{poll.question}</h3>
                  </div>

                  <div className="text-xs text-slate-500 font-medium">
                    {totalVotes} total {totalVotes === 1 ? 'vote' : 'votes'}
                  </div>
                </div>

                {/* Poll Options */}
                <div className="space-y-3 pt-5">
                  {poll.options.map((option) => {
                    const optionVotes = option.voterIds.length;
                    const percent = totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
                    const hasMyVote = option.voterIds.includes(currentUser.id);
                    const isWinner = isClosed && (poll.winningOptionId === option.id || (!poll.winningOptionId && leaderOptionId === option.id));

                    return (
                      <div
                        key={option.id}
                        onClick={() => !isClosed && votePoll(poll.id, option.id, currentUser.id)}
                        className={`relative overflow-hidden rounded-2xl p-4 border transition-all ${
                          !isClosed ? 'cursor-pointer hover:border-brand-300' : 'cursor-default'
                        } ${
                          hasMyVote
                            ? 'border-brand-500 bg-brand-50/20'
                            : isWinner
                            ? 'border-amber-400 bg-amber-50/30'
                            : 'border-slate-200 bg-slate-50/40'
                        }`}
                      >
                        {/* Progress Bar Fill */}
                        <div
                          className={`absolute top-0 bottom-0 left-0 transition-all duration-700 -z-0 opacity-15 ${
                            hasMyVote ? 'bg-brand-500' : isWinner ? 'bg-amber-500' : 'bg-slate-400'
                          }`}
                          style={{ width: `${percent}%` }}
                        />

                        <div className="relative z-10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              hasMyVote
                                ? 'border-brand-600 bg-brand-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}>
                              {hasMyVote && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${
                                  hasMyVote ? 'text-brand-900 font-bold' : 'text-slate-800'
                                }`}>
                                  {option.text}
                                </span>
                                {isWinner && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                    <Trophy className="w-3 h-3 text-amber-600" />
                                    Winner
                                  </span>
                                )}
                              </div>

                              {/* Voter Avatars */}
                              {option.voterIds.length > 0 && (
                                <div className="flex items-center gap-1 mt-1.5">
                                  <div className="flex items-center -space-x-1.5">
                                    {option.voterIds.map(vid => {
                                      const u = users.find(x => x.id === vid);
                                      return u ? (
                                        <img
                                          key={vid}
                                          src={u.avatar}
                                          alt={u.name}
                                          title={u.name}
                                          className="w-5 h-5 rounded-full border border-white object-cover"
                                        />
                                      ) : null;
                                    })}
                                  </div>
                                  <span className="text-[11px] text-slate-400 ml-1.5">
                                    {optionVotes} {optionVotes === 1 ? 'vote' : 'votes'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-base font-extrabold text-slate-800">{percent}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Poll Footer Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {!isClosed ? 'Click any option to vote or change your vote.' : 'Voting is finalized for this decision.'}
                  </span>

                  {!isClosed ? (
                    <button
                      onClick={() => handleCloseAndDeclareWinner(poll.id, leaderOptionId)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>Close Poll & Finalize Winner</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Decision Accepted</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE POLL MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Vote className="w-5 h-5 text-brand-600" />
                Create Group Poll
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePollSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Poll Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Which sunset spot should we pick on Day 2?"
                  value={newPollQuestion}
                  onChange={(e) => setNewPollQuestion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newPollCategory}
                  onChange={(e) => setNewPollCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option value="Destination">Destination</option>
                  <option value="Stay">Stay & Accommodations</option>
                  <option value="Activities">Activities & Excursions</option>
                  <option value="Dining">Dining & Food</option>
                  <option value="Transport">Transport & Rides</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Options (minimum 2)</label>
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOptionField(idx)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {pollOptions.length < 6 && (
                  <button
                    type="button"
                    onClick={handleAddOptionField}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 pt-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add another option
                  </button>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
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
                  Publish Group Poll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
