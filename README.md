# UntitledThesisProject-Client

## Flags

Flags will become available when `global.allowCliFlags` is set to `true` in `src/main.js`.

`--allow-devtools`: Application will be allowed to invoke Chromium DevTools with Ctrl-Shift-I keyboard shortcuts. Note that this flag does not affect `<webview>` tag inside the main window.

`--allow-keyboard-shortcuts`: Application will now respond to previously ignored keyboard shortcuts: full screen (F11) and refresh (F5 or Ctrl-R).

`--force-offline`: Application will always report CRC fault. In this application, 'CRC fault' is a way to indicate that it cannot reach the remote server. If remote server is unreachable, it will repart CRC fault at startup, and will not attempt to fetch article abstract from Wikipedia. Using `--ignore-startup-slowdown` implies that `--force-offline` is set.

`--ignore-offline-nags`: Application will not check if server is reachable. (CRC fault will never be reported.)

`--ignore-startup-slowdown`: Application will ignore the artificial slowdown between the initial splashscreen and main user interface. Note that if this flag is set, the application will always think that it cannot reach remote server, regardless of your internet connectivity. Combine this flag with `--ignore-offline-nags` to skip connectivity check.

## Removal

This application, when built, was designed to be portable. To remove it from your computer, you can simply delete the executable file.

Technical details: Encyclopaedia Mundi extracts itself into a temporary folder and only run on your demand. This temporary folder is also cleaned up [every time a disk cleanup is performed](https://support.microsoft.com/en-us/windows/disk-cleanup-in-windows-10-8a96ff42-5751-39ad-23d6-434b4d5b9a68). But if you want to be thorough and remove the temporary files:

1. Open Encyclopaedia Mundi, click on 'About' on the menu bar.
2. In the About dialog, double click on the icon of Encyclopaedia Mundi. This will change the version number (second line) to a seemingly random string. This string is the name of the temporary folder for Encyclopaedia Mundi.
3. Double click on the random string and it will open your local temporary folder (`C:\Users\%USERNAME%\AppData\Local\Temp`, whereas the `%USERNAME%` is the name of your user account) in File Explorer, with a folder selected. Review the name of this folder, as it should be the same as the string in the About dialog in step 2.
4. Quit Encyclopaedia Mundi.
5. Ensure the File Explorer window is active and the folder name in step 2 is highlighted. Right click on the folder, then select delete.
6. Delete the Encyclopaedia Mundi executable file. All traces of Encyclopaedia Mundi should reside in the Recycle Bin after this step.
7. You can optionally empty your Recycle Bin, but make sure it does not contain any file or folder you do not want to delete.
