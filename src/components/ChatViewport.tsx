import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Message, UserProfile } from '../types';

interface ChatViewportProps {
  activeConversation: Conversation;
  messages: Message[];
  onSendMessage: (text: string, media?: any) => void;
  onAddReaction: (messageId: string, emoji: string) => void;
  onStartCall: (type: 'audio' | 'video') => void;
  onToggleInfoPanel: () => void;
  isInfoPanelOpen: boolean;
  currentUser: UserProfile;
  enterKeySends: boolean;
  onImageClick: (url: string, title: string) => void;
}

const EMOJI_LIST = ['❤️', '👍', '🔥', '🚀', '😂', '🎉', '👏', '✨', '💡', '😍', '🙌', '💯'];

export const ChatViewport: React.FC<ChatViewportProps> = ({
  activeConversation,
  messages,
  onSendMessage,
  onAddReaction,
  onStartCall,
  onToggleInfoPanel,
  isInfoPanelOpen,
  enterKeySends,
  onImageClick,
}) => {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversation.isTyping]);

  // Voice recording timer
  useEffect(() => {
    let interval: any;
    if (isRecordingAudio) {
      interval = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingAudio]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (enterKeySends) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    } else {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSend();
      }
    }
  };

  const handleSendVoiceNote = () => {
    setIsRecordingAudio(false);
    onSendMessage('Audio message (0:' + (recordSeconds < 10 ? '0' + recordSeconds : recordSeconds) + ')', {
      type: 'audio',
      url: '',
      name: 'VoiceNote_' + Date.now() + '.aac',
      size: '340 KB',
      duration: '0:' + (recordSeconds < 10 ? '0' + recordSeconds : recordSeconds),
    });
  };

  return (
    <section className="flex-1 flex flex-col min-w-0 bg-surface relative h-full overflow-hidden">
      {/* Ambient Backlight Gradient Decor */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-fixed/20 dark:bg-primary-fixed/5 rounded-full blur-3xl pointer-events-none -z-0"></div>

      {/* Active Thread Header */}
      <header className="h-16 flex-shrink-0 px-6 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.03)] z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            {activeConversation.isGroup ? (
              <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center font-bold shadow-xs">
                <span className="material-symbols-outlined text-lg">hub</span>
              </div>
            ) : (
              <img
                className="w-10 h-10 rounded-full object-cover shadow-xs"
                src={activeConversation.avatar}
                alt={activeConversation.name}
              />
            )}
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-surface-container-lowest ${
                activeConversation.isOnline ? 'bg-tertiary' : 'bg-outline'
              }`}
            ></span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="font-headline-md text-base font-bold text-on-surface truncate">
                {activeConversation.name}
              </h2>
              {activeConversation.isVerified && (
                <span
                  className="material-symbols-outlined text-primary text-base"
                  title="Verified Colleague"
                >
                  verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {activeConversation.isOnline ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                  <span className="text-[11px] text-primary font-medium">
                    Online {activeConversation.isTyping && '• Typing...'}
                  </span>
                </>
              ) : (
                <span className="text-[11px] text-on-surface-variant font-normal">
                  {activeConversation.lastSeen ? `Last seen ${activeConversation.lastSeen}` : 'Offline'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Thread Actions */}
        <div className="flex items-center gap-1 text-on-surface-variant">
          <button
            onClick={() => {
              const term = prompt('Search in conversation:');
              if (term) alert(`Found matches for "${term}" in conversation`);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container hover:text-on-surface transition-colors"
            title="Search in conversation"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <button
            onClick={() => onStartCall('audio')}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container hover:text-on-surface transition-colors"
            title="Audio Call"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">call</span>
          </button>
          <button
            onClick={() => onStartCall('video')}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-container hover:text-on-surface transition-colors"
            title="Video Meeting"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">videocam</span>
          </button>
          <div className="w-px h-5 bg-outline-variant/40 mx-1"></div>
          <button
            onClick={onToggleInfoPanel}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isInfoPanelOpen
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary'
            }`}
            title="Toggle User Profile Drawer"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">info</span>
          </button>
        </div>
      </header>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 z-0">
        {/* Date Divider */}
        <div className="flex items-center justify-center my-3">
          <div className="px-4 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold shadow-xs">
            Today, October 26
          </div>
        </div>

        {/* Message Items */}
        {messages.map((msg) => {
          const isMe = msg.isMine;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 w-full ${
                isMe ? 'justify-end' : 'justify-start max-w-xl'
              }`}
            >
              {/* Receiver avatar */}
              {!isMe && (
                <img
                  className="w-8 h-8 rounded-full object-cover mb-1 flex-shrink-0"
                  src={msg.senderAvatar || activeConversation.avatar}
                  alt={msg.senderName}
                />
              )}

              <div className={`flex flex-col gap-1 ${isMe ? 'items-end max-w-xl' : 'items-start w-full'}`}>
                {/* Group sender name tag */}
                {!isMe && activeConversation.isGroup && (
                  <span className="text-[11px] font-bold text-primary ml-1">
                    {msg.senderName}
                  </span>
                )}

                {/* Bubble Container */}
                <div
                  className={`p-3.5 shadow-sm text-sm leading-relaxed transition-all ${
                    isMe
                      ? 'rounded-[20px_20px_4px_20px] bg-primary text-on-primary'
                      : 'rounded-[20px_20px_20px_4px] bg-surface-container-lowest text-on-surface border border-outline-variant/20'
                  }`}
                >
                  {/* Text Content */}
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Media Attachment (Image preview) */}
                  {msg.media?.type === 'image' && (
                    <div
                      onClick={() => onImageClick(msg.media!.url, msg.media!.name)}
                      className="mt-2.5 relative rounded-2xl overflow-hidden group cursor-pointer bg-surface-container-high border border-outline-variant/30"
                    >
                      <img
                        className="w-full max-h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        src={msg.media.url}
                        alt={msg.media.name}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                        <span className="text-white text-xs font-semibold flex items-center gap-1.5 drop-shadow-sm">
                          <span className="material-symbols-outlined text-base">image</span>
                          {msg.media.name} ({msg.media.size})
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Audio Attachment Player */}
                  {msg.media?.type === 'audio' && (
                    <div className="mt-2.5 flex items-center gap-3 p-2 bg-surface-container/60 rounded-xl border border-outline-variant/30">
                      <button
                        type="button"
                        onClick={() =>
                          setPlayingAudioId(playingAudioId === msg.id ? null : msg.id)
                        }
                        className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
                      >
                        <span className="material-symbols-outlined text-base">
                          {playingAudioId === msg.id ? 'pause' : 'play_arrow'}
                        </span>
                      </button>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          {/* Animated sound wave bars */}
                          {[16, 24, 12, 28, 20, 10, 26, 18, 14, 22].map((height, i) => (
                            <div
                              key={i}
                              style={{ height: `${playingAudioId === msg.id ? Math.max(6, (height + (i * 3)) % 28) : height}px` }}
                              className={`w-1 rounded-full transition-all duration-150 ${
                                playingAudioId === msg.id ? 'bg-primary animate-pulse' : 'bg-outline-variant'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <span className="text-[10px] text-outline font-semibold">
                          {playingAudioId === msg.id ? 'Playing audio preview' : msg.media.duration || '0:42'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timestamp & Status & Reactions */}
                <div className="flex items-center gap-1.5 px-1">
                  <span className="text-[11px] text-outline">{msg.timestamp}</span>

                  {/* Delivery Status Indicator */}
                  {isMe && (
                    <span
                      className="material-symbols-outlined text-primary text-base"
                      title={msg.status}
                    >
                      {msg.status === 'read' ? 'done_all' : 'done'}
                    </span>
                  )}

                  {/* Message Reactions */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex items-center gap-1 ml-1">
                      {msg.reactions.map((r, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded-full bg-surface-container text-xs font-semibold flex items-center gap-1 border border-outline-variant/30 cursor-pointer hover:scale-110 transition-transform"
                          title={r.users.join(', ')}
                        >
                          <span>{r.emoji}</span>
                          {r.count > 1 && <span className="text-[10px]">{r.count}</span>}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator Bubble (Alex Morgan) */}
        {activeConversation.isTyping && (
          <div className="flex items-end gap-2.5 max-w-xs animate-in fade-in duration-300">
            <img
              className="w-8 h-8 rounded-full object-cover mb-1 flex-shrink-0"
              src={activeConversation.avatar}
              alt={activeConversation.name}
            />
            <div className="px-4 py-3 rounded-[20px_20px_20px_4px] bg-surface-container-lowest text-on-surface shadow-xs border border-outline-variant/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reaction Dock & Floating Composer Bar */}
      <div className="p-4 pt-0 z-10 flex flex-col gap-1.5">
        {/* Reaction Bar Floating Overlay */}
        <div className="flex items-center justify-start gap-1 px-3">
          <span className="text-[11px] text-outline font-semibold mr-1">Quick reacts:</span>
          {['❤️', '👍', '🔥', '🚀', '😂'].map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                const latest = messages[messages.length - 1];
                if (latest) onAddReaction(latest.id, emoji);
              }}
              className="px-2 py-0.5 bg-surface-container-lowest hover:bg-surface-container rounded-full text-sm shadow-xs border border-outline-variant/20 hover:scale-125 active:scale-95 transition-transform"
              title={`React with ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Pill Composer Container */}
        <div className="relative bg-surface-container-lowest/95 backdrop-blur-xl rounded-full p-1.5 shadow-[0_8px_30px_rgba(19,27,46,0.08)] border border-outline-variant/30 flex items-center gap-1.5">
          {/* Attachment Button */}
          <button
            onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/*,.pdf,.doc,.docx';
              fileInput.onchange = (e: any) => {
                const file = e.target?.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  onSendMessage(`Shared file: ${file.name}`, {
                    type: file.type.startsWith('image/') ? 'image' : 'file',
                    url: file.type.startsWith('image/') ? url : '',
                    name: file.name,
                    size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                  });
                }
              };
              fileInput.click();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors flex-shrink-0"
            title="Attach file or photo"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">attach_file</span>
          </button>

          {/* Emoji Picker Trigger */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
              showEmojiPicker
                ? 'bg-primary-fixed text-primary'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
            }`}
            title="Add emoji"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">sentiment_satisfied</span>
          </button>

          {/* Floating Emoji Picker Drawer */}
          {showEmojiPicker && (
            <div className="absolute bottom-full left-4 mb-3 p-3 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 z-50 flex flex-wrap gap-2 w-64 animate-in fade-in zoom-in-95">
              {EMOJI_LIST.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    setInputText((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                    inputRef.current?.focus();
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded-lg text-lg hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Audio Recording Status Indicator or Input Box */}
          {isRecordingAudio ? (
            <div className="flex-1 flex items-center justify-between px-3 py-1.5 bg-error-container/40 rounded-full">
              <div className="flex items-center gap-2 text-error font-semibold text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                <span>Recording voice note... 0:{recordSeconds < 10 ? '0' + recordSeconds : recordSeconds}</span>
              </div>
              <button
                type="button"
                onClick={handleSendVoiceNote}
                className="px-3 py-1 bg-error text-on-error rounded-full text-xs font-bold hover:scale-105 transition-transform"
              >
                Send Voice
              </button>
            </div>
          ) : (
            <input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none"
              placeholder={`Write a message to ${activeConversation.name}... (Enter to send)`}
              type="text"
            />
          )}

          {/* Microphone voice recording button */}
          <button
            onClick={() => setIsRecordingAudio(!isRecordingAudio)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
              isRecordingAudio
                ? 'bg-error text-on-error animate-pulse'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
            }`}
            title={isRecordingAudio ? 'Cancel voice recording' : 'Record voice message'}
            type="button"
          >
            <span className="material-symbols-outlined text-xl">
              {isRecordingAudio ? 'mic_off' : 'mic'}
            </span>
          </button>

          {/* Send Action Button */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim() && !isRecordingAudio}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 shadow-md ${
              inputText.trim()
                ? 'bg-gradient-to-r from-primary to-secondary text-on-primary hover:shadow-lg hover:scale-105 active:scale-95'
                : 'bg-surface-container-highest text-outline cursor-not-allowed'
            }`}
            title="Send Message"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </div>
    </section>
  );
};
