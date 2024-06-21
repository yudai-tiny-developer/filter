// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('watching');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('Streamed');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('view') // views
        && !text.includes('Streamed');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Scheduled')
        || text.includes('Premieres');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'LIVE'
        || text === 'Premiere';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('second')
        || text.endsWith('seconds')
        || text.endsWith('minute')
        || text.endsWith('minutes')
        || text.endsWith('hour')
        || text.endsWith('hours');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'Notification on';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Notify me';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('all notifications.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('personalised notifications.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('receive no notifications.');
}