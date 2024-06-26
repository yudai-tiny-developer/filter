// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('kyk tans');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('Gestroom');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('kyke')
        && !text.includes('Gestroom');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Geskeduleer')
        || text.includes('Première');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'REGSTREEKS'
        || text === 'Première';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('sekonde')
        || text.endsWith('sekondes')
        || text.endsWith('minuut')
        || text.endsWith('minute')
        || text.endsWith('uur');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'Kennisgewing is aan';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Stel my in kennis';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('om alle kennisgewings te ontvang.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('gepersonaliseerde kennisgewings.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('om geen kennisgewings te ontvang nie.');
}