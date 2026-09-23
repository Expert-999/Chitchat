import React from 'react';
import { CHITCHAT_LOGO_URL } from '../data/mockData';
import { UserProfile } from '../types';

interface WorkspaceHeaderProps {
  activeTab: 'chats' | 'directory' | 'meetings';
  onTabChange: (tab: 'chats' | 'directory' | 'meetings') => void;
  currentUser: UserProfile;
  onOpenNewChat: () => void;
  onOpenSettings: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  onOpenNewChat,
  onOpenSettings,
}) => {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface/90 backdrop-blur-xl z-40 border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-colors duration-200">
      <div className="h-16 w-full px-6 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <img
            alt="ChitChat Brand Logo"
            className="h-7 w-auto object-contain"
            src={CHITCHAT_LOGO_URL}
          />
          <span className="font-headline-md text-lg text-on-surface font-bold tracking-tight">
            Workspace
          </span>
        </div>

        {/* Center: Top Navigation Tabs (Chats, Directory, Meetings) */}
        <nav className="flex items-center gap-2 bg-surface-container/60 p-1 rounded-full border border-outline-variant/20">
          <button
            type="button"
            onClick={() => onTabChange('chats')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'chats'
                ? 'bg-surface-container-highest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Chats
          </button>
          <button
            type="button"
            onClick={() => onTabChange('directory')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'directory'
                ? 'bg-surface-container-highest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Directory
          </button>
          <button
            type="button"
            onClick={() => onTabChange('meetings')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'meetings'
                ? 'bg-surface-container-highest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Meetings
          </button>
        </nav>

        {/* Right: Quick Action & User Profile Avatar */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenNewChat}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-xs rounded-full transition-colors"
            title="Compose New Message"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>New Chat</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40 group"
            title="Open Settings"
          >
            <img
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/50 group-hover:scale-105 transition-transform"
              src={currentUser.avatar}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tertiary rounded-full ring-2 ring-surface"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
