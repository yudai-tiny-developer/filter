// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('視聴中');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('配信済み');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('回視聴')
        && !text.includes('配信済み');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('公開予定')
        || text.includes('プレミア公開');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'ライブ'
        || text === 'プレミア公開';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('秒')
        || text.endsWith('分')
        || text.endsWith('時間');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === '通知オン'
        || text === '通知がオンです';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === '通知する'
        || text === '通知を受け取る';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('すべての通知を受け取る');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('カスタマイズされた通知を受け取る');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('通知を受け取らない');
}