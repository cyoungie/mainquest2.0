# MainQuest 2.0

**Social platform for college students to discover and connect.**

## Problem Statement

College is a high-pressure bubble where students are too busy for a life and too scared to explore it alone. Often when students have interests or activities they want to try that are outside their comfort zone, they don't know anyone to go with. Using MainQuest, students can find others who share interests and connect with them before the event.

---

## Product Features

### 🏠 Home
- **Preferences & event types** — Select what you're interested in (hiking, coffee dates, gym, etc.) and get event recommendations from an AI algorithm.
- **Calendar sync** — Sync with Outlook or Google Calendar.

### 🤝 Quests (Social)
- **Post events** — Post events you want to do and how many people you need.
- **"I'm Down"** — Others join with one tap. When the crew is full, a **group chat** is created and stays active until 24 hours after the event.

### 🎮 Bingo
- **Collect experiences** — Like Pokémon GO cards; compete with friends and complete as many as you can in a month.

### 👤 Profile
- **AI voice chatbot** — Quick conversation to learn your interests and personality (under 5 min). Powers better matching.
- **Digital scrapbook** — All sidequests you've been on and who you went with.

---

## Tech Stack

| Layer     | Choice                    | Notes                          |
|----------|----------------------------|--------------------------------|
| App      | **Expo (React Native)**    | iOS (and Android) native app  |
| Router   | **Expo Router**            | File-based tabs + stack       |
| UI       | **React Native** + StyleSheet | iOS-style dark theme        |
| Icons    | **@expo/vector-icons** (Ionicons) | Built-in with Expo        |
| Backend  | (To add)                   | e.g. Supabase, Firebase, or API + DB |

---

## Project Structure

```
mainquest2.0/
├── app/
│   ├── _layout.tsx           # Root: SafeArea, StatusBar
│   └── (tabs)/
│       ├── _layout.tsx       # Tab bar (Home, Quests, Bingo, Profile)
│       ├── index.tsx         # Home
│       ├── quests/
│       │   ├── _layout.tsx   # Stack (list → detail → chat, new)
│       │   ├── index.tsx     # Quests list
│       │   ├── new.tsx       # Post quest
│       │   ├── [id].tsx      # Quest detail (I'm Down, group chat)
│       │   └── [id]/chat.tsx  # Group chat placeholder
│       ├── bingo.tsx         # Bingo card + leaderboard
│       └── profile.tsx       # AI chatbot CTA + scrapbook
├── components/
│   └── home/                 # EventPreferences, RecommendedQuests
├── constants/
│   └── theme.ts              # iOS-style colors, spacing
├── app.json                  # Expo config (name, scheme, iOS bundle id)
└── package.json
```

---

## Getting Started (iOS)

**Prerequisites:** Node.js, Xcode (for iOS Simulator), and [Expo Go](https://expo.dev/go) on your phone (optional).

**First time with Xcode?** See **[SETUP-IOS.md](./SETUP-IOS.md)** for step-by-step: accept license, install an iPhone simulator, then run the app.

```bash
cd mainquest2.0
npm install
npm run ios
```

- **Simulator:** `npm run ios` opens the **iPhone** Simulator (not Vision Pro) and runs the app. The first time you run it, we set your Simulator app’s default device to an iPhone so Expo launches the right one.
- **Physical device:** Run `npx expo start`, scan the QR code with the Camera app, and open in Expo Go.

**If `npm run ios` fails:**
- **EPERM / permission errors:** The script uses `EXPO_NO_CACHE=1` so Expo doesn’t write to `~/.expo`. If you still see permission errors, run the command in your **system terminal** (outside Cursor/IDE).
- **Xcode / Simulator:** Install Xcode from the App Store and run it once to accept the license. For an iPhone simulator, pick an iPhone device in Xcode → Window → Devices and Simulators.
- **Metro won’t start:** Run `npx expo start --clear` then try `npm run ios` again.

To create a production build for the App Store later, use [EAS Build](https://docs.expo.dev/build/introduction/).

---

## Environment Variables

When you add a backend, use a `.env` (and `expo-constants` or `react-native-dotenv`) for:

- `API_URL` — Backend base URL
- `GOOGLE_CALENDAR_*` / `OUTLOOK_*` — Calendar sync (optional)
- `OPENAI_API_KEY` — For recommendations and voice chatbot (optional)

**Supabase (recommended):** Copy `.env.example` to `.env` and set `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` from Supabase → Project Settings → API. Run the `quests` table migration in **BACKEND-AND-USERS.md** (SQL Editor). The Add screen will then persist new sidequests.

---

## Optional: App Icon & Splash

Add `assets/icon.png` (1024×1024) and, if you want, `assets/adaptive-icon.png` and `assets/splash.png`, then reference them in `app.json` under `expo.icon`, `expo.android.adaptiveIcon`, and `expo.splash`.
