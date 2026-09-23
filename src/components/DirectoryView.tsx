import React, { useState } from 'react';
import { Conversation } from '../types';

interface DirectoryViewProps {
  conversations: Conversation[];
  onSelectUser: (id: string) => void;
  onStartCall: (type: 'audio' | 'video', conv: Conversation) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  conversations,
  onSelectUser,
  onStartCall,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState<'all' | 'design' | 'engineering' | 'research'>('all');

  const users = conversations.filter((c) => !c.isGroup);

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.handle.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (department === 'design') return u.role.toLowerCase().includes('design');
    if (department === 'engineering') return u.role.toLowerCase().includes('engineer') || u.role.toLowerCase().includes('architect');
    if (department === 'research') return u.role.toLowerCase().includes('research');
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface">
            Team Directory &amp; Colleague Index
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Connect across workspace squads, check active availability, and initiate instant chats.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg">
            search
          </span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search colleagues..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest text-on-surface rounded-full text-xs font-medium border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
          />
        </div>
      </div>

      {/* Department Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {(['all', 'design', 'engineering', 'research'] as const).map((dept) => (
          <button
            key={dept}
            onClick={() => setDepartment(dept)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
              department === dept
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {dept === 'all' ? 'All Departments' : dept}
          </button>
        ))}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-surface-container-lowest ${
                    user.isOnline ? 'bg-tertiary' : 'bg-outline'
                  }`}
                ></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-title-md text-sm font-bold text-on-surface truncate">
                    {user.name}
                  </span>
                  {user.isVerified && (
                    <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  )}
                </div>
                <span className="text-xs text-primary font-semibold">{user.handle}</span>
                <span className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                  {user.role}
                </span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
              {user.bio}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
              <span className="text-[11px] text-on-surface-variant font-medium">
                {user.isOnline ? (
                  <span className="text-tertiary font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                    Available Now
                  </span>
                ) : (
                  'Away'
                )}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onStartCall('audio', user)}
                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                  title="Audio call"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                </button>
                <button
                  type="button"
                  onClick={() => onStartCall('video', user)}
                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                  title="Video call"
                >
                  <span className="material-symbols-outlined text-base">videocam</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectUser(user.id)}
                  className="px-3 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded-full hover:bg-secondary transition-colors shadow-xs"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
