import(chrome.runtime.getURL('lang/' + document.documentElement.getAttribute('lang') + '.js')).then(lang => {
	function updateButtonVisibility(node) {
		chrome.storage.local.get([
			'live',
			'streamed',
			'live_streamed',
			'video',
			'streamed_video',
			'scheduled',
			'notification_on',
			'notification_off',
			'channels_all',
			'channels_personalized',
			'channels_none',
			'order'
		], (data) => {
			for (const menu of node.querySelectorAll('form.filter-menu')) {
				menu.appendChild(menu.querySelector('span.filter-button.all'));
				for (const mode of data.order ? data.order.split(',') : default_order) {
					menu.appendChild(menu.querySelector('span.filter-button.' + mode));
				}
				for (const query of menu.querySelectorAll('span.filter-query')) {
					menu.appendChild(query);
				}
			}

			if (window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = data.live === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = data.streamed === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.live_streamed').forEach(n => n.style.display = data.live_streamed === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = data.streamed_video === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = data.scheduled === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = data.notification_on === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = data.notification_off === true ? '' : 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/library')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = data.live === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = data.streamed === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.live_streamed').forEach(n => n.style.display = data.live_streamed === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = data.streamed_video === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = data.scheduled === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = data.notification_on === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = data.notification_off === true ? '' : 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/history')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = data.live === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.live_streamed').forEach(n => n.style.display = data.live_streamed === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = data.streamed_video === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/playlist')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = data.live === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.live_streamed').forEach(n => n.style.display = data.live_streamed === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = data.streamed_video === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = data.scheduled === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/channels')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.live_streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = data.channels_all === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = data.channels_personalized === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = data.channels_none === false ? 'none' : '');
			} else if (window.location.href.startsWith('https://www.youtube.com/channel/') || window.location.href.startsWith('https://www.youtube.com/c/')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.live_streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = data.scheduled === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = data.notification_on === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = data.notification_off === true ? '' : 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/explore')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = data.streamed === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.live_streamed').forEach(n => n.style.display = data.live_streamed === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = data.streamed_video === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/trending')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = data.streamed === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.live_streamed').forEach(n => n.style.display = data.live_streamed === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed_video').forEach(n => n.style.display = data.streamed_video === true ? '' : 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button').forEach(n => n.style.display = 'none');
			}
		});
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

	function updateQueryRegex(node, query) {
		active.query.set(window.location.href, query);

		let rs = [];
		const qs = query.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&').match(/[^\s"]+|"([^"]*)"/g);
		if (qs) {
			for (const q of qs) {
				rs.push(new RegExp(q.replace(/"/g, ''), 'i'));
			}
		}
		active.regex.set(window.location.href, rs);

		node.querySelectorAll('input#filter-query').forEach(e => e.value = query);
	}

	function updateVisibility(node) {
		// subscriptions?flow=1, library, explore, trending
		node.querySelectorAll('ytd-grid-video-renderer').forEach(n => updateTargetVisibility(n));

		// subscriptions?flow=2, history, explore, trending
		node.querySelectorAll('ytd-video-renderer:not(.ytd-backstage-post-renderer)').forEach(n => updateTargetVisibility(n));

		// playlist
		node.querySelectorAll('ytd-playlist-video-renderer').forEach(n => updateTargetVisibility(n));

		// channels
		node.querySelectorAll('ytd-channel-renderer').forEach(n => updateTargetVisibility(n));

		// channel
		node.querySelectorAll('ytd-backstage-post-thread-renderer').forEach(n => updateTargetVisibility(n));
		node.querySelectorAll('ytd-grid-playlist-renderer').forEach(n => updateTargetVisibility(n));
		node.querySelectorAll('ytd-reel-item-renderer').forEach(n => updateTargetVisibility(n));
		node.querySelectorAll('ytd-rich-item-renderer').forEach(n => updateTargetVisibility(n));
	}

	function classifyStatus(node) {
		let status = '';

		switch (node.nodeName) {
			case 'YTD-GRID-VIDEO-RENDERER':
			case 'YTD-VIDEO-RENDERER':
			case 'YTD-RICH-ITEM-RENDERER':
				const video_metadata = node.querySelector('div#metadata-line');
				if (video_metadata) {
					const t = video_metadata.textContent;
					if (lang.isLive_metadata(t) || t === '') {
						status += 'live.';
					} else if (lang.isStreamed_metadata(t)) {
						status += 'streamed.';
					} else if (lang.isVideo_metadata(t)) {
						status += 'video.';
					} else if (lang.isScheduled_metadata(t)) {
						status += 'scheduled.';

						const video_button = node.querySelector('ytd-toggle-button-renderer yt-formatted-string');
						if (video_button) {
							const t = video_button.textContent;
							if (lang.isNotificationOn_button(t)) {
								status += 'notification_on.';
							} else if (lang.isNotificationOff_button(t)) {
								status += 'notification_off.';
							} else {
								console.warn('Unknown notification status: ' + t);
							}
						} else {
							console.warn('ytd-toggle-button-renderer yt-formatted-string not found');
						}
					} else {
						// members only
					}
				} else {
					// short
				}
				break;
			case 'YTD-PLAYLIST-VIDEO-RENDERER':
				const playlist_label = node.querySelector('span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]');
				if (playlist_label) {
					const t = playlist_label.getAttribute('aria-label');
					if (lang.isLive_status_label(t)) {
						status += 'live.';
					} else if (lang.isVideo_status_label(t)) {
						status += 'video.';
					}
				}

				const playlist_metadata = node.querySelector('div#metadata-line');
				if (playlist_metadata) {
					const t = playlist_metadata.textContent;
					if (lang.isScheduled_metadata(t)) {
						status += 'scheduled.';
					}
				}
				break;
			case 'YTD-CHANNEL-RENDERER':
				const channel_notification = node.querySelector('ytd-subscription-notification-toggle-button-renderer button#button[aria-label]');
				if (channel_notification) {
					const t = channel_notification.getAttribute('aria-label');
					if (lang.isChannelsAllNotifications(t)) {
						status += 'channels_all.';
					} else if (lang.isChannelsPersonalizedNotifications(t)) {
						status += 'channels_personalized.';
					} else if (lang.isChannelsNoNotifications(t)) {
						status += 'channels_none.';
					} else {
						console.warn('Unknown channel notification: ' + t);
					}
				}
				break;
		}

		return status;
	}

	function matchTextContent(node) {
		switch (node.nodeName) {
			// subscriptions?flow=1, library, explore, trending
			case 'YTD-GRID-VIDEO-RENDERER':
				const grid_video_title = node.querySelector('a#video-title');
				if (grid_video_title) {
					return matchAllActiveRegex(grid_video_title.textContent);
				} else {
					console.warn('a#video-title not found');
				}
				break;

			// subscriptions?flow=2, history, explore, trending
			case 'YTD-VIDEO-RENDERER':
				if (!node.classList.contains('ytd-backstage-post-renderer')) {
					const video_title = node.querySelector('a#video-title');
					if (video_title) {
						return matchAllActiveRegex(video_title.textContent);
					} else {
						console.warn('a#video-title not found');
					}
				} else {
					// lazy load
				}
				break;

			// playlist
			case 'YTD-PLAYLIST-VIDEO-RENDERER':
				const playlist_video_meta = node.querySelector('div#meta');
				if (playlist_video_meta) {
					return matchAllActiveRegex(playlist_video_meta.textContent);
				} else {
					console.warn('div#meta not found');
				}
				break;

			// channels
			case 'YTD-CHANNEL-RENDERER':
				const channel_info = node.querySelector('div#info');
				if (channel_info) {
					return matchAllActiveRegex(channel_info.textContent);
				} else {
					console.warn('div#info not found');
				}
				break;

			// channel
			case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
				const backstage_post_thread_content = node.querySelector('div#content');
				if (backstage_post_thread_content) {
					return matchAllActiveRegex(backstage_post_thread_content.textContent);
				} else {
					console.warn('div#content not found');
				}
				break;
			case 'YTD-GRID-PLAYLIST-RENDERER':
				const grid_playlist_title = node.querySelector('a#video-title');
				if (grid_playlist_title) {
					return matchAllActiveRegex(grid_playlist_title.textContent);
				} else {
					console.warn('a#video-title not found');
				}
				break;
			case 'YTD-REEL-ITEM-RENDERER':
				const reel_item_title = node.querySelector('span#video-title');
				if (reel_item_title) {
					return matchAllActiveRegex(reel_item_title.textContent);
				} else {
					console.warn('span#video-title not found');
				}
				break;
			case 'YTD-RICH-ITEM-RENDERER':
				const rich_item_title = node.querySelector('h3.ytd-rich-grid-media,.ytd-rich-grid-slim-media');
				if (rich_item_title) {
					return matchAllActiveRegex(rich_item_title.textContent);
				} else {
					// ad
				}
				break;
		}

		// default: visible
		return true;
	}

	function onNodeLoaded(node) {
		switch (node.nodeName) {
			case 'YTD-SECTION-LIST-RENDERER':
				insertMenu(node);
				break;

			// subscriptions?flow=1, library, explore, trending
			case 'YTD-GRID-VIDEO-RENDERER':
				updateTargetVisibility(node);
				break;

			// subscriptions?flow=2, history, explore, trending
			case 'YTD-VIDEO-RENDERER':
				if (!node.classList.contains('ytd-backstage-post-renderer')) {
					updateTargetVisibility(node);
				}
				break;

			// playlist
			case 'YTD-THUMBNAIL-OVERLAY-TIME-STATUS-RENDERER':
				const video = searchParentNode(node, 'YTD-PLAYLIST-VIDEO-RENDERER');
				if (video) {
					updateTargetVisibility(video);
				}
				break;

			// channels
			case 'YTD-CHANNEL-RENDERER':
				updateTargetVisibility(node);
				break;

			// channel
			case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
			case 'YTD-GRID-PLAYLIST-RENDERER':
			case 'YTD-REEL-ITEM-RENDERER':
			case 'YTD-RICH-ITEM-RENDERER':
				updateTargetVisibility(node);
				break;

			// container
			case 'YTD-ITEM-SECTION-RENDERER':
				updateVisibility(node);
				break;
			case 'DIV':
				if (node.id === 'contents') {
					updateVisibility(node);
				}
				break;
		}
	}

	function insertMenu(node) {
		const browse = searchParentNode(node, 'YTD-BROWSE');
		if (browse && !browse.querySelector('form.filter-menu')) {
			const sibling = browse.querySelector('ytd-two-column-browse-results-renderer');
			if (sibling) {
				const position_fixed = isPositionFixedTarget();
				browse.insertBefore(createMenu(position_fixed), sibling);
				if (position_fixed) {
					browse.insertBefore(createSpacer(), sibling);
					const sidebar = browse.querySelector('ytd-playlist-sidebar-renderer');
					if (sidebar) {
						sidebar.insertBefore(createSpacer(), sidebar.firstChild);
						browse.style.alignItems = 'center';
					}
				}

				updateMenuVisibility(browse);
				updateButtonVisibility(browse);
				updateNodeValue(browse);
			} else {
				console.warn('ytd-two-column-browse-results-renderer not found');
			}
		}
	}

	function createMenu(position_fixed) {
		const menu = document.createElement('form');
		menu.classList.add('filter-menu');

		if (position_fixed) {
			menu.classList.add('position-fixed');
		}

		const input = createQueryInput(menu);

		menu.addEventListener('submit', (e) => {
			e.preventDefault();
			updateQueryRegex(app, input.value);
			updateVisibility(app);
		});

		menu.appendChild(createButton(button.all, 'all', input));
		menu.appendChild(createButton(button.live, 'live', input));
		menu.appendChild(createButton(button.streamed, 'streamed', input));
		menu.appendChild(createButton(button.live_streamed, 'live_streamed', input));
		menu.appendChild(createButton(button.video, 'video', input));
		menu.appendChild(createButton(button.streamed_video, 'streamed_video', input));
		menu.appendChild(createButton(button.scheduled, 'scheduled', input));
		menu.appendChild(createButton(button.notification_on, 'notification_on', input));
		menu.appendChild(createButton(button.notification_off, 'notification_off', input));

		menu.appendChild(createButton(button.channels_all, 'channels_all', input));
		menu.appendChild(createButton(button.channels_personalized, 'channels_personalized', input));
		menu.appendChild(createButton(button.channels_none, 'channels_none', input));

		menu.appendChild(createQueryInputArea(input));
		menu.appendChild(createSearchButton(input));

		return menu;
	}

	function createSpacer() {
		const spacer = document.createElement('div');
		spacer.classList.add('filter-menu');
		spacer.classList.add('spacer');
		return spacer;
	}

	function createButton(text, mode, input) {
		const span = document.createElement('span');
		span.style.display = 'none';
		span.innerHTML = text;
		span.classList.add('filter-button');
		span.classList.add(mode);

		if (mode === getActiveMode()) {
			span.classList.add('selected');
		}

		span.addEventListener('click', () => {
			changeMode(mode);
			updateQueryRegex(app, input.value);
			updateVisibility(app);
		});

		return span;
	}

	function createQueryInputArea(input) {
		const inputArea = document.createElement('span');
		inputArea.classList.add('filter-query');
		inputArea.classList.add('area');
		inputArea.appendChild(input);
		inputArea.appendChild(createClearButton(input));
		return inputArea;
	}

	function createQueryInput(menu) {
		const input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('placeholder', ' ');
		input.id = 'filter-query';
		input.value = getActiveQuery();

		input.addEventListener('change', e => {
			input.blur();
			menu.requestSubmit();
		});

		return input;
	}

	function createClearButton(input) {
		const span = document.createElement('span');
		span.innerHTML = button.clear;
		span.classList.add('filter-clear');

		span.addEventListener('click', () => {
			input.value = '';
			updateQueryRegex(app, '');
			updateVisibility(app);
		});

		return span;
	}

	function createSearchButton(input) {
		const span = document.createElement('span');
		span.innerHTML = button.search;
		span.classList.add('filter-query');
		span.classList.add('search');

		span.addEventListener('click', () => {
			updateQueryRegex(app, input.value);
			updateVisibility(app);
		});

		return span;
	}

	function updateMenuVisibility(node) {
		if (isMenuTarget()) {
			node.querySelectorAll('form.filter-menu, div.filter-menu').forEach(n => n.style.display = '');
		} else {
			node.querySelectorAll('form.filter-menu, div.filter-menu').forEach(n => n.style.display = 'none');
		}
	}

	function updateTargetVisibility(node) {
		let status_or;

		switch (getActiveMode()) {
			case 'all':
				status_or = [''];
				break;
			case 'live':
				status_or = ['live.'];
				break;
			case 'streamed':
				status_or = ['streamed.'];
				break;
			case 'live_streamed':
				status_or = ['live.', 'streamed.'];
				break;
			case 'video':
				status_or = ['video.'];
				break;
			case 'streamed_video':
				status_or = ['streamed.', 'video.'];
				break;
			case 'scheduled':
				status_or = ['scheduled.'];
				break;
			case 'notification_on':
				status_or = ['notification_on.'];
				break;
			case 'notification_off':
				status_or = ['notification_off.'];
				break;
			case 'channels_all':
				status_or = ['channels_all.'];
				break;
			case 'channels_personalized':
				status_or = ['channels_personalized.'];
				break;
			case 'channels_none':
				status_or = ['channels_none.'];
				break;
			default:
				status_or = [''];
		}

		if (includesStatus(node, status_or) && matchTextContent(node)) {
			node.style.display = '';
		} else {
			node.style.display = 'none';
		}
	}

	function updateNodeValue(node) {
		if (isMenuTarget()) {
			changeMode(getActiveMode());
			updateQueryRegex(node, getActiveQuery());
			updateVisibility(node);
		}
	}

	function onViewChanged() {
		updateMenuVisibility(app);
		updateButtonVisibility(app);
		updateNodeValue(app);
	}

	function includesStatus(node, status_or) {
		if (status_or === '') {
			return true;
		} else {
			const node_status = classifyStatus(node);
			if (node_status === '') {
				return true;
			} else {
				for (const status of status_or) {
					if (node_status.includes(status)) {
						return true;
					}
				}
				return false;
			}
		}
	}

	function changeMode(mode) {
		setActiveMode(mode);

		app.querySelectorAll('span.filter-button').forEach(n => n.classList.remove('selected'));
		app.querySelectorAll('span.filter-button.' + mode).forEach(n => n.classList.add('selected'));
	}

	function searchParentNode(node, nodeName) {
		for (let n = node; n; n = n.parentNode) {
			if (n.nodeName === nodeName) {
				return n;
			}
		}
	}

	function getActiveMode() {
		const mode = active.mode.get(window.location.href);
		if (mode) {
			return mode;
		} else {
			setActiveMode('all');
			return 'all';
		}
	}

	function setActiveMode(mode) {
		active.mode.set(window.location.href, mode);
	}

	function getActiveQuery() {
		const query = active.query.get(window.location.href);
		if (query) {
			return query;
		} else {
			active.query.set(window.location.href, '');
			return '';
		}
	}

	function matchAllActiveRegex(text) {
		const rs = active.regex.get(window.location.href);
		if (rs) {
			for (const r of rs) {
				if (!text.match(r)) {
					return false;
				}
			}
		}
		return true;
	}

	const button = {
		all: chrome.i18n.getMessage('button_all'),
		live: chrome.i18n.getMessage('button_live'),
		streamed: chrome.i18n.getMessage('button_streamed'),
		live_streamed: chrome.i18n.getMessage('button_live_streamed'),
		video: chrome.i18n.getMessage('button_video'),
		streamed_video: chrome.i18n.getMessage('button_streamed_video'),
		scheduled: chrome.i18n.getMessage('button_scheduled'),
		notification_on: chrome.i18n.getMessage('button_notification_on'),
		notification_off: chrome.i18n.getMessage('button_notification_off'),
		clear: chrome.i18n.getMessage('button_clear'),
		search: chrome.i18n.getMessage('button_search'),
		channels_all: chrome.i18n.getMessage('button_channels_all'),
		channels_personalized: chrome.i18n.getMessage('button_channels_personalized'),
		channels_none: chrome.i18n.getMessage('button_channels_none')
	};

	const default_order = [
		'live',
		'streamed',
		'live_streamed',
		'video',
		'streamed_video',
		'scheduled',
		'notification_on',
		'notification_off',
		'channels_all',
		'channels_personalized',
		'channels_none'
	];

	const active = {
		mode: new Map(),
		query: new Map(),
		regex: new Map()
	};

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

		chrome.storage.onChanged.addListener((changes, namespace) => {
			updateButtonVisibility(app);
			updateNodeValue(app);
		});
	} else {
		console.warn('ytd-app not found');
	}
}, error => { /* Not supported */ });