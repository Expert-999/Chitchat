import React, { useState } from 'react';
import { AppSettings, UserProfile } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  currentUser: UserProfile;
  onToast: (msg: string) => void;
  onNavigateBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onToast,
  onNavigateBack,
}) => {
  const [activeTab, setActiveTab] = useState<
    'account' | 'appearance' | 'notifications' | 'privacy' | 'chat-pref'
  >('account');

  // Form states initialized with settings
  const [displayName, setDisplayName] = useState(settings.displayName);
  const [username, setUsername] = useState(settings.username);
  const [bio, setBio] = useState(settings.bio);
  const [email, setEmail] = useState(settings.email);
  const [currentPassword, setCurrentPassword] = useState('••••••••••••••••');
  const [newPassword, setNewPassword] = useState('SwiftDesign#2024$Secure');
  const [confirmPassword, setConfirmPassword] = useState('SwiftDesign#2024$Secure');
  const [activeTheme, setActiveTheme] = useState(settings.theme);
  const [activeAccent, setActiveAccent] = useState(settings.accent);
  const [textSize, setTextSize] = useState(settings.textSize);
  const [enterKeySends, setEnterKeySends] = useState(settings.enterKeySends);
  const [notifications, setNotifications] = useState({ ...settings.notifications });
  const [mediaAutoDownload, setMediaAutoDownload] = useState({ ...settings.mediaAutoDownload });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(settings.twoFactorEnabled);
  const [hardwareSessions, setHardwareSessions] = useState([
    {
      id: 'session-1',
      device: 'MacBook Pro 16"',
      isCurrent: true,
      location: 'San Francisco, CA',
      client: 'Chrome 128 · IP 192.0.2.45',
      lastActive: 'Active now',
      icon: 'laptop_mac',
    },
    {
      id: 'session-2',
      device: 'iPhone 15 Pro',
      isCurrent: false,
      location: 'San Francisco, CA',
      client: 'iOS ChitChat v4.12 · Cellular',
      lastActive: 'Last active 2h ago',
      icon: 'smartphone',
    },
  ]);

  // Compute password strength score (0-100)
  const calculateStrength = (pass: string) => {
    if (!pass) return { score: 0, text: 'Too Weak', color: 'text-error' };
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (pass.length >= 12) score += 25;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^A-Za-z0-9]/.test(pass)) score += 20;

    if (score > 80) return { score: Math.min(100, score), text: 'Very Strong (98/100)', color: 'text-tertiary' };
    if (score > 50) return { score, text: 'Medium (65/100)', color: 'text-amber-500' };
    return { score, text: 'Weak (30/100)', color: 'text-error' };
  };

  const strength = calculateStrength(newPassword);

  const handleSave = () => {
    onUpdateSettings({
      displayName,
      username,
      bio,
      email,
      theme: activeTheme,
      accent: activeAccent,
      textSize,
      enterKeySends,
      notifications,
      mediaAutoDownload,
      twoFactorEnabled,
    });
    onToast('Changes saved and synced to cloud!');
  };

  const handleDiscard = () => {
    setDisplayName(settings.displayName);
    setUsername(settings.username);
    setBio(settings.bio);
    setEmail(settings.email);
    setActiveTheme(settings.theme);
    setActiveAccent(settings.accent);
    setTextSize(settings.textSize);
    setEnterKeySends(settings.enterKeySends);
    setNotifications({ ...settings.notifications });
    setMediaAutoDownload({ ...settings.mediaAutoDownload });
    onToast('Modifications reset to last saved state.');
  };

  return (
    <div className="w-full min-h-screen bg-surface px-6 py-6 max-w-7xl mx-auto flex flex-col gap-6 pb-28">
      {/* Top Context & Quick Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant/20">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-primary text-xs uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>PREFERENCES &amp; CONTROL CENTER</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <h1 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold tracking-tight">
              Settings
            </h1>
            <button
              onClick={onNavigateBack}
              className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span>Back to Chat</span>
            </button>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Manage your identity, visual themes, privacy perimeter, and workspace habits.
          </p>
        </div>

        {/* Quick Sync / Cloud Status Widget */}
        <div className="flex items-center gap-3 p-2.5 px-4 bg-surface-container-low rounded-2xl shadow-xs border border-outline-variant/20 self-start md:self-auto">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-tertiary/10 text-tertiary">
            <span className="material-symbols-outlined text-lg">cloud_done</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-tertiary rounded-full"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-on-surface-variant font-medium">Cloud Sync</span>
            <span className="text-xs font-semibold text-on-surface">Up to date · 2m ago</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-high font-semibold text-on-surface-variant">
            Encrypted
          </span>
        </div>
      </div>

      {/* Main Dynamic Layout: Tabs + Content Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sub-Nav Pill Navigation Drawer (Desktop sticky col-span-3) */}
        <aside className="lg:col-span-3 flex flex-col gap-1 bg-surface-container-low p-2 rounded-2xl shadow-xs border border-outline-variant/20 sticky top-20">
          <div className="px-3 py-1.5 text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">
            Categories
          </div>

          {/* Account tab */}
          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all text-left ${
              activeTab === 'account'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-xl">person</span>
              <span className="text-sm">Account</span>
            </div>
            {activeTab === 'account' && (
              <span className="w-1.5 h-1.5 rounded-full bg-on-primary"></span>
            )}
          </button>

          {/* Appearance tab */}
          <button
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all text-left ${
              activeTab === 'appearance'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-xl">palette</span>
              <span className="text-sm">Appearance</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant">
              4 themes
            </span>
          </button>

          {/* Notifications tab */}
          <button
            type="button"
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all text-left ${
              activeTab === 'notifications'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-xl">notifications_active</span>
              <span className="text-sm">Notifications</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
          </button>

          {/* Privacy & Security tab */}
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all text-left ${
              activeTab === 'privacy'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-xl">shield_lock</span>
              <span className="text-sm">Privacy &amp; Security</span>
            </div>
            <span className="px-2 py-0.5 bg-tertiary/15 text-tertiary rounded-full text-xs font-semibold">
              2FA On
            </span>
          </button>

          {/* Chat Preferences tab */}
          <button
            type="button"
            onClick={() => setActiveTab('chat-pref')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all text-left ${
              activeTab === 'chat-pref'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-xl">forum</span>
              <span className="text-sm">Chat Preferences</span>
            </div>
          </button>

          {/* Compact Storage Summary card */}
          <div className="mt-4 p-3 bg-surface-container rounded-2xl flex flex-col gap-1.5 border border-outline-variant/20">
            <div className="flex justify-between items-center text-on-surface">
              <span className="text-xs font-semibold">Workspace Storage</span>
              <span className="text-xs text-primary font-bold">14.8 GB / 50 GB</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: '29.6%' }}
              ></div>
            </div>
            <span className="text-[10px] text-on-surface-variant">
              Cloud media auto-archived monthly
            </span>
          </div>
        </aside>

        {/* Main Panels Container (lg:col-span-9) */}
        <main className="lg:col-span-9 flex flex-col gap-6 min-w-0">
          {/* ================= SECTION 1: ACCOUNT ================= */}
          {activeTab === 'account' && (
            <section className="flex flex-col gap-6 animate-in fade-in duration-200">
              {/* Avatar & Header Banner Card */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative group cursor-pointer">
                    <img
                      alt="User avatar"
                      className="w-20 h-20 rounded-full object-cover shadow-sm group-hover:opacity-85 transition-all ring-2 ring-primary/20"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMqYjVDqsBOHoY6vQH_jnlGJjj7DMJhSTEcaAsGkFGCYhp8SPDuF6sfdX4fkcffxwb51a9d9GYZKN-5hhNRIQWKU320ve31cdvSLWj28vGdYwmaZcMjEb73GqTo_fef8o9vtuZ0ZfHzfJ2g8FYOR1nRYN2vQWl0AwQriZ0nFo7OyZR010GdNLKiDK-R6SZvDBvLJn6mVSrfvIbFF8YK0jAQ98zeXeJMsADZmBfWTWo38Rpw-3-sSE9-A"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                      <span className="material-symbols-outlined text-lg">photo_camera</span>
                      <span className="text-[10px] font-bold">Upload</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-md text-xl text-on-surface font-bold">
                        {displayName}
                      </span>
                      <span
                        className="material-symbols-outlined text-primary text-base fill-1"
                        title="Verified Staff"
                      >
                        verified
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      @{username} · {email}
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                        <span>Pro Workspace Member</span>
                      </span>
                      <span className="text-on-surface-variant text-[11px]">
                        Joined Sep 2023
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onToast('Select image from file system')}
                    className="w-full sm:w-auto px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">cloud_upload</span>
                    <span>New Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToast('Avatar reset to default monogram')}
                    className="p-2 text-error hover:bg-error-container/40 rounded-full transition-colors"
                    title="Remove Photo"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>

              {/* Public Profile Form */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col gap-4">
                <div className="border-b border-outline-variant/20 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-title-md text-base text-on-surface font-bold">
                      Public Profile
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      This information is visible to workspace teammates and shared channels.
                    </p>
                  </div>
                  <span className="text-xs bg-surface-container text-on-surface-variant px-3 py-1 rounded-full font-semibold">
                    Publicly visible
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-on-surface font-semibold">
                      Display Name
                    </label>
                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="px-3.5 py-2.5 bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium border border-outline-variant/20"
                      type="text"
                    />
                    <span className="text-[11px] text-on-surface-variant">
                      Used in message previews and search directories.
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-on-surface font-semibold">
                      Username Handle
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-on-surface-variant text-sm font-medium">
                        @
                      </span>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-8 pr-3.5 py-2.5 bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium border border-outline-variant/20"
                        type="text"
                      />
                    </div>
                    <span className="text-[11px] text-on-surface-variant">
                      Direct mention handle across ChitChat threads.
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-on-surface font-semibold">
                    Bio / Status Description
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium border border-outline-variant/20 resize-none"
                  ></textarea>
                  <div className="flex justify-between text-[11px] text-on-surface-variant">
                    <span>Markdown supported: links, bold, code snippets</span>
                    <span>{bio.length} / 160 characters</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-on-surface font-semibold">
                    Registered Primary Email
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium border border-outline-variant/20"
                        type="email"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-tertiary text-xs font-semibold">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span>Verified</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToast('Verification link sent to ' + email)}
                      className="px-4 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
                    >
                      Change Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Password & Credentials Security Card */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
                  <div>
                    <h3 className="font-title-md text-base text-on-surface font-bold">
                      Password &amp; Authentication
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Ensure your credentials use a high-entropy passphrase.
                    </p>
                  </div>
                  <span className="text-on-surface-variant text-[11px]">Updated 42 days ago</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-on-surface font-semibold">Current Password</label>
                    <input
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      type="password"
                      className="px-3.5 py-2.5 bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium border border-outline-variant/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-on-surface font-semibold">New Password</label>
                    <input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      type="password"
                      className="px-3.5 py-2.5 bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium border border-outline-variant/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-on-surface font-semibold">Confirm Password</label>
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      className="px-3.5 py-2.5 bg-surface-container-low text-on-surface rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-medium border border-outline-variant/20"
                    />
                  </div>
                </div>

                {/* Password Strength Meter */}
                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-2 border border-outline-variant/20">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-tertiary text-base">verified_user</span>
                      <span>Password Strength:</span>
                      <strong className={strength.color}>{strength.text}</strong>
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Includes uppercase, digits &amp; symbols
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                    <div className="h-full bg-tertiary rounded-full"></div>
                    <div className="h-full bg-tertiary rounded-full"></div>
                    <div className="h-full bg-tertiary rounded-full"></div>
                    <div className={`h-full rounded-full ${strength.score > 80 ? 'bg-tertiary' : 'bg-outline-variant'}`}></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================= SECTION 2: APPEARANCE ================= */}
          {activeTab === 'appearance' && (
            <section className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col gap-6">
                <div>
                  <h3 className="font-title-md text-base text-on-surface font-bold">
                    Theme &amp; Environment
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Customize your workspace canvas and luminous chat bubble contrast levels.
                  </p>
                </div>

                {/* Theme Previews Selector Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* 1. Light Mode Card */}
                  <div
                    onClick={() => {
                      setActiveTheme('light');
                      onUpdateSettings({ theme: 'light' });
                      onToast('Switched to Light Mode');
                    }}
                    className={`cursor-pointer rounded-2xl p-4 transition-all flex flex-col gap-3 shadow-xs relative border ${
                      activeTheme === 'light'
                        ? 'ring-2 ring-primary border-primary bg-surface-container-low'
                        : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-primary">light_mode</span>
                        <span>Light Mode</span>
                      </span>
                      <span className="material-symbols-outlined text-primary text-xl">
                        {activeTheme === 'light' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>

                    {/* Mini UI Mockup Light */}
                    <div className="w-full h-28 rounded-xl bg-white p-2 flex flex-col justify-between overflow-hidden shadow-xs border border-slate-200">
                      <div className="flex items-center justify-between pb-1 bg-slate-100 px-2 rounded">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          <span className="w-8 h-1.5 bg-slate-300 rounded-full"></span>
                        </div>
                        <span className="w-3 h-1.5 bg-slate-300 rounded-full"></span>
                      </div>
                      <div className="flex flex-col gap-1 py-1">
                        <div className="self-start max-w-[80%] p-1 rounded-lg bg-slate-100 text-[9px] text-slate-800">
                          Morning Taylor! Ready for sync?
                        </div>
                        <div className="self-end max-w-[80%] p-1 rounded-lg bg-indigo-600 text-[9px] text-white">
                          All set! PR #142 merged.
                        </div>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full w-full flex items-center px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40"></span>
                      </div>
                    </div>
                    <span className="text-xs text-on-surface-variant leading-relaxed">
                      Clean crisp daylight palette with optimum high daylight contrast.
                    </span>
                  </div>

                  {/* 2. Dark Mode Card */}
                  <div
                    onClick={() => {
                      setActiveTheme('dark');
                      onUpdateSettings({ theme: 'dark' });
                      onToast('Switched to Dark Mode');
                    }}
                    className={`cursor-pointer rounded-2xl p-4 transition-all flex flex-col gap-3 shadow-xs relative border ${
                      activeTheme === 'dark'
                        ? 'ring-2 ring-primary border-primary bg-surface-container-low'
                        : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-secondary">dark_mode</span>
                        <span>Dark Mode</span>
                      </span>
                      <span className="material-symbols-outlined text-primary text-xl">
                        {activeTheme === 'dark' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>

                    {/* Mini UI Mockup Dark */}
                    <div className="w-full h-28 rounded-xl bg-slate-900 p-2 flex flex-col justify-between overflow-hidden shadow-xs border border-slate-800">
                      <div className="flex items-center justify-between pb-1 bg-slate-800 px-2 rounded">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                          <span className="w-8 h-1.5 bg-slate-600 rounded-full"></span>
                        </div>
                        <span className="w-3 h-1.5 bg-slate-600 rounded-full"></span>
                      </div>
                      <div className="flex flex-col gap-1 py-1">
                        <div className="self-start max-w-[80%] p-1 rounded-lg bg-slate-800 text-[9px] text-slate-200">
                          Prototype updated in Figma
                        </div>
                        <div className="self-end max-w-[80%] p-1 rounded-lg bg-indigo-600 text-[9px] text-white">
                          Reviewing right away!
                        </div>
                      </div>
                      <div className="h-2.5 bg-slate-800 rounded-full w-full flex items-center px-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      </div>
                    </div>
                    <span className="text-xs text-on-surface-variant leading-relaxed">
                      Deep slate sleek contrast paired with luminous violet bubbles.
                    </span>
                  </div>

                  {/* 3. System Sync Card */}
                  <div
                    onClick={() => {
                      setActiveTheme('system');
                      onUpdateSettings({ theme: 'system' });
                      onToast('Set to System Sync schedule');
                    }}
                    className={`cursor-pointer rounded-2xl p-4 transition-all flex flex-col gap-3 shadow-xs relative border ${
                      activeTheme === 'system'
                        ? 'ring-2 ring-primary border-primary bg-surface-container-low'
                        : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-on-surface-variant">devices</span>
                        <span>System Sync</span>
                      </span>
                      <span className="material-symbols-outlined text-primary text-xl">
                        {activeTheme === 'system' ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>

                    {/* Mini Split Preview */}
                    <div className="w-full h-28 rounded-xl overflow-hidden flex shadow-xs border border-slate-300 dark:border-slate-800">
                      <div className="w-1/2 bg-white p-2 flex flex-col justify-between">
                        <div className="w-6 h-1 bg-indigo-400 rounded"></div>
                        <div className="p-0.5 rounded bg-slate-100 text-[8px]">Auto ☀️</div>
                        <div className="w-full h-1.5 bg-slate-200 rounded"></div>
                      </div>
                      <div className="w-1/2 bg-slate-900 p-2 flex flex-col justify-between">
                        <div className="w-6 h-1 bg-indigo-500 rounded self-end"></div>
                        <div className="p-0.5 rounded bg-slate-800 text-slate-200 text-[8px] self-end">Auto 🌙</div>
                        <div className="w-full h-1.5 bg-slate-800 rounded"></div>
                      </div>
                    </div>
                    <span className="text-xs text-on-surface-variant leading-relaxed">
                      Follows your OS appearance schedule automatically.
                    </span>
                  </div>
                </div>

                {/* Accent Color Selection */}
                <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
                  <label className="font-title-md text-sm text-on-surface font-bold">
                    Dynamic Accent Hue
                  </label>
                  <p className="text-xs text-on-surface-variant">
                    Applies to active highlights, notification counters, and primary action buttons.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {/* Indigo */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveAccent('indigo');
                        onUpdateSettings({ accent: 'indigo' });
                        onToast('Accent set to Electric Indigo');
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all ${
                        activeAccent === 'indigo'
                          ? 'ring-2 ring-primary bg-primary-fixed text-on-primary-fixed shadow-xs'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#4648d4]"></span>
                      <span>Electric Indigo</span>
                    </button>

                    {/* Emerald */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveAccent('emerald');
                        onUpdateSettings({ accent: 'emerald' });
                        onToast('Accent set to Emerald Vivid');
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all ${
                        activeAccent === 'emerald'
                          ? 'ring-2 ring-primary bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 shadow-xs'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#00875a]"></span>
                      <span>Emerald Vivid</span>
                    </button>

                    {/* Violet */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveAccent('violet');
                        onUpdateSettings({ accent: 'violet' });
                        onToast('Accent set to Luminous Violet');
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all ${
                        activeAccent === 'violet'
                          ? 'ring-2 ring-primary bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 shadow-xs'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#7c3aed]"></span>
                      <span>Luminous Violet</span>
                    </button>

                    {/* Cyan */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveAccent('cyan');
                        onUpdateSettings({ accent: 'cyan' });
                        onToast('Accent set to Cyan Horizon');
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all ${
                        activeAccent === 'cyan'
                          ? 'ring-2 ring-primary bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200 shadow-xs'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#008ea6]"></span>
                      <span>Cyan Horizon</span>
                    </button>
                  </div>
                </div>

                {/* Font Scale Slider */}
                <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
                  <div className="flex justify-between items-center">
                    <span className="font-title-md text-sm text-on-surface font-bold">
                      Message Text Size
                    </span>
                    <span className="text-xs text-primary font-bold">
                      Standard ({textSize}px)
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-on-surface-variant font-semibold">A</span>
                    <input
                      type="range"
                      min={12}
                      max={18}
                      value={textSize}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setTextSize(val);
                        onUpdateSettings({ textSize: val });
                      }}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <span className="font-headline-md text-lg text-on-surface font-bold">A</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================= SECTION 3: NOTIFICATIONS ================= */}
          {activeTab === 'notifications' && (
            <section className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col gap-4">
                <div>
                  <h3 className="font-title-md text-base text-on-surface font-bold">
                    Notification Preferences
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Configure real-time alerts, chime feedbacks, and OS integration.
                  </p>
                </div>

                <div className="flex flex-col divide-y divide-outline-variant/20">
                  {/* Item 1: Message notifications */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 text-primary rounded-xl mt-0.5">
                        <span className="material-symbols-outlined text-xl">chat_bubble</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-on-surface">
                          Message notifications
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Receive in-app visual badges and push alerts for direct messages &amp; channel mentions.
                        </span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.messages}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setNotifications((prev) => ({ ...prev, messages: val }));
                          onToast(`Message notifications ${val ? 'enabled' : 'disabled'}`);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-xs"></div>
                    </label>
                  </div>

                  {/* Item 2: Sound alerts */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-secondary/10 text-secondary rounded-xl mt-0.5">
                        <span className="material-symbols-outlined text-xl">volume_up</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-on-surface">Sound alerts</span>
                        <span className="text-xs text-on-surface-variant">
                          Play pleasant acoustic chime when inbound messages arrive while window is active.
                        </span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sounds}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setNotifications((prev) => ({ ...prev, sounds: val }));
                          onToast(`Sound alerts ${val ? 'enabled' : 'disabled'}`);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-xs"></div>
                    </label>
                  </div>

                  {/* Item 3: Desktop push notifications */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-tertiary/10 text-tertiary rounded-xl mt-0.5">
                        <span className="material-symbols-outlined text-xl">laptop_chromebook</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-on-surface">
                          Desktop push notifications
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Send system-level alerts to macOS Notification Center / Windows Action Center.
                        </span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.desktopPush}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setNotifications((prev) => ({ ...prev, desktopPush: val }));
                          onToast(`Desktop push notifications ${val ? 'enabled' : 'disabled'}`);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-xs"></div>
                    </label>
                  </div>

                  {/* Item 4: Preview message snippet in banner */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-surface-container text-on-surface-variant rounded-xl mt-0.5">
                        <span className="material-symbols-outlined text-xl">visibility</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-on-surface">
                          Preview message snippet in banner
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Display sender name and message body snippet in banners (disable for strict screen privacy).
                        </span>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.previewSnippet}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setNotifications((prev) => ({ ...prev, previewSnippet: val }));
                          onToast(`Message snippet preview ${val ? 'enabled' : 'disabled'}`);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-xs"></div>
                    </label>
                  </div>
                </div>

                {/* Do Not Disturb Schedule card */}
                <div className="p-4 bg-surface-container-low rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-2xl">bedtime</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-on-surface">
                        Automatic Quiet Hours
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Mute notifications daily between 10:00 PM – 07:30 AM
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToast('Quiet hours set to 10:00 PM – 07:30 AM')}
                    className="px-4 py-2 bg-surface-container-highest hover:bg-surface-container-high rounded-full text-xs text-on-surface font-semibold self-start sm:self-auto transition-colors"
                  >
                    Configure Schedule
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ================= SECTION 4: PRIVACY & SECURITY ================= */}
          {activeTab === 'privacy' && (
            <section className="flex flex-col gap-6 animate-in fade-in duration-200">
              {/* 2FA Status Card */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl fill-1">security</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-md text-base text-on-surface font-bold">
                        Two-Factor Authentication (2FA)
                      </h3>
                      <span className="px-2 py-0.5 bg-tertiary text-on-tertiary text-[10px] font-bold rounded-full">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      Authenticator App (TOTP) is actively safeguarding your logins and session elevation.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Recovery Codes:\n\n1. 4A89-9F12-B83C\n2. 7D21-39E4-A109\n3. 8C02-77FA-EE12\n\nKeep these secret!')}
                    className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs rounded-full font-semibold transition-colors"
                  >
                    View Recovery Codes
                  </button>
                  <button
                    type="button"
                    onClick={() => onToast('Prompted QR Code for Authenticator reconfiguration')}
                    className="px-4 py-2 bg-surface-container text-on-surface-variant hover:text-on-surface text-xs rounded-full font-semibold transition-colors"
                  >
                    Reconfigure
                  </button>
                </div>
              </div>

              {/* Active Sessions List */}
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                  <div>
                    <h3 className="font-title-md text-base text-on-surface font-bold">
                      Active Hardware Sessions
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Devices currently logged into your account and token authorizations.
                    </p>
                  </div>
                  <span className="text-xs text-tertiary bg-tertiary/10 px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
                    {hardwareSessions.length} Connected Clients
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {hardwareSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between gap-4 border border-outline-variant/20"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-xl">{session.icon}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-on-surface truncate">
                              {session.device}
                            </span>
                            {session.isCurrent && (
                              <span className="px-2 py-0.5 bg-primary text-on-primary text-[10px] font-bold rounded-full">
                                Current Device
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-on-surface-variant truncate">
                            {session.location} · {session.client}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {session.isCurrent ? (
                          <span className="flex items-center gap-1.5 text-xs text-tertiary font-semibold">
                            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                            <span>Active now</span>
                          </span>
                        ) : (
                          <>
                            <span className="text-xs text-on-surface-variant">{session.lastActive}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setHardwareSessions(hardwareSessions.filter((s) => s.id !== session.id));
                                onToast(`Terminated session on ${session.device}`);
                              }}
                              className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container rounded-full transition-colors"
                              title="Revoke Device Session"
                            >
                              <span className="material-symbols-outlined text-base">logout</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prominent Global Logout */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-error-container/30 p-4 rounded-xl border border-error/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-error text-2xl">warning</span>
                    <div className="flex flex-col">
                      <span className="text-xs text-on-error-container font-bold">
                        Unrecognized activity or lost hardware?
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        Terminates tokens on all browsers, mobile apps, and developer API keys immediately.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToast('Logged out of all remote sessions.')}
                    className="px-4 py-2 bg-error text-on-error hover:bg-red-700 rounded-full text-xs font-bold transition-all shadow-xs whitespace-nowrap self-start sm:self-auto"
                  >
                    Log out from all devices
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ================= SECTION 5: CHAT PREFERENCES ================= */}
          {activeTab === 'chat-pref' && (
            <section className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col gap-5">
                <div>
                  <h3 className="font-title-md text-base text-on-surface font-bold">
                    Chat &amp; Input Behavior
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Fine-tune your composer shortcuts, auto-media downloading, and backup redundancy.
                  </p>
                </div>

                {/* Key Send Behavior Radio */}
                <div className="p-4 bg-surface-container-low rounded-xl flex flex-col gap-2.5 border border-outline-variant/20">
                  <span className="text-xs font-bold text-on-surface">Keyboard Enter Key Behavior</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label
                      onClick={() => setEnterKeySends(true)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors border ${
                        enterKeySends
                          ? 'bg-surface-container-lowest border-primary shadow-xs'
                          : 'bg-surface-container border-outline-variant/20 hover:bg-surface'
                      }`}
                    >
                      <input
                        type="radio"
                        name="enter_key"
                        checked={enterKeySends}
                        onChange={() => setEnterKeySends(true)}
                        className="accent-primary w-4 h-4"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-on-surface">Enter sends message</span>
                        <span className="text-[11px] text-on-surface-variant">
                          Press <kbd className="px-1 py-0.5 bg-surface-container-highest rounded text-[10px]">Shift</kbd> + <kbd className="px-1 py-0.5 bg-surface-container-highest rounded text-[10px]">Enter</kbd> to add newline
                        </span>
                      </div>
                    </label>

                    <label
                      onClick={() => setEnterKeySends(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors border ${
                        !enterKeySends
                          ? 'bg-surface-container-lowest border-primary shadow-xs'
                          : 'bg-surface-container border-outline-variant/20 hover:bg-surface'
                      }`}
                    >
                      <input
                        type="radio"
                        name="enter_key"
                        checked={!enterKeySends}
                        onChange={() => setEnterKeySends(false)}
                        className="accent-primary w-4 h-4"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-on-surface">Enter adds a new line</span>
                        <span className="text-[11px] text-on-surface-variant">
                          Press <kbd className="px-1 py-0.5 bg-surface-container-highest rounded text-[10px]">Cmd / Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-surface-container-highest rounded text-[10px]">Enter</kbd> to dispatch
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Media Auto Download */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-bold text-on-surface">Media Auto-Download</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/20">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">image</span>
                        <span className="text-xs font-semibold text-on-surface">Photos</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mediaAutoDownload.photos}
                          onChange={(e) =>
                            setMediaAutoDownload((prev) => ({ ...prev, photos: e.target.checked }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/20">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg">videocam</span>
                        <span className="text-xs font-semibold text-on-surface">Videos (&lt;25MB)</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mediaAutoDownload.videos}
                          onChange={(e) =>
                            setMediaAutoDownload((prev) => ({ ...prev, videos: e.target.checked }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/20">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-lg">description</span>
                        <span className="text-xs font-semibold text-on-surface">Documents &amp; PDFs</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mediaAutoDownload.docs}
                          onChange={(e) =>
                            setMediaAutoDownload((prev) => ({ ...prev, docs: e.target.checked }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Cloud Backup */}
                <div className="p-4 bg-surface-container-low rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <span className="material-symbols-outlined text-2xl">backup</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-on-surface">
                        End-to-End Chat History Backup
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Last automatic snapshot: Today at 04:15 AM (1.42 GB archived).
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToast('Immediate backup initiated... Snapshot complete!')}
                    className="px-4 py-2 bg-primary text-on-primary rounded-full text-xs font-semibold hover:bg-secondary transition-all shadow-xs whitespace-nowrap self-start sm:self-auto"
                  >
                    Back Up Now
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ================= STICKY BOTTOM ACTIONS DOCK ================= */}
          <div className="sticky bottom-4 z-30 p-4 bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl shadow-xl border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>All local preference changes will be synchronized across logged-in sessions.</span>
            </div>
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleDiscard}
                className="w-1/2 sm:w-auto px-4 py-2 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                Discard Changes
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="w-1/2 sm:w-auto px-6 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary hover:opacity-95 active:scale-98 transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">check</span>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
