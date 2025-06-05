<a name="top"></a>

[![React Native](https://img.shields.io/badge/React%20Native-0.79-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2053-000020?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-FD366E?logo=appwrite)](https://appwrite.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js)](https://nodejs.org/)
[![GitHub Release](https://img.shields.io/github/v/release/your-username/habit-tracker-app)](https://github.com/NeeradNandan/habit-tracker-app/releases)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/your-username/habit-tracker-app)](https://github.com/NeeradNandan/habit-tracker-app/commits/main)
[![License](https://img.shields.io/badge/License-MIT-brightgreen)](https://opensource.org/licenses/MIT)

⭐ **Star us on GitHub — your support fuels our motivation!**

🔥 **Discover why Habit Tracker is your ultimate habit-building companion — explore our features below!**

## Table of Contents
- [About](#-about)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Notifications](#-notifications)
- [Getting Started](#-getting-started)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🚀 About

**Habit Tracker** is a cross-platform mobile app designed to help you build and maintain consistent habits effortlessly. Built with **React Native** and **Expo**, powered by **Appwrite** for backend services, and written in **TypeScript**, it offers a modern, intuitive interface with real-time updates, secure authentication. Whether you're tracking daily, weekly, or monthly habits, Habit Tracker keeps you motivated with streak counters and timely reminders.

## ✨ Features

- **Habit Management**: Create, edit, and delete habits with customizable titles, descriptions, and frequencies (Daily, Weekly, Monthly).
- **Streak Tracking**: Stay motivated with visual streak counters for each habit.
- **Real-Time Sync**: Instantly update habit completions across devices using Appwrite’s real-time subscriptions.
- **Secure Authentication**: User login and session management via Appwrite.
- **Cross-Platform**: Runs on iOS, Android, and web with a single codebase.
- **Form Reset**: Habit creation form resets automatically on navigation for a seamless UX.
- **Type Safety**: TypeScript ensures robust, maintainable code.

## 🛠️ Technology Stack

| **Category**          | **Technology**                     |
|-----------------------|------------------------------------|
| **Frontend**          | [![React Native](https://img.shields.io/badge/React%20Native-61DAFB?logo=react)](https://reactnative.dev/) |
| **Framework**         | [![Expo](https://img.shields.io/badge/Expo-000020?logo=expo)](https://expo.dev/) |
| **Routing**           | [![Expo Router](https://img.shields.io/badge/Expo%20Router-000020?logo=expo)](https://docs.expo.dev/router/introduction/) |
| **Backend**           | [![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?logo=appwrite)](https://appwrite.io/) |
| **Language**          | [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/) |
| **State Management**  | React Hooks, Context API           |
| **UI Components**     | [![React Native Paper](https://img.shields.io/badge/React%20Native%20Paper-764ABC)](https://callstack.github.io/react-native-paper/) |
| **Gestures**          | React Native Gesture Handler       |
| **Build Tool**        | [![EAS Build](https://img.shields.io/badge/EAS%20Build-000020?logo=expo)](https://docs.expo.dev/build/introduction/) |

## 📂 Project Structure

```plaintext
├── /app
│   ├── /(tabs)
│   │   ├── _layout.tsx         # Tab navigation with form reset
│   │   ├── index.tsx           # Habit list and completions
│   │   ├── AddHabitScreen.tsx  # Habit creation form
│   ├── _layout.tsx             # Root layout
│   ├── Auth.tsx                # Authentication screen
├── /hooks
│   ├── Auth-context.tsx        # Authentication context
├── /lib
│   ├── appwrite.ts             # Appwrite client
├── /types
│   ├── database.type.ts        # Type definitions for habits
├── app.json                    # Expo configuration
├── .env.local                  # Environment variables
├── package.json                # Dependencies
├── app.json                    # App configurations
├── globals.css                 # Global CSS file (for Nativewind)
├── tsconfig.json
├── tailwind.config.js
├── prettier.config.js
├── metro.config.js
├── babel.config.js
├── cesconfig.json
```


## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo CLI: `npm install -g expo-cli`
- Appwrite Cloud account
- Expo account

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/habit-tracker-app.git
   cd habit-tracker-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
    - Create `.env.local`:
      ```plaintext
      EXPO_PUBLIC_APPWRITE_ENDPOINT="https://[xxx].cloud.appwrite.io/v1"
      EXPO_PUBLIC_APPWRITE_PROJECT_ID="your-project-id"
      EXPO_PUBLIC_APPWRITE_DATABASE_ID="your-databse-id"
      EXPO_PUBLIC_APPWRITE_HABITS_COLLECTION_ID="your-main-collection-id"
      EXPO_PUBLIC_APPWRITE_HABITS_COMPLETION_COLLECTION_ID="your-completion-collection-id"
      EXPO_PUBLIC_APPWRITE_PLATFORM="com.[your-username/name].[appname]"
      ```

4. **Set Up Appwrite**:
    - Create an Appwrite project.
    - Create a new platform under `React-Native` and create a `Bundler_ID`
    - Copy the `Bundler_ID`
    - Create two Databases
    - Set all `Database` permissions:
      ```json
      {
        "read": ["role:All Users"],
        "write": ["role:All Users"],
        "delete": ["role:All Users"],
        "subscribe": ["role:All Users"]
      }
      ```
    - Install dependencies:
      ```bash
      npm install react-native-appwrite
      ```


## 🤝 Contributing

We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push: `git push origin feature/your-feature`.
5. Open a pull request.

**Guidelines**:
- Use TypeScript and Prettier.
- Write clear commit messages.
- Test changes in a development build.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

Reach out via:
- **GitHub Issues**: [Submit an issue](https://github.com/NeeradNandan/habit-tracker-app/issues)

---

**Crafted with 💻 and ☕ on June 5, 2025.**  
[Back to top](#top)