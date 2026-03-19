# Subscription Feed Filter for YouTube

A browser extension that adds filter controls to YouTube so you can quickly narrow subscription feeds and other page views by content type, watch progress, notification state, and keyword search.

## Features

- Adds filters for `Live`, `Streamed`, `Video`, `Shorts`, `Scheduled`, `Posts`, and playlists.
- Adds watch-progress filters such as `Unwatched` and `Watched`.
- Supports keyword search with phrase, `OR`, `NOT`, and grouping operators.
- Lets you set default filters and reorder filter buttons in the settings UI.
- Includes notification filters for subscription channels.
- Can show or hide filters on supported YouTube pages such as Subscriptions, Home, Shorts, History, playlists, hashtag pages, and channel pages.
- Stores settings locally using the browser extension storage API.
- Includes localized messages and language resources for multiple locales.

## Usage

1. Open YouTube.
2. Navigate to a supported page such as Subscriptions or Home.
3. Use the injected filter buttons to narrow the visible feed.
4. Open the extension popup to:
   - toggle filter visibility
   - choose default filters
   - reorder filter buttons
   - configure keyword and suggestion queries
   - enable or disable filters for specific YouTube page types
   - reset all settings

## Project Structure

- `manifest.json`: Chrome-compatible Manifest V3 definition.
- `browser_specific_settings.json`: Firefox-specific extension metadata merged during Firefox packaging.
- `content.js`: Main content script injected into `https://www.youtube.com/*`.
- `content.css`: Styles for injected filter UI.
- `popup.html`, `popup.js`, `popup.css`: Extension popup and options page.
- `common.js`: Shared constants, defaults, and utility helpers.
- `settings.js`: Settings UI creation, drag/drop ordering, and reset behavior.
- `progress.js`: Reset progress UI helper.
- `_locales/`: Localized extension messages.
- `lang/`: Language-specific resources loaded by the extension.

## License

This project is licensed under dual licenses:
*   [Apache License 2.0](LICENSE-APACHE)
*   [MIT License](LICENSE-MIT)
