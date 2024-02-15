// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('spectateurs');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('Diffusé');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('visionnement') // visionnements
        && !text.includes('Diffusé');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Planifié')
        || text.includes('Première');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'EN DIRECT'
        || text === 'Première';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('seconde')
        || text.endsWith('secondes')
        || text.endsWith('minute')
        || text.endsWith('minutes')
        || text.endsWith('heure')
        || text.endsWith('heures');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'Notifications activées';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Me prévenir'
        || text === "M'informer";
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('recevoir toutes les notifications.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('recevoir les notifications personnalisées.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('ne recevoir aucune notification.');
}