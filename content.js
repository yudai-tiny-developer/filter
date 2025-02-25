import(chrome.runtime.getURL('common.js')).then(common => {
    const lang = document.documentElement.getAttribute('lang');
    import(chrome.runtime.getURL('lang/' + (lang ? lang : 'en') + '.js')).then(lang => {
        main(document.querySelector('ytd-app') ?? document.body, common, lang);
    });
});

function main(app, common, lang) {
    async function updateButtonVisibility(node) {
        await chrome.storage.local.get(common.storage).then(data => {
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

            const live = common.value(data.live, common.default_live);
            const streamed = common.value(data.streamed, common.default_streamed);
            const video = common.value(data.video, common.default_video);
            const short = common.value(data.short, common.default_short);
            const scheduled = common.value(data.scheduled, common.default_scheduled);
            const notification_on = common.value(data.notification_on, common.default_notification_on);
            const notification_off = common.value(data.notification_off, common.default_notification_off);

            const progress_unwatched = common.value(data.progress_unwatched, common.default_progress_unwatched);
            const progress_watched = common.value(data.progress_watched, common.default_progress_watched);

            const channels_all = common.value(data.channels_all, common.default_channels_all);
            const channels_personalized = common.value(data.channels_personalized, common.default_channels_personalized);
            const channels_none = common.value(data.channels_none, common.default_channels_none);

            const keyword = common.value(data.keyword, common.default_keyword);

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

            multiselection = common.value(data.multiselection, common.default_multiselection);
            responsive = common.value(data.responsive, common.default_responsive);
            limit = common.value(data.limit, common.defaultLimit);
            default_keyword = common.value(data.default_keyword, common.default_default_keyword);

            if (common.isSubscriptions(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(node, 'span.filter-button-subscriptions.live', display(live));
                display_query(node, 'span.filter-button-subscriptions.streamed', display(streamed));
                display_query(node, 'span.filter-button-subscriptions.video', display(video));
                display_query(node, 'span.filter-button-subscriptions.short', display(short));
                display_query(node, 'span.filter-button-subscriptions.scheduled', display(scheduled));
                display_query(node, 'span.filter-button-subscriptions.notification_on', display(notification_on));
                display_query(node, 'span.filter-button-subscriptions.notification_off', display(notification_off));

                display_query(node, 'select.filter-menu', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(node, 'option.filter-button-subscriptions.all', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(node, 'option.filter-button-subscriptions.live', display(live));
                display_query(node, 'option.filter-button-subscriptions.streamed', display(streamed));
                display_query(node, 'option.filter-button-subscriptions.video', display(video));
                display_query(node, 'option.filter-button-subscriptions.short', display(short));
                display_query(node, 'option.filter-button-subscriptions.scheduled', display(scheduled));
                display_query(node, 'option.filter-button-subscriptions.notification_on', display(notification_on));
                display_query(node, 'option.filter-button-subscriptions.notification_off', display(notification_off));

                display_query(node, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(node, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(node, 'span.filter-button-channels.all', 'none');
                display_query(node, 'span.filter-button-channels.channels_all', 'none');
                display_query(node, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(node, 'span.filter-button-channels.channels_none', 'none');

                display_query(node, 'span.filter-query', display(keyword));
            } else if (common.isLibrary(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', '');
                display_query(node, 'span.filter-button-subscriptions.live', '');
                display_query(node, 'span.filter-button-subscriptions.streamed', '');
                display_query(node, 'span.filter-button-subscriptions.video', '');
                display_query(node, 'span.filter-button-subscriptions.short', '');
                display_query(node, 'span.filter-button-subscriptions.scheduled', '');
                display_query(node, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu', '');
                display_query(node, 'option.filter-button-subscriptions.all', '');
                display_query(node, 'option.filter-button-subscriptions.live', '');
                display_query(node, 'option.filter-button-subscriptions.streamed', '');
                display_query(node, 'option.filter-button-subscriptions.video', '');
                display_query(node, 'option.filter-button-subscriptions.short', '');
                display_query(node, 'option.filter-button-subscriptions.scheduled', '');
                display_query(node, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(node, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(node, 'span.filter-button-channels.all', 'none');
                display_query(node, 'span.filter-button-channels.channels_all', 'none');
                display_query(node, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(node, 'span.filter-button-channels.channels_none', 'none');

                display_query(node, 'span.filter-query', display(keyword));
            } else if (common.isPlaylist(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', '');
                display_query(node, 'span.filter-button-subscriptions.live', '');
                display_query(node, 'span.filter-button-subscriptions.streamed', '');
                display_query(node, 'span.filter-button-subscriptions.video', '');
                display_query(node, 'span.filter-button-subscriptions.short', 'none');
                display_query(node, 'span.filter-button-subscriptions.scheduled', '');
                display_query(node, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu', '');
                display_query(node, 'option.filter-button-subscriptions.all', '');
                display_query(node, 'option.filter-button-subscriptions.live', '');
                display_query(node, 'option.filter-button-subscriptions.streamed', '');
                display_query(node, 'option.filter-button-subscriptions.video', '');
                display_query(node, 'option.filter-button-subscriptions.short', 'none');
                display_query(node, 'option.filter-button-subscriptions.scheduled', '');
                display_query(node, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(node, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(node, 'span.filter-button-channels.all', 'none');
                display_query(node, 'span.filter-button-channels.channels_all', 'none');
                display_query(node, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(node, 'span.filter-button-channels.channels_none', 'none');

                display_query(node, 'span.filter-query', display(keyword));
            } else if (common.isHistory(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', '');
                display_query(node, 'span.filter-button-subscriptions.live', '');
                display_query(node, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'span.filter-button-subscriptions.video', '');
                display_query(node, 'span.filter-button-subscriptions.short', '');
                display_query(node, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu', '');
                display_query(node, 'option.filter-button-subscriptions.all', '');
                display_query(node, 'option.filter-button-subscriptions.live', '');
                display_query(node, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'option.filter-button-subscriptions.video', '');
                display_query(node, 'option.filter-button-subscriptions.short', '');
                display_query(node, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu-progress', 'none');
                display_query(node, 'option.filter-button-progress.progress_all', 'none');
                display_query(node, 'option.filter-button-progress.progress_unwatched', 'none');
                display_query(node, 'option.filter-button-progress.progress_watched', 'none');

                display_query(node, 'span.filter-button-channels.all', 'none');
                display_query(node, 'span.filter-button-channels.channels_all', 'none');
                display_query(node, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(node, 'span.filter-button-channels.channels_none', 'none');

                display_query(node, 'span.filter-query', display(keyword));
            } else if (common.isHashTag(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', '');
                display_query(node, 'span.filter-button-subscriptions.live', '');
                display_query(node, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'span.filter-button-subscriptions.video', '');
                display_query(node, 'span.filter-button-subscriptions.short', '');
                display_query(node, 'span.filter-button-subscriptions.scheduled', '');
                display_query(node, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu', '');
                display_query(node, 'option.filter-button-subscriptions.all', '');
                display_query(node, 'option.filter-button-subscriptions.live', '');
                display_query(node, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'option.filter-button-subscriptions.video', '');
                display_query(node, 'option.filter-button-subscriptions.short', '');
                display_query(node, 'option.filter-button-subscriptions.scheduled', '');
                display_query(node, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(node, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(node, 'span.filter-button-channels.all', 'none');
                display_query(node, 'span.filter-button-channels.channels_all', 'none');
                display_query(node, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(node, 'span.filter-button-channels.channels_none', 'none');

                display_query(node, 'span.filter-query', display(keyword));
            } else if (common.isPlaylists(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', 'none');
                display_query(node, 'span.filter-button-subscriptions.live', 'none');
                display_query(node, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'span.filter-button-subscriptions.video', 'none');
                display_query(node, 'span.filter-button-subscriptions.short', 'none');
                display_query(node, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu', 'none');
                display_query(node, 'option.filter-button-subscriptions.all', 'none');
                display_query(node, 'option.filter-button-subscriptions.live', 'none');
                display_query(node, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'option.filter-button-subscriptions.video', 'none');
                display_query(node, 'option.filter-button-subscriptions.short', 'none');
                display_query(node, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu-progress', 'none');
                display_query(node, 'option.filter-button-progress.progress_all', 'none');
                display_query(node, 'option.filter-button-progress.progress_unwatched', 'none');
                display_query(node, 'option.filter-button-progress.progress_watched', 'none');

                display_query(node, 'span.filter-button-channels.all', 'none');
                display_query(node, 'span.filter-button-channels.channels_all', 'none');
                display_query(node, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(node, 'span.filter-button-channels.channels_none', 'none');

                display_query(node, 'span.filter-query', display(keyword));
            } else if (common.isChannel(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', 'none');
                display_query(node, 'span.filter-button-subscriptions.live', 'none');
                display_query(node, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'span.filter-button-subscriptions.video', 'none');
                display_query(node, 'span.filter-button-subscriptions.short', 'none');
                display_query(node, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu', 'none');
                display_query(node, 'option.filter-button-subscriptions.all', 'none');
                display_query(node, 'option.filter-button-subscriptions.live', 'none');
                display_query(node, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'option.filter-button-subscriptions.video', 'none');
                display_query(node, 'option.filter-button-subscriptions.short', 'none');
                display_query(node, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(node, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(node, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(node, 'span.filter-button-channels.all', 'none');
                display_query(node, 'span.filter-button-channels.channels_all', 'none');
                display_query(node, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(node, 'span.filter-button-channels.channels_none', 'none');

                display_query(node, 'span.filter-query', display(keyword));
            } else if (common.isShorts(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', 'none');
                display_query(node, 'span.filter-button-subscriptions.live', 'none');
                display_query(node, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'span.filter-button-subscriptions.video', 'none');
                display_query(node, 'span.filter-button-subscriptions.short', 'none');
                display_query(node, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu', 'none');
                display_query(node, 'option.filter-button-subscriptions.all', 'none');
                display_query(node, 'option.filter-button-subscriptions.live', 'none');
                display_query(node, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'option.filter-button-subscriptions.video', 'none');
                display_query(node, 'option.filter-button-subscriptions.short', 'none');
                display_query(node, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu-progress', 'none');
                display_query(node, 'option.filter-button-progress.progress_all', 'none');
                display_query(node, 'option.filter-button-progress.progress_unwatched', 'none');
                display_query(node, 'option.filter-button-progress.progress_watched', 'none');

                display_query(node, 'span.filter-button-channels.all', 'none');
                display_query(node, 'span.filter-button-channels.channels_all', 'none');
                display_query(node, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(node, 'span.filter-button-channels.channels_none', 'none');

                display_query(node, 'span.filter-query', display(keyword));
            } else if (common.isChannels(location.href)) {
                display_query(node, 'span.filter-button-subscriptions.all', 'none');
                display_query(node, 'span.filter-button-subscriptions.live', 'none');
                display_query(node, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'span.filter-button-subscriptions.video', 'none');
                display_query(node, 'span.filter-button-subscriptions.short', 'none');
                display_query(node, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu', 'none');
                display_query(node, 'option.filter-button-subscriptions.all', 'none');
                display_query(node, 'option.filter-button-subscriptions.live', 'none');
                display_query(node, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(node, 'option.filter-button-subscriptions.video', 'none');
                display_query(node, 'option.filter-button-subscriptions.short', 'none');
                display_query(node, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(node, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(node, 'select.filter-menu-progress', 'none');
                display_query(node, 'option.filter-button-progress.progress_all', 'none');
                display_query(node, 'option.filter-button-progress.progress_unwatched', 'none');
                display_query(node, 'option.filter-button-progress.progress_watched', 'none');

                display_query(node, 'span.filter-button-channels.all', display_any([channels_all, channels_personalized, channels_none]));
                display_query(node, 'span.filter-button-channels.channels_all', display(channels_all));
                display_query(node, 'span.filter-button-channels.channels_personalized', display(channels_personalized));
                display_query(node, 'span.filter-button-channels.channels_none', display(channels_none));

                display_query(node, 'span.filter-query', display(keyword));
            } else {
                console.warn('Unknown target: ' + location.href);
            }

            onResize();

            changeMode(getActiveMode().values().next().value, multiselection, false);
            changeModeProgress(getActiveModeProgress().values().next().value, multiselection, false);
            updateQueryRegex(node, getActiveQuery());
            updateVisibility(node);
        });
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
        return common.isChannel(location.href)
            ;
    }

    function forPageHeaderRenderer() {
        return common.isHashTag(location.href)
            ;
    }

    function needSpacer() {
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
                    if (nextOr && nextNot) {
                        if (notQueryList.length - 1 >= 0) {
                            notQueryList[notQueryList.length - 1] = notQueryList[notQueryList.length - 1] + '|' + t;
                        } else {
                            notQueryList.push(t);
                        }
                        nextOr = false;
                        nextNot = false;
                    } else if (nextOr) {
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
        node.querySelectorAll('yt-lockup-view-model, ytd-backstage-post-thread-renderer, ytd-channel-renderer, ytd-grid-playlist-renderer, ytd-grid-video-renderer, ytd-playlist-video-renderer, ytd-rich-item-renderer, ytd-video-renderer:not(.ytd-backstage-post-renderer), ytm-shorts-lockup-view-model-v2').forEach(n => updateTargetVisibility(n));
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
                const badge = node.querySelector('p.ytd-badge-supported-renderer');
                if (metadata_line || byline_container || badge) {
                    const t = (metadata_line?.textContent ?? '') + '\n' + (byline_container?.textContent ?? '');
                    const l = badge?.textContent ?? '';
                    if (lang.isLive_metadata(t) || lang.isLive_status_label(l)) {
                        status.add('live');
                    } else if (lang.isStreamed_metadata(t)) {
                        status.add('streamed');
                    } else if (lang.isScheduled_metadata(t)) {
                        status.add('scheduled');

                        const video_button = node.querySelector('yt-button-shape');
                        if (video_button) {
                            const t = video_button.textContent;
                            if (lang.isNotificationOn_button(t)) {
                                status.add('notification_on');
                            } else if (lang.isNotificationOff_button(t)) {
                                status.add('notification_off');
                            } else {
                                console.warn('Unknown notification status: ' + t);
                            }
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
                const channel_notification = node.querySelector('ytd-subscription-notification-toggle-button-renderer-next button[aria-label]');
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
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
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
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
                const progress = node.querySelector('div#progress');
                if (progress) {
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

            // channel, playlists, shorts
            case 'YTD-RICH-ITEM-RENDERER':
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
            case 'YT-LOCKUP-VIEW-MODEL':
                const shorts_meta = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle, h3.shortsLockupViewModelHostOutsideMetadataTitle');
                if (shorts_meta) {
                    return matchQuery(shorts_meta.getAttribute('aria-label'));
                }

                const rich_item_title = node.querySelector('h3.ytd-rich-grid-media, .ytd-rich-grid-slim-media, .yt-core-attributed-string');
                if (rich_item_title) {
                    return matchQuery(rich_item_title.textContent);
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

    async function onNodeLoaded(node, isFilterTarget) {
        if (isFilterTarget) {
            switch (node.nodeName) {
                case 'YTD-BROWSE':
                case 'YTD-SECTION-LIST-RENDERER':
                    await insertMenu(node);
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
                case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
                case 'YTD-RICH-ITEM-RENDERER':
                case 'YT-LOCKUP-VIEW-MODEL':
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
                    if (common.isSubscriptions(location.href) || common.isShorts(location.href)) {
                        if (node.parentNode.children.length > limit) {
                            load_button_container.style.display = '';
                            node.style.display = 'none';
                            node.parentNode.parentNode.appendChild(load_button_container);
                            continuation_item = node;
                        }
                    }
                    break;
            }
        }
    }

    async function insertMenu(node) {
        const browse = searchParentNode(node, 'YTD-BROWSE');
        if (browse) {
            if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
                const referenceNode = getReferenceNode(browse);
                if (referenceNode) {
                    const menu = createMenu(browse);
                    referenceNode.parentNode.insertBefore(menu, referenceNode);

                    const calc = createNodeForCalc(menu, browse);
                    referenceNode.parentNode.insertBefore(calc, referenceNode);

                    if (needSpacer()) {
                        referenceNode.parentNode.insertBefore(createSpacer('browse'), referenceNode);
                    }

                    await updateButtonVisibility(browse);
                    updateMenuVisibility(browse, true);
                }
            } else {
                // already exists
            }
        } else {
            // not target
        }
    }

    function getReferenceNode(browse) {
        if (forTwoColumnBrowseResultsRenderer()) {
            return browse.querySelector('ytd-two-column-browse-results-renderer');
        } else if (forPageHeaderRenderer()) {
            return browse.querySelector('yt-page-header-renderer'); // FIXME: yt-page-header-renderer not found
        } else {
            return browse.firstChild;
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

    function createMenu(browse) {
        const menu = document.createElement('form');
        menu.style.display = 'none';

        if (isPositionFixedTarget()) {
            menu.classList.add('filter-menu', 'position-fixed');
        } else {
            menu.classList.add('filter-menu');
        }

        menu.appendChild(createButton(common.button_label.all, 'all', false, browse));
        menu.appendChild(createButton(common.button_label.live, 'live', false, browse));
        menu.appendChild(createButton(common.button_label.streamed, 'streamed', false, browse));
        menu.appendChild(createButton(common.button_label.video, 'video', false, browse));
        menu.appendChild(createButton(common.button_label.short, 'short', true, browse));
        menu.appendChild(createButton(common.button_label.scheduled, 'scheduled', false, browse));
        menu.appendChild(createButton(common.button_label.notification_on, 'notification_on', false, browse));
        menu.appendChild(createButton(common.button_label.notification_off, 'notification_off', false, browse));

        const select = createSelect(browse);
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

        const progress = createSelectProgress(browse);
        progress.appendChild(createOptionProgress(common.button_label.progress_placeholder));
        progress.appendChild(createOptionProgress(common.button_label.progress_all, 'progress_all'));
        progress.appendChild(createOptionProgress(common.button_label.progress_unwatched, 'progress_unwatched'));
        progress.appendChild(createOptionProgress(common.button_label.progress_watched, 'progress_watched'));
        menu.appendChild(progress);

        menu.appendChild(createButtonChannels(common.button_label.all, 'all', browse));
        menu.appendChild(createButtonChannels(common.button_label.channels_all, 'channels_all', browse));
        menu.appendChild(createButtonChannels(common.button_label.channels_personalized, 'channels_personalized', browse));
        menu.appendChild(createButtonChannels(common.button_label.channels_none, 'channels_none', browse));

        const input = createQueryInput(menu);
        menu.appendChild(createQueryInputArea(input, browse));
        menu.appendChild(createSearchButton(input, browse));

        menu.addEventListener('submit', e => {
            e.preventDefault();
            updateQueryRegex(browse, input.value);
            updateVisibility(browse);
            window.scroll({ top: 0, behavior: 'instant' });
        });

        return menu;
    }

    function createSpacer(id) {
        const spacer = document.createElement('div');
        spacer.classList.add('filter-menu', 'spacer');
        spacer.id = id;
        return spacer;
    }

    function createButton(text, mode, isShorts, browse) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-button', 'filter-button-subscriptions', mode);
        span.innerHTML = text;
        span.addEventListener('click', () => {
            if (isShorts && common.isSubscriptions(location.href)) {
                location.href = 'https://www.youtube.com/feed/subscriptions/shorts';
            } else {
                changeMode(mode, multiselection, span.classList.contains('selected'));
                updateVisibility(browse);
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });
        return span;
    }

    function createButtonChannels(text, mode, browse) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-button', 'filter-button-channels', mode);
        span.innerHTML = text;
        span.addEventListener('click', () => {
            changeMode(mode, multiselection, span.classList.contains('selected'));
            updateVisibility(browse);
            window.scroll({ top: 0, behavior: 'instant' });
        });
        return span;
    }

    function createSelect(browse) {
        const select = document.createElement('select');
        select.style.display = 'none';
        select.classList.add('filter-menu', 'filter-menu-subscriptions');
        select.addEventListener('change', () => {
            changeMode(select.value, multiselection, select.querySelector('option.selected.' + select.value));
            updateVisibility(browse);
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

    function createSelectProgress(browse) {
        const select = document.createElement('select');
        select.style.display = 'none';
        select.classList.add('filter-menu', 'filter-menu-progress');
        select.addEventListener('change', () => {
            changeModeProgress(select.value, multiselection, select.querySelector('option.selected.' + select.value));
            updateVisibility(browse);
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

    function createQueryInputArea(input, browse) {
        const inputArea = document.createElement('span');
        inputArea.style.display = 'none';
        inputArea.classList.add('filter-query', 'area');
        inputArea.appendChild(input);
        inputArea.appendChild(createClearButton(input, browse));
        return inputArea;
    }

    function createQueryInput(menu) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Subscription Feed Filter');
        input.setAttribute('title', '".."  PHRASE search operator.  e.g. "Phrase including spaces"\n |    OR search operator.           e.g. Phrase1 | Phrase2\n -    NOT search operator.        e.g. -Phrase\n\nNOTE: Queries that specify OR and NOT simultaneously are not supported.');
        input.id = 'filter-query';
        input.value = getActiveQuery();
        input.addEventListener('change', e => {
            input.blur();
            menu.requestSubmit();
        });
        return input;
    }

    function createClearButton(input, browse) {
        const span = document.createElement('span');
        span.classList.add('filter-clear');
        span.innerHTML = common.button_label.clear;
        span.addEventListener('click', () => {
            input.value = '';
            updateQueryRegex(browse, '');
            updateVisibility(browse);
            window.scroll({ top: 0, behavior: 'instant' });
        });
        return span;
    }

    function createSearchButton(input, browse) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-query', 'search');
        span.innerHTML = common.button_label.search;
        span.addEventListener('click', () => {
            updateQueryRegex(browse, input.value);
            updateVisibility(browse);
            window.scroll({ top: 0, behavior: 'instant' });
        });
        return span;
    }

    function updateMenuVisibility(node, isFilterTarget) {
        if (isFilterTarget) {
            display_query(node, 'form.filter-menu, div.filter-menu', '');
        } else {
            display_query(node, 'form.filter-menu, div.filter-menu', 'none');
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

    async function onViewChanged(isFilterTarget) {
        const browse = app.querySelector('ytd-browse[role="main"]');
        if (browse) {
            if (isFilterTarget) {
                insertPlaylistSpacer();
                await updateButtonVisibility(browse);
            }
            updateMenuVisibility(browse, isFilterTarget);
            updateVisibility(browse);
        } else {
            console.warn('ytd-browse[role="main"] not found');
        }
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

    function onResize() {
        if (responsive) {
            const form = app.querySelector('ytd-browse[role="main"] form.filter-menu:not(.filter-forCalc)');
            if (form) {
                const calc = form.parentNode.querySelector('form.filter-forCalc');
                if (calc) {
                    form.parentNode.insertBefore(calc, form);
                    setTimeout(() => {
                        if (calc.scrollWidth <= form.parentNode.scrollWidth) {
                            document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
                            document.documentElement.style.setProperty('--filter-menu-display', 'none');
                        } else {
                            document.documentElement.style.setProperty('--filter-button-display', 'none');
                            document.documentElement.style.setProperty('--filter-menu-display', 'block');
                        }
                    }, 100);
                }
            }
        } else {
            document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
            document.documentElement.style.setProperty('--filter-menu-display', 'none');
        }
    }

    function createNodeForCalc(menu) {
        const nodeForCalc = menu.cloneNode(true);
        nodeForCalc.classList.add('filter-forCalc');
        return nodeForCalc;
    }

    function display(value) {
        return value === true ? '' : 'none';
    }

    function display_any(values) {
        for (const value of values) {
            if (value) {
                return '';
            }
        }
        return 'none';
    }

    function display_query(node, query, display) {
        node.querySelectorAll(query).forEach(n => n.style.display = display);
    }

    function show_menu() {
        for (const form of app.querySelectorAll('ytd-browse[role="main"] form.filter-menu:not(.filter-forCalc)')) {
            form.style.visibility = '';
        }
    }

    function hide_menu() {
        for (const form of app.querySelectorAll('form.filter-menu:not(.filter-forCalc)')) {
            form.style.visibility = 'hidden';
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

    let responsive;
    let limit = common.defaultLimit;
    let default_keyword = '';

    let continuation_item;
    const load_button_container = document.createElement('div');

    {
        load_button_container.classList.add('filter-button-load');
        const load_button = document.createElement('button');
        load_button.innerText = common.button_label.load;
        load_button.classList.add('yt-spec-button-shape-next', 'yt-spec-button-shape-next--tonal', 'yt-spec-button-shape-next--mono', 'yt-spec-button-shape-next--size-m');
        load_button.addEventListener('click', () => {
            load_button_container.style.display = 'none';

            if (continuation_item) {
                continuation_item.style.display = '';
            }

            window.scroll({ top: app.scrollHeight, behavior: 'instant' });
        });
        load_button_container.appendChild(load_button);
    }

    document.addEventListener('yt-navigate-start', () => {
        hide_menu();
    });

    document.addEventListener('yt-navigate-finish', async () => {
        await onViewChanged(isMenuTarget());
        show_menu();
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

    chrome.storage.onChanged.addListener(async (changes, namespace) => {
        if (isMenuTarget()) {
            await updateButtonVisibility(app);
        }
    });

    window.addEventListener('resize', onResize);
}