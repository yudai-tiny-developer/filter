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
    return text.includes('vue') // vues
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
    return text === 'Notification activée';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === "M'avertir"
        || text === 'Recevoir une notification';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('Recevoir toutes les notifications');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('Notifications personnalisées');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('Aucune notification');
}