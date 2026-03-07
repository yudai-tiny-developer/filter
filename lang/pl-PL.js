// div#metadata-line
export function isLive_metadata(text) {
	return text.includes('oglądających');
}

// div#metadata-line
export function isStreamed_metadata(text) {
	return text.includes('Transmisja');
}

// div#metadata-line
export function isVideo_metadata(text) {
	return text.includes('wyświetle') // wyświetleń, wyświetlenia
		&& !text.includes('Transmisja');
}

// div#metadata-line
export function isScheduled_metadata(text) {
	return text.includes('Zaplanowany')
		|| text.includes('premiery');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
	return text === 'Na żywo'
		|| text === 'PREMIERA';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
	return text.endsWith('sekundę')
		|| text.endsWith('sekund')
		|| text.endsWith('minutę')
		|| text.endsWith('minut')
		|| text.endsWith('godzinę')
		|| text.endsWith('godzin');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
	return text === 'Powiadomienie włączone';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
	return text === 'Powiadom mnie';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
	return text.includes('Wszystko');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
	return text.includes('Spersonalizowane');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
	return text.includes('Żadne');
}