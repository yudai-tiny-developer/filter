const html_lang = document.documentElement.attributes['lang'];
if (html_lang) {
	import(chrome.runtime.getURL('lang/' + html_lang.value + '.js')).then(lang => {
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
					for (const mode of data.order ? data.order.split(',') : defaultOrder) {
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
			activeQuery.set(window.location.href, query);
			activeRegex.set(window.location.href, new RegExp(query.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&'), 'i'));
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

			// shelf
			node.querySelectorAll('ytd-shelf-renderer').forEach(n => updateShelfVisibility(n));
		}

		function classifyStatus(node) {
			let status = '';

			switch (node.nodeName) {
				case 'YTD-GRID-VIDEO-RENDERER':
				case 'YTD-VIDEO-RENDERER':
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
							}
						} else {
							const video_badge = node.querySelector('span.ytd-badge-supported-renderer');
							if (video_badge) { // members only video
								status += 'video.';
							}
						}
					}

					break;
				case 'YTD-PLAYLIST-VIDEO-RENDERER':
					const playlist_label = node.querySelector('span#text.ytd-thumbnail-overlay-time-status-renderer[aria-label]');
					if (playlist_label) {
						const t = playlist_label.attributes['aria-label'].value;
						if (lang.isLive_status_label(t)) {
							status += 'live.';
						} else if (lang.isVideo_status_label(t)) {
							status += 'video.';
						}
					} else {
						status += 'loading.'; // lazy load
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
						const t = channel_notification.attributes['aria-label'].value;
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
				case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
					status += 'post.';
					break;
				case 'YTD-GRID-PLAYLIST-RENDERER':
					status += 'playlist.';
					break;
				case 'YTD-REEL-ITEM-RENDERER':
					status += 'reel.';
					break;
			}

			return status;
		}

		function matchTextContentOrNotTarget(node) {
			switch (node.nodeName) {
				// subscriptions?flow=1, library, explore, trending
				case 'YTD-GRID-VIDEO-RENDERER':
					const grid_video_title = node.querySelector('a#video-title');
					if (grid_video_title) {
						return grid_video_title.textContent.match(getActiveRegex());
					} else {
						console.warn('a#video-title not found');
					}
					break;

				// subscriptions?flow=2, history, explore, trending
				case 'YTD-VIDEO-RENDERER':
					if (!node.classList.contains('ytd-backstage-post-renderer')) {
						const video_title = node.querySelector('a#video-title');
						if (video_title) {
							return video_title.textContent.match(getActiveRegex());
						} else {
							console.warn('a#video-title not found');
						}
					}
					break;

				// playlist
				case 'YTD-PLAYLIST-VIDEO-RENDERER':
					const playlist_video_meta = node.querySelector('div#meta');
					if (playlist_video_meta) {
						return playlist_video_meta.textContent.match(getActiveRegex());
					} else {
						console.warn('div#meta not found');
					}
					break;

				// channels
				case 'YTD-CHANNEL-RENDERER':
					const channel_info = node.querySelector('div#info');
					if (channel_info) {
						return channel_info.textContent.match(getActiveRegex());
					} else {
						console.warn('div#info not found');
					}
					break;

				// channel
				case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
					const backstage_post_thread_content = node.querySelector('div#content');
					if (backstage_post_thread_content) {
						return backstage_post_thread_content.textContent.match(getActiveRegex());
					} else {
						console.warn('div#content not found');
					}
					break;
				case 'YTD-GRID-PLAYLIST-RENDERER':
					const grid_playlist_title = node.querySelector('a#video-title');
					if (grid_playlist_title) {
						return grid_playlist_title.textContent.match(getActiveRegex());
					} else {
						console.warn('a#video-title not found');
					}
					break;
				case 'YTD-REEL-ITEM-RENDERER':
					const reel_item_title = node.querySelector('span#video-title');
					if (reel_item_title) {
						return reel_item_title.textContent.match(getActiveRegex());
					} else {
						console.warn('span#video-title not found');
					}
					break;
			}

			// not target
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
					updateTargetVisibility(node);
					break;

				// container
				case 'YTD-ITEM-SECTION-RENDERER':
					updateVisibility(node);
					break;

				// shelf
				case 'YTD-SHELF-RENDERER':
					updateShelfVisibility(node);
					break;
			}
		}

		function insertMenu(node) {
			const browse = searchParentNode(node, 'YTD-BROWSE');
			if (browse && !browse.querySelector('form.filter-menu')) {
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
					updateNodeValue(browse);
				} else {
					console.warn('ytd-two-column-browse-results-renderer not found');
				}
			}
		}

		function createMenu(positionFixed) {
			const menu = document.createElement('form');
			menu.classList.add('filter-menu');

			if (positionFixed) {
				menu.classList.add('position-fixed');
			}

			const input = createQueryInput(menu);

			menu.addEventListener('submit', (e) => {
				e.preventDefault();
				updateQueryRegex(app, input.value);
				updateVisibility(app);
			});

			menu.appendChild(createButton(button_all, 'all', input));
			menu.appendChild(createButton(button_live, 'live', input));
			menu.appendChild(createButton(button_streamed, 'streamed', input));
			menu.appendChild(createButton(button_live_streamed, 'live_streamed', input));
			menu.appendChild(createButton(button_video, 'video', input));
			menu.appendChild(createButton(button_streamed_video, 'streamed_video', input));
			menu.appendChild(createButton(button_scheduled, 'scheduled', input));
			menu.appendChild(createButton(button_notification_on, 'notification_on', input));
			menu.appendChild(createButton(button_notification_off, 'notification_off', input));

			menu.appendChild(createButton(button_channels_all, 'channels_all', input));
			menu.appendChild(createButton(button_channels_personalized, 'channels_personalized', input));
			menu.appendChild(createButton(button_channels_none, 'channels_none', input));

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
			const button = document.createElement('span');
			button.style.display = 'none';
			button.innerHTML = text;
			button.classList.add('filter-button');
			button.classList.add(mode);

			if (mode === getActiveMode()) {
				button.classList.add('selected');
			}

			button.addEventListener('click', () => {
				changeMode(mode);
				updateQueryRegex(app, input.value);
				updateVisibility(app);
			});

			return button;
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
			const button = document.createElement('span');
			button.innerHTML = button_clear;
			button.classList.add('filter-clear');

			button.addEventListener('click', () => {
				input.value = '';
				updateQueryRegex(app, '');
				updateVisibility(app);
			});

			return button;
		}

		function createSearchButton(input) {
			const button = document.createElement('span');
			button.innerHTML = button_search;
			button.classList.add('filter-query');
			button.classList.add('search');

			button.addEventListener('click', () => {
				updateQueryRegex(app, input.value);
				updateVisibility(app);
			});

			return button;
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
					status_or = ['live.', 'playlist.', 'loading.', 'post.', 'reel.'];
					break;
				case 'streamed':
					status_or = ['streamed.', 'playlist.', 'loading.', 'post.', 'reel.'];
					break;
				case 'live_streamed':
					status_or = ['live.', 'streamed.', 'playlist.', 'loading.', 'post.', 'reel.'];
					break;
				case 'video':
					status_or = ['video.', 'playlist.', 'loading.', 'post.', 'reel.'];
					break;
				case 'streamed_video':
					status_or = ['streamed.', 'video.', 'playlist.', 'loading.', 'post.', 'reel.'];
					break;
				case 'scheduled':
					status_or = ['scheduled.', 'playlist.', 'loading.', 'post.', 'reel.'];
					break;
				case 'notification_on':
					status_or = ['notification_on.', 'playlist.', 'loading.', 'post.', 'reel.'];
					break;
				case 'notification_off':
					status_or = ['notification_off.', 'playlist.', 'loading.', 'post.', 'reel.'];
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

			if (includesStatus(node, status_or) && matchTextContentOrNotTarget(node)) {
				node.style.display = '';
			} else {
				node.style.display = 'none';
			}
		}

		function updateShelfVisibility(node) {
			const title = node.querySelector('h2.ytd-shelf-renderer');
			if (isVisible(node, 'ytd-video-renderer')) {
				node.style.display = '';
				if (title) {
					title.style.display = '';
				}
			} else {
				if (hasWidth(node, 'div#menu')) {
					if (title) {
						title.style.display = 'none';
					}
				} else {
					node.style.display = 'none';
				}
			}
		}

		function hasWidth(node, selector) {
			for (const n of node.querySelectorAll(selector)) {
				const rect = n.getBoundingClientRect();
				if (rect.width > 0) {
					return true;
				}
			}
			return false;
		}

		function isVisible(node, selector) {
			for (const n of node.querySelectorAll(selector)) {
				const rect = n.getBoundingClientRect();
				if (n.style.display !== 'none') {
					return true;
				}
			}
			return false;
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
			const node_status = classifyStatus(node);

			if (node_status === '') {
				console.warn('Unknown status: ' + node.nodeName);
				return true;
			}

			for (const status of status_or) {
				if (node_status.includes(status)) {
					return true;
				}
			}
			return false;
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
			const mode = activeMode.get(window.location.href);
			if (mode) {
				return mode;
			} else {
				setActiveMode('all');
				return 'all';
			}
		}

		function setActiveMode(mode) {
			activeMode.set(window.location.href, mode);
		}

		function getActiveQuery() {
			const query = activeQuery.get(window.location.href);
			if (query) {
				return query;
			} else {
				activeQuery.set(window.location.href, '');
				return '';
			}
		}

		function getActiveRegex() {
			return activeRegex.get(window.location.href);
		}

		const button_all = chrome.i18n.getMessage('button_all');
		const button_live = chrome.i18n.getMessage('button_live');
		const button_streamed = chrome.i18n.getMessage('button_streamed');
		const button_live_streamed = chrome.i18n.getMessage('button_live_streamed');
		const button_video = chrome.i18n.getMessage('button_video');
		const button_streamed_video = chrome.i18n.getMessage('button_streamed_video');
		const button_scheduled = chrome.i18n.getMessage('button_scheduled');
		const button_notification_on = chrome.i18n.getMessage('button_notification_on');
		const button_notification_off = chrome.i18n.getMessage('button_notification_off');
		const button_clear = chrome.i18n.getMessage('button_clear');
		const button_search = chrome.i18n.getMessage('button_search');
		const button_channels_all = chrome.i18n.getMessage('button_channels_all');
		const button_channels_personalized = chrome.i18n.getMessage('button_channels_personalized');
		const button_channels_none = chrome.i18n.getMessage('button_channels_none');

		const defaultOrder = [
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

		const activeMode = new Map();
		const activeQuery = new Map();
		const activeRegex = new Map();

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
		}
	}, error => { /* Not supported */ });
}