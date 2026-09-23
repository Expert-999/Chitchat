import React, { useState } from 'react';
import { Conversation } from '../types';

interface ComposeModalProps {
  conversations: Conversation[];
  onClose: () => void;
  onSelectRecipient: (convId: string) => void;
  onCreateGroup: (name: string, members: string[]) => void;
}

export const ComposeModal: React.FC<ComposeModalProps> = ({
  conversations,
  onClose,
  onSelectRecipient,
  onCreateGroup,
}) => {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const users = conversations.filter((c) => !c.isGroup);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.handle.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleMember = (name: string) => {
    if (selectedMembers.includes(name)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== name));
    } else {
      setSelectedMembers([...selectedMembers, name]);
    }
  };

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    onCreateGroup(groupName.trim(), selectedMembers);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
          <h3 className="font-title-md text-base font-bold text-on-surface">
            {isCreatingGroup ? 'Create New Squad Group' : 'New Conversation'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {!isCreatingGroup ? (
          <>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCreatingGroup(true)}
                className="w-full py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-outline-variant/20"
              >
                <span className="material-symbols-outlined text-base">group_add</span>
                <span>Create a Squad / Group Channel</span>
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-base">
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search colleagues..."
                className="w-full pl-9 pr-4 py-2 bg-surface-container-low text-on-surface text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/20"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1 divide-y divide-outline-variant/10">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    onSelectRecipient(user.id);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-on-surface truncate">{user.name}</span>
                    <span className="text-[11px] text-primary">{user.handle}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <form onSubmit={handleCreateGroupSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Group / Channel Name
              </label>
              <input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Design Systems Guild, Frontend Core"
                className="w-full px-3 py-2 bg-surface-container-low text-on-surface text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/20"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Add Teammates ({selectedMembers.length} selected)
              </label>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {users.map((u) => {
                  const isChecked = selectedMembers.includes(u.name);
                  return (
                    <div
                      key={u.id}
                      onClick={() => handleToggleMember(u.name)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-semibold text-on-surface">{u.name}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="accent-primary"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingGroup(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!groupName.trim()}
                className="px-5 py-2 rounded-full text-xs font-bold bg-primary text-on-primary hover:bg-secondary disabled:opacity-50 transition-colors shadow-xs"
              >
                Create Group
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
