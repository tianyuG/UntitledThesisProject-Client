# UntitledThesisProject-Client

## Instructions

To compile Encyclopaedia Mundi, you will need git, Node.JS, Electron and yarn. Clone this repository and run `yarn install` to install dependencies.

To compile a portable win32 binary, run `yarn build` in the folder.

## Minimum Hardware Requirement

### For Compiling

Desktop computer with x86-base CPU running Windows 10.

### For Running the Compiled Binary

Desktop computer with x86-base CPU running Windows 10, with at least 300MB free hard disk space.

Per Google's [documentation](https://support.google.com/chrome/a/answer/7100626?hl=en) (this project uses Electron, which in turn uses Chromium):

```
To use Chrome Browser on Windows®, you'll need:

    Windows 7, Windows 8, Windows 8.1, Windows 10 or later
    An Intel Pentium 4 processor or later that's SSE3 capable
```

(Note that this project has only been tested on Windows 10.)

## Flags

Flags will become available when `global.allowCliFlags` is set to `true` in `src/main.js` before compilation.

`--allow-devtools`: Application will be allowed to invoke Chromium DevTools with Ctrl-Shift-I keyboard shortcuts. Note that this flag does not affect `<webview>` tag inside the main window.

`--allow-keyboard-shortcuts`: Application will now respond to previously ignored keyboard shortcuts: full screen (F11) and refresh (F5 or Ctrl-R).

`--force-offline`: Application will always report CRC fault. In this application, 'CRC fault' is a way to indicate that it cannot reach the remote server. If remote server is unreachable, it will repart CRC fault at startup, and will not attempt to fetch article abstract from Wikipedia. Using `--ignore-startup-slowdown` implies that `--force-offline` is set.

`--ignore-offline-nags`: Application will not check if server is reachable. (CRC fault will never be reported.)

`--ignore-startup-slowdown`: Application will ignore the artificial slowdown between the initial splashscreen and main user interface (around 7 seconds; randomly picked). Note that if this flag is set, the application will always think that it cannot reach remote server, regardless of your internet connectivity. Combine this flag with `--ignore-offline-nags` to skip connectivity check.

## Removal

This application, when built, was designed to be portable. To remove it from your computer, you can simply delete the executable file.

Technical details: Encyclopaedia Mundi extracts itself into a temporary folder and removed shortly after closing the application. If you want to be thorough and ensure the temporary files are removed:

1. Open Encyclopaedia Mundi, click on 'About' on the menu bar.
2. In the About dialog, double click on the icon of Encyclopaedia Mundi. Note that this will change the OK button (rightmost button thside this dialog box) to Quit. In addition, the version number (second line) is also changed to a seemingly random string. This string is the name of the temporary folder for Encyclopaedia Mundi.
3. Double click on the random string and it will open your local temporary folder (`C:\Users\%USERNAME%\AppData\Local\Temp`, whereas the `%USERNAME%` is the name of your user account) in File Explorer, with a folder selected. Review the name of this folder, as it should be the same as the string in the About dialog in step 2.
4. Click on the Quit button in the about dialog to quit Encyclopaedia Mundi. You should notice that the highlighted folder in step 3 should disappear from the temporary folder within a few seconds.
