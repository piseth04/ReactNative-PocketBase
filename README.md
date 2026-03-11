# To-Do List App

A mobile to-do list application built with **React Native (Expo)** and **PocketBase** as the backend.

---

## Tools & Technologies

| Tool | Purpose |
|---|---|
| [Expo](https://expo.dev/) | React Native framework & build tooling |
| [Expo Router](https://expo.github.io/router/) | File-based navigation for React Native |
| [PocketBase](https://pocketbase.io/) | Self-hosted backend (auth + database) |
| [pocketbase JS SDK](https://github.com/pocketbase/js-sdk) | Connect the app to PocketBase |
| [React Native Safe Area Context](https://github.com/AppAndFlow/react-native-safe-area-context) | Handle device safe areas |
| [React Native Screens](https://github.com/software-mansion/react-native-screens) | Native navigation primitives |
| [Expo Icons](https://icons.expo.fyi/) | Icon sets (Feather, AntDesign, Ionicons) |

---

## Project Structure

```
to-do-list/
├── pocketbase/          # PocketBase backend
│   ├── pocketbase.exe   # PocketBase executable (Windows)
│   ├── pb_data/         # Database & config (auto-generated)
│   └── pb_migrations/   # Database schema migrations
│
└── React_Native/        # Expo React Native app
    ├── app/
    │   ├── _layout.jsx  # Root layout (Expo Router)
    │   ├── index.jsx    # Home / To-do screen
    │   └── login.jsx    # Login screen
    ├── assets/          # Images, fonts, etc.
    ├── utils/
    │   └── pb.js        # PocketBase client instance
    ├── app.json         # Expo app config
    └── package.json     # Node dependencies
```

---

## Setup

### 1. PocketBase (Backend)

PocketBase is a single executable — no installation required.

**Navigate to the pocketbase folder:**

```powershell
cd pocketbase
```

**Run the server and bind it to all network interfaces** so that physical devices and emulators on the same network can connect:

```powershell
.\pocketbase.exe serve --http=0.0.0.0:8090
```

> **Why `0.0.0.0`?**  
> Using `0.0.0.0` makes PocketBase listen on every network interface of the machine (Wi-Fi, Ethernet, etc.) instead of only `localhost`. This is required so that a real phone or Android/iOS emulator can reach the server over your local network.

Once running, the admin UI is available at:

```
http://127.0.0.1:8090/_/
```

Open it on first run to create an admin account and verify the **todos** collection was created by the migration.

---

### 2. React Native App (Frontend)

**Navigate to the React Native folder:**

```powershell
cd React_Native
```

**Install dependencies:**

```powershell
npm install
```

**Start the Expo development server:**

```powershell
npm start
```

Then scan the QR code with the **Expo Go** app on your phone, or press:
- `a` — open Android emulator
- `i` — open iOS simulator
- `w` — open in web browser

> **Connection to PocketBase:**  
> The app automatically detects the host machine's IP from `expo-constants` and connects to PocketBase on port `8090`. Make sure your phone/emulator is on the **same Wi-Fi network** as the machine running PocketBase.

---

## How It Works

1. On launch the app checks the PocketBase connection and redirects to **Login** if needed.
2. After a successful login, the **Home** screen loads the user's to-do items from PocketBase.
3. Authentication state is managed via `pb.authStore` from the PocketBase JS SDK.
4. Logging out clears the auth store and returns to the Login screen.
