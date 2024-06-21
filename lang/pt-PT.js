// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('a ver');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('Transmitido');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('visualizaç') // visualização, visualizações
        && !text.includes('Transmitido');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('Agendado')
        || text.includes('Estreia');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'EM DIRETO'
        || text === 'Estreia';
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
    return text === 'Notificação ativada';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'Notificar-me';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('receber todas as notificações.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('a de receber notificações personalizadas.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('não receber notificações.');
}