import React, { useState, useEffect } from 'react';
import { Conversation } from '../types';

interface CallModalProps {
  type: 'audio' | 'video';
  conversation: Conversation;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ type, conversation, onClose }) => {
  const [status, setStatus] = useState<'Ringing...' | 'Connected'>('Ringing...');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('Connected');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (status === 'Connected') {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col items-center">
        {/* Call View Area */}
        <div className="w-full relative h-72 sm:h-80 bg-slate-900 flex flex-col items-center justify-center text-white p-6">
          {type === 'video' && !isVideoOff ? (
            <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-slate-800">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-full h-full object-cover opacity-85 scale-105 filter blur-xs"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white/30 shadow-xl"
                />
                <h3 className="font-headline-md text-xl font-bold mt-3 text-white">
                  {conversation.name}
                </h3>
                <span className="text-xs text-white/80 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{status === 'Connected' ? formatTime(seconds) : status}</span>
                </span>
              </div>

              {/* Picture in picture self camera */}
              <div className="absolute top-3 right-3 w-24 h-32 rounded-xl bg-slate-700 ring-2 ring-white/20 overflow-hidden shadow-lg flex flex-col items-center justify-center text-white/70">
                <span className="material-symbols-outlined text-2xl">person</span>
                <span className="text-[10px] mt-1 font-semibold">You</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-primary shadow-2xl"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-tertiary ring-4 ring-slate-900"></span>
              </div>
              <h3 className="font-headline-md text-xl font-bold mt-4 text-white">
                {conversation.name}
              </h3>
              <p className="text-xs text-white/70 mt-1">
                {type === 'audio' ? 'ChitChat HD Audio Call' : 'Video call (Camera off)'}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{status === 'Connected' ? formatTime(seconds) : status}</span>
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="w-full p-6 bg-surface-container-low flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${
              isMuted
                ? 'bg-error text-on-error'
                : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
            }`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            <span className="material-symbols-outlined text-xl">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          {type === 'video' && (
            <button
              type="button"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                isVideoOff
                  ? 'bg-error text-on-error'
                  : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
              }`}
              title={isVideoOff ? 'Turn video on' : 'Turn video off'}
            >
              <span className="material-symbols-outlined text-xl">
                {isVideoOff ? 'videocam_off' : 'videocam'}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-sm ${
              isScreenSharing
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
            }`}
            title="Screen share"
          >
            <span className="material-symbols-outlined text-xl">screen_share</span>
          </button>

          {/* End Call Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-error text-on-error flex items-center justify-center hover:bg-red-700 transition-transform active:scale-95 shadow-lg ml-2"
            title="End Call"
          >
            <span className="material-symbols-outlined text-2xl">call_end</span>
          </button>
        </div>
      </div>
    </div>
  );
};
