import { create } from "zustand";

type AppState = {
  voiceId?: string;
  languageCode?: string;
  lastAudioUrl?: string;
  selectedText?: { en: string; content: string };
  setVoiceId: (id: string) => void;
  setLanguage: (code: string) => void;
  setLastAudioUrl: (url?: string) => void;
  setSelectedText: (t?: { en: string; content: string }) => void;
  reset: () => void;
};

export const useApp = create<AppState>((set) => ({
  voiceId: undefined,
  languageCode: undefined,
  lastAudioUrl: undefined,
  selectedText: undefined,
  setVoiceId: (voiceId) => set({ voiceId }),
  setLanguage: (languageCode) => set({ languageCode }),
  setLastAudioUrl: (lastAudioUrl) => set({ lastAudioUrl }),
  setSelectedText: (selectedText) => set({ selectedText }),
  reset: () =>
    set({
      voiceId: undefined,
      languageCode: undefined,
      lastAudioUrl: undefined,
      selectedText: undefined,
    }),
}));
