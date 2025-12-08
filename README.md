
<p align="center">  
  <h1 align="center">App Register User</h1>
  
  This project implements a user registration application, providing a complete and secure data entry experience. The application includes:

- Validation of required fields with clear error messages
- Input masking (phone, ZIP code/CEP, and others)
- Phone number validation
- ZIP code/CEP lookup using an external API
- Automatic address filling based on CEP data
- Device location retrieval to complement address and CEP information
- Well-structured and reusable UI components
- A simple and consistent theming system

The purpose of this project is to demonstrate form validation, API integration, and access to native device features within a React Native application built with Expo.

</p>

## 🧭 Table of contents

- [🧭 Table of contents](#-table-of-contents)
- [💡 Technologies Used](#-technologies-used)
- [🚀 Running the Project](#-running-the-project)
  - [Installation](#installation)
  - [Execution](#execution)
- [Technical decisions made](#technical-decisions-made)
- [Future improvements](#future-improvements)
- [🌎 License](#-license)
- [✒ Author](#-author)


## 💡 Technologies Used

- [x] [Expo](https://docs.expo.dev/)
- [x] [React Native](https://reactnative.dev/)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Expo Router](https://docs.expo.dev/router/introduction/)
- [x] [React Hook Form](https://www.react-hook-form.com/)
- [x] [Zod](https://zod.dev/)
- [x] [Axios](https://axios-http.com/ptbr/)
- [x] [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)
- [x] [Phosphor Icons](https://phosphoricons.com/)
- [x] [React Native Toast Message](https://github.com/calintamas/react-native-toast-message)

## 🚀 Running the Project

### Installation

Clone the project

```bash
  git clone https://github.com/VagnerNerves/user-registration-expo-rn.git
```

Enter the project directory

```bash
  cd user-registration-expo-rn
```

Install with dependencies

```bash
  npm install
```

### Execution

Start the app

```bash
  npx expo start
```

Then choose one of the following options:

- Press a to open on Android emulator
- Press i to open on iOS simulator
- Scan the QR code to open on a physical device
- Press w to open on web

## Technical decisions made

- I chose to use React Native's native StyleSheet instead of the NativeWind library. NativeWind often lags behind React Native updates, which can lead to compatibility issues and limited access to newer platform features. Additionally, the current version still depends on an outdated Reanimated v3, reducing the benefits of adopting it. For these reasons, StyleSheet offers greater stability and compatibility throughout the project.
- I adopted a modular folder architecture, separating components, hooks, themes, and utilities. This structure improves maintainability, scalability, and overall project organization.
- I created reusable components (TextApp, Input, ButtonApp), ensuring visual consistency and reducing code duplication.
- I implemented custom hooks (useCep, useLocation, useKeyboardStatus) to encapsulate logic and data handling, keeping the components simpler and more declarative.
- I developed a basic theme system, centralizing colors and font sizes to maintain visual consistency across the entire application.

## Future improvements

- Implement a bottom tab navigation, including a dedicated area for the user registration flow.
- Add data persistence using AsyncStorage or a local database, allowing user information to be saved and loaded.
- Create a user listing and details screen, with options to edit and delete the registered data.
- Complete and expand the unit test coverage.
- Implement dark mode, including a settings screen to allow theme switching.


## 🌎 License

This project is under the MIT license. See the [LICENSE](https://github.com/VagnerNerves/user-registration-expo-rn?tab=MIT-1-ov-file) file for more details.

## ✒ Author

<p align="center">
  <img width="200px" alt="Author Vagner Nerves" title="Author Vagner Nerves" src="https://github.com/VagnerNerves/default-readme/blob/main/assets/VagnerNerves.svg" />

  <h3 align="center">Vagner Nerves</h3>
  
  <p align="center">  
    Made with love and hate 😅, get in touch!
  </p>
</p>  
  
<div align="center">

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-1f6feb?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/vagnernervessantos/)](https://www.linkedin.com/in/vagnernervessantos/) 
[![Gmail Badge](https://img.shields.io/badge/-vagnernervessantos@gmail.com-1f6feb?style=flat-square&logo=Gmail&logoColor=white&link=mailto:vagnernervessantos@gmail.com)](mailto:vagnernervessantos@gmail.com)
[![GitHub Badge](https://img.shields.io/badge/-GitHub-1f6feb?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/VagnerNerves)](https://github.com/VagnerNerves)

</div>
