import React, { useState } from 'react';
import { Conversation, UserProfile } from '../types';

interface ConversationsListProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  currentUser: UserProfile;
  onOpenCompose: () => void;
  onOpenSettings: () => void;
  activeFilter: 'all' | 'unread' | 'groups' | 'direct';
  onFilterChange: (filter: 'all' | 'unread' | 'groups' | 'direct') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  currentUser,
  onOpenCompose,
  onOpenSettings,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [userStatus, setUserStatus] = useState<'Available' | 'Busy' | 'Away'>('Available');

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchLastMsg = c.lastMessage.toLowerCase().includes(q);
      const matchHandle = c.handle.toLowerCase().includes(q);
      if (!matchName && !matchLastMsg && !matchHandle) return false;
    }

    // Filter pill match
    if (activeFilter === 'unread') return c.unreadCount > 0;
    if (activeFilter === 'groups') return c.isGroup;
    if (activeFilter === 'direct') return !c.isGroup;
    return true;
  });

  const unreadCount = conversations.filter((c) => c.unreadCount > 0).length;
  const groupsCount = conversations.filter((c) => c.isGroup).length;
  const directCount = conversations.filter((c) => !c.isGroup).length;

  return (
    <aside className="w-80 xl:w-96 flex-shrink-0 flex flex-col bg-surface-container-lowest border-r border-outline-variant/30 shadow-[4px_0_24px_rgba(19,27,46,0.03)] z-20 h-full">
      {/* List Topbar & Search */}
      <div className="p-4 flex flex-col gap-3 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline-lg text-xl text-on-surface font-bold tracking-tight">
              Messages
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-xs font-semibold">
              {conversations.length} total
            </span>
          </div>
          <button
            onClick={onOpenCompose}
            className="group flex items-center justify-center w-9 h-9 rounded-full bg-primary text-on-primary shadow-md hover:bg-secondary active:scale-95 transition-all"
            title="Compose New Chat"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">edit_square</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2 text-xs font-medium bg-surface-container rounded-full text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-highest transition-all"
            placeholder="Search messages, people..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            All ({conversations.length})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('unread')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeFilter === 'unread'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span>Unread</span>
            <span className="w-4 h-4 rounded-full bg-secondary text-on-secondary text-[10px] flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('groups')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'groups'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            Groups ({groupsCount})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange('direct')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === 'direct'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            Direct ({directCount})
          </button>
        </div>
      </div>

      {/* Scrollable Conversation Feed */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-3xl mb-2 text-outline">search_off</span>
            <p className="text-xs font-medium">No matching conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`group relative flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all ${
                  isActive
                    ? 'bg-primary-fixed/40 dark:bg-primary-fixed/20 text-on-surface shadow-xs'
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full"></div>
                )}

                {/* Avatar / Icon */}
                <div className="relative flex-shrink-0">
                  {conv.isGroup ? (
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-bold shadow-inner">
                      <span className="material-symbols-outlined text-xl">hub</span>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full ring-2 ring-surface-container-lowest"></span>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        className="w-12 h-12 rounded-full object-cover shadow-xs"
                        src={conv.avatar}
                        alt={conv.name}
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-surface-container-lowest ${
                          conv.isOnline ? 'bg-tertiary' : 'bg-outline'
                        }`}
                      ></span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span
                      className={`font-title-md text-sm truncate ${
                        isActive ? 'font-bold text-on-surface' : 'font-semibold text-on-surface'
                      }`}
                    >
                      {conv.name}
                    </span>
                    <span
                      className={`text-[11px] font-semibold flex-shrink-0 ${
                        isActive ? 'text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    {/* Message snippet or typing */}
                    {conv.isTyping ? (
                      <div className="flex items-center gap-1 text-primary text-xs font-semibold truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        <span className="ml-1">typing...</span>
                      </div>
                    ) : (
                      <p
                        className={`text-xs truncate ${
                          conv.unreadCount > 0
                            ? 'text-on-surface font-semibold'
                            : 'text-on-surface-variant font-normal'
                        }`}
                      >
                        {conv.lastMessage}
                      </p>
                    )}

                    {/* Unread badge or checkmark */}
                    {conv.unreadCount > 0 ? (
                      <span className="px-1.5 py-0.5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold flex-shrink-0 shadow-xs">
                        {conv.unreadCount}
                      </span>
                    ) : isActive ? (
                      <span
                        className="material-symbols-outlined text-primary text-base flex-shrink-0"
                        title="Read"
                      >
                        done_all
                      </span>
                    ) : (
                      <span
                        className="material-symbols-outlined text-outline text-base flex-shrink-0"
                        title="Delivered"
                      >
                        done
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* User Profile Snippet / Bottom Drawer */}
      <div className="p-3 m-2 bg-surface-container rounded-2xl flex items-center justify-between shadow-xs border border-outline-variant/20 relative">
        <div
          className="flex items-center gap-2.5 min-w-0 cursor-pointer"
          onClick={() => setStatusMenuOpen(!statusMenuOpen)}
        >
          <div className="relative flex-shrink-0">
            <img
              className="w-9 h-9 rounded-full object-cover ring-1 ring-outline-variant/50"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-surface-container ${
                userStatus === 'Available'
                  ? 'bg-tertiary'
                  : userStatus === 'Busy'
                  ? 'bg-error'
                  : 'bg-amber-500'
              }`}
            ></span>
          </div>
          <div className="flex flex-col min-w-0 text-left">
            <span className="font-title-md text-xs text-on-surface font-bold truncate">
              {currentUser.name}
            </span>
            <div className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  userStatus === 'Available'
                    ? 'bg-tertiary animate-pulse'
                    : userStatus === 'Busy'
                    ? 'bg-error'
                    : 'bg-amber-500'
                }`}
              ></span>
              <span
                className={`text-[11px] font-semibold ${
                  userStatus === 'Available'
                    ? 'text-tertiary'
                    : userStatus === 'Busy'
                    ? 'text-error'
                    : 'text-amber-600'
                }`}
              >
                {userStatus}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors"
          title="Status & Preferences"
          type="button"
        >
          <span className="material-symbols-outlined text-lg">tune</span>
        </button>

        {/* Status Quick Popover */}
        {statusMenuOpen && (
          <div className="absolute bottom-full left-0 mb-2 w-48 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 p-1.5 z-50 animate-in fade-in zoom-in-95">
            <div className="px-2 py-1 text-[11px] font-semibold text-outline uppercase tracking-wider">
              Set Status
            </div>
            <button
              onClick={() => {
                setUserStatus('Available');
                setStatusMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-surface-container text-xs font-medium text-on-surface text-left"
            >
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>Available</span>
            </button>
            <button
              onClick={() => {
                setUserStatus('Busy');
                setStatusMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-surface-container text-xs font-medium text-on-surface text-left"
            >
              <span className="w-2 h-2 rounded-full bg-error"></span>
              <span>Busy / In a meeting</span>
            </button>
            <button
              onClick={() => {
                setUserStatus('Away');
                setStatusMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-surface-container text-xs font-medium text-on-surface text-left"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Away</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
