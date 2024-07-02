export const storage = [
    'live',
    'streamed',
    'video',
    'short',
    'scheduled',
    'notification_on',
    'notification_off',

    'progress_unwatched',
    'progress_watched',

    'channels_all',
    'channels_personalized',
    'channels_none',

    'keyword',

    'order',

    'default_live',
    'default_streamed',
    'default_video',
    'default_short',
    'default_scheduled',
    'default_notification_on',
    'default_notification_off',

    'default_progress_unwatched',
    'default_progress_watched',

    'default_channels_all',
    'default_channels_personalized',
    'default_channels_none',

    'multiselection',

    'responsive',

    'button_label_live',
    'button_label_streamed',
    'button_label_video',
    'button_label_short',
    'button_label_scheduled',
    'button_label_notification_on',
    'button_label_notification_off',
    'button_label_progress_unwatched',
    'button_label_progress_watched',

    'margin',
];

export const default_order = [
    'live',
    'streamed',
    'video',
    'short',
    'scheduled',
    'notification_on',
    'notification_off',

    'progress_unwatched',
    'progress_watched',

    'channels_all',
    'channels_personalized',
    'channels_none',
];

export function order(order) {
    if (order) {
        const dataOrder = order.split(',');
        return dataOrder.filter(i => default_order.indexOf(i) !== -1).concat(default_order.filter(i => dataOrder.indexOf(i) === -1));
    } else {
        return default_order;
    }
}

export const button_label = {
    all: chrome.i18n.getMessage('button_all'),
    live: chrome.i18n.getMessage('button_live'),
    streamed: chrome.i18n.getMessage('button_streamed'),
    video: chrome.i18n.getMessage('button_video'),
    short: chrome.i18n.getMessage('button_short'),
    scheduled: chrome.i18n.getMessage('button_scheduled'),
    notification_on: chrome.i18n.getMessage('button_notification_on'),
    notification_off: chrome.i18n.getMessage('button_notification_off'),

    progress_all: chrome.i18n.getMessage('button_progress_all'),
    progress_unwatched: chrome.i18n.getMessage('button_progress_unwatched'),
    progress_watched: chrome.i18n.getMessage('button_progress_watched'),

    channels_all: chrome.i18n.getMessage('button_channels_all'),
    channels_personalized: chrome.i18n.getMessage('button_channels_personalized'),
    channels_none: chrome.i18n.getMessage('button_channels_none'),

    clear: chrome.i18n.getMessage('button_clear'),
    search: chrome.i18n.getMessage('button_search'),

    keyword: chrome.i18n.getMessage('button_keyword'),

    visibility: chrome.i18n.getMessage('visibility'),
    default: chrome.i18n.getMessage('default'),

    placeholder: chrome.i18n.getMessage('button_placeholder'),
    progress_placeholder: chrome.i18n.getMessage('button_progress_placeholder'),
    multiselection: chrome.i18n.getMessage('multiselection'),

    responsive: chrome.i18n.getMessage('responsive'),

    margin: chrome.i18n.getMessage('margin'),
};

export const defaultMargin = 100;
export const minMargin = 20;
export const maxMargin = 200;
export const stepMargin = 1;

export function limitMargin(value, defaultValue, minValue, maxValue, stepValue) {
    return step(range(normalize(value, defaultValue), minValue, maxValue), stepValue);
}

function isNumber(value) {
    return Number.isFinite(parseFloat(value));
}

function normalize(value, defaultValue) {
    return isNumber(value) ? value : defaultValue;
}

function range(value, minValue, maxValue) {
    return Math.min(Math.max(value, minValue), maxValue);
}

function step(value, stepValue) {
    const step = 1.0 / stepValue;
    return Math.round(value * step) / step;
}

export function isSubscriptions(url) {
    return url.startsWith('https://www.youtube.com/feed/subscriptions') && !url.startsWith('https://www.youtube.com/feed/subscriptions/shorts')
        ;
}

export function isShorts(url) {
    return url.startsWith('https://www.youtube.com/feed/subscriptions/shorts')
        ;
}

export function isLibrary(url) {
    return url.startsWith('https://www.youtube.com/feed/library')
        || url.startsWith('https://www.youtube.com/feed/you')
        ;
}

export function isHistory(url) {
    return url.startsWith('https://www.youtube.com/feed/history')
        ;
}

export function isPlaylists(url) {
    return url.startsWith('https://www.youtube.com/feed/playlists')
        ;
}

export function isPlaylist(url) {
    return url.startsWith('https://www.youtube.com/playlist?')
        ;
}

export function isChannels(url) {
    return url.startsWith('https://www.youtube.com/feed/channels')
        ;
}

export function isChannel(url) {
    return url.startsWith('https://www.youtube.com/channel/')
        || url.startsWith('https://www.youtube.com/c/')
        || url.startsWith('https://www.youtube.com/@')
        || url.startsWith('https://www.youtube.com/user/')
        ;
}