# To-Do List

This project is a React Native to-do list app built with Expo and Expo Router. It is currently a JavaScript/JSX mobile app shell that presents a simple home screen layout for a task manager interface.

## Current Status

The current implementation is an early UI scaffold.

- A welcome header is rendered at the top of the screen.
- Category shortcut cards are displayed in the main content area.
- An `Add New Task` button is shown at the bottom of the screen.
- The screen currently uses static content.
- There is no task CRUD logic, no persistence, and no backend integration yet.

## Tools and Frameworks

- Expo
- React Native
- Expo Router with file-based routing
- React
- Expo vector icons used in the current screen UI

## Programming Language

This project is written in JavaScript/JSX.

## Setup

1. Install Node.js if it is not already available on your machine.
2. Install project dependencies:

```bash
npm install
```

## Run the App

Use the scripts defined in `package.json`:

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Routing

This project uses Expo Router for file-based routing.

- The app entry point is `expo-router/entry` in `package.json`.
- The Expo Router plugin is enabled in `app.json`.
- The current main route is `app/index.jsx`.

## Platforms

The current Expo configuration includes support for:

- Android
- iOS
- Web