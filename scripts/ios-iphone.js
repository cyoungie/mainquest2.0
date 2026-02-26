#!/usr/bin/env node
/**
 * Set the Simulator app default to an iPhone (not Vision Pro), then run expo start --ios.
 * This ensures "npm run ios" opens an iPhone simulator.
 */
const { execSync, spawn } = require('child_process');
const path = require('path');

function getFirstIPhoneUDID() {
  try {
    const out = execSync('xcrun simctl list devices available -j', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    const data = JSON.parse(out);
    const devices = data.devices || {};
    for (const runtime of Object.keys(devices)) {
      if (!runtime.includes('iOS')) continue; // skip tvOS, watchOS, xrOS (Vision Pro)
      const list = devices[runtime];
      const iphone = list.find((d) => d.name && d.name.includes('iPhone') && d.isAvailable);
      if (iphone) return iphone.udid;
    }
  } catch (e) {
    // simctl can fail in restricted environments; continue without setting default
  }
  return null;
}

function setDefaultSimulator(udid) {
  try {
    execSync(`defaults write com.apple.iphonesimulator CurrentDeviceUDID "${udid}"`, {
      stdio: 'pipe',
    });
  } catch (e) {
    console.warn('Could not set default simulator:', e.message);
  }
}

const udid = getFirstIPhoneUDID();
if (udid) {
  setDefaultSimulator(udid);
} else {
  console.warn('No iPhone simulator found. Install one in Xcode → Settings → Platforms.');
}

const env = { ...process.env, EXPO_NO_CACHE: '1' };
const child = spawn('npx', ['expo', 'start', '--ios'], {
  stdio: 'inherit',
  shell: true,
  env,
  cwd: path.resolve(__dirname, '..'),
});
child.on('exit', (code) => process.exit(code != null ? code : 0));
