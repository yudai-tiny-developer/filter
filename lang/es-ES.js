// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('usuarios');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('Emitido');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('visualizaci') // visualización, visualizaciones
        && !text.includes('Emitido');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Programado')
        || text.includes('Fecha de estreno');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'EN DIRECTO'
        || text === 'Estreno';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('segundo')
        || text.endsWith('segundos')
        || text.endsWith('minuto')
        || text.endsWith('minutos')
        || text.endsWith('hora')
        || text.endsWith('horas');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'Notificación activada';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Notificarme';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('recibes todas las notificaciones.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('recibes notificaciones personalizadas.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('no recibes notificaciones.');
}