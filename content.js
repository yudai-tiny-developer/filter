import(chrome.runtime.getURL('lang/' + document.documentElement.getAttribute('lang') + '.js')).then(lang => {
	function updateButtonVisibility(node) {
		chrome.storage.local.get([
			'live',
			'streamed',
			'video',
			'short',
			'scheduled',
			'notification_on',
			'notification_off',
			'channels_all',
			'channels_personalized',
			'channels_none',
			'order',
			'default_live',
			'default_streamed',
			'default_video',
			'default_short',
			'default_scheduled',
			'default_notification_on',
			'default_notification_off',
			'default_channels_all',
			'default_channels_personalized',
			'default_channels_none',
		], (data) => {
			for (const menu of node.querySelectorAll('form.filter-menu')) {
				menu.appendChild(menu.querySelector('span.filter-button.all'));
				for (const mode of order(data.order)) {
					menu.appendChild(menu.querySelector('span.filter-button.' + mode));
				}
				for (const query of menu.querySelectorAll('span.filter-query')) {
					menu.appendChild(query);
				}
			}

			default_live = data.default_live;
			default_streamed = data.default_streamed;
			default_video = data.default_video;
			default_short = data.default_short;
			default_scheduled = data.default_scheduled;
			default_notification_on = data.default_notification_on;
			default_notification_off = data.default_notification_off;
			default_channels_all = data.default_channels_all;
			default_channels_personalized = data.default_channels_personalized;
			default_channels_none = data.default_channels_none;

			if (window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = data.live === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = data.streamed === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.short').forEach(n => n.style.display = data.short === false ? 'none' : '');
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
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.short').forEach(n => n.style.display = data.short === false ? 'none' : '');
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
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.short').forEach(n => n.style.display = data.short === false ? 'none' : '');
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
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.short').forEach(n => n.style.display = data.short === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = data.scheduled === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = data.notification_on === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = data.notification_off === false ? 'none' : '');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/channels')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.short').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = 'none');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = data.channels_all === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = data.channels_personalized === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = data.channels_none === false ? 'none' : '');
			} else if (window.location.href.startsWith('https://www.youtube.com/channel/')
				|| window.location.href.startsWith('https://www.youtube.com/c/')
				|| window.location.href.startsWith('https://www.youtube.com/@')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = data.live === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = data.streamed === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.short').forEach(n => n.style.display = data.short === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.scheduled').forEach(n => n.style.display = data.scheduled === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_on').forEach(n => n.style.display = data.notification_on === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.notification_off').forEach(n => n.style.display = data.notification_off === false ? 'none' : '');

				node.querySelectorAll('span.filter-button.channels_all').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_personalized').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.channels_none').forEach(n => n.style.display = 'none');
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/explore')) {
				node.querySelectorAll('span.filter-query').forEach(n => n.style.display = '');
				node.querySelectorAll('span.filter-button.all').forEach(n => n.style.display = '');

				node.querySelectorAll('span.filter-button.live').forEach(n => n.style.display = 'none');
				node.querySelectorAll('span.filter-button.streamed').forEach(n => n.style.display = data.streamed === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.short').forEach(n => n.style.display = data.short === false ? 'none' : '');
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
				node.querySelectorAll('span.filter-button.video').forEach(n => n.style.display = data.video === false ? 'none' : '');
				node.querySelectorAll('span.filter-button.short').forEach(n => n.style.display = data.short === false ? 'none' : '');
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

			if (isMenuTarget()) {
				changeMode(getActiveMode());
				updateQueryRegex(node, getActiveQuery());
				updateVisibility(node);
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
			|| window.location.href.startsWith('https://www.youtube.com/@')
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
						const thumbnail_overlay = node.querySelector('ytd-thumbnail-overlay-time-status-renderer');
						if (thumbnail_overlay) {
							const overlay_style = thumbnail_overlay.getAttribute('overlay-style');
							if (overlay_style) {
								if (overlay_style === 'DEFAULT') {
									status += 'video.';
								} else if (overlay_style === 'SHORTS') {
									status += 'short.';
								} else {
									console.warn('Unknown overlay-style');
								}
							} else {
								console.warn('overlay-style not found');
							}
						} else {
							// lazy load
						}
					} else if (lang.isScheduled_metadata(t)) {
						status += 'scheduled.';

						const video_button = node.querySelector('ytd-toggle-button-renderer yt-formatted-string,ytd-toggle-button-renderer yt-button-shape');
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
							console.warn('ytd-toggle-button-renderer not found');
						}
					} else {
						// members only
					}
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
				const channel_notification = node.querySelector('ytd-subscription-notification-toggle-button-renderer button#button[aria-label],ytd-subscription-notification-toggle-button-renderer-next button[aria-label]');
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
			case 'YTD-BROWSE':
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
		if (browse) {
			if (!browse.querySelector('form.filter-menu')) {
				const sibling = browse.querySelector('ytd-two-column-browse-results-renderer');
				if (sibling) {
					const position_fixed = isPositionFixedTarget();
					browse.insertBefore(createMenu(position_fixed), sibling);
					if (position_fixed) {
						browse.insertBefore(createSpacer('browse'), sibling);
					}

					updateMenuVisibility(browse);
					updateButtonVisibility(browse);
				}
			}

			browse.style.alignItems = 'center';
			browse.style.paddingTop = '0px';
		}
	}

	function insertPlaylistSpacer() {
		for (const sidebar of app.querySelectorAll('ytd-playlist-sidebar-renderer')) {
			if (sidebar.firstChild.id !== 'sidebar-spacer') {
				sidebar.insertBefore(createSpacer('sidebar-spacer'), sidebar.firstChild);
			}
		}

		for (const header of app.querySelectorAll('ytd-playlist-header-renderer')) {
			if (header.firstChild.id !== 'header-spacer') {
				header.insertBefore(createSpacer('header-spacer'), header.firstChild);
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
		menu.appendChild(createButton(button.video, 'video', input));
		menu.appendChild(createButton(button.short, 'short', input));
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

	function createSpacer(id) {
		const spacer = document.createElement('div');
		spacer.classList.add('filter-menu');
		spacer.classList.add('spacer');
		spacer.id = id;
		return spacer;
	}

	function createButton(text, mode, input) {
		const span = document.createElement('span');
		span.style.display = 'none';
		span.innerHTML = text;
		span.classList.add('filter-button');
		span.classList.add(mode);
		span.addEventListener('click', () => {
			changeMode(mode);
			updateQueryRegex(app, input.value);
			updateVisibility(app);
			window.scroll({ top: 0, behavior: 'instant' });
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
			case 'video':
				status_or = ['video.'];
				break;
			case 'short':
				status_or = ['short.'];
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
			node.classList.remove('filter-none');
		} else {
			node.classList.add('filter-none');
		}
	}

	function waitAttribute(node, attribute) {
		return new Promise(resolve => {
			const observer = new MutationObserver(mutations => {
				for (const m of mutations) {
					if (m.attributeName === attribute) {
						resolve();
						observer.disconnect();
						return;
					}
				}
			});
			observer.observe(node, { attributes: true });
		});
	}

	function onViewChanged() {
		insertPlaylistSpacer();
		updateMenuVisibility(app);
		updateButtonVisibility(app);
	}

	function includesStatus(node, status_or) {
		if (status_or === '') {
			return true;
		} else {
			const node_status = classifyStatus(node);
			for (const status of status_or) {
				if (node_status.includes(status)) {
					return true;
				}
			}
			return false;
		}
	}

	function changeMode(mode) {
		if (!mode) {
			if (window.location.href.startsWith('https://www.youtube.com/feed/subscriptions')) {
				if (default_live) mode = 'live';
				else if (default_streamed) mode = 'streamed';
				else if (default_video) mode = 'video';
				else if (default_short) mode = 'short';
				else if (default_scheduled) mode = 'scheduled';
				else if (default_notification_on) mode = 'notification_on';
				else if (default_notification_off) mode = 'notification_off';
				else mode = 'all';
			} else if (window.location.href.startsWith('https://www.youtube.com/feed/channels')) {
				if (default_channels_all) mode = 'channels_all';
				else if (default_channels_personalized) mode = 'channels_personalized';
				else if (default_channels_none) mode = 'channels_none';
				else mode = 'all';
			} else {
				mode = 'all';
			}
		}

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
		return active.mode.get(window.location.href);
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

	function order(order) {
		if (order) {
			const dataOrder = order.split(',');
			return dataOrder.filter(i => default_order.indexOf(i) !== -1).concat(default_order.filter(i => dataOrder.indexOf(i) === -1));
		} else {
			return default_order;
		}
	}

	const button = {
		all: chrome.i18n.getMessage('button_all'),
		live: chrome.i18n.getMessage('button_live'),
		streamed: chrome.i18n.getMessage('button_streamed'),
		video: chrome.i18n.getMessage('button_video'),
		short: chrome.i18n.getMessage('button_short'),
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
		'video',
		'short',
		'scheduled',
		'notification_on',
		'notification_off',
		'channels_all',
		'channels_personalized',
		'channels_none'
	];

	let default_live;
	let default_streamed;
	let default_video;
	let default_short;
	let default_scheduled;
	let default_notification_on;
	let default_notification_off;
	let default_channels_all;
	let default_channels_personalized;
	let default_channels_none;

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

		app.querySelectorAll('ytd-browse').forEach(n => insertMenu(n));
		app.querySelectorAll('ytd-section-list-renderer').forEach(n => insertMenu(n));

		chrome.storage.onChanged.addListener((changes, namespace) => {
			updateButtonVisibility(app);
		});
	} else {
		console.warn('ytd-app not found');
	}
}, error => { /* Not supported */ });