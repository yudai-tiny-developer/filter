// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('spettatori');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('Trasmesso in streaming');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('visualizzazion') // visualizzazione, visualizzazioni
        && !text.includes('Trasmesso in streaming');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Programmato')
        || text.includes('Première');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'DAL VIVO'
        || text === 'Première';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('secondo')
        || text.endsWith('secondi')
        || text.endsWith('minuto')
        || text.endsWith('minuti')
        || text.endsWith('ora')
        || text.endsWith('ore');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'Notifica attivata';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Avvisami';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('Tutte le notifiche');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('Notifiche personalizzate');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('Nessuna notifica');
}