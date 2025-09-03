// div#metadata-line
export function isLive_metadata(text) {
	return text.includes('người đang xem');
}

// div#metadata-line
export function isStreamed_metadata(text) {
	return text.includes('Phát');
}

// div#metadata-line
export function isVideo_metadata(text) {
	return text.includes('lượt xem')
		&& !text.includes('Phát');
}

// div#metadata-line
export function isScheduled_metadata(text) {
	return text.includes('Đã lên lịch xuất bản vào')
		|| text.includes('Ngày công chiếu');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
	return text === 'TRỰC TIẾP'
		|| text === 'Ngày công chiếu';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
	return text.endsWith('giây')
		|| text.endsWith('phút')
		|| text.endsWith('giờ');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
	return text === 'Đã bật thông báo';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
	return text === 'Thông báo cho tôi';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
	return text.includes('Cài đặt hiện tại là tất cả thông báo. Hãy nhấn để thay đổi cài đặt thông báo cho');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
	return text.includes('Tùy chọn cài đặt hiện tại là nhận thông báo về video dành riêng cho bạn. Nhấn để thay đổi tùy chọn cài đặt thông báo cho kênh');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
	return text.includes('Cài đặt hiện tại là không nhận thông báo. Hãy nhấn để thay đổi cài đặt thông báo cho');
}