# iOS Simulator – Why It’s Not Opening

Here are the errors you might see and how to fix them.

---

## Do this first (most likely fix)

**1. Quit any other Expo/Metro process**  
Another terminal or Cursor may already be running Expo on port 8081. That blocks a new run and can cause “Skipping dev server” or timeouts.

- Close other terminals that ran `expo start` or `npm run ios`.
- Or kill the process:  
  `lsof -ti:8081 | xargs kill -9`

**2. Open the Simulator before starting Expo**  
- Open **Simulator**: **Xcode → Open Developer Tool → Simulator** (or open the **Simulator** app).
- Wait until the iPhone home screen is fully visible.

**3. Run from your Mac’s Terminal (not Cursor’s sandbox)**  
In **Terminal.app** (or iTerm):

```bash
cd /Users/cheyoungahn/Downloads/mainquest2.0-main/mainquest2.0
npm run ios
```

If port 8081 is still in use, use a different port:

```bash
npx expo start --ios --port 8083
```

**4. Install Expo Go on the simulator (if the app never appears)**  
- In the **Simulator**, open **App Store** and search for **Expo Go**, or  
- In Terminal: `npx expo install:client:ios` (if supported), or download Expo Go from the simulator’s App Store.  
Then run `npm run ios` again so it can open the project in Expo Go.

---

## 1. **"No iPhone simulator found"** (from old `npm run ios` script)

**Cause:** The script can’t see any **available** iPhone simulator (e.g. `xcrun simctl list` failed or no iOS runtimes are installed).

**Fix:**

1. Open **Xcode**.
2. Go to **Xcode → Settings → Platforms** (or **Components** in older Xcode).
3. Under **iOS**, add or install an **iOS Simulator** (e.g. latest iOS version).
4. Wait for the download to finish, then run again:
   ```bash
   npm run ios
   ```

---

## 2. **"Can't determine id of Simulator app"** or **"Simulator is most likely not installed"**

**Cause:** Command-line tools don’t know where Xcode is, or the Simulator app isn’t set up.

**Fix:**

1. Point the command-line tools at Xcode:
   ```bash
   sudo xcode-select -s /Applications/Xcode.app
   ```
2. Open **Xcode** once and accept the license if prompted.
3. Open **Simulator** once: **Xcode → Open Developer Tool → Simulator** (or open the **Simulator** app from Applications).
4. Then run:
   ```bash
   cd mainquest2.0 && npx expo start --ios
   ```

---

## 3. **"Simulator device failed to open exp://... Operation timed out"** (code 60)

**Cause:** Metro started, but opening the app URL in the Simulator **timed out** (Simulator still booting or Expo Go not ready).

**Fix:**

1. **Start the Simulator first:** open **Simulator** and wait until the home screen is fully up.
2. In the project folder, run:
   ```bash
   npx expo start --ios
   ```
3. If it still times out:
   - In the same terminal, press **`i`** again after a few seconds, or  
   - Run **Expo Go** inside the Simulator (install from the Simulator’s App Store if needed), then run `npx expo start --ios` again.

---

## 4. **"EPERM: operation not permitted"** on `.expo` or cache files

**Cause:** The process can’t write to the Expo cache (e.g. when run from a restricted/sandbox environment).

**Fix:** Run the commands in your **normal system terminal** (not inside a sandboxed/CI environment):

```bash
cd /path/to/mainquest2.0
npx expo start --ios
```

---

## 5. **"Metro is running in CI mode, reloads are disabled"**

**Cause:** The `CI` environment variable is set (e.g. by your IDE or CI system).

**Fix:** Run in a terminal where `CI` is not set, or run:

```bash
env -u CI npx expo start --ios
```

---

## 6. **"Port 8081 is running this app in another window" / "Use port 8083 instead?"**

**Cause:** Another Expo/Metro process is already using port 8081. In non-interactive mode Expo skips starting and the app doesn’t open.

**Fix:**

- **Option A:** Close the other terminal/window that’s running Expo, then run `npm run ios` again.
- **Option B:** Use another port:  
  `npx expo start --ios --port 8083`

---

## Quick checklist

- [ ] Xcode installed and license accepted  
- [ ] **Xcode → Settings → Platforms**: at least one **iOS** simulator runtime installed  
- [ ] `xcode-select` set: `sudo xcode-select -s /Applications/Xcode.app`  
- [ ] Simulator app opened at least once (Xcode → Open Developer Tool → Simulator)  
- [ ] Run `npx expo start --ios` from a **normal terminal** (not a sandboxed/CI shell)  
- [ ] If it times out: open **Simulator** first, wait for it to boot, then run `npx expo start --ios` again  

After that, the app should open in the simulator. If you still see a different error, copy the **exact message** and the command you ran and use that to debug further.
