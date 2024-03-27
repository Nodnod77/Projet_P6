# Projet P6 <- Trouver un nom

This is the main repository for the *PROJECT NAME* project.

## Getting started

You will need :

- **npm** for managing external libraries (could be replaced by yarn)
- a **React Native** environment, follow this tutorial : https://reactnative.dev/docs/environment-setup

Once your environment is set up, run `npm start` and once `metro` is running, press 'a' to run on your emulator or on your tablet.

## App structure

Views if the two screen are located in `src/screens` and components used by those in `src/components`.

In the `components` directory you'll also find the `navigation` directory for the stack navigator.

The `context.tsx` is there to disable the back button in the header once an activity is started. There should be a better method for this...

The original configuration of the app is in `src/config/init_files.ts`.