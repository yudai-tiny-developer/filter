// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('人正在觀看');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('直播時間');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('觀看次數')
        && !text.includes('直播時間');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('預定發布時間')
        || text.includes('首播日期');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === '直播'
        || text === '首播';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('秒')
        || text.endsWith('分鐘')
        || text.endsWith('小時');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === '已開啟通知';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === '通知我';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('接收所有通知。');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('接收個人化通知。');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('不接收任何通知。');
}