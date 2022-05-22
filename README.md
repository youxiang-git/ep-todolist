# Movie App with Ionic React Framework

This demo app is using the Ionic 6 React Framework and MobX stores. It can also be used as a boilerplate.

## Quick Start

### Install or upgrade Ionic CLI

-   npm uninstall -g ionic
-   npm install -g @ionic/cli

### Run React

1. Open another bash terminal on project root dir
1. Install
    - npm install
1. Run
    - npm start
1. Connect browser to http://localhost:8100
1. Test
    - npm test

## Project Structure

```
<rootDir>
    |__src
        |__index.tsx (ReactDOM)
        |__App.tsx (main app where routes are defined)
        |__theme (theme colors are defined here)
        |__pages (main pages for the routes)
        |__stores (Mobx data stores)
        |__auth (authentication module)
        |__components
            |__common (common components e.g. AppHeader etc)
            |__ (other components)
```

## Styling Ionic Components with CSS

There are 2 ways with the styled components.

```ts
import styled from 'styled-components';
```

### Method 1: Scoping CSS to an IonPage

```jsx
const MyPage = styled(IonPage)`
    .box {
        border: 1px solid white;
        margin: 10px;
        height: 200px;
        width: 200px;
    }
`;

return (
    <MyPage>
        <IonHeader>...</IonHeader>
        <IonContent fullscreen>
            <div className="box"></div>
        </IonContent>
    </MyPage>
);
```

### Method 2: Styling an Ionic Component

```jsx
const MyIcon = styled(IonIcon)`
    margin-right: 10px;
`;

const MyButton = styled(IonButton)`
    &::part(native) {
        background-color: green;
    }
`;

return (
    <>
        <MyIcon ios={constructOutline} md={constructOutline} />
        <MyButton> Manage Account </MyButton>
    </>
);
```

## Unit Test for Ionic React

> [The more your tests resemble the way your software is used, the more
> confidence they can give you.][guiding-principle]

To keep things simple, design the test cases to be close to how your users would interact with your app i.e. given the inputs (e.g. enter values, mouse click etc.), what should be the expected outputs (e.g. component/text to be rendered etc.)

Avoid interfering the inner workings e.g. rendering logic, state management etc.

Useful References:

-   [React Testing Library Cheat Sheet](https://www.codecademy.com/learn/learn-react-testing/modules/react-testing-library/cheatsheet)
-   [Testing Ionic React Apps with Jest and React Testing Library](https://ionicframework.com/blog/testing-ionic-react-apps-with-jest-and-react-testing-library/?_gl=1*11coi2c*_ga*MTM1NDM4MDMwNy4xNjUwOTgyNTkw*_ga_REH9TJF6KF*MTY1MzExMzE5MC40LjEuMTY1MzExMzcyMy4w)

## Adding Mobile Platforms

The ios option is only available for MacOS

-   Adding: ionic cap add [ android | ios ]
-   Open for Dev: ionic cap open [ android | ios ]
-   Sync the changes: ionic cap sync [ android | ios ]
-   Live Reload: npm run [ android | ios ]
-   Chrome Physical Device Inpsect: `chrome://inspect/#devices` on Chrome

More development instructions:

-   [Developing for iOS](https://ionicframework.com/docs/developing/ios)
-   [Developing for Android](https://ionicframework.com/docs/developing/android)
-   [Live Reload](https://capacitorjs.com/docs/guides/live-reload)
-   [Remote Debugging](https://ionicframework.com/docs/troubleshooting/debugging)

## Known Issues for Android

### ERR_CLEARTEXT_NOT_PERMITTED in Android

Add this to the `android/app/src/main/AndroidManifest.xml` in the application element

```xml
<application
    android:usesCleartextTraffic="true"
```

### JAVA HOME Error

Try to use Java 8 or 11 instead of the latest version. If you have installed latest version earlier, you'll have to invalidate the gradle cache in Android Studio.

### Missing 'capacitor.settings.gradle' as it does not exist.

Run `ionic cap sync android`

### Java Issues

Be sure to install the JDK for your OS and set the bin to the PATH.

## Known Issues and Workarounds for Apple M1 CPU

This section covered the encountered issues if you are using the new Apple M1 CPU.

### No such module 'Capacitor'

You may encounter error when compiling and running the iOS App in XCode

Workaround:

-   Outside of project folder, run: `sudo arch -x86_64 gem install ffi`
-   CD to the folder where Podfile is e.g. `ios/App`, run: `arch -x86_64 pod install`

Reference: https://developer.apple.com/forums/thread/652822

For xcodebuild error

-   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

Reference: https://github.com/nodejs/node-gyp/issues/569

[libvips error](https://github.com/lovell/sharp/issues/2460):

```
brew install pkg-config glib zlib
brew install libjpeg-turbo libpng webp
```

Download the [libvips tarball](https://github.com/libvips/libvips/releases) and uncompress it into a folder.

# in the libvips source folder, run the following:

```
PKG_CONFIG_PATH=/opt/homebrew/Cellar/zlib/1.2.11/lib/pkgconfig ./configure
make
sudo make install
```

npm install --arch=arm64 --platform=linuxmusl sharp
