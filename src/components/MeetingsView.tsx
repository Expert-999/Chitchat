import React from 'react';
import { Conversation } from '../types';

interface MeetingsViewProps {
  conversations: Conversation[];
  onJoinMeeting: (meetingName: string, conv: Conversation) => void;
}

export const MeetingsView: React.FC<MeetingsViewProps> = ({ conversations, onJoinMeeting }) => {
  const alexConv = conversations.find((c) => c.id === 'conv-alex') || conversations[0];
  const squadConv = conversations.find((c) => c.id === 'conv-eng-squad') || conversations[0];

  const meetings = [
    {
      id: 'meet-1',
      title: 'Design Systems Q4 Architecture Sync',
      time: '11:00 AM – 11:45 AM (In 15 mins)',
      channel: '#design-tokens',
      participants: ['Alex Morgan', 'Sarah Chen', 'You'],
      isLive: true,
      conv: alexConv,
    },
    {
      id: 'meet-2',
      title: 'Engineering Sprint Review & Release Prep',
      time: '02:00 PM – 02:45 PM',
      channel: '#eng-core',
      participants: ['David', 'Liam Vance', 'Elena', 'You'],
      isLive: false,
      conv: squadConv,
    },
    {
      id: 'meet-3',
      title: '1:1 Product Design & Token Alignment',
      time: '04:30 PM – 05:00 PM',
      channel: 'Direct Call',
      participants: ['Alex Morgan', 'You'],
      isLive: false,
      conv: alexConv,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline-lg text-2xl font-bold text-on-surface">
            Upcoming Video Syncs &amp; Huddles
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Real-time audio/video calls, screen-sharing rooms, and team huddles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onJoinMeeting('Instant Huddle', alexConv)}
          className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-on-primary text-xs font-bold rounded-full shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">video_call</span>
          <span>Start Instant Huddle</span>
        </button>
      </div>

      <div className="space-y-4">
        {meetings.map((meet) => (
          <div
            key={meet.id}
            className={`p-5 rounded-2xl bg-surface-container-lowest border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
              meet.isLive ? 'border-primary/50 ring-1 ring-primary/20' : 'border-outline-variant/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  meet.isLive ? 'bg-primary text-on-primary animate-pulse' : 'bg-surface-container text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">videocam</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-title-md text-base font-bold text-on-surface">
                    {meet.title}
                  </h3>
                  {meet.isLive && (
                    <span className="px-2 py-0.5 rounded-full bg-error text-on-error text-[10px] font-bold tracking-wide">
                      STARTING SOON
                    </span>
                  )}
                </div>
                <span className="text-xs text-primary font-semibold mt-0.5">
                  {meet.time} · {meet.channel}
                </span>
                <span className="text-[11px] text-on-surface-variant mt-1">
                  Attendees: {meet.participants.join(', ')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onJoinMeeting(meet.title, meet.conv)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 self-start md:self-auto ${
                meet.isLive
                  ? 'bg-primary text-on-primary hover:bg-secondary'
                  : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">videocam</span>
              <span>{meet.isLive ? 'Join Room Now' : 'Enter Meeting'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
