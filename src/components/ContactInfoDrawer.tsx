import React, { useState } from 'react';
import { Conversation, SharedMediaItem, SharedFileItem, CommonGroupItem } from '../types';

interface ContactInfoDrawerProps {
  conversation: Conversation;
  isOpen: boolean;
  onClose: () => void;
  sharedMedia: SharedMediaItem[];
  sharedFiles: SharedFileItem[];
  commonGroups: CommonGroupItem[];
  onStartCall: (type: 'audio' | 'video') => void;
  onImageClick: (url: string, title: string) => void;
  onToast: (msg: string) => void;
}

export const ContactInfoDrawer: React.FC<ContactInfoDrawerProps> = ({
  conversation,
  isOpen,
  onClose,
  sharedMedia,
  sharedFiles,
  commonGroups,
  onStartCall,
  onImageClick,
  onToast,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [filesExpanded, setFilesExpanded] = useState(true);

  if (!isOpen) return null;

  return (
    <aside className="w-80 xl:w-88 flex-shrink-0 bg-surface-container-lowest border-l border-outline-variant/30 overflow-y-auto flex flex-col shadow-[-4px_0_24px_rgba(19,27,46,0.03)] z-20 transition-all duration-300 h-full">
      {/* Panel Header with Close Button */}
      <div className="p-4 flex items-center justify-between border-b border-outline-variant/20">
        <span className="font-title-md text-base font-bold text-on-surface">
          Contact Info
        </span>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          title="Close panel"
          type="button"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      {/* User Identity Card */}
      <div className="p-5 flex flex-col items-center text-center border-b border-outline-variant/20">
        <div className="relative mb-3">
          {conversation.isGroup ? (
            <div className="w-24 h-24 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center text-3xl font-bold shadow-md">
              <span className="material-symbols-outlined text-4xl">hub</span>
            </div>
          ) : (
            <img
              className="w-24 h-24 rounded-full object-cover shadow-md ring-2 ring-primary/20"
              src={
                conversation.id === 'conv-alex'
                  ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn-uiqTMmBU9QnGTngq9I1xMfHILwWGUc8-zQTIiOnCisNFQRXU47cCpVcWu_3K7FkkxSlaZW7UqBNdE6ibM-eeKgQyausHgSEZzHYew_l1c2T22-mJTp7N29hcPp_jY4r76FfjtH6bWAoKuy9HDou1IJaJ5f_xI8tZF4KIJggWCOZRvTRNRE7prFkHviuBEz6b5QKwRdeHoyOTzlYoz-injI5_4MFeOVriCAfui4nyv28Yyjy8zHGIw'
                  : conversation.avatar
              }
              alt={conversation.name}
            />
          )}
          <span
            className={`absolute bottom-1 right-1 w-4 h-4 rounded-full ring-2 ring-surface-container-lowest ${
              conversation.isOnline ? 'bg-tertiary' : 'bg-outline'
            }`}
          ></span>
        </div>

        <h3 className="font-headline-md text-xl font-bold text-on-surface leading-tight">
          {conversation.name}
        </h3>
        <p className="font-label-md text-xs text-primary font-semibold mt-0.5">
          {conversation.handle}
        </p>
        <span className="mt-2 px-3 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
          {conversation.role}
        </span>
        <p className="text-xs text-on-surface-variant mt-2.5 max-w-xs leading-relaxed">
          {conversation.bio}
        </p>

        {/* Quick Interaction Icon Dock */}
        <div className="grid grid-cols-4 gap-2 w-full mt-5">
          <button
            onClick={() => onStartCall('audio')}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-primary text-xl">call</span>
            <span className="text-[11px] font-semibold">Audio</span>
          </button>
          <button
            onClick={() => onStartCall('video')}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-primary text-xl">videocam</span>
            <span className="text-[11px] font-semibold">Video</span>
          </button>
          <button
            onClick={() => {
              const term = prompt(`Search inside chat with ${conversation.name}:`);
              if (term) onToast(`Search results for "${term}"`);
            }}
            className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface"
            type="button"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-xl">search</span>
            <span className="text-[11px] font-semibold">Search</span>
          </button>
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              onToast(isMuted ? 'Unmuted conversation' : 'Conversation muted');
            }}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors text-on-surface ${
              isMuted ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200' : 'bg-surface-container hover:bg-surface-container-high'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-xl">
              {isMuted ? 'notifications_active' : 'notifications_off'}
            </span>
            <span className="text-[11px] font-semibold">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="p-3.5 space-y-3 pb-8">
        {/* Accordion 1: Shared Media */}
        <div className="bg-surface-container-low rounded-2xl p-3 border border-outline-variant/20">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">photo_library</span>
              <span className="font-title-md text-xs font-bold text-on-surface">Shared Media</span>
            </div>
            <button
              onClick={() => onToast('Viewing all 42 media items in archive')}
              className="text-[11px] text-primary font-bold hover:underline"
            >
              See All (42)
            </button>
          </div>

          {/* 4 Item Grid */}
          <div className="grid grid-cols-2 gap-2">
            {sharedMedia.map((media) => (
              <div
                key={media.id}
                onClick={() => onImageClick(media.url, media.title)}
                className="relative rounded-xl overflow-hidden h-20 group cursor-pointer bg-surface-container-high border border-outline-variant/30"
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src={media.url}
                  alt={media.title}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Accordion 2: Shared Files */}
        <div className="bg-surface-container-low rounded-2xl p-3 border border-outline-variant/20">
          <div
            onClick={() => setFilesExpanded(!filesExpanded)}
            className="flex items-center justify-between mb-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">folder</span>
              <span className="font-title-md text-xs font-bold text-on-surface">Shared Files</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-base">
              {filesExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </div>

          {filesExpanded && (
            <div className="space-y-2">
              {sharedFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => onToast(`Downloading ${file.name}...`)}
                  className="flex items-center justify-between p-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/20"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[10px] ${
                        file.type === 'pdf'
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-primary-fixed text-on-primary-fixed-variant'
                      }`}
                    >
                      {file.type.toUpperCase()}
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-xs font-semibold text-on-surface truncate">
                        {file.name}
                      </span>
                      <span className="text-[10px] text-outline">
                        {file.size} • {file.date}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline text-lg hover:text-primary">
                    download
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accordion 3: Common Groups */}
        <div className="bg-surface-container-low rounded-2xl p-3 border border-outline-variant/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">groups</span>
              <span className="font-title-md text-xs font-bold text-on-surface">Common Groups</span>
            </div>
            <span className="text-[11px] text-outline font-semibold">
              {commonGroups.length}
            </span>
          </div>

          <div className="space-y-1.5">
            {commonGroups.map((group) => (
              <div
                key={group.id}
                onClick={() => onToast(`Switching to group ${group.name}`)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] ${group.colorClass}`}
                >
                  {group.initials}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-on-surface">{group.name}</span>
                  <span className="text-[10px] text-outline">{group.membersCount} members</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Actions Zone */}
        <div className="p-2 space-y-2 border-t border-outline-variant/20 pt-3">
          <div className="flex items-center justify-between py-1">
            <span className="text-xs text-on-surface font-medium">Mute notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isMuted}
                onChange={(e) => {
                  setIsMuted(e.target.checked);
                  onToast(e.target.checked ? 'Notifications muted' : 'Notifications unmuted');
                }}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <button
            type="button"
            onClick={() => onToast(`Blocked ${conversation.name}`)}
            className="w-full text-left py-2 px-2.5 rounded-xl text-error hover:bg-error-container/30 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">block</span>
            <span>Block {conversation.name}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm(`Delete conversation with ${conversation.name}?`)) {
                onToast(`Conversation with ${conversation.name} cleared`);
              }
            }}
            className="w-full text-left py-2 px-2.5 rounded-xl text-error hover:bg-error-container/30 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-base">delete</span>
            <span>Delete Conversation</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
