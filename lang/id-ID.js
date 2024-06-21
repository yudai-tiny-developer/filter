// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('menonton');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('Streaming');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('ditonton')
        && !text.includes('Streaming');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Tayang')
        || text.includes('perdana');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'LIVE'
        || text === 'Premiere';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('detik')
        || text.endsWith('menit')
        || text.endsWith('jam');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'Notifikasi aktif';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Beri tahu saya';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('terima semua notifikasi.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('notifikasi hasil personalisasi.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('tidak menerima notifikasi.');
}