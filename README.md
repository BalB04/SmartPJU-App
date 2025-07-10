# SmartPJU-App

Mobile app built with React Native for realtime monitoring of CCTV streams and sensor data.

##  Tech Stack

- React Native + Expo
- API: Custom backend or Firebase
- RTSP integration for CCTV

##  Getting Started
**Node.js (LTS Version Recommended):**
node version used v22.17.0
```bash
nvm install
```

**Expo Go Mobile App:** Download it on your Android device from the Play Store.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/smart-pju-monitor-app.git](https://github.com/BalB04/smart-pju-monitor-app.git) # Replace with your repo URL
    cd smart-pju-monitor-app
    ```

2.  **Install project dependencies:**
    ```bash
    npm install # Installs core dependencies from package.json
    npx expo install expo-router nativewind react-native-reanimated react-native-safe-area-context react-native-maps
    ```
    
3.  **Initialize Tailwind CSS:**
    ```bash
    npx tailwindcss init
    ```
### Configuration Files

**Ensure the following files in your project's root directory have the exact content specified:**

1.  **`package.json`**
    * **CRITICAL:** Ensure the `"main"` field is set for Expo Router:
        ```json
        "main": "expo-router/entry",
        ```
    * Verify that `expo-router`, `nativewind`, `react-native-reanimated`, `react-native-safe-area-context`, and `react-native-maps` are listed under `dependencies` with versions compatible with your Expo SDK (as installed by `expo install`).

2.  **`babel.config.js`**
```bash
touch babel.config.js
```
    ```javascript
    module.exports = function (api) {
      api.cache(true);
      return {
        presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
        ],
      };
    };

    ```

3.  **`tailwind.config.js`**
    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./App.{js,jsx,ts,tsx}", // For App.tsx if it's used
        "./app/**/*.{js,jsx,ts,tsx}", // For all files in app/ (Expo Router)
        "./components/**/*.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./constants/**/*.{js,jsx,ts,tsx}" // If you use constants for styling
      ],
      presets: [require("nativewind/preset")],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```
    * **Note:** The `presets: [require("nativewind/preset")]` line you had is for older NativeWind versions (v2/v3). For NativeWind v4 with the Babel plugin, it's typically not needed and can sometimes cause issues. I've removed it in this corrected version.

4.  **`metro.config.js`**
    * This file is **only necessary if you have specific Metro configurations**, like custom asset loaders or if you need to explicitly tell NativeWind where your `global.css` is if it's not in the root.
    * If your `app/global.css` is consistently imported, you might not strictly need this. However, if you want to be explicit, here's the content:
        ```javascript
        const { getDefaultConfig } = require("expo/metro-config");
        const { withNativeWind } = require('nativewind/metro');

        const config = getDefaultConfig(__dirname);

        module.exports = withNativeWind(config, { input: './app/global.css' });
        ```

5.  **`app/global.css`**
    * **CRITICAL:** Create this file inside your `app/` directory (`smart-pju-monitor-app/app/global.css`).
    ```css
    /* app/global.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

6.  **`global.d.ts`** (or `nativewind-env.d.ts` if you prefer that name)
    * Create this file in your **project's root directory**.
```bash
touch nativewind-env.d.ts
```
   
    ```typescript
    /// <reference types="nativewind/types" />
    ```
### Running the App

1.  **Start the Expo development server:**
    ```bash
    npx expo start --clear
    ```
    * The `--clear` flag is crucial to clear all caches, especially after dependency changes or troubleshooting.

2.  **Open on your device:**
    * Scan the QR code displayed in your terminal (or browser tab) with the Expo Go app on your Android device.

## 🐛 Troubleshooting Common Issues

If you encounter problems, try these steps:

1.  **"Text strings must be rendered within a `<Text>` component."**
    * **Cause:** Raw text (even invisible spaces or comments) directly in JSX outside a `<Text>` component.
    * **Solution:** Carefully inspect the component mentioned in the error stack trace (e.g., `app/index.tsx`). Remove any JSX comments (`{/* ... */}`) that are direct children of `View`s or other components. Ensure all text is wrapped in `<Text>`. If persistent, delete the file and recreate it, then paste the clean code.

2.  **`[BABEL] ... .plugins is not a valid Plugin property`**
    * **Cause:** Babel configuration issue, often related to plugin order or `@babel/core` version.
    * **Solution:**
        1.  Verify `babel.config.js` content is *exactly* as specified above (all plugins in correct order).
        2.  Ensure `babel.config.js` is in the **project root**, not `node_modules`.
        3.  Perform a **full clean reinstall** (see below).

3.  **`ReanimatedError: Mismatch between JavaScript part and native part of Reanimated`**
    * **Cause:** Versions of `react-native-reanimated`'s JS code and native code don't match, often due to Node.js version, caching, or incorrect `npm install`.
    * **Solution:**
        1.  **Ensure Node.js LTS (v20.x.x):** Use `nvm use 20`.
        2.  **Clear Expo Go App Data:** On your device/emulator, go to App Settings -> Expo Go -> Storage & Cache -> Clear Storage/Data.
        3.  Perform a **full clean reinstall** (see below).

4.  **`Cannot find module 'expo-router'` (or other packages)**
    * **Cause:** Package not installed, `package.json` `main` field incorrect for Expo Router, or corrupted `node_modules`.
    * **Solution:**
        1.  Run `expo install <package-name>` for the missing package.
        2.  Ensure `package.json` has `"main": "expo-router/entry"`.
        3.  Perform a **full clean reinstall** (see below).

5.  **Blank White Screen (no errors, or only "Linking" warning)**
    * **Cause:** App is running, but UI elements aren't rendering or NativeWind styles aren't applying. Often due to incorrect `babel.config.js`, `tailwind.config.js` `content` paths, or `global.css` import paths.
    * **Solution:**
        1.  Verify `babel.config.js` and `tailwind.config.js` content.
        2.  Check `app/_layout.tsx` for any floating commented-out JSX (remove it).
        3.  Ensure `app/global.css` exists and is imported correctly (`./global.css` for `app/` files, `../../global.css` for `app/(tabs)/` files).
        4.  Perform a **full clean reinstall** (see below).

### Full Clean Reinstall (The Ultimate Fix)

When in doubt, or after encountering persistent issues, perform this sequence:

```bash
# 1. Stop the Expo server (Ctrl+C)
# 2. Delete all caches and installed packages
rm -rf node_modules
rm package-lock.json
rm -rf .expo
rm -rf dist
npm cache clean --force

# 3. Reinstall all dependencies
npm install

# 4. Start the Expo server with a clean cache
npx expo start --clear





