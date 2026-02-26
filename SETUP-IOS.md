# Run MainQuest on iPhone Simulator (Xcode)

Do these once after installing Xcode, then use **Step 3** whenever you want to run the app.

---

## Step 1: Open Xcode and accept the license

1. Open **Xcode** (from Applications or Spotlight).
2. If it asks you to accept the license or install extra components, accept and wait for it to finish.

---

## Step 2: Make sure an iPhone simulator is installed

1. In Xcode, go to **Xcode** → **Settings** (or **Preferences**).
2. Open the **Platforms** tab (or **Components** in older Xcode).
3. Find **iOS** and ensure at least one iOS version has a **Get** / download button completed (e.g. **iOS 18.2**). If you see **Get**, click it and wait for the download to finish.  
   This installs the iPhone simulators (iPhone 15, 16, etc.).

---

## Step 3: Run the app

In **Terminal** (not inside Cursor):

```bash
cd /Users/cheyoungahn/Downloads/mainquest2.0-main/mainquest2.0
npm run ios
```

The first run can take a minute. An **iPhone** simulator should open and load the app.

---

## If the wrong simulator opens (e.g. Vision Pro)

1. Open **Xcode**.
2. Go to **Window** → **Devices and Simulators**.
3. Click the **Simulators** tab at the top.
4. In the left list, select an **iPhone** (e.g. **iPhone 16** or **iPhone 15**).  
   If you don’t see any iPhones, click the **+** at the bottom left, choose **iPhone** and an OS version, then add it.
5. Close the window and in Terminal run again:
   ```bash
   npm run ios
   ```

Expo will use the simulator you just selected.

---

## If you see “No iPhone simulator found”

- Finish **Step 2** (install an iOS platform in Xcode → Settings → Platforms).
- Then run **Step 3** again.
