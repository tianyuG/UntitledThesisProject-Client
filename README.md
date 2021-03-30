# UntitledThesisProject-Client

## Flags

Flags will become available when `global.allowCliFlags` is set to `true` in `src/main.js`.

`--allow-devtools`: Application will be allowed to invoke Chromium DevTools with Ctrl-Shift-I keyboard shortcuts. Note that this flag does not affect `<webview>` tag inside the main window.

`--allow-keyboard-shortcuts`: Application will now respond to previously ignored keyboard shortcuts: full screen (F11) and refresh (F5 or Ctrl-R).

`--force-offline`: Application will always report CRC fault. In this application, 'CRC fault' is a way to indicate that it cannot reach the remote server. If remote server is unreachable, it will repart CRC fault at startup, and will not attempt to fetch article abstract from Wikipedia. Using `--ignore-startup-slowdown` implies that `--force-offline` is set.

`--ignore-offline-nags`: Application will not check if server is reachable. (CRC fault will never be reported.)

`--ignore-startup-slowdown`: Application will ignore the artificial slowdown between the initial splashscreen and main user interface. Note that if this flag is set, the application will always think that it cannot reach remote server, regardless of your internet connectivity. Combine this flag with `--ignore-offline-nags` to skip connectivity check.
