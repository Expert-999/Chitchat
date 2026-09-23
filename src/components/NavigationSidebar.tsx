import React from 'react';
import { CHITCHAT_LOGO_URL } from '../data/mockData';
import { UserProfile } from '../types';

interface NavigationSidebarProps {
  activeView: 'chats' | 'unread' | 'contacts' | 'calls' | 'settings' | 'auth';
  onNavigate: (view: 'chats' | 'unread' | 'contacts' | 'calls' | 'settings') => void;
  currentUser: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAuth: () => void;
  unreadCountTotal: number;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  activeView,
  onNavigate,
  currentUser,
  isDarkMode,
  onToggleDarkMode,
  onOpenAuth,
  unreadCountTotal,
}) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between py-5 px-3.5 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/30 transition-colors duration-200">
      <div className="flex flex-col gap-5">
        {/* Brand Header */}
        <div
          className="flex items-center gap-2.5 px-2.5 cursor-pointer select-none"
          onClick={() => onNavigate('chats')}
        >
          <img
            alt="ChitChat Brand Logo"
            className="h-8 w-auto object-contain"
            src={CHITCHAT_LOGO_URL}
          />
          <span className="font-headline-md text-2xl text-primary font-bold tracking-tight">
            ChitChat
          </span>
        </div>

        {/* Primary Navigation Links */}
        <nav className="flex flex-col gap-1">
          {/* All Chats */}
          <button
            type="button"
            onClick={() => onNavigate('chats')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all text-left ${
              activeView === 'chats'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">chat</span>
              <span className="font-body-md text-sm font-medium">All Chats</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeView === 'chats'
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-surface-container-highest text-on-surface-variant'
              }`}
            >
              24
            </span>
          </button>

          {/* Unread */}
          <button
            type="button"
            onClick={() => onNavigate('unread')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all text-left ${
              activeView === 'unread'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">mark_chat_unread</span>
              <span className="font-body-md text-sm font-medium">Unread</span>
            </div>
            <span className="px-2 py-0.5 bg-primary text-on-primary rounded-full text-xs font-semibold">
              {unreadCountTotal > 0 ? unreadCountTotal : 5}
            </span>
          </button>

          {/* Contacts */}
          <button
            type="button"
            onClick={() => onNavigate('contacts')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-left ${
              activeView === 'contacts'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-xl">group</span>
            <span className="font-body-md text-sm font-medium">Contacts</span>
          </button>

          {/* Calls */}
          <button
            type="button"
            onClick={() => onNavigate('calls')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all text-left ${
              activeView === 'calls'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">call</span>
              <span className="font-body-md text-sm font-medium">Calls</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => onNavigate('settings')}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all text-left ${
              activeView === 'settings'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-xl">settings</span>
            <span className="font-body-md text-sm font-medium">Settings</span>
          </button>
        </nav>
      </div>

      {/* Bottom Footer Controls */}
      <div className="flex flex-col gap-3 pt-3 border-t border-outline-variant/30">
        {/* Theme Switcher */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-surface-container rounded-2xl">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-base">
              {isDarkMode ? 'dark_mode' : 'light_mode'}
            </span>
            <span className="text-xs font-medium">
              Theme ({isDarkMode ? 'Dark' : 'Light'})
            </span>
          </div>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-lowest text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:bg-surface-container-high transition-colors"
            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
          >
            <span className="material-symbols-outlined text-base">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>

        {/* User Profile Snippet */}
        <div
          onClick={() => onNavigate('settings')}
          className="flex items-center justify-between p-2 rounded-2xl hover:bg-surface-container-high transition-colors cursor-pointer group"
          title="Open Profile & Settings"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                src={currentUser.avatar}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tertiary rounded-full ring-2 ring-surface-container-low"></span>
            </div>
            <div className="flex flex-col text-left min-w-0">
              <span className="font-title-md text-sm font-bold text-on-surface leading-tight truncate">
                {currentUser.name}
              </span>
              <span className="text-xs text-on-surface-variant truncate">Active Now</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface text-lg">
            expand_more
          </span>
        </div>

        {/* Sign In / Sign Out Demo Trigger */}
        <button
          type="button"
          onClick={onOpenAuth}
          className="w-full text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1.5 py-1 px-2 rounded-xl hover:bg-surface-container"
        >
          <span className="material-symbols-outlined text-sm">lock_open</span>
          <span>View Sign-In / Demo Screen</span>
        </button>
      </div>
    </aside>
  );
};
