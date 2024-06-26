// div#metadata-line
export function isLive_metadata(text) {
    return text.includes('ดูอยู่');
}

// div#metadata-line
export function isStreamed_metadata(text) {
    return text.includes('สตรีมแล้วเมื่อ');
}

// div#metadata-line
export function isVideo_metadata(text) {
    return text.includes('การดู')
        && !text.includes('สตรีมแล้วเมื่อ');
}

// div#metadata-line
export function isScheduled_metadata(text) {
    return text.includes('กำหนดเผยแพร่')
        || text.includes('แสดงครั้งแรกเมื่อวันที่');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
    return text === 'สด'
        || text === 'วิดีโอพรีเมียร์';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
    return text.endsWith('วินาที')
        || text.endsWith('นาที')
        || text.endsWith('ชั่วโมง');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
    return text === 'เปิดการแจ้งเตือนแล้ว';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
    return text === 'แจ้งเตือนให้ฉันทราบ';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
    return text.includes('รับการแจ้งเตือนทั้งหมด');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
    return text.includes('รับการแจ้งเตือนที่ปรับเปลี่ยนในแบบของคุณ');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
    return text.includes('ไม่รับการแจ้งเตือน');
}