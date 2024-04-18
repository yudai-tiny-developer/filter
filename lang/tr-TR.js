// div#metadata-line
export function isLive_metadata(text) {
  return text.includes('kullanıcı izliyor');
}

// div#metadata-line
export function isStreamed_metadata(text) {
  return text.includes('yayınlandı');
}

// div#metadata-line
export function isVideo_metadata(text) {
  return text.includes('görüntüleme')
    && !text.includes('yayınlandı');
}

// div#metadata-line
export function isScheduled_metadata(text) {
  return text.includes('tarihi için planlandı')
    || text.includes('tarihinde');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isLive_status_label(text) {
  return text === 'CANLI'
    || text === 'PREMİER';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
export function isVideo_status_label(text) {
  return text.endsWith('önce');
}

// ytd-toggle-button-renderer
export function isNotificationOn_button(text) {
  return text === 'Hatırlatıcı açık';
}

// ytd-toggle-button-renderer
export function isNotificationOff_button(text) {
  return text === 'Bana hatırlat';
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsAllNotifications(text) {
  return text.includes('Şu anda tüm bildirimleri almayı tercih ediyorsunuz.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsPersonalizedNotifications(text) {
  return text.includes('Geçerli ayarda, kişiselleştirilmiş bildirimler alıyorsunuz.');
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
export function isChannelsNoNotifications(text) {
  return text.includes('Şu anda bildirim almamayı tercih ediyorsunuz.');
}