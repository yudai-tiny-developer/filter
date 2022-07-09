const html_lang = document.documentElement.attributes['lang'];
if (html_lang) {
	import(chrome.runtime.getURL('lang/' + html_lang.value + '.js')).then(lang => {
		function updateButtonVisibility(node) {
			if (window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/library')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/history')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/playlist')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/channels')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = '');
			} else if (window.location.href.startsWith('https://www.youtube.com/channel/') || window.location.href.startsWith('https://www.youtube.com/c/')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/explore')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/trending')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button').forEach(n => n.style.display = 'none');
			}
		}

		function isMenuTarget() {
			return window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')
				|| window.location.href.startsWith('https://www.youtube.com/feed/library')
				|| window.location.href.startsWith('https://www.youtube.com/feed/history')
				|| window.location.href.startsWith('https://www.youtube.com/playlist')
				|| window.location.href.startsWith('https://www.youtube.com/feed/channels')
				|| window.location.href.startsWith('https://www.youtube.com/channel/')
				|| window.location.href.startsWith('https://www.youtube.com/c/')
				|| window.location.href.startsWith('https://www.youtube.com/feed/explore')
				|| window.location.href.startsWith('https://www.youtube.com/feed/trending')
				;
		}

		function isPositionFixedTarget() {
			return window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')
				|| window.location.href.startsWith('https://www.youtube.com/feed/library')
				|| window.location.href.startsWith('https://www.youtube.com/feed/history')
				|| window.location.href.startsWith('https://www.youtube.com/playlist')
				|| window.location.href.startsWith('https://www.youtube.com/feed/channels')
				|| window.location.href.startsWith('https://www.youtube.com/feed/explore')
				;
		}

		function classifyStatus(node) {
			let status = '';

			const metadata = node.querySelector('div#metadata-line');
			if (metadata) {
				const t = metadata.textContent;
				if (lang.isLive_metadata(t) || t === '') {
					status += 'live.';
				} else if (lang.isStreamed_metadata(t)) {
					status += 'streamed.';
				} else if (lang.isVideo_metadata(t)) {
					status += 'video.';
				} else if (lang.isScheduled_metadata(t)) {
					status += 'scheduled.';
				} else if (t.match(/^\s*$/)) { // playlist
					const label = node.querySelector('span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]');
					if (label) {
						const t = label.attributes['aria-label'].value;
						if (lang.isLive_status_label(t)) {
							status += 'live.';
						} else if (lang.isVideo_status_label(t)) {
							status += 'video.';
						}
					}
				} else { // Members-only videos
					status += 'video.';
				}
			}

			const button = node.querySelector('ytd-toggle-button-renderer yt-formatted-string');
			if (button) {
				const t = button.textContent;
				if (lang.isNotificationOn_button(t)) {
					status += 'notification_on.';
				} else if (lang.isNotificationOff_button(t)) {
					status += 'notification_off.';
				}
			}

			const notification = node.querySelector('ytd-subscription-notification-toggle-button-renderer button#button[aria-label]');
			if (notification) {
				const t = notification.attributes['aria-label'].value;
				if (lang.isChannelsAllNotifications(t)) {
					status += 'channels_all.';
				} else if (lang.isChannelsPersonalizedNotifications(t)) {
					status += 'channels_personalized.';
				} else if (lang.isChannelsNoNotifications(t)) {
					status += 'channels_none.';
				}
			}

			return status;
		}

		function matchTextContent(node) {
			if (node.nodeName === 'YTD-GRID-VIDEO-RENDERER') {
				const title = node.querySelector('a#video-title');
				if (title) {
					return title.textContent.match(queryRegex);
				}
			} else if (node.nodeName === 'YTD-VIDEO-RENDERER' && !node.classList.contains('ytd-backstage-post-renderer')) {
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
				const content = node.querySelector('div#content');
				if (content) {
					return content.textContent.match(queryRegex);
				}
			} else if (node.nodeName === 'YTD-GRID-PLAYLIST-RENDERER') {
				const title = node.querySelector('a#video-title');
				if (title) {
					return title.textContent.match(queryRegex);
				}
			}

			console.warn('Unknown node: ' + node.nodeName);
		}

		function updateVisibility(updateVisibilityFunction, input) {
			queryString = input.value;
			queryRegex = new RegExp(queryString.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&'), 'i');
			app.querySelectorAll('input#filter-query').forEach(e => e.value = queryString);

			// subscriptions?flow=1, library
			app.querySelectorAll('ytd-grid-video-renderer').forEach(n => updateVisibilityFunction(n));

			// subscriptions?flow=2, history
			app.querySelectorAll('ytd-video-renderer:not(.ytd-backstage-post-renderer)').forEach(n => updateVisibilityFunction(n));

			// playlist
			app.querySelectorAll('ytd-playlist-video-renderer').forEach(n => updateVisibilityFunction(n));

			// channels
			app.querySelectorAll('ytd-channel-renderer').forEach(n => updateVisibilityFunction(n));
			app.querySelectorAll('ytd-backstage-post-thread-renderer').forEach(n => updateVisibilityFunction(n));
			app.querySelectorAll('ytd-grid-playlist-renderer').forEach(n => updateVisibilityFunction(n));
		}

		function insertMenu(node) {
			const browse = searchParentNode(node, 'YTD-BROWSE');
			if (browse && !browse.querySelector('div.filter-menu')) {
				const sibling = browse.querySelector('ytd-two-column-browse-results-renderer');
				if (sibling) {
					const positionFixed = isPositionFixedTarget();
					browse.insertBefore(createMenu(positionFixed), sibling);
					if (positionFixed) {
						browse.insertBefore(createSpacer(), sibling);
						const sidebar = browse.querySelector('ytd-playlist-sidebar-renderer');
						if (sidebar) {
							sidebar.insertBefore(createSpacer(), sidebar.firstChild);
							browse.style.alignItems = 'center';
						}
					}

					updateMenuVisibility(browse);
					updateButtonVisibility(browse);
					updateVisibility_Selected_All(browse);
				} else {
					console.warn('ytd-two-column-browse-results-renderer not found');
				}
			}
		}

		function updateVisibility_Status(node, status) {
			if ((!status || classifyStatus(node).includes(status)) && matchTextContent(node)) {
				node.style.display = '';
			} else {
				node.style.display = 'none';
			}
		}

		function updateVisibility_Always(node) {
			updateVisibility_Status(node)
		}

		function updateVisibility_live(node) {
			updateVisibility_Status(node, 'live.');
		}

		function updateVisibility_streamed(node) {
			updateVisibility_Status(node, 'streamed.');
		}

		function updateVisibility_video(node) {
			updateVisibility_Status(node, 'video.');
		}

		function updateVisibility_scheduled(node) {
			updateVisibility_Status(node, 'scheduled.');
		}

		function updateVisibility_notification_on(node) {
			updateVisibility_Status(node, 'notification_on.');
		}

		function updateVisibility_channels_all(node) {
			updateVisibility_Status(node, 'channels_all.');
		}

		function updateVisibility_channels_personalized(node) {
			updateVisibility_Status(node, 'channels_personalized.');
		}

		function updateVisibility_channels_none(node) {
			updateVisibility_Status(node, 'channels_none.');
		}

		function updateVisibility_ActiveMode(node) {
			switch (activeMode) {
				case 'all':
					updateVisibility_Always(node);
					break;
				case 'live':
					updateVisibility_live(node);
					break;
				case 'streamed':
					updateVisibility_streamed(node);
					break;
				case 'video':
				case 'streamed_video':
					updateVisibility_video(node);
					break;
				case 'scheduled':
					updateVisibility_scheduled(node);
					break;
				case 'notification_on':
					updateVisibility_notification_on(node);
					break;
				case 'channels_all':
					updateVisibility_channels_all(node);
					break;
				case 'channels_personalized':
					updateVisibility_channels_personalized(node);
					break;
				case 'channels_none':
					updateVisibility_channels_none(node);
					break;
			}
		}

		function updateMenuVisibility(node) {
			if (isMenuTarget()) {
				node.querySelectorAll('div.filter-menu').forEach(n => n.style.display = '');
			} else {
				node.querySelectorAll('div.filter-menu').forEach(n => n.style.display = 'none');
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

		function updateVisibility_Selected_All(node) {
			const selectedButton = node.querySelector('span.filter-button.selected');
			if (selectedButton && selectedButton.style.display === 'none') {
				const allButton = node.querySelector('span.filter-button.all');
				if (allButton && allButton.style.display !== 'none') {
					changeMode('all');
				}
			}

			const input = node.querySelector('input#filter-query');
			if (input && input.style.display !== 'none') {
				updateVisibility(updateVisibility_ActiveMode, input);
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
			button.classList.add('filter-clear');

			button.addEventListener('click', () => {
				input.value = '';
				updateVisibility_Selected_All(menu);
			});

			return button;
		}

		function createSearchButton(menu) {
			const button = document.createElement('span');
			button.innerHTML = button_search;
			button.classList.add('filter-query');
			button.classList.add('search');

			button.addEventListener('click', () => {
				updateVisibility_Selected_All(menu);
			});

			return button;
		}

		function createQueryInputArea(input, menu) {
			const inputArea = document.createElement('span');
			inputArea.classList.add('filter-query');
			inputArea.classList.add('area');
			inputArea.appendChild(input);
			inputArea.appendChild(createClearButton(input, menu));
			return inputArea;
		}

		function createQueryInput(menu) {
			const input = document.createElement('input');
			input.setAttribute('type', 'text');
			input.setAttribute('placeholder', ' ');
			input.id = 'filter-query';
			input.value = queryString;

			input.addEventListener('change', e => {
				input.blur();
				setTimeout(() => updateVisibility_Selected_All(menu));
			});

			return input;
		}

		function createMenu(positionFixed) {
			const menu = document.createElement('div');
			menu.classList.add('filter-menu');

			if (positionFixed) {
				menu.classList.add('position-fixed');
			}

			const input = createQueryInput(menu);

			menu.appendChild(createButton(button_all, 'all', updateVisibility_Always, input));
			menu.appendChild(createButton(button_live, 'live', updateVisibility_live, input));
			menu.appendChild(createButton(button_streamed, 'streamed', updateVisibility_streamed, input));
			menu.appendChild(createButton(button_video, 'video', updateVisibility_video, input));
			menu.appendChild(createButton(button_streamed_video, 'streamed_video', updateVisibility_video, input));
			menu.appendChild(createButton(button_scheduled, 'scheduled', updateVisibility_scheduled, input));
			menu.appendChild(createButton(button_notification_on, 'notification_on', updateVisibility_notification_on, input));

			menu.appendChild(createButton(button_channels_all, 'channels_all', updateVisibility_channels_all, input));
			menu.appendChild(createButton(button_channels_personalized, 'channels_personalized', updateVisibility_channels_personalized, input));
			menu.appendChild(createButton(button_channels_none, 'channels_none', updateVisibility_channels_none, input));

			menu.appendChild(createQueryInputArea(input, menu));
			menu.appendChild(createSearchButton(menu));

			return menu;
		}

		function createSpacer() {
			const spacer = document.createElement('div');
			spacer.classList.add('filter-menu');
			spacer.classList.add('spacer');
			return spacer;
		}

		function onViewChanged() {
			updateMenuVisibility(app);
			updateButtonVisibility(app);
			updateVisibility_Selected_All(app);
		}

		function onNodeLoaded(node) {
			if (node.nodeName === 'YTD-SECTION-LIST-RENDERER') {
				insertMenu(node);
			} else if (node.nodeName === 'YTD-GRID-VIDEO-RENDERER'
				|| (node.nodeName === 'YTD-VIDEO-RENDERER' && !node.classList.contains('ytd-backstage-post-renderer'))) {
				updateVisibility_ActiveMode(node);
			} else if (node.nodeName === 'YTD-THUMBNAIL-OVERLAY-TIME-STATUS-RENDERER') { // playlist video lazy load
				if (window.location.href.startsWith('https://www.youtube.com/playlist')) {
					const video = searchParentNode(node, 'YTD-PLAYLIST-VIDEO-RENDERER');
					if (video) {
						updateVisibility_ActiveMode(video);
					}
				}
			} else if (node.nodeName === 'YTD-CHANNEL-RENDERER') {
				updateVisibility_ActiveMode(node);
			} else if (node.nodeName === 'YTD-BACKSTAGE-POST-THREAD-RENDERER') {
				updateVisibility_ActiveMode(node);
			} else if (node.nodeName === 'YTD-GRID-PLAYLIST-RENDERER') {
				updateVisibility_ActiveMode(node);
			}
		}

		const button_all = chrome.i18n.getMessage('button_all');
		const button_live = chrome.i18n.getMessage('button_live');
		const button_streamed = chrome.i18n.getMessage('button_streamed');
		const button_video = chrome.i18n.getMessage('button_video');
		const button_streamed_video = chrome.i18n.getMessage('button_streamed_video');
		const button_scheduled = chrome.i18n.getMessage('button_scheduled');
		const button_notification_on = chrome.i18n.getMessage('button_notification_on');
		const button_clear = chrome.i18n.getMessage('button_clear');
		const button_search = chrome.i18n.getMessage('button_search');
		const button_channels_all = chrome.i18n.getMessage('button_channels_all');
		const button_channels_personalized = chrome.i18n.getMessage('button_channels_personalized');
		const button_channels_none = chrome.i18n.getMessage('button_channels_none');

		let activeMode = 'all';
		let queryString = '';
		let queryRegex;

		const app = document.querySelector('ytd-app');
		if (app) {
			new MutationObserver((mutations, observer) => {
				for (const m of mutations) {
					if (m.target.nodeName === 'TITLE') {
						onViewChanged();
					} else {
						onNodeLoaded(m.target);
						m.addedNodes.forEach(n => onNodeLoaded(n));
					}
				}
			}).observe(document, {
				subtree: true,
				childList: true,
			});

			app.querySelectorAll('ytd-section-list-renderer').forEach(n => insertMenu(n));
		}
	}, error => { /* Not supported */ });
}