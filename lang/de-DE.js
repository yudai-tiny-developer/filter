// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('aktive Zuschauer');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('gestreamt');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('Aufruf') // Aufrufe
        && !text.includes('gestreamt');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Geplant')
        || text.includes('Premiere');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'LIVE'
        || text === 'Premiere';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('Sekunde')
        || text.endsWith('Sekunden')
        || text.endsWith('Minute')
        || text.endsWith('Minuten')
        || text.endsWith('Stunde')
        || text.endsWith('Stunden');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'Benachrichtigung aktiviert';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Benachrichtigung aktivieren'
        || text === 'Benachrichtigung erhalten';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('Alle Benachrichtigungen');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('Personalisierte Benachrichtigungen');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('Keine Benachrichtigungen erhalten');
}