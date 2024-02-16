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

    'keyword',

    'multiselection',

    'responsive',
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
};