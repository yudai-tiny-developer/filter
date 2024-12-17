import(chrome.runtime.getURL('common.js')).then(common => {
    const lang = document.documentElement.getAttribute('lang');
    import(chrome.runtime.getURL('lang/' + (lang ? lang : 'en') + '.js')).then(lang => {
        main(document.querySelector('ytd-app') ?? document.body, common, lang);
    });
});

function main(app, common, lang) {
    function updateButtonVisibility(node) {
        chrome.storage.local.get(common.storage, data => {
            for (const menu of node.querySelectorAll('form.filter-menu')) {
                const select = menu.querySelector('select.filter-menu');
                const progress = menu.querySelector('select.filter-menu-progress');

                menu.appendChild(menu.querySelector('span.filter-button-subscriptions.all'));
                menu.appendChild(menu.querySelector('span.filter-button-channels.all'));
                select.appendChild(select.querySelector('option.filter-button-subscriptions.all'));
                progress.appendChild(progress.querySelector('option.filter-button-progress.progress_all'));

                for (const mode of common.order(data.order)) {
                    if (mode === 'keyword' || mode === 'multiselection' || mode === 'responsive') {
                        // continue
                    } else if (mode.startsWith('progress_')) {
                        const option = progress.querySelector('option.filter-button-progress.' + mode);
                        const option_text = data['button_label_' + mode];
                        if (option_text) {
                            option.innerHTML = option_text;
                        } else {
                            option.innerHTML = common.button_label[mode];
                        }
                        progress.appendChild(option);
                    } else if (mode.startsWith('channels_')) {
                        const span = menu.querySelector('span.filter-button.' + mode);
                        const span_text = data['button_label_' + mode];
                        if (span_text) {
                            span.innerHTML = span_text;
                        } else {
                            span.innerHTML = common.button_label[mode];
                        }
                        menu.appendChild(span);
                    } else {
                        const span = menu.querySelector('span.filter-button.' + mode);
                        const span_text = data['button_label_' + mode];
                        if (span_text) {
                            span.innerHTML = span_text;
                        } else {
                            span.innerHTML = common.button_label[mode];
                        }
                        menu.appendChild(span);

                        const option = select.querySelector('option.filter-button.' + mode);
                        const option_text = data['button_label_' + mode];
                        if (option_text) {
                            option.innerHTML = option_text;
                        } else {
                            option.innerHTML = common.button_label[mode];
                        }
                        select.appendChild(option);
                    }
                }

                menu.appendChild(select);
                menu.appendChild(progress);

                for (const query of menu.querySelectorAll('span.filter-query')) {
                    menu.appendChild(query);
                }
            }

            const live = data.live === undefined ? true : data.live;
            const streamed = data.streamed === undefined ? true : data.streamed;
            const video = data.video === undefined ? true : data.video;
            const short = data.short === undefined ? true : data.short;
            const scheduled = data.scheduled === undefined ? true : data.scheduled;
            const notification_on = data.notification_on === undefined ? false : data.notification_on;
            const notification_off = data.notification_off === undefined ? false : data.notification_off;

            const progress_unwatched = data.progress_unwatched === undefined ? true : data.progress_unwatched;
            const progress_watched = data.progress_watched === undefined ? true : data.progress_watched;

            const channels_all = data.channels_all === undefined ? true : data.channels_all;
            const channels_personalized = data.channels_personalized === undefined ? true : data.channels_personalized;
            const channels_none = data.channels_none === undefined ? true : data.channels_none;

            const keyword = data.keyword === undefined ? true : data.keyword;

            default_tab.live = data.default_live;
            default_tab.streamed = data.default_streamed;
            default_tab.video = data.default_video;
            default_tab.short = data.default_short;
            default_tab.scheduled = data.default_scheduled;
            default_tab.notification_on = data.default_notification_on;
            default_tab.notification_off = data.default_notification_off;

            default_tab.progress_unwatched = data.default_progress_unwatched;
            default_tab.progress_watched = data.default_progress_watched;

            default_tab.channels_all = data.default_channels_all;
            default_tab.channels_personalized = data.default_channels_personalized;
            default_tab.channels_none = data.default_channels_none;

            multiselection = data.multiselection === undefined ? false : data.multiselection;
            responsive = data.responsive === undefined ? true : data.responsive;
            limit = data.limit === undefined ? common.defaultLimit : data.limit;
            default_keyword = data.default_keyword === undefined ? '' : data.default_keyword;

            if (common.isSubscriptions(location.href) || common.isLibrary(location.href) || common.isPlaylist(location.href)) {
                node.querySelectorAll('span.filter-button-subscriptions.all').forEach(n => n.style.display = all_visibled([live, streamed, video, short, scheduled, notification_on, notification_off]));
                node.querySelectorAll('span.filter-button-subscriptions.live').forEach(n => n.style.display = live === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.streamed').forEach(n => n.style.display = streamed === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.video').forEach(n => n.style.display = video === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.short').forEach(n => n.style.display = short === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.scheduled').forEach(n => n.style.display = scheduled === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.notification_on').forEach(n => n.style.display = notification_on === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.notification_off').forEach(n => n.style.display = notification_off === true ? '' : 'none');

                node.querySelectorAll('select.filter-menu').forEach(n => n.style.display = all_visibled([live, streamed, video, short, scheduled, notification_on, notification_off]));
                node.querySelectorAll('option.filter-button-subscriptions.all').forEach(n => n.style.display = all_visibled([live, streamed, video, short, scheduled, notification_on, notification_off]));
                node.querySelectorAll('option.filter-button-subscriptions.live').forEach(n => n.style.display = live === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.streamed').forEach(n => n.style.display = streamed === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.video').forEach(n => n.style.display = video === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.short').forEach(n => n.style.display = short === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.scheduled').forEach(n => n.style.display = scheduled === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.notification_on').forEach(n => n.style.display = notification_on === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.notification_off').forEach(n => n.style.display = notification_off === true ? '' : 'none');

                node.querySelectorAll('select.filter-menu-progress').forEach(n => n.style.display = all_visibled([progress_unwatched, progress_watched]));
                node.querySelectorAll('option.filter-button-progress.progress_all').forEach(n => n.style.display = all_visibled([progress_unwatched, progress_watched]));
                node.querySelectorAll('option.filter-button-progress.progress_unwatched').forEach(n => n.style.display = progress_unwatched === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-progress.progress_watched').forEach(n => n.style.display = progress_watched === true ? '' : 'none');

                node.querySelectorAll('span.filter-button-channels.all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_personalized').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_none').forEach(n => n.style.display = 'none');

                node.querySelectorAll('span.filter-query').forEach(n => n.style.display = keyword === true ? '' : 'none');
            } else if (common.isHistory(location.href) || common.isHashTag(location.href)) {
                node.querySelectorAll('span.filter-button-subscriptions.all').forEach(n => n.style.display = all_visibled([live, video, short]));
                node.querySelectorAll('span.filter-button-subscriptions.live').forEach(n => n.style.display = live === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.streamed').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.video').forEach(n => n.style.display = video === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.short').forEach(n => n.style.display = short === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-subscriptions.scheduled').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.notification_on').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.notification_off').forEach(n => n.style.display = 'none');

                node.querySelectorAll('select.filter-menu').forEach(n => n.style.display = all_visibled([live, video, short]));
                node.querySelectorAll('option.filter-button-subscriptions.all').forEach(n => n.style.display = all_visibled([live, video, short]));
                node.querySelectorAll('option.filter-button-subscriptions.live').forEach(n => n.style.display = live === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.streamed').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.video').forEach(n => n.style.display = video === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.short').forEach(n => n.style.display = short === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-subscriptions.scheduled').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.notification_on').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.notification_off').forEach(n => n.style.display = 'none');

                node.querySelectorAll('select.filter-menu-progress').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-progress.progress_all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-progress.progress_unwatched').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-progress.progress_watched').forEach(n => n.style.display = 'none');

                node.querySelectorAll('span.filter-button-channels.all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_personalized').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_none').forEach(n => n.style.display = 'none');

                node.querySelectorAll('span.filter-query').forEach(n => n.style.display = keyword === true ? '' : 'none');
            } else if (common.isShorts(location.href) || common.isPlaylists(location.href) || common.isChannel(location.href)) {
                node.querySelectorAll('span.filter-button-subscriptions.all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.live').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.streamed').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.video').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.short').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.scheduled').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.notification_on').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.notification_off').forEach(n => n.style.display = 'none');

                node.querySelectorAll('select.filter-menu').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.live').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.streamed').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.video').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.short').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.scheduled').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.notification_on').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.notification_off').forEach(n => n.style.display = 'none');

                node.querySelectorAll('select.filter-menu-progress').forEach(n => n.style.display = all_visibled([progress_unwatched, progress_watched]));
                node.querySelectorAll('option.filter-button-progress.progress_all').forEach(n => n.style.display = all_visibled([progress_unwatched, progress_watched]));
                node.querySelectorAll('option.filter-button-progress.progress_unwatched').forEach(n => n.style.display = progress_unwatched === true ? '' : 'none');
                node.querySelectorAll('option.filter-button-progress.progress_watched').forEach(n => n.style.display = progress_watched === true ? '' : 'none');

                node.querySelectorAll('span.filter-button-channels.all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_personalized').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-channels.channels_none').forEach(n => n.style.display = 'none');

                node.querySelectorAll('span.filter-query').forEach(n => n.style.display = keyword === true ? '' : 'none');
            } else if (common.isChannels(location.href)) {
                node.querySelectorAll('span.filter-button-subscriptions.all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.live').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.streamed').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.video').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.short').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.scheduled').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.notification_on').forEach(n => n.style.display = 'none');
                node.querySelectorAll('span.filter-button-subscriptions.notification_off').forEach(n => n.style.display = 'none');

                node.querySelectorAll('select.filter-menu').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.live').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.streamed').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.video').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.short').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.scheduled').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.notification_on').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-subscriptions.notification_off').forEach(n => n.style.display = 'none');

                node.querySelectorAll('select.filter-menu-progress').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-progress.progress_all').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-progress.progress_unwatched').forEach(n => n.style.display = 'none');
                node.querySelectorAll('option.filter-button-progress.progress_watched').forEach(n => n.style.display = 'none');

                node.querySelectorAll('span.filter-button-channels.all').forEach(n => n.style.display = all_visibled([channels_all, channels_personalized, channels_none]));
                node.querySelectorAll('span.filter-button-channels.channels_all').forEach(n => n.style.display = channels_all === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-channels.channels_personalized').forEach(n => n.style.display = channels_personalized === true ? '' : 'none');
                node.querySelectorAll('span.filter-button-channels.channels_none').forEach(n => n.style.display = channels_none === true ? '' : 'none');

                node.querySelectorAll('span.filter-query').forEach(n => n.style.display = keyword === true ? '' : 'none');
            } else {
                console.warn('Unknown target: ' + location.href);
            }

            onResize(true);

            changeMode(getActiveMode().values().next().value, multiselection, false);
            changeModeProgress(getActiveModeProgress().values().next().value, multiselection, false);
            updateQueryRegex(node, getActiveQuery());
            updateVisibility(node);
        });
    }

    function all_visibled(data_list) {
        for (const data of data_list) {
            if (data) {
                return '';
            }
        }
        return 'none';
    }

    function isMenuTarget() {
        return common.isSubscriptions(location.href)
            || common.isShorts(location.href)
            || common.isLibrary(location.href)
            || common.isHistory(location.href)
            || common.isPlaylists(location.href)
            || common.isPlaylist(location.href)
            || common.isChannels(location.href)
            || common.isChannel(location.href)
            || common.isHashTag(location.href)
            ;
    }

    function isPositionFixedTarget() {
        return common.isSubscriptions(location.href)
            || common.isShorts(location.href)
            || common.isLibrary(location.href)
            || common.isHistory(location.href)
            || common.isPlaylists(location.href)
            || common.isPlaylist(location.href)
            || common.isChannels(location.href)
            || common.isHashTag(location.href)
            ;
    }

    function forTwoColumnBrowseResultsRenderer() {
        return common.isChannel(location.href);
    }

    function needSpacer() {
        return common.isSubscriptions(location.href)
            || common.isShorts(location.href)
            || common.isLibrary(location.href)
            || common.isHistory(location.href)
            || common.isPlaylists(location.href)
            || common.isPlaylist(location.href)
            || common.isChannels(location.href)
            ;
    }

    function updateQueryRegex(node, query) {
        active.query.set(location.href, query);

        const queryList = [];
        const notQueryList = [];
        const tokenList = query.replace(/[.*+?^=!:${}()[\]\/\\]/g, '\\$&').match(/[^\s|\-"]+|"([^"]*)"|\||\-/g);
        let nextOr = false;
        let nextNot = false;
        if (tokenList) {
            for (const token of tokenList) {
                if (token === '|') {
                    nextOr = true;
                } else if (token === '-') {
                    nextNot = true;
                } else {
                    const t = token.replace(/\|/g, '\\|');
                    if (nextOr) {
                        if (queryList.length - 1 >= 0) {
                            queryList[queryList.length - 1] = queryList[queryList.length - 1] + '|' + t;
                        } else {
                            queryList.push(t);
                        }
                        nextOr = false;
                    } else if (nextNot) {
                        notQueryList.push(t);
                        nextNot = false;
                    } else {
                        queryList.push(t);
                    }
                }
            }
        } else {
            // empty query
        }

        const regExpList = [];
        for (const q of queryList) {
            regExpList.push(new RegExp(q.replace(/"/g, ''), 'i'));
        }
        active.regex.set(location.href, regExpList);

        const notRegExpList = [];
        for (const q of notQueryList) {
            notRegExpList.push(new RegExp(q.replace(/"/g, ''), 'i'));
        }
        active.notRegex.set(location.href, notRegExpList);

        node.querySelectorAll('input#filter-query').forEach(e => e.value = query);
    }

    function updateVisibility(node) {
        // shorts
        if (common.isSubscriptions(location.href)) {
            node.querySelectorAll('ytd-rich-section-renderer:has(button.yt-spec-button-shape-next)').forEach(n => n.style.display = 'none');
        }

        // subscriptions?flow=1, library
        node.querySelectorAll('ytd-grid-video-renderer').forEach(n => updateTargetVisibility(n));

        // subscriptions?flow=2, history
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
        const status = new Set();

        switch (node.nodeName) {
            case 'YTD-GRID-VIDEO-RENDERER':
            case 'YTD-VIDEO-RENDERER':
            case 'YTD-RICH-ITEM-RENDERER':
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
                const metadata_line = node.querySelector('div#metadata-line');
                const byline_container = node.querySelector('div#byline-container');
                if (metadata_line || byline_container) {
                    const t = (metadata_line?.textContent ?? '') + '\n' + (byline_container?.textContent ?? '');
                    if (lang.isLive_metadata(t)) {
                        status.add('live');
                    } else if (lang.isStreamed_metadata(t)) {
                        status.add('streamed');
                    } else if (lang.isScheduled_metadata(t)) {
                        status.add('scheduled');

                        const video_button = node.querySelector('ytd-toggle-button-renderer yt-formatted-string,ytd-toggle-button-renderer yt-button-shape');
                        if (video_button) {
                            const t = video_button.textContent;
                            if (lang.isNotificationOn_button(t)) {
                                status.add('notification_on');
                            } else if (lang.isNotificationOff_button(t)) {
                                status.add('notification_off');
                            } else {
                                console.warn('Unknown notification status: ' + t);
                            }
                        } else {
                            console.warn('ytd-toggle-button-renderer not found');
                        }
                    } else /*if (lang.isVideo_metadata(t))*/ {
                        const thumbnail_overlay = node.querySelector('ytd-thumbnail-overlay-time-status-renderer');
                        if (thumbnail_overlay) {
                            const overlay_style = thumbnail_overlay.getAttribute('overlay-style');
                            if (overlay_style) {
                                if (overlay_style === 'DEFAULT') {
                                    status.add('video');
                                } else if (overlay_style === 'SHORTS') {
                                    status.add('short');
                                } else {
                                    // membership only video
                                    status.add('video');
                                }
                            } else {
                                console.warn('overlay-style not found');
                            }
                        }

                        const slim_media = node.querySelector('ytd-rich-grid-slim-media');
                        if (slim_media) {
                            status.add('short');
                        }
                    }
                } else {
                    // playlist
                }

                break;
            case 'YTD-CHANNEL-RENDERER':
                const channel_notification = node.querySelector('ytd-subscription-notification-toggle-button-renderer button#button[aria-label],ytd-subscription-notification-toggle-button-renderer-next button[aria-label]');
                if (channel_notification) {
                    const t = channel_notification.getAttribute('aria-label');
                    if (lang.isChannelsAllNotifications(t)) {
                        status.add('channels_all');
                    } else if (lang.isChannelsPersonalizedNotifications(t)) {
                        status.add('channels_personalized');
                    } else if (lang.isChannelsNoNotifications(t)) {
                        status.add('channels_none');
                    } else {
                        console.warn('Unknown channel notification: ' + t);
                    }
                }
                break;
            case 'YTD-REEL-ITEM-RENDERER':
                status.add('short');
                break;
        }

        return status;
    }

    function classifyStatusProgress(node) {
        const status = new Set();

        switch (node.nodeName) {
            case 'YTD-GRID-VIDEO-RENDERER':
            case 'YTD-VIDEO-RENDERER':
            case 'YTD-RICH-ITEM-RENDERER':
                const video_progress = node.querySelector('div#progress');
                if (video_progress) {
                    status.add('progress_watched');
                } else {
                    status.add('progress_unwatched');
                }
                break;
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
                const playlist_progress = node.querySelector('div#progress');
                if (playlist_progress) {
                    status.add('progress_watched');
                } else {
                    status.add('progress_unwatched');
                }
                break;
        }

        return status;
    }

    function matchTextContent(node) {
        switch (node.nodeName) {
            // subscriptions?flow=1, library
            case 'YTD-GRID-VIDEO-RENDERER':
                const grid_video_title = node.querySelector('a#video-title');
                if (grid_video_title) {
                    return matchQuery(grid_video_title.textContent);
                } else {
                    console.warn('a#video-title not found');
                }
                break;

            // subscriptions?flow=2, history
            case 'YTD-VIDEO-RENDERER':
                if (!node.classList.contains('ytd-backstage-post-renderer')) {
                    const video_title = node.querySelector('a#video-title');
                    if (video_title) {
                        return matchQuery(video_title.textContent);
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
                    return matchQuery(playlist_video_meta.textContent);
                } else {
                    console.warn('div#meta not found');
                }
                break;

            // channel
            case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
                const backstage_post_thread_content = node.querySelector('div#content');
                if (backstage_post_thread_content) {
                    return matchQuery(backstage_post_thread_content.textContent);
                } else {
                    console.warn('div#content not found');
                }
                break;
            case 'YTD-GRID-PLAYLIST-RENDERER':
                const grid_playlist_title = node.querySelector('a#video-title');
                if (grid_playlist_title) {
                    return matchQuery(grid_playlist_title.textContent);
                } else {
                    console.warn('a#video-title not found');
                }
                break;
            case 'YTD-REEL-ITEM-RENDERER':
                const reel_item_title = node.querySelector('span#video-title');
                if (reel_item_title) {
                    return matchQuery(reel_item_title.textContent);
                } else {
                    console.warn('span#video-title not found');
                }
                break;

            // channel, shorts, playlists
            case 'YTD-RICH-ITEM-RENDERER':
                const rich_item_title = node.querySelector('h3.ytd-rich-grid-media,.ytd-rich-grid-slim-media, .yt-core-attributed-string');
                if (rich_item_title) {
                    return matchQuery(rich_item_title.textContent);
                } else {
                    // ad
                }
                break;

            // channels
            case 'YTD-CHANNEL-RENDERER':
                const channel_info = node.querySelector('div#info');
                if (channel_info) {
                    return matchQuery(channel_info.textContent);
                } else {
                    console.warn('div#info not found');
                }
                break;
        }

        // default: visible
        return true;
    }

    function onNodeLoaded(node, isFilterTarget) {
        if (isFilterTarget) {
            switch (node.nodeName) {
                case 'YTD-BROWSE':
                case 'YTD-SECTION-LIST-RENDERER':
                    insertMenu(node);
                    break;

                // subscriptions?flow=1, library
                case 'YTD-GRID-VIDEO-RENDERER':
                    updateTargetVisibility(node);
                    break;

                // subscriptions?flow=2, history
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

                // progress
                case 'YTD-THUMBNAIL-OVERLAY-RESUME-PLAYBACK-RENDERER':
                    let progress_video = searchParentNode(node, 'YTD-GRID-VIDEO-RENDERER');
                    if (progress_video) {
                        updateTargetVisibility(progress_video);
                        break;
                    }

                    progress_video = searchParentNode(node, 'YTD-VIDEO-RENDERER');
                    if (progress_video) {
                        updateTargetVisibility(progress_video);
                        break;
                    }

                    break;

                // continuation stopper
                case 'YTD-CONTINUATION-ITEM-RENDERER':
                    if (common.isSubscriptions(location.href)) {
                        if (node.parentNode.children.length > limit) {
                            node.style.display = 'none';

                            const load_button_container = document.createElement('div');
                            load_button_container.classList.add('filter-button-load');
                            const load_button = document.createElement('button');
                            load_button.innerText = common.button_label.load;
                            load_button.classList.add('yt-spec-button-shape-next', 'yt-spec-button-shape-next--tonal', 'yt-spec-button-shape-next--mono', 'yt-spec-button-shape-next--size-m');
                            load_button.addEventListener('click', () => {
                                load_button_container.style.display = 'none';
                                node.style.display = '';
                                window.scroll({ top: app.scrollHeight, behavior: 'instant' });
                            });
                            load_button_container.appendChild(load_button);
                            node.parentNode.appendChild(load_button_container);
                        }
                    }
                    break;
            }
        }
    }

    function insertMenu(node) {
        const browse = searchParentNode(node, 'YTD-BROWSE');
        if (browse) {
            if (!browse.querySelector('form.filter-menu')) {
                const position_fixed = isPositionFixedTarget();
                const referenceNode = forTwoColumnBrowseResultsRenderer() ? browse.querySelector('ytd-two-column-browse-results-renderer') : browse.firstChild;
                browse.insertBefore(createMenu(position_fixed, browse), referenceNode);
                if (needSpacer()) {
                    browse.insertBefore(createSpacer('browse'), referenceNode);
                }

                updateButtonVisibility(browse);
                updateMenuVisibility(browse, true);
            } else {
                // already exists
            }
        } else {
            // not target
        }
    }

    function insertPlaylistSpacer() {
        for (const sidebar of app.querySelectorAll('ytd-playlist-sidebar-renderer')) {
            if (sidebar.firstChild.id !== 'sidebar-spacer') {
                sidebar.insertBefore(createSpacer('sidebar-spacer'), sidebar.firstChild);
            } else {
                // already exists
            }
        }

        for (const header of app.querySelectorAll('ytd-playlist-header-renderer')) {
            if (header.firstChild.id !== 'header-spacer') {
                header.insertBefore(createSpacer('header-spacer'), header.firstChild);
            } else {
                // already exists
            }
        }
    }

    function createMenu(position_fixed, browse) {
        const menu = document.createElement('form');
        menu.style.display = 'none';

        if (position_fixed) {
            menu.classList.add('filter-menu', 'position-fixed');
        } else {
            menu.classList.add('filter-menu');
        }

        menu.appendChild(createButton(common.button_label.all, 'all'));
        menu.appendChild(createButton(common.button_label.live, 'live'));
        menu.appendChild(createButton(common.button_label.streamed, 'streamed'));
        menu.appendChild(createButton(common.button_label.video, 'video'));
        menu.appendChild(createButton(common.button_label.short, 'short', true));
        menu.appendChild(createButton(common.button_label.scheduled, 'scheduled'));
        menu.appendChild(createButton(common.button_label.notification_on, 'notification_on'));
        menu.appendChild(createButton(common.button_label.notification_off, 'notification_off'));

        const select = createSelect();
        select.appendChild(createOption(common.button_label.placeholder));
        select.appendChild(createOption(common.button_label.all, 'all'));
        select.appendChild(createOption(common.button_label.live, 'live'));
        select.appendChild(createOption(common.button_label.streamed, 'streamed'));
        select.appendChild(createOption(common.button_label.video, 'video'));
        select.appendChild(createOption(common.button_label.short, 'short'));
        select.appendChild(createOption(common.button_label.scheduled, 'scheduled'));
        select.appendChild(createOption(common.button_label.notification_on, 'notification_on'));
        select.appendChild(createOption(common.button_label.notification_off, 'notification_off'));
        menu.appendChild(select);

        const progress = createSelectProgress();
        progress.appendChild(createOptionProgress(common.button_label.progress_placeholder));
        progress.appendChild(createOptionProgress(common.button_label.progress_all, 'progress_all'));
        progress.appendChild(createOptionProgress(common.button_label.progress_unwatched, 'progress_unwatched'));
        progress.appendChild(createOptionProgress(common.button_label.progress_watched, 'progress_watched'));
        menu.appendChild(progress);

        menu.appendChild(createButtonChannels(common.button_label.all, 'all'));
        menu.appendChild(createButtonChannels(common.button_label.channels_all, 'channels_all'));
        menu.appendChild(createButtonChannels(common.button_label.channels_personalized, 'channels_personalized'));
        menu.appendChild(createButtonChannels(common.button_label.channels_none, 'channels_none'));

        const input = createQueryInput(menu);
        menu.appendChild(createQueryInputArea(input));
        menu.appendChild(createSearchButton(input));

        menu.addEventListener('submit', e => {
            e.preventDefault();
            updateQueryRegex(app, input.value);
            updateVisibility(app);
            window.scroll({ top: 0, behavior: 'instant' });
        });

        createNodeForCalc(menu, browse);

        return menu;
    }

    function createSpacer(id) {
        const spacer = document.createElement('div');
        spacer.classList.add('filter-menu', 'spacer');
        spacer.id = id;
        return spacer;
    }

    function createButton(text, mode, isShorts) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-button', 'filter-button-subscriptions', mode);
        span.innerHTML = text;
        const onclick = () => {
            if (isShorts && common.isSubscriptions(location.href)) {
                location.href = 'https://www.youtube.com/feed/subscriptions/shorts';
            } else {
                changeMode(mode, multiselection, span.classList.contains('selected'));
                updateVisibility(app);
                window.scroll({ top: 0, behavior: 'instant' });
            }
        };
        span.addEventListener('click', onclick);
        span.addEventListener('touchstart', onclick);
        return span;
    }

    function createButtonChannels(text, mode) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-button', 'filter-button-channels', mode);
        span.innerHTML = text;
        span.addEventListener('click', () => {
            changeMode(mode, multiselection, span.classList.contains('selected'));
            updateVisibility(app);
            window.scroll({ top: 0, behavior: 'instant' });
        });
        return span;
    }

    function createSelect() {
        const select = document.createElement('select');
        select.style.display = 'none';
        select.classList.add('filter-menu', 'filter-menu-subscriptions');
        select.addEventListener('change', () => {
            changeMode(select.value, multiselection, select.querySelector('option.selected.' + select.value));
            updateVisibility(app);
            window.scroll({ top: 0, behavior: 'instant' });
        });
        return select;
    }

    function createOption(text, mode) {
        const option = document.createElement('option');
        option.classList.add('filter-button', 'filter-button-subscriptions');
        option.innerHTML = text;
        if (mode) {
            option.classList.add(mode);
            option.value = mode;
        } else {
            option.classList.add('placeholder');
            option.disabled = true;
        }
        return option;
    }

    function createSelectProgress() {
        const select = document.createElement('select');
        select.style.display = 'none';
        select.classList.add('filter-menu', 'filter-menu-progress');
        select.addEventListener('change', () => {
            changeModeProgress(select.value, multiselection, select.querySelector('option.selected.' + select.value));
            updateVisibility(app);
            window.scroll({ top: 0, behavior: 'instant' });
        });
        return select;
    }

    function createOptionProgress(text, mode) {
        const option = document.createElement('option');
        option.classList.add('filter-button', 'filter-button-progress');
        option.innerHTML = text;
        if (mode) {
            option.classList.add(mode);
            option.value = mode;
        } else {
            option.classList.add('placeholder');
            option.disabled = true;
        }
        return option;
    }

    function createQueryInputArea(input) {
        const inputArea = document.createElement('span');
        inputArea.style.display = 'none';
        inputArea.classList.add('filter-query', 'area');
        inputArea.appendChild(input);
        inputArea.appendChild(createClearButton(input));
        return inputArea;
    }

    function createQueryInput(menu) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Subscription Feed Filter');
        input.setAttribute('title', '".." : PHRASE search operator. e.g. "Phrase including spaces"\n| : OR search operator. e.g. Phrase1 | Phrase2\n- : NOT search operator. e.g. -Phrase');
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
        span.classList.add('filter-clear');
        span.innerHTML = common.button_label.clear;
        span.addEventListener('click', () => {
            input.value = '';
            updateQueryRegex(app, '');
            updateVisibility(app);
            window.scroll({ top: 0, behavior: 'instant' });
        });
        return span;
    }

    function createSearchButton(input) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-query', 'search');
        span.innerHTML = common.button_label.search;
        span.addEventListener('click', () => {
            updateQueryRegex(app, input.value);
            updateVisibility(app);
            window.scroll({ top: 0, behavior: 'instant' });
        });
        return span;
    }

    function updateMenuVisibility(node, isFilterTarget) {
        if (isFilterTarget) {
            node.querySelectorAll('form.filter-menu, div.filter-menu').forEach(n => n.style.display = '');
        } else {
            node.querySelectorAll('form.filter-menu, div.filter-menu').forEach(n => n.style.display = 'none');
        }
    }

    function updateTargetVisibility(node) {
        if (node.classList.contains('filter-separator')) {
            node.style.display = '';
        } else if (includesStatus(node, getActiveMode(), getActiveModeProgress()) && matchTextContent(node)) {
            node.style.display = '';
        } else {
            node.style.display = 'none';
        }
    }

    function onViewChanged(isFilterTarget) {
        if (isFilterTarget) {
            insertPlaylistSpacer();
            updateButtonVisibility(app);
        }
        updateMenuVisibility(app, isFilterTarget);
        updateVisibility(app);
    }

    function includesStatus(node, status_mode, status_progress) {
        return includesStatusMode(node, status_mode) && includesStatusProgress(node, status_progress);
    }

    function includesStatusMode(node, status) {
        if (status.size === 0 || status.has('all')) {
            return true;
        } else {
            for (const s of status) {
                const node_status = classifyStatus(node);
                if (node_status.has(s)) {
                    return true;
                }
            }
            return false;
        }
    }

    function includesStatusProgress(node, status) {
        if (status.size === 0 || status.has('progress_all')) {
            return true;
        } else {
            for (const s of status) {
                const node_status = classifyStatusProgress(node);
                if (node_status.has(s)) {
                    return true;
                }
            }
            return false;
        }
    }

    function changeMode(mode, multi, sub) {
        const modes = multi ? getActiveMode() : new Set();

        if (!mode) {
            if (common.isSubscriptions(location.href)) {
                if (default_tab.live) modes.add('live');
                if (default_tab.streamed) modes.add('streamed');
                if (default_tab.video) modes.add('video');
                if (default_tab.short) modes.add('short');
                if (default_tab.scheduled) modes.add('scheduled');
                if (default_tab.notification_on) modes.add('notification_on');
                if (default_tab.notification_off) modes.add('notification_off');
                if (modes.size === 0) modes.add('all');
            } else if (common.isChannels(location.href)) {
                if (default_tab.channels_all) modes.add('channels_all');
                if (default_tab.channels_personalized) modes.add('channels_personalized');
                if (default_tab.channels_none) modes.add('channels_none');
                if (modes.size === 0) modes.add('all');
            } else {
                modes.add('all');
            }
        } else {
            if (multi && sub) {
                modes.delete(mode);
                if (modes.size === 0) {
                    modes.add('all');
                }
            } else {
                if (mode === 'all') {
                    modes.clear();
                } else {
                    modes.delete('all');
                }
                modes.add(mode);
            }
        }

        setActiveMode(modes);

        app.querySelectorAll('span.filter-button-subscriptions, span.filter-button-channels').forEach(n => n.classList.remove('selected'));
        app.querySelectorAll('option.filter-button-subscriptions, option.filter-button-channels').forEach(n => {
            n.selected = false;
            n.classList.remove('selected');

            const i = n.innerHTML.indexOf('✔ ');
            if (i !== -1) {
                n.innerHTML = n.innerHTML.substring(i + 1);
            }
        });
        if (common.isChannels(location.href)) {
            for (const mode of modes) {
                app.querySelectorAll('span.filter-button-channels.' + mode).forEach(n => n.classList.add('selected'));
            }
        } else {
            for (const mode of modes) {
                app.querySelectorAll('span.filter-button-subscriptions.' + mode).forEach(n => n.classList.add('selected'));
                app.querySelectorAll('option.filter-button-subscriptions.' + mode).forEach(n => {
                    n.classList.add('selected');

                    if (multi) {
                        const i = n.innerHTML.indexOf('✔ ');
                        if (i === -1) {
                            n.innerHTML = '✔ ' + n.innerHTML;
                        }
                    }
                });
            }
            if (multi) {
                app.querySelectorAll('option.filter-button-subscriptions.placeholder').forEach(n => n.selected = true);
            } else {
                app.querySelectorAll('option.filter-button-subscriptions.selected').forEach(n => n.selected = true);
            }
        }
    }

    function changeModeProgress(mode, multi, sub) {
        const modes = multi ? getActiveModeProgress() : new Set();

        if (!mode) {
            if (common.isSubscriptions(location.href)) {
                if (default_tab.progress_unwatched) modes.add('progress_unwatched');
                if (default_tab.progress_watched) modes.add('progress_watched');
                if (modes.size === 0) modes.add('progress_all');
            } else {
                modes.add('progress_all');
            }
        } else {
            if (multi && sub) {
                modes.delete(mode);
                if (modes.size === 0) {
                    modes.add('progress_all');
                }
            } else {
                if (mode === 'progress_all') {
                    modes.clear();
                } else {
                    modes.delete('progress_all');
                }
                modes.add(mode);
            }
        }

        setActiveModeProgress(modes);

        app.querySelectorAll('option.filter-button-progress').forEach(n => {
            n.selected = false;
            n.classList.remove('selected');

            const i = n.innerHTML.indexOf('✔ ');
            if (i !== -1) {
                n.innerHTML = n.innerHTML.substring(i + 1);
            }
        });
        for (const mode of modes) {
            app.querySelectorAll('option.filter-button-progress.' + mode).forEach(n => {
                n.classList.add('selected');

                if (multi) {
                    const i = n.innerHTML.indexOf('✔ ');
                    if (i === -1) {
                        n.innerHTML = '✔ ' + n.innerHTML;
                    }
                }
            });
        }
        if (multi) {
            app.querySelectorAll('option.filter-button-progress.placeholder').forEach(n => n.selected = true);
        } else {
            app.querySelectorAll('option.filter-button-progress.selected').forEach(n => n.selected = true);
        }
    }

    function searchParentNode(node, nodeName) {
        for (let n = node; n; n = n.parentNode) {
            if (n.nodeName === nodeName) {
                return n;
            }
        }
        return undefined;
    }

    function getActiveMode() {
        const mode = active.mode.get(location.href);
        if (mode) {
            return mode;
        } else {
            return new Set();
        }
    }

    function getActiveModeProgress() {
        const mode = active.mode_progress.get(location.href);
        if (mode) {
            return mode;
        } else {
            return new Set();
        }
    }

    function setActiveMode(mode) {
        active.mode.set(location.href, mode);
    }

    function setActiveModeProgress(mode_progress) {
        active.mode_progress.set(location.href, mode_progress);
    }

    function getActiveQuery() {
        const query = active.query.get(location.href);
        if (query) {
            return query;
        } else if (common.isSubscriptions(location.href)) {
            active.query.set(location.href, default_keyword);
            return default_keyword;
        } else {
            active.query.set(location.href, '');
            return '';
        }
    }

    function matchQuery(text) {
        return matchAllActiveRegex(text) && matchAllActiveNotRegex(text);
    }

    function matchAllActiveRegex(text) {
        const rs = active.regex.get(location.href);
        if (rs) {
            for (const r of rs) {
                if (!text.match(r)) {
                    return false;
                }
            }
        }
        return true;
    }

    function matchAllActiveNotRegex(text) {
        const rs = active.notRegex.get(location.href);
        if (rs) {
            for (const r of rs) {
                if (!!r && text.match(r)) {
                    return false;
                }
            }
        }
        return true;
    }

    function onResize(force = false) {
        if (responsive) {
            for (const form of app.querySelectorAll('form.filter-menu')) {
                if (form.parentNode.scrollWidth !== 0 && (force || form.parentNode.scrollWidth !== prevWidth)) {
                    form.parentNode.appendChild(nodeForCalc);
                    if (nodeForCalc.scrollWidth <= form.parentNode.scrollWidth) {
                        document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
                        document.documentElement.style.setProperty('--filter-menu-display', 'none');
                    } else {
                        document.documentElement.style.setProperty('--filter-button-display', 'none');
                        document.documentElement.style.setProperty('--filter-menu-display', 'block');
                    }

                    prevWidth = form.parentNode.scrollWidth;
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(onResize, 256);

                    return;
                }
            }
        } else {
            document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
            document.documentElement.style.setProperty('--filter-menu-display', 'none');
        }
    }

    function createNodeForCalc(menu, browse) {
        if (!nodeForCalc) {
            nodeForCalc = menu.cloneNode(true);
            nodeForCalc.classList.add('filter-forCalc');
            browse.appendChild(nodeForCalc);
        }
    }

    const default_tab = {
        live: false,
        streamed: false,
        video: false,
        short: false,
        scheduled: false,
        notification_on: false,
        notification_off: false,

        progress_unwatched: false,
        progress_watched: false,

        channels_all: false,
        channels_personalized: false,
        channels_none: false,
    };

    const active = {
        mode: new Map(),
        mode_progress: new Map(),
        query: new Map(),
        regex: new Map(),
        notRegex: new Map(),
    };

    let multiselection;

    let prevWidth = 0;
    let resizeTimer;
    let nodeForCalc;
    let responsive;
    let limit = 1000;
    let default_keyword = '';

    document.addEventListener('yt-navigate-finish', () => {
        onViewChanged(isMenuTarget());
    });

    new MutationObserver((mutations, observer) => {
        const isFilterTarget = isMenuTarget();
        for (const m of mutations) {
            onNodeLoaded(m.target, isFilterTarget);
        }
    }).observe(app, {
        subtree: true,
        childList: true,
    });

    if (isMenuTarget()) {
        app.querySelectorAll('ytd-browse, ytd-section-list-renderer').forEach(n => insertMenu(n));
    }

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (isMenuTarget()) {
            updateButtonVisibility(app);
        }
    });

    window.addEventListener('resize', onResize);
}