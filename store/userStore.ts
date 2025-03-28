import { OutputData } from '@editorjs/editorjs';
import { create } from 'zustand';

interface User {
  uid: string;
  created_at: Date;
  current_streak: number;
  max_streak: number;
  last_entry_at: Date | null;
  avatar_seed: string | null;
  Entries: { created_at: Date }[];
}

export interface Entries {
  id: number;
  uid: string;
  content: OutputData;
  created_at: Date;
  Tags: Tags[];
}

interface Tags {
  id: number;
  name: string;
  color: string;
  created_at: Date;
  entry_id: number;
}

export interface CompletionData {
  monthIndex: number;
  month: string;
  completedDays: number;
  totalDays: number;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  updateAvatarSeed: (newSeed: string) => void;
  completionData: CompletionData[] | null;
  setCompletionData: (completionData: CompletionData[]) => void;
  journalEntries: Entries[] | null;
  setJournalEntries: (journalEntries: Entries[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateAvatarSeed: (newSeed: string) =>
    set((state) => ({
      user: { ...state.user!, avatar_seed: newSeed },
    })),
  completionData: null,
  setCompletionData: (completionData) => set({ completionData }),
  journalEntries: null,
  setJournalEntries: (journalEntries) => set({ journalEntries }),
}));
