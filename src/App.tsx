/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES_MAP,
  SHARED_MEDIA_ITEMS,
  SHARED_FILES_ITEMS,
  COMMON_GROUPS_ITEMS,
  CURRENT_USER,
  INITIAL_SETTINGS,
} from './data/mockData';
import { Conversation, Message, AppSettings, UserProfile } from './types';
import { NavigationSidebar } from './components/NavigationSidebar';
import { WorkspaceHeader } from './components/WorkspaceHeader';
import { ConversationsList } from './components/ConversationsList';
import { ChatViewport } from './components/ChatViewport';
import { ContactInfoDrawer } from './components/ContactInfoDrawer';
import { SettingsView } from './components/SettingsView';
import { AuthScreen } from './components/AuthScreen';
import { CallModal } from './components/CallModal';
import { DirectoryView } from './components/DirectoryView';
import { MeetingsView } from './components/MeetingsView';
import { ImageModal } from './components/ImageModal';
import { ComposeModal } from './components/ComposeModal';

export default function App() {
  const [activeView, setActiveView] = useState<
    'chats' | 'unread' | 'contacts' | 'calls' | 'settings' | 'auth'
  >('chats');
  const [activeTab, setActiveTab] = useState<'chats' | 'directory' | 'meetings'>('chats');
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-alex');
  const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(INITIAL_MESSAGES_MAP);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState<boolean>(true);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'groups' | 'direct'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Overlays
  const [callModal, setCallModal] = useState<{
    type: 'audio' | 'video';
    conv: Conversation;
  } | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class with root
  useEffect(() => {
    if (isDarkMode || settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, settings.theme]);

  // Sync accent color with html data-accent
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', settings.accent);
  }, [settings.accent]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Active conversation object
  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const activeMessages = messagesMap[activeConversationId] || [];

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    setSettings((prev) => ({ ...prev, theme: next ? 'dark' : 'light' }));
    showToast(next ? 'Switched to Dark Mode' : 'Switched to Light Mode');
  };

  // Send message in current thread
  const handleSendMessage = (text: string, media?: any) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: timeString,
      isMine: true,
      status: 'sent',
      media,
      reactions: [],
    };

    setMessagesMap((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMsg],
    }));

    // Update conversation snippet in sidebar
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: timeString,
            }
          : c
      )
    );

    // Simulate smart interactive reply after 1.8s
    if (activeConversationId === 'conv-alex') {
      // Set typing indicator
      setTimeout(() => {
        setConversations((prev) =>
          prev.map((c) => (c.id === 'conv-alex' ? { ...c, isTyping: true } : c))
        );
      }, 700);

      setTimeout(() => {
        setConversations((prev) =>
          prev.map((c) => (c.id === 'conv-alex' ? { ...c, isTyping: false } : c))
        );

        const replies = [
          'Sounds fantastic! Just tested the responsive breakpoint on desktop & mobile, looks crisp!',
          'Awesome! Let me export the updated design tokens so you can test the indigo color palette.',
          'Got it! Looking forward to testing this in our team sync today.',
          'Love the attention to detail! The spacing and contrast in the user profile drawer look perfect.',
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const replyMsg: Message = {
          id: `reply-${Date.now()}`,
          conversationId: 'conv-alex',
          senderId: 'conv-alex',
          senderName: 'Alex Morgan',
          senderAvatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD1x7NGnPy6w_Drrhh5jSInpKvsJfz8r0CS-ezfrQSIcsLdR6iuFmhP598bfW4658Qzg11nP46ccJNFyQ6tfdtHO-swweHQtkQ0z4sd-g2a0yp1Xi_tdPbs2OaNslVuToLwYRAE7qFd977PWrKvSYG2Fl_smW87dK2mOvqZbTD57EOgW-6Dg8XrLp-qGtds2BlAhmBrNMC1xZS_UjANOkvI-IK7j_b6jBXrFpIyoHOuBovFBaxpDIqC2A',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMine: false,
          status: 'read',
          reactions: [{ emoji: '✨', count: 1, users: ['Alex Morgan'] }],
        };

        setMessagesMap((prev) => ({
          ...prev,
          'conv-alex': [...(prev['conv-alex'] || []), replyMsg],
        }));

        setConversations((prev) =>
          prev.map((c) =>
            c.id === 'conv-alex'
              ? {
                  ...c,
                  lastMessage: randomReply,
                  lastMessageTime: replyMsg.timestamp,
                }
              : c
          )
        );
      }, 2200);
    }
  };

  // Add emoji reaction
  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessagesMap((prev) => {
      const thread = prev[activeConversationId] || [];
      const updated = thread.map((m) => {
        if (m.id !== messageId) return m;
        const existingReaction = m.reactions.find((r) => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...m,
            reactions: m.reactions.map((r) =>
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            ),
          };
        }
        return {
          ...m,
          reactions: [...m.reactions, { emoji, count: 1, users: [currentUser.name] }],
        };
      });
      return { ...prev, [activeConversationId]: updated };
    });
    showToast(`Reacted with ${emoji}`);
  };

  // Create group
  const handleCreateGroup = (groupName: string, members: string[]) => {
    const newGroupId = `conv-group-${Date.now()}`;
    const newGroup: Conversation = {
      id: newGroupId,
      name: groupName,
      handle: `#${groupName.toLowerCase().replace(/\s+/g, '-')}`,
      avatar: '',
      role: 'Squad Channel',
      bio: `Dedicated channel for ${groupName} team collaboration.`,
      isOnline: true,
      isTyping: false,
      lastMessage: 'Squad channel created. Welcome everyone! 👋',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      isGroup: true,
      memberCount: members.length + 1,
      members: [...members, currentUser.name],
      type: 'group',
    };

    setConversations([newGroup, ...conversations]);
    setActiveConversationId(newGroupId);
    setMessagesMap((prev) => ({
      ...prev,
      [newGroupId]: [
        {
          id: `msg-${Date.now()}`,
          conversationId: newGroupId,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderAvatar: currentUser.avatar,
          text: `Welcome to the newly created ${groupName} channel!`,
          timestamp: 'Just now',
          isMine: true,
          status: 'sent',
          reactions: [{ emoji: '🎉', count: 1, users: [currentUser.name] }],
        },
      ],
    }));
    showToast(`Created channel ${groupName}`);
  };

  // Navigation handlers
  const handleSidebarNavigate = (
    view: 'chats' | 'unread' | 'contacts' | 'calls' | 'settings'
  ) => {
    if (view === 'unread') {
      setActiveView('chats');
      setActiveTab('chats');
      setActiveFilter('unread');
    } else if (view === 'contacts') {
      setActiveView('chats');
      setActiveTab('directory');
    } else if (view === 'calls') {
      setActiveView('chats');
      setActiveTab('meetings');
    } else {
      setActiveView(view);
      if (view === 'chats') {
        setActiveTab('chats');
        setActiveFilter('all');
      }
    }
  };

  const totalUnreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // If activeView is 'auth', show full screen AuthScreen
  if (activeView === 'auth') {
    return (
      <AuthScreen
        onSuccessLogin={(name, email) => {
          if (name) {
            setCurrentUser((prev) => ({
              ...prev,
              name,
              email: email || prev.email,
            }));
          }
          setActiveView('chats');
          showToast(`Signed in as ${name || 'User'}`);
        }}
        onCancel={() => setActiveView('chats')}
      />
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-surface text-on-surface flex flex-col font-body-md selection:bg-primary/20 selection:text-primary transition-colors duration-200 overflow-x-hidden">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-on-surface text-surface text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-base text-tertiary">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Left Sidebar */}
      <NavigationSidebar
        activeView={activeView}
        onNavigate={handleSidebarNavigate}
        currentUser={currentUser}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenAuth={() => setActiveView('auth')}
        unreadCountTotal={totalUnreadCount}
      />

      {/* Workspace Header Top Bar */}
      <WorkspaceHeader
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (activeView !== 'chats') setActiveView('chats');
        }}
        currentUser={currentUser}
        onOpenNewChat={() => setIsComposeOpen(true)}
        onOpenSettings={() => setActiveView('settings')}
      />

      {/* Main Workspace Frame (offset for 72px/288px sidebar and 64px header) */}
      <div className="pl-72 pt-16 flex-1 flex flex-col h-screen overflow-hidden">
        {activeView === 'settings' ? (
          /* ================= SCREEN 2: PREFERENCES & SETTINGS ================= */
          <div className="flex-1 overflow-y-auto">
            <SettingsView
              settings={settings}
              currentUser={currentUser}
              onUpdateSettings={(updated) => {
                setSettings((prev) => ({ ...prev, ...updated }));
                if (updated.displayName) {
                  setCurrentUser((prev) => ({
                    ...prev,
                    name: updated.displayName!,
                    email: updated.email || prev.email,
                  }));
                }
              }}
              onToast={showToast}
              onNavigateBack={() => setActiveView('chats')}
            />
          </div>
        ) : activeTab === 'directory' ? (
          /* ================= DIRECTORY / CONTACTS VIEW ================= */
          <DirectoryView
            conversations={conversations}
            onSelectUser={(id) => {
              setActiveConversationId(id);
              setActiveTab('chats');
              setActiveView('chats');
            }}
            onStartCall={(type, conv) => setCallModal({ type, conv })}
          />
        ) : activeTab === 'meetings' ? (
          /* ================= MEETINGS / CALLS VIEW ================= */
          <MeetingsView
            conversations={conversations}
            onJoinMeeting={(_title, conv) => setCallModal({ type: 'video', conv })}
          />
        ) : (
          /* ================= SCREEN 1: 3-COLUMN DESKTOP CHAT ================= */
          <div className="flex-1 flex h-full overflow-hidden">
            {/* Column 1: Conversations List & Search */}
            <ConversationsList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={(id) => {
                setActiveConversationId(id);
                // Clear unread count for that conversation
                setConversations((prev) =>
                  prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
                );
              }}
              currentUser={currentUser}
              onOpenCompose={() => setIsComposeOpen(true)}
              onOpenSettings={() => setActiveView('settings')}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Column 2: Active Chat Viewport & Message Stream */}
            <ChatViewport
              activeConversation={activeConversation}
              messages={activeMessages}
              onSendMessage={handleSendMessage}
              onAddReaction={handleAddReaction}
              onStartCall={(type) => setCallModal({ type, conv: activeConversation })}
              onToggleInfoPanel={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
              isInfoPanelOpen={isInfoPanelOpen}
              currentUser={currentUser}
              enterKeySends={settings.enterKeySends}
              onImageClick={(url, title) => setPreviewImage({ url, title })}
            />

            {/* Column 3: Contact Info & Shared Media Drawer */}
            <ContactInfoDrawer
              conversation={activeConversation}
              isOpen={isInfoPanelOpen}
              onClose={() => setIsInfoPanelOpen(false)}
              sharedMedia={SHARED_MEDIA_ITEMS}
              sharedFiles={SHARED_FILES_ITEMS}
              commonGroups={COMMON_GROUPS_ITEMS}
              onStartCall={(type) => setCallModal({ type, conv: activeConversation })}
              onImageClick={(url, title) => setPreviewImage({ url, title })}
              onToast={showToast}
            />
          </div>
        )}
      </div>

      {/* Video / Audio Calling Interactive Modal */}
      {callModal && (
        <CallModal
          type={callModal.type}
          conversation={callModal.conv}
          onClose={() => setCallModal(null)}
        />
      )}

      {/* Image Lightbox Preview Modal */}
      {previewImage && (
        <ImageModal
          url={previewImage.url}
          title={previewImage.title}
          onClose={() => setPreviewImage(null)}
        />
      )}

      {/* Compose New Chat / Group Modal */}
      {isComposeOpen && (
        <ComposeModal
          conversations={conversations}
          onClose={() => setIsComposeOpen(false)}
          onSelectRecipient={(convId) => {
            setActiveConversationId(convId);
            setActiveTab('chats');
            setActiveView('chats');
          }}
          onCreateGroup={handleCreateGroup}
        />
      )}
    </div>
  );
}
