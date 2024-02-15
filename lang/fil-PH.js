// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('ang nanonood');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('Nai-stream');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('panonood')
        && !text.includes('Nai-stream');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Naka-iskedyul')
        || text.includes('Magsisimula');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'LIVE'
        || text === 'Premiere';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('segundo')
        || text.endsWith('minuto')
        || text.endsWith('oras');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'Naka-on ang notification';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Abisuhan ako'
        || text === 'I-notify ako';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('lahat ng notification');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('Mga personalized na notification');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('huwag tumanggap ng mga notification');
}