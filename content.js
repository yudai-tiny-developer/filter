// div#metadata-line
function isLive_metadata(text) {
	return text.includes('watching')
		|| text.includes('視聴中');
}

// div#metadata-line
function isVideo_metadata(text) {
	return text.includes('views')
		|| text.includes('Streamed')
		|| text.includes('回視聴')
		|| text.includes('配信済み');
}

// div#metadata-line
function isScheduled_metadata(text) {
	return text.includes('Scheduled')
		|| text.includes('Premieres')
		|| text.includes('公開予定')
		|| text.includes('プレミア公開');
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
function isLive_status_label(text) {
	return text === 'LIVE'
		|| text === 'ライブ';
}

// span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]
function isVideo_status_label(text) {
	return text.endsWith('second')
		|| text.endsWith('seconds')
		|| text.endsWith('minute')
		|| text.endsWith('minutes')
		|| text.endsWith('hour')
		|| text.endsWith('hours')
		|| text.endsWith('秒')
		|| text.endsWith('分')
		|| text.endsWith('時間');
}

// ytd-toggle-button-renderer
function isNotificationOn_button(text) {
	return text.includes('Notification on')
		|| text.includes('通知オン');
}

// ytd-toggle-button-renderer
function isNotificationOff_button(text) {
	return text.includes('Notify me')
		|| text.includes('通知する');
}

function updateButtonVisibility(node) {
	if (window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.search').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/feed/library')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.search').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/feed/history')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.search').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/playlist')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.search').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/feed/channels')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.search').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else if (window.location.href.startsWith('https://www.youtube.com/channel/')) {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-button.search').forEach(n => n.style.display = 'inline-flex');
		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'inline-flex');
	} else {
		node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-button.search').forEach(n => n.style.display = 'none');
		node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'none');
	}
}

function isMenuTarget() {
	return window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')
		|| window.location.href.startsWith('https://www.youtube.com/feed/library')
		|| window.location.href.startsWith('https://www.youtube.com/feed/history')
		|| window.location.href.startsWith('https://www.youtube.com/playlist')
		|| window.location.href.startsWith('https://www.youtube.com/feed/channels')
		|| window.location.href.startsWith('https://www.youtube.com/channel/');
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
				} else {
					console.warn('Unknown label: ' + t);
				}
			}
		} else {
			console.warn('Unknown metadata: ' + t);
		}
	}

	const button = node.querySelector('ytd-toggle-button-renderer');
	if (button) {
		const t = button.textContent;
		if (isNotificationOn_button(t)) {
			status += 'notification_on.';
		} else if (isNotificationOff_button(t)) {
			status += 'notification_off.';
		} else {
			console.warn('Unknown button: ' + t);
		}
	}

	return status;
}

function matchTextContent(node) {
	// video
	const title = node.querySelector('a#video-title');
	if (title) {
		return title.textContent.match(queryRegex);
	}

	// playlist
	const meta = node.querySelector('div#meta');
	if (meta) {
		return meta.textContent.match(queryRegex);
	}

	// channel
	const info = node.querySelector('div#info');
	if (info) {
		return info.textContent.match(queryRegex);
	}

	console.warn('Unknown content: ' + node.textContent);
}

function updateVisibility(updateVisibilityFunction) {
	// subscriptions?flow=1, library
	app.querySelectorAll('ytd-grid-video-renderer').forEach(n => updateVisibilityFunction(n, 'video'));

	// subscriptions?flow=2, history
	app.querySelectorAll('ytd-video-renderer').forEach(n => updateVisibilityFunction(n, 'video'));

	// playlist
	app.querySelectorAll('ytd-playlist-video-renderer').forEach(n => updateVisibilityFunction(n, 'playlist'));

	// channels
	app.querySelectorAll('ytd-channel-renderer').forEach(n => updateVisibilityFunction(n, 'channel'));
}

function insertMenu(node) {
	if (!node.querySelector('div.filter-menu')) {
		const container = node.querySelector('div#header-container');
		if (container) {
			const header = container.querySelector('div#header');
			if (header) {
				container.insertBefore(createMenu(isFloatingTarget()), header);
				container.insertBefore(createSpacer(), header);

				updateMenuVisibility(container);
				updateButtonVisibility(container);
				clickDefaultButtonIfSelectedHidden(container);
			} else {
				console.warn('div#header not found');
			}
		} else {
			console.warn('div#header-container not found');
		}
	}
}

function updateVisibility_Always(node, display_type) {
	if (display_type === 'playlist') {
		node.style.display = 'flex';
	} else {
		node.style.display = 'inline-block';
	}
}

function updateVisibility_Status(node, display_type, status) {
	if (display_type === 'channel') {
		node.style.display = 'block';
	} else if (classifyStatus(node).includes(status)) {
		if (display_type === 'playlist') {
			node.style.display = 'flex';
		} else {
			node.style.display = 'inline-block';
		}
	} else {
		node.style.display = 'none';
	}
}

function updateVisibility_Match(node, display_type) {
	if (matchTextContent(node)) {
		if (display_type === 'playlist') {
			node.style.display = 'flex';
		} else {
			node.style.display = 'inline-block';
		}
	} else {
		node.style.display = 'none';
	}
}

function updateMenuVisibility(node) {
	if (isMenuTarget()) {
		node.querySelectorAll('div.filter-menu').forEach(n => n.style.display = 'block');
		node.querySelectorAll('div.filter-spacer').forEach(n => n.style.display = 'block');
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

function updateVisibility_Live(node, display_type) {
	updateVisibility_Status(node, display_type, 'live.');
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

function updateVisibility_notification_off(node, display_type) {
	updateVisibility_Status(node, display_type, 'notification_off.');
}

function updateVisibility_ActiveMode(node, display_type) {
	switch (activeMode) {
		case 'all':
			updateVisibility_Always(node, display_type);
			break;
		case 'live':
			updateVisibility_Live(node, display_type);
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
		case 'notification_off':
			updateVisibility_notification_off(node, display_type);
			break;
		case 'search':
			updateVisibility_Match(node, display_type);
			break;
	}
}

function clickDefaultButtonIfSelectedHidden(node) {
	const selectedButton = node.querySelector('span.filter-button.selected');
	if (selectedButton) {
		if (selectedButton.style.display === 'none') {
			const allButton = node.querySelector('span.filter-button.all');
			if (allButton) {
				allButton.click();
			} else {
				console.warn('span.filter-button.all not found');
			}
		}
	}
}

function createButton(mode, text, modeButtons, updateVisibilityFunction, onClick) {
	const button = document.createElement('span');
	button.innerHTML = text;
	button.classList.add('filter-button');
	button.classList.add(mode);

	if (mode === activeMode) {
		button.classList.add('selected');
	}

	if (onClick) {
		button.addEventListener('click', onClick);
	}

	button.addEventListener('click', () => {
		activeMode = mode;

		modeButtons_all.forEach(n => n.classList.remove('selected'));
		modeButtons_live.forEach(n => n.classList.remove('selected'));
		modeButtons_video.forEach(n => n.classList.remove('selected'));
		modeButtons_scheduled.forEach(n => n.classList.remove('selected'));
		modeButtons_notification_on.forEach(n => n.classList.remove('selected'));
		modeButtons_notification_off.forEach(n => n.classList.remove('selected'));
		modeButtons_search.forEach(n => n.classList.remove('selected'));

		modeButtons.forEach(n => n.classList.add('selected'));

		updateVisibility(updateVisibilityFunction);
	});

	modeButtons.push(button);

	return button;
}

function createQueryInputArea() {
	const inputArea = document.createElement('span');
	inputArea.classList.add('filter-query');
	return inputArea;
}

function createQueryInput() {
	const input = document.createElement('input');
	input.attributes['type'] = 'text';
	input.id = 'filter-query';
	input.value = queryString;

	input.addEventListener('keypress', e => {
		if (e.code === 'Enter') {
			modeInput2Button.get(input).click();
		}
	});

	modeInput_query.push(input);

	return input;
}

function createMenu(floating) {
	const menu = document.createElement('div');
	menu.classList.add('filter-menu');

	if (floating) {
		menu.style.position = 'fixed';
		menu.style.zIndex = '2000';
	}

	menu.appendChild(createButton('all', mode_all, modeButtons_all, updateVisibility_Always));
	menu.appendChild(createButton('live', mode_live, modeButtons_live, updateVisibility_Live));
	menu.appendChild(createButton('video', mode_video, modeButtons_video, updateVisibility_Video));
	menu.appendChild(createButton('scheduled', mode_scheduled, modeButtons_scheduled, updateVisibility_Scheduled));
	menu.appendChild(createButton('notification_on', mode_notification_on, modeButtons_notification_on, updateVisibility_notification_on));
	//menu.appendChild(createButton('notification_off', mode_notification_off, modeButtons_notification_off, updateVisibility_notification_off));

	const inputArea = createQueryInputArea();
	const input = createQueryInput();
	const searchButton = createButton('search', mode_search, modeButtons_search, updateVisibility_Match, () => {
		queryString = input.value;
		queryRegex = new RegExp('(^|[^a-z])' + queryString + '($|[^a-z])', 'i');
		modeInput_query.forEach(e => e.value = queryString);
	});
	modeInput2Button.set(input, searchButton);

	inputArea.appendChild(input);
	menu.appendChild(inputArea);
	menu.appendChild(searchButton);

	return menu;
}

function createSpacer() {
	const spacer = document.createElement('div');
	spacer.classList.add('filter-spacer');
	return spacer;
}

function onUpdated() {
	updateMenuVisibility(app);
	updateButtonVisibility(app);
	clickDefaultButtonIfSelectedHidden(app);

	updateVisibility(updateVisibility_ActiveMode);
}

function onAdded(node) {
	switch (node.nodeName) {
		case 'YTD-SECTION-LIST-RENDERER':
			insertMenu(node);
			break;
		case 'YTD-GRID-VIDEO-RENDERER':
		case 'YTD-VIDEO-RENDERER':
			updateVisibility_ActiveMode(node, 'video');
			break;
		case 'YTD-THUMBNAIL-OVERLAY-TIME-STATUS-RENDERER': // playlist video lazy load
			if (window.location.href.startsWith('https://www.youtube.com/playlist')) {
				const video = searchParentNode(node, 'YTD-PLAYLIST-VIDEO-RENDERER');
				if (video) {
					updateVisibility_ActiveMode(video, 'playlist');
				}
			}
			break;
		case 'YTD-CHANNEL-RENDERER':
			updateVisibility_ActiveMode(node, 'channel');
			break;
	}
}

// mode: 'all', 'live', 'video', 'scheduled', 'notification_on', 'notification_off', 'search'
// status: 'live.', 'video.', 'scheduled.', 'notification_on.', 'notification_off.'
// display_type: 'video', 'playlist', 'channel'

const mode_all = chrome.i18n.getMessage('mode_all');
const mode_live = chrome.i18n.getMessage('mode_live');
const mode_video = chrome.i18n.getMessage('mode_video');
const mode_scheduled = chrome.i18n.getMessage('mode_scheduled');
const mode_notification_on = chrome.i18n.getMessage('mode_notification_on');
const mode_notification_off = chrome.i18n.getMessage('mode_notification_off');
const mode_search = chrome.i18n.getMessage('mode_search');

const app = document.querySelector('ytd-app');

let modeButtons_all = [];
let modeButtons_live = [];
let modeButtons_video = [];
let modeButtons_scheduled = [];
let modeButtons_notification_on = [];
let modeButtons_notification_off = [];
let modeButtons_search = [];
let modeInput_query = [];
let modeInput2Button = new Map();
let activeMode = 'all';
let queryString = '';
let queryRegex;

new MutationObserver((mutations, observer) => mutations.filter(m => m.target.nodeName === 'TITLE').forEach(() => onUpdated())).observe(document.head, {
	subtree: true,
	childList: true,
});

new MutationObserver((mutations, observer) => mutations.forEach(m => m.addedNodes.forEach(n => onAdded(n)))).observe(app, {
	subtree: true,
	childList: true,
});

app.querySelectorAll('ytd-section-list-renderer').forEach(n => insertMenu(n));
