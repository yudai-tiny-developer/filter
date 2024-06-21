// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('시청 중');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('스트리밍 시간');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('조회수')
        && !text.includes('스트리밍 시간');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('예정일')
        || text.includes('최초');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === '실시간'
        || text === 'Premieres 동영상';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('초')
        || text.endsWith('분')
        || text.endsWith('시간');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === '알림 사용 중';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === '알림 받기';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('모든 알림 수신입니다.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('맞춤설정 알림 수신입니다.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('알림 수신 안함입니다.');
}