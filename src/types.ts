export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  status: 'available' | 'busy' | 'away' | 'offline';
  isVerified?: boolean;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface MediaAttachment {
  type: 'image' | 'file' | 'audio';
  url: string;
  name: string;
  size: string;
  duration?: string;
  fileType?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isMine: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  media?: MediaAttachment;
  reactions: Reaction[];
}

export interface Conversation {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: string;
  bio: string;
  isOnline: boolean;
  isTyping?: boolean;
  lastSeen?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isGroup: boolean;
  memberCount?: number;
  members?: string[];
  isVerified?: boolean;
  isPinned?: boolean;
  type: 'direct' | 'group';
}

export interface SharedMediaItem {
  id: string;
  url: string;
  title: string;
  date: string;
}

export interface SharedFileItem {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'pdf' | 'doc' | 'zip';
  url?: string;
}

export interface CommonGroupItem {
  id: string;
  initials: string;
  name: string;
  membersCount: number;
  colorClass: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  accent: 'indigo' | 'emerald' | 'violet' | 'cyan';
  textSize: number;
  enterKeySends: boolean;
  notifications: {
    messages: boolean;
    sounds: boolean;
    desktopPush: boolean;
    previewSnippet: boolean;
    quietHours: boolean;
  };
  mediaAutoDownload: {
    photos: boolean;
    videos: boolean;
    docs: boolean;
  };
  twoFactorEnabled: boolean;
  displayName: string;
  username: string;
  bio: string;
  email: string;
}
