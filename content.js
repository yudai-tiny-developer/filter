// div#metadata-line
function isLive_metadata(text) {
	return text.includes('watching') // English (US)
		|| text.includes('視聴中') // 日本語
		|| text.includes('menonton') // Bahasa Indonesia
		|| text.includes('시청 중') // 한국어
		|| text.includes('人正在觀看') // 中文 (繁體)
		;
}

// div#metadata-line
function isStreamed_metadata(text) {
	return text.includes('Streamed') // English (US)
		|| text.includes('配信済み') // 日本語
		|| text.includes('Streaming') // Bahasa Indonesia
		|| text.includes('스트리밍 시간') // 한국어
		|| text.includes('直播時間') // 中文 (繁體)
		;
}

// div#metadata-line
function isVideo_metadata(text) {
	return (text.includes('views') // English (US)
		|| text.includes('回視聴')) // 日本語
		|| text.includes('ditonton') // Bahasa Indonesia
		|| text.includes('조회수') // 한국어
		|| text.includes('觀看次數') // 中文 (繁體)

		&& !text.includes('Streamed') // English (US)
		&& !text.includes('配信済み') // 日本語
		&& !text.includes('Streaming') // Bahasa Indonesia
		&& !text.includes('스트리밍 시간') // 한국어
		&& !text.includes('直播時間') // 中文 (繁體)
		;
}

// div#metadata-line
function isScheduled_metadata(text) {
	return text.includes('Scheduled') // English (US)
		|| text.includes('公開予定') // 日本語
		|| text.includes('Tayang') // Bahasa Indonesia
		|| text.includes('예정일') // 한국어
		|| text.includes('預定發布時間') // 中文 (繁體)

		|| text.includes('Premieres') // English (US)
		|| text.includes('プレミア公開') // 日本語
		|| text.includes('perdana') // Bahasa Indonesia
		|| text.includes('최초') // 한국어
		|| text.includes('首播日期') // 中文 (繁體)
		;
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
function isLive_status_label(text) {
	return text === 'LIVE' // English (US), Bahasa Indonesia
		|| text === 'ライブ' // 日本語
		|| text === '실시간' // 한국어
		|| text === '直播' // 中文 (繁體)
		;
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
function isVideo_status_label(text) {
	return text.endsWith('second') || text.endsWith('seconds') // English (US)
		|| text.endsWith('秒') // 日本語, 中文 (繁體)
		|| text.endsWith('detik') // Bahasa Indonesia
		|| text.endsWith('초') // 한국어

		|| text.endsWith('minute') || text.endsWith('minutes') // English (US)
		|| text.endsWith('分') // 日本語
		|| text.endsWith('menit') // Bahasa Indonesia
		|| text.endsWith('분') // 한국어
		|| text.endsWith('分鐘') // 中文 (繁體)

		|| text.endsWith('hour') || text.endsWith('hours') // English (US)
		|| text.endsWith('時間') // 日本語
		|| text.endsWith('jam') // Bahasa Indonesia
		|| text.endsWith('시간') // 한국어
		|| text.endsWith('小時') // 中文 (繁體)
		;
}

// ytd-toggle-button-renderer
function isNotificationOn_button(text) {
	return text === 'Notification on' // English (US)
		|| text === '通知オン' // 日本語
		|| text === 'Notifikasi aktif' // Bahasa Indonesia
		|| text === '알림 사용 중' // 한국어
		|| text === '已開啟通知' // 中文 (繁體)
		;
}

// ytd-toggle-button-renderer
function isNotificationOff_button(text) {
	return text === 'Notify me' // English (US)
		|| text === '通知する' // 日本語
		|| text === 'Beri tahu saya' // Bahasa Indonesia
		|| text === '알림 받기' // 한국어
		|| text === '通知我' // 中文 (繁體)
		;
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
function isChannelsAllNotifications(text) {
	return text.includes('all notifications.') // English (US)
		|| text.includes('すべての通知を受け取る') // 日本語
		|| text.includes('terima semua notifikasi.') // Bahasa Indonesia
		|| text.includes('모든 알림 수신입니다.') // 한국어
		|| text.includes('接收所有通知。') // 中文 (繁體)
		;
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
function isChannelsPersonalizedNotifications(text) {
	return text.includes('personalized notifications.') // English (US)
		|| text.includes('カスタマイズされた通知を受け取る') // 日本語
		|| text.includes('notifikasi hasil personalisasi.') // Bahasa Indonesia
		|| text.includes('맞춤설정 알림 수신입니다.') // 한국어
		|| text.includes('接收個人化通知。') // 中文 (繁體)
		;
}

// ytd-subscription-notification-toggle-button-renderer button#button[aria-label]
function isChannelsNoNotifications(text) {
	return text.includes('receive no notifications.') // English (US)
		|| text.includes('通知を受け取らない') // 日本語
		|| text.includes('tidak menerima notifikasi.') // Bahasa Indonesia
		|| text.includes('알림 수신 안함입니다.') // 한국어
		|| text.includes('不接收任何通知。') // 中文 (繁體)
		;
}

function updateButtonVisibility(node) {
	if (window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'inline-flex');

		node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');

		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/feed/library')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'inline-flex');

		node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');

		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/feed/history')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');

		node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');

		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/playlist')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'inline-flex');

		node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');

		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/feed/channels')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');

		node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'inline-flex');

		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/channel/') || window.location.href.startsWith('https://www.youtube.com/c/')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');

		node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');

		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else {
		node.querySelectorAll('span.filter-button').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'none');
	}
}

function isMenuTarget() {
	return window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')
		|| window.location.href.startsWith('https://www.youtube.com/feed/library')
		|| window.location.href.startsWith('https://www.youtube.com/feed/history')
		|| window.location.href.startsWith('https://www.youtube.com/playlist')
		|| window.location.href.startsWith('https://www.youtube.com/feed/channels')
		|| window.location.href.startsWith('https://www.youtube.com/channel/')
		|| window.location.href.startsWith('https://www.youtube.com/c/');
}

function isFloatingTarget() {
	return window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')
		|| window.location.href.startsWith('https://www.youtube.com/feed/library')
		|| window.location.href.startsWith('https://www.youtube.com/feed/history')
		|| window.location.href.startsWith('https://www.youtube.com/playlist')
		|| window.location.href.startsWith('https://www.youtube.com/feed/channels');
}

function classifyStatus(node) {
	let status = '';

	const metadata = node.querySelector('div#metadata-line');
	if (metadata) {
		const t = metadata.textContent;
		if (isLive_metadata(t)) {
			status += 'live.';
		} else if (isStreamed_metadata(t)) {
			status += 'streamed.';
		} else if (isVideo_metadata(t)) {
			status += 'video.';
		} else if (isScheduled_metadata(t)) {
			status += 'scheduled.';
		} else if (t.match(/^\s*$/)) { // playlist
			const label = node.querySelector('span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]');
			if (label) {
				const t = label.attributes['aria-label'].value;
				if (isLive_status_label(t)) {
					status += 'live.';
				} else if (isVideo_status_label(t)) {
					status += 'video.';
				}
			}
		} else { // Members-only videos
			status += 'video.';
		}
	}

	const button = node.querySelector('ytd-toggle-button-renderer');
	if (button) {
		const t = button.textContent;
		if (isNotificationOn_button(t)) {
			status += 'notification_on.';
		} else if (isNotificationOff_button(t)) {
			status += 'notification_off.';
		}
	}

	const notification = node.querySelector('ytd-subscription-notification-toggle-button-renderer button#button[aria-label]');
	if (notification) {
		const t = notification.attributes['aria-label'].value;
		if (isChannelsAllNotifications(t)) {
			status += 'channels_all.';
		} else if (isChannelsPersonalizedNotifications(t)) {
			status += 'channels_personalized.';
		} else if (isChannelsNoNotifications(t)) {
			status += 'channels_none.';
		}
	}

	return status;
}

function matchTextContent(node) {
	if (node.nodeName === 'YTD-GRID-VIDEO-RENDERER'
		|| (node.nodeName === 'YTD-VIDEO-RENDERER' && !node.classList.contains('ytd-backstage-post-renderer'))) {
		const title = node.querySelector('a#video-title');
		if (title) {
			return title.textContent.match(queryRegex);
		}
	} else if (node.nodeName === 'YTD-PLAYLIST-VIDEO-RENDERER') {
		const meta = node.querySelector('div#meta');
		if (meta) {
			return meta.textContent.match(queryRegex);
		}
	} else if (node.nodeName === 'YTD-CHANNEL-RENDERER') {
		const info = node.querySelector('div#info');
		if (info) {
			return info.textContent.match(queryRegex);
		}
	} else if (node.nodeName === 'YTD-BACKSTAGE-POST-THREAD-RENDERER') {
		const post = node.querySelector('div#content');
		if (post) {
			return post.textContent.match(queryRegex);
		}
	}

	console.warn('Unknown node: ' + node.nodeName);
}

function updateVisibility(updateVisibilityFunction, input) {
	queryString = input.value;
	queryRegex = new RegExp(queryString.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&'), 'i');
	app.querySelectorAll('input#filter-query').forEach(e => e.value = queryString);

	// subscriptions?flow=1, library
	app.querySelectorAll('ytd-grid-video-renderer').forEach(n => updateVisibilityFunction(n, 'video'));

	// subscriptions?flow=2, history
	app.querySelectorAll('ytd-video-renderer:not(.ytd-backstage-post-renderer)').forEach(n => updateVisibilityFunction(n, 'video'));

	// playlist
	app.querySelectorAll('ytd-playlist-video-renderer').forEach(n => updateVisibilityFunction(n, 'playlist'));

	// channels
	app.querySelectorAll('ytd-channel-renderer').forEach(n => updateVisibilityFunction(n, 'channel'));
	app.querySelectorAll('ytd-backstage-post-thread-renderer').forEach(n => updateVisibilityFunction(n, 'channel'));
}

function insertMenu(node) {
	const browse = searchParentNode(node, 'YTD-BROWSE');
	if (browse && !browse.querySelector('div.filter-menu')) {
		const sibling = browse.querySelector('ytd-two-column-browse-results-renderer');
		if (sibling) {
			browse.insertBefore(createMenu(isFloatingTarget()), sibling);
			browse.insertBefore(createSpacer(), sibling);

			updateMenuVisibility(browse);
			updateButtonVisibility(browse);
			updateVisibility_QuerySelector(browse);
		} else {
			console.warn('ytd-two-column-browse-results-renderer not found');
		}
	}
}

function updateVisibility_Status(node, display_type, status) {
	if ((!status || classifyStatus(node).includes(status)) && matchTextContent(node)) {
		switch (display_type) {
			case 'channel':
				node.style.display = 'block';
				break;
			case 'playlist':
				node.style.display = 'flex';
				break;
			default:
				node.style.display = 'inline-block';
		}
	} else {
		node.style.display = 'none';
	}
}

function updateVisibility_Always(node, display_type) {
	updateVisibility_Status(node, display_type)
}

function updateVisibility_Live(node, display_type) {
	updateVisibility_Status(node, display_type, 'live.');
}

function updateVisibility_Streamed(node, display_type) {
	updateVisibility_Status(node, display_type, 'streamed.');
}

function updateVisibility_Video(node, display_type) {
	updateVisibility_Status(node, display_type, 'video.');
}

function updateVisibility_Scheduled(node, display_type) {
	updateVisibility_Status(node, display_type, 'scheduled.');
}

function updateVisibility_notification_on(node, display_type) {
	updateVisibility_Status(node, display_type, 'notification_on.');
}

function updateVisibility_channels_all(node, display_type) {
	updateVisibility_Status(node, display_type, 'channels_all.');
}

function updateVisibility_channels_personalized(node, display_type) {
	updateVisibility_Status(node, display_type, 'channels_personalized.');
}

function updateVisibility_channels_none(node, display_type) {
	updateVisibility_Status(node, display_type, 'channels_none.');
}

function updateVisibility_ActiveMode(node, display_type) {
	switch (activeMode) {
		case 'all':
			updateVisibility_Always(node, display_type);
			break;
		case 'live':
			updateVisibility_Live(node, display_type);
			break;
		case 'streamed':
			updateVisibility_Streamed(node, display_type);
			break;
		case 'video':
			updateVisibility_Video(node, display_type);
			break;
		case 'scheduled':
			updateVisibility_Scheduled(node, display_type);
			break;
		case 'notification_on':
			updateVisibility_notification_on(node, display_type);
			break;
		case 'channels_all':
			updateVisibility_channels_all(node, display_type);
			break;
		case 'channels_personalized':
			updateVisibility_channels_personalized(node, display_type);
			break;
		case 'channels_none':
			updateVisibility_channels_none(node, display_type);
			break;
	}
}

function updateMenuVisibility(node) {
	if (isMenuTarget()) {
		node.querySelectorAll('div.filter-menu').forEach(n => n.style.display = 'flex');
		node.querySelectorAll('div.filter-spacer').forEach(n => n.style.display = 'flex');
	} else {
		node.querySelectorAll('div.filter-menu').forEach(n => n.style.display = 'none');
		node.querySelectorAll('div.filter-spacer').forEach(n => n.style.display = 'none');
	}
}

function searchParentNode(node, nodeName) {
	for (let n = node; n; n = n.parentNode) {
		if (n.nodeName === nodeName) {
			return n;
		}
	}
}

function changeMode(mode) {
	activeMode = mode;

	app.querySelectorAll('span.filter-button').forEach(n => n.classList.remove('selected'));
	app.querySelectorAll('span.filter-button.' + mode).forEach(n => n.classList.add('selected'));
}

function updateVisibility_QuerySelector(node) {
	const selectedButton = node.querySelector('span.filter-button.selected');
	if (selectedButton) {
		const input = node.querySelector('input#filter-query');
		if (input) {
			if (selectedButton.style.display === 'none') {
				changeMode('all');
			}

			updateVisibility(updateVisibility_ActiveMode, input);
		}
	}
}

function createButton(text, mode, updateVisibilityFunction, input) {
	const button = document.createElement('span');
	button.innerHTML = text;
	button.classList.add('filter-button');
	button.classList.add(mode);

	if (mode === activeMode) {
		button.classList.add('selected');
	}

	button.addEventListener('click', () => {
		changeMode(mode);
		updateVisibility(updateVisibilityFunction, input);
	});

	return button;
}

function createClearButton(input, menu) {
	const button = document.createElement('span');
	button.innerHTML = button_clear;
	button.classList.add('filter-query');
	button.classList.add('clear');

	button.addEventListener('click', () => {
		input.value = '';
		updateVisibility_QuerySelector(menu);
	});

	return button;
}

function createSearchButton(menu) {
	const button = document.createElement('span');
	button.innerHTML = button_search;
	button.classList.add('filter-query');
	button.classList.add('search');

	button.addEventListener('click', () => {
		updateVisibility_QuerySelector(menu);
	});

	return button;
}

function createQueryInputArea(input, menu) {
	const inputArea = document.createElement('span');
	inputArea.classList.add('filter-query');
	inputArea.classList.add('area');
	inputArea.appendChild(input);
	inputArea.appendChild(createClearButton(input, menu));
	inputArea.appendChild(createSearchButton(menu));
	return inputArea;
}

function createQueryInput(menu) {
	const input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('placeholder', ' ');
	input.id = 'filter-query';
	input.value = queryString;

	input.addEventListener('change', e => {
		updateVisibility_QuerySelector(menu);
	});

	return input;
}

function createMenu(floating) {
	const menu = document.createElement('div');
	menu.classList.add('filter-menu');

	if (floating) {
		menu.style.position = 'fixed';
		menu.style.zIndex = '2000';
	}

	const input = createQueryInput(menu);

	menu.appendChild(createButton(button_all, 'all', updateVisibility_Always, input));
	menu.appendChild(createButton(button_live, 'live', updateVisibility_Live, input));
	menu.appendChild(createButton(button_streamed, 'streamed', updateVisibility_Streamed, input));
	menu.appendChild(createButton(button_video, 'video', updateVisibility_Video, input));
	menu.appendChild(createButton(button_scheduled, 'scheduled', updateVisibility_Scheduled, input));
	menu.appendChild(createButton(button_notification_on, 'notification_on', updateVisibility_notification_on, input));

	menu.appendChild(createButton(button_channels_all, 'channels_all', updateVisibility_channels_all, input));
	menu.appendChild(createButton(button_channels_personalized, 'channels_personalized', updateVisibility_channels_personalized, input));
	menu.appendChild(createButton(button_channels_none, 'channels_none', updateVisibility_channels_none, input));

	menu.appendChild(createQueryInputArea(input, menu));

	return menu;
}

function createSpacer() {
	const spacer = document.createElement('div');
	spacer.classList.add('filter-spacer');
	return spacer;
}

function onViewChanged() {
	updateMenuVisibility(app);
	updateButtonVisibility(app);
	updateVisibility_QuerySelector(app);
}

function onNodeLoaded(node) {
	if (node.nodeName === 'YTD-SECTION-LIST-RENDERER') {
		insertMenu(node);
	} else if (node.nodeName === 'YTD-GRID-VIDEO-RENDERER'
		|| (node.nodeName === 'YTD-VIDEO-RENDERER' && !node.classList.contains('ytd-backstage-post-renderer'))) {
		updateVisibility_ActiveMode(node, 'video');
	} else if (node.nodeName === 'YTD-THUMBNAIL-OVERLAY-TIME-STATUS-RENDERER') { // playlist video lazy load
		if (window.location.href.startsWith('https://www.youtube.com/playlist')) {
			const video = searchParentNode(node, 'YTD-PLAYLIST-VIDEO-RENDERER');
			if (video) {
				updateVisibility_ActiveMode(video, 'playlist');
			}
		}
	} else if (node.nodeName === 'YTD-CHANNEL-RENDERER') {
		updateVisibility_ActiveMode(node, 'channel');
	} else if (node.nodeName === 'YTD-BACKSTAGE-POST-THREAD-RENDERER') {
		updateVisibility_ActiveMode(node, 'channel');
	}
}

// mode: 'all', 'live', 'streamed', 'video', 'scheduled', 'notification_on', 'channels_all', 'channels_personalized', 'channels_none'
// status: 'live.', 'streamed.', 'video.', 'scheduled.', 'notification_on.', 'notification_off.', 'channels_all.', 'channels_personalized.', 'channels_none.'
// display_type: 'video', 'playlist', 'channel'

const button_all = chrome.i18n.getMessage('button_all');
const button_live = chrome.i18n.getMessage('button_live');
const button_streamed = chrome.i18n.getMessage('button_streamed');
const button_video = chrome.i18n.getMessage('button_video');
const button_scheduled = chrome.i18n.getMessage('button_scheduled');
const button_notification_on = chrome.i18n.getMessage('button_notification_on');
const button_clear = chrome.i18n.getMessage('button_clear');
const button_search = chrome.i18n.getMessage('button_search');
const button_channels_all = chrome.i18n.getMessage('button_channels_all');
const button_channels_personalized = chrome.i18n.getMessage('button_channels_personalized');
const button_channels_none = chrome.i18n.getMessage('button_channels_none');

const app = document.querySelector('ytd-app');

let activeMode = 'all';
let queryString = '';
let queryRegex;

new MutationObserver((mutations, observer) => {
	for (const m of mutations) {
		if (m.target.nodeName === 'TITLE') {
			onViewChanged();
			return;
		}
	}
}).observe(document.head, {
	subtree: true,
	childList: true,
});

new MutationObserver((mutations, observer) => {
	for (const m of mutations) {
		onNodeLoaded(m.target);
		m.addedNodes.forEach(n => onNodeLoaded(n));
	}
}).observe(app, {
	subtree: true,
	childList: true,
});

app.querySelectorAll('ytd-section-list-renderer').forEach(n => insertMenu(n));
