# Language Voice Kiosk (Frontend)

React + Vite + TypeScript + Tailwind starter for the AI Voice Cloning kiosk.

## Quick start
```bash
pnpm i   # or npm install / yarn
cp .env.example .env.local  # set VITE_API_BASE to your backend
pnpm dev
```

Build:
```bash
pnpm build
pnpm preview
```

## API Endpoints expected
- POST `/api/voice-profile` (multipart: `audio`) -> `{ voiceId }`
- GET `/api/languages` -> `[{ code, name, samplePhrases? }]`
- POST `/api/synthesize` JSON `{ text, languageCode, voiceId }` -> audio blob (e.g., audio/mpeg)

## No-backend "Mock Mode"
To run the frontend without any backend:
1) Copy env and enable mocks
   ```bash
   cp .env.example .env.local
   # .env.local will have VITE_USE_MOCKS=1 by default
   ```
2) Start dev server:
   ```bash
   pnpm dev
   ```
In mock mode:
- `/api/voice-profile` returns a fake `{ voiceId: "dev-voice-123" }`
- `/api/languages` returns a small list of languages
- `/api/synthesize` returns a tiny WAV beep so the audio player works