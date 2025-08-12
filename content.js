import(chrome.runtime.getURL('common.js')).then(common => {
    const lang = document.documentElement.getAttribute('lang');
    import(chrome.runtime.getURL('lang/' + (lang ? lang : 'en') + '.js')).then(lang => {
        main(document.querySelector('ytd-app') ?? document.body, common, lang);
    });
});

function main(app, common, lang) {
    async function updateButtonVisibility(browse) {
        await chrome.storage.local.get(common.storage).then(data => {
            for (const menu of browse.querySelectorAll('form.filter-menu')) {
                const select = menu.querySelector('select.filter-menu');
                const progress = menu.querySelector('select.filter-menu-progress');

                menu.appendChild(menu.querySelector('span.filter-button-subscriptions.all'));
                menu.appendChild(menu.querySelector('span.filter-button-channels.all'));
                select.appendChild(select.querySelector('option.filter-button-subscriptions.all'));
                progress.appendChild(progress.querySelector('option.filter-button-progress.progress_all'));

                for (const mode of common.order(data.order)) {
                    if (mode === 'keyword' || mode === 'multiselection' || mode === 'responsive' || mode === 'keyword_add_playlist' || mode === 'keyword_sidebar_channels' || mode === 'keyword_notification') {
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

            keyword = common.value(data.keyword, common.default_keyword);

            default_tab.live = common.value(data.default_live, common.default_default_live);
            default_tab.streamed = common.value(data.default_streamed, common.default_default_streamed);
            default_tab.video = common.value(data.default_video, common.default_default_video);
            default_tab.short = common.value(data.default_short, common.default_default_short);
            default_tab.scheduled = common.value(data.default_scheduled, common.default_default_scheduled);
            default_tab.notification_on = common.value(data.default_notification_on, common.default_default_notification_on);
            default_tab.notification_off = common.value(data.default_notification_off, common.default_default_notification_off);

            default_tab.progress_unwatched = common.value(data.default_progress_unwatched, common.default_default_progress_unwatched);
            default_tab.progress_watched = common.value(data.default_progress_watched, common.default_default_progress_watched);

            default_tab.channels_all = common.value(data.default_channels_all, common.default_default_channels_all);
            default_tab.channels_personalized = common.value(data.default_channels_personalized, common.default_default_channels_personalized);
            default_tab.channels_none = common.value(data.default_channels_none, common.default_default_channels_none);

            multiselection = common.value(data.multiselection, common.default_multiselection);
            responsive = common.value(data.responsive, common.default_responsive);
            limit = common.value(data.limit, common.defaultLimit);
            keyword_add_playlist = common.value(data.keyword_add_playlist, common.default_keyword_add_playlist);
            keyword_sidebar_channels = common.value(data.keyword_sidebar_channels, common.default_keyword_sidebar_channels);
            keyword_notification = common.value(data.keyword_notification, common.default_keyword_notification);
            default_keyword = common.value(data.default_keyword, common.default_default_keyword);

            if (common.isSubscriptions(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(browse, 'span.filter-button-subscriptions.live', display(live));
                display_query(browse, 'span.filter-button-subscriptions.streamed', display(streamed));
                display_query(browse, 'span.filter-button-subscriptions.video', display(video));
                display_query(browse, 'span.filter-button-subscriptions.short', display(short));
                display_query(browse, 'span.filter-button-subscriptions.scheduled', display(scheduled));
                display_query(browse, 'span.filter-button-subscriptions.notification_on', display(notification_on));
                display_query(browse, 'span.filter-button-subscriptions.notification_off', display(notification_off));

                display_query(browse, 'select.filter-menu', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(browse, 'option.filter-button-subscriptions.all', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(browse, 'option.filter-button-subscriptions.live', display(live));
                display_query(browse, 'option.filter-button-subscriptions.streamed', display(streamed));
                display_query(browse, 'option.filter-button-subscriptions.video', display(video));
                display_query(browse, 'option.filter-button-subscriptions.short', display(short));
                display_query(browse, 'option.filter-button-subscriptions.scheduled', display(scheduled));
                display_query(browse, 'option.filter-button-subscriptions.notification_on', display(notification_on));
                display_query(browse, 'option.filter-button-subscriptions.notification_off', display(notification_off));

                display_query(browse, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(browse, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isLibrary(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', '');
                display_query(browse, 'span.filter-button-subscriptions.live', '');
                display_query(browse, 'span.filter-button-subscriptions.streamed', '');
                display_query(browse, 'span.filter-button-subscriptions.video', '');
                display_query(browse, 'span.filter-button-subscriptions.short', '');
                display_query(browse, 'span.filter-button-subscriptions.scheduled', '');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', '');
                display_query(browse, 'option.filter-button-subscriptions.all', '');
                display_query(browse, 'option.filter-button-subscriptions.live', '');
                display_query(browse, 'option.filter-button-subscriptions.streamed', '');
                display_query(browse, 'option.filter-button-subscriptions.video', '');
                display_query(browse, 'option.filter-button-subscriptions.short', '');
                display_query(browse, 'option.filter-button-subscriptions.scheduled', '');
                display_query(browse, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(browse, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isPlaylist(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', '');
                display_query(browse, 'span.filter-button-subscriptions.live', '');
                display_query(browse, 'span.filter-button-subscriptions.streamed', '');
                display_query(browse, 'span.filter-button-subscriptions.video', '');
                display_query(browse, 'span.filter-button-subscriptions.short', 'none');
                display_query(browse, 'span.filter-button-subscriptions.scheduled', '');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', '');
                display_query(browse, 'option.filter-button-subscriptions.all', '');
                display_query(browse, 'option.filter-button-subscriptions.live', '');
                display_query(browse, 'option.filter-button-subscriptions.streamed', '');
                display_query(browse, 'option.filter-button-subscriptions.video', '');
                display_query(browse, 'option.filter-button-subscriptions.short', 'none');
                display_query(browse, 'option.filter-button-subscriptions.scheduled', '');
                display_query(browse, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(browse, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isHistory(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', '');
                display_query(browse, 'span.filter-button-subscriptions.live', '');
                display_query(browse, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'span.filter-button-subscriptions.video', '');
                display_query(browse, 'span.filter-button-subscriptions.short', '');
                display_query(browse, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', '');
                display_query(browse, 'option.filter-button-subscriptions.all', '');
                display_query(browse, 'option.filter-button-subscriptions.live', '');
                display_query(browse, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'option.filter-button-subscriptions.video', '');
                display_query(browse, 'option.filter-button-subscriptions.short', '');
                display_query(browse, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu-progress', 'none');
                display_query(browse, 'option.filter-button-progress.progress_all', 'none');
                display_query(browse, 'option.filter-button-progress.progress_unwatched', 'none');
                display_query(browse, 'option.filter-button-progress.progress_watched', 'none');

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isHashTag(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', '');
                display_query(browse, 'span.filter-button-subscriptions.live', '');
                display_query(browse, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'span.filter-button-subscriptions.video', '');
                display_query(browse, 'span.filter-button-subscriptions.short', '');
                display_query(browse, 'span.filter-button-subscriptions.scheduled', '');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', '');
                display_query(browse, 'option.filter-button-subscriptions.all', '');
                display_query(browse, 'option.filter-button-subscriptions.live', '');
                display_query(browse, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'option.filter-button-subscriptions.video', '');
                display_query(browse, 'option.filter-button-subscriptions.short', '');
                display_query(browse, 'option.filter-button-subscriptions.scheduled', '');
                display_query(browse, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(browse, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isPlaylists(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', 'none');
                display_query(browse, 'span.filter-button-subscriptions.live', 'none');
                display_query(browse, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'span.filter-button-subscriptions.video', 'none');
                display_query(browse, 'span.filter-button-subscriptions.short', 'none');
                display_query(browse, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', 'none');
                display_query(browse, 'option.filter-button-subscriptions.all', 'none');
                display_query(browse, 'option.filter-button-subscriptions.live', 'none');
                display_query(browse, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'option.filter-button-subscriptions.video', 'none');
                display_query(browse, 'option.filter-button-subscriptions.short', 'none');
                display_query(browse, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu-progress', 'none');
                display_query(browse, 'option.filter-button-progress.progress_all', 'none');
                display_query(browse, 'option.filter-button-progress.progress_unwatched', 'none');
                display_query(browse, 'option.filter-button-progress.progress_watched', 'none');

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isChannel(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', 'none');
                display_query(browse, 'span.filter-button-subscriptions.live', 'none');
                display_query(browse, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'span.filter-button-subscriptions.video', 'none');
                display_query(browse, 'span.filter-button-subscriptions.short', 'none');
                display_query(browse, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', 'none');
                display_query(browse, 'option.filter-button-subscriptions.all', 'none');
                display_query(browse, 'option.filter-button-subscriptions.live', 'none');
                display_query(browse, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'option.filter-button-subscriptions.video', 'none');
                display_query(browse, 'option.filter-button-subscriptions.short', 'none');
                display_query(browse, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(browse, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isShorts(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', 'none');
                display_query(browse, 'span.filter-button-subscriptions.live', 'none');
                display_query(browse, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'span.filter-button-subscriptions.video', 'none');
                display_query(browse, 'span.filter-button-subscriptions.short', 'none');
                display_query(browse, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', 'none');
                display_query(browse, 'option.filter-button-subscriptions.all', 'none');
                display_query(browse, 'option.filter-button-subscriptions.live', 'none');
                display_query(browse, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'option.filter-button-subscriptions.video', 'none');
                display_query(browse, 'option.filter-button-subscriptions.short', 'none');
                display_query(browse, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu-progress', 'none');
                display_query(browse, 'option.filter-button-progress.progress_all', 'none');
                display_query(browse, 'option.filter-button-progress.progress_unwatched', 'none');
                display_query(browse, 'option.filter-button-progress.progress_watched', 'none');

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isChannels(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', 'none');
                display_query(browse, 'span.filter-button-subscriptions.live', 'none');
                display_query(browse, 'span.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'span.filter-button-subscriptions.video', 'none');
                display_query(browse, 'span.filter-button-subscriptions.short', 'none');
                display_query(browse, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', 'none');
                display_query(browse, 'option.filter-button-subscriptions.all', 'none');
                display_query(browse, 'option.filter-button-subscriptions.live', 'none');
                display_query(browse, 'option.filter-button-subscriptions.streamed', 'none');
                display_query(browse, 'option.filter-button-subscriptions.video', 'none');
                display_query(browse, 'option.filter-button-subscriptions.short', 'none');
                display_query(browse, 'option.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'option.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu-progress', 'none');
                display_query(browse, 'option.filter-button-progress.progress_all', 'none');
                display_query(browse, 'option.filter-button-progress.progress_unwatched', 'none');
                display_query(browse, 'option.filter-button-progress.progress_watched', 'none');

                display_query(browse, 'span.filter-button-channels.all', display_any([channels_all, channels_personalized, channels_none]));
                display_query(browse, 'span.filter-button-channels.channels_all', display(channels_all));
                display_query(browse, 'span.filter-button-channels.channels_personalized', display(channels_personalized));
                display_query(browse, 'span.filter-button-channels.channels_none', display(channels_none));

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else if (common.isTop(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(browse, 'span.filter-button-subscriptions.live', display(live));
                display_query(browse, 'span.filter-button-subscriptions.streamed', display(streamed));
                display_query(browse, 'span.filter-button-subscriptions.video', display(video));
                display_query(browse, 'span.filter-button-subscriptions.short', display(short));
                display_query(browse, 'span.filter-button-subscriptions.scheduled', display(scheduled));
                display_query(browse, 'span.filter-button-subscriptions.notification_on', display(notification_on));
                display_query(browse, 'span.filter-button-subscriptions.notification_off', display(notification_off));

                display_query(browse, 'select.filter-menu', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(browse, 'option.filter-button-subscriptions.all', display_any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display_query(browse, 'option.filter-button-subscriptions.live', display(live));
                display_query(browse, 'option.filter-button-subscriptions.streamed', display(streamed));
                display_query(browse, 'option.filter-button-subscriptions.video', display(video));
                display_query(browse, 'option.filter-button-subscriptions.short', display(short));
                display_query(browse, 'option.filter-button-subscriptions.scheduled', display(scheduled));
                display_query(browse, 'option.filter-button-subscriptions.notification_on', display(notification_on));
                display_query(browse, 'option.filter-button-subscriptions.notification_off', display(notification_off));

                display_query(browse, 'select.filter-menu-progress', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_all', display_any([progress_unwatched, progress_watched]));
                display_query(browse, 'option.filter-button-progress.progress_unwatched', display(progress_unwatched));
                display_query(browse, 'option.filter-button-progress.progress_watched', display(progress_watched));

                display_query(browse, 'span.filter-button-channels.all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_all', 'none');
                display_query(browse, 'span.filter-button-channels.channels_personalized', 'none');
                display_query(browse, 'span.filter-button-channels.channels_none', 'none');

                display_query(browse, 'span.filter-query', display(keyword));

                browse.setAttribute('filter-menu', 'true');
            } else {
                // Unknown location.href
                browse.setAttribute('filter-menu', 'false');
            }

            onResize();

            changeMode(getActiveMode().values().next().value, multiselection, false, browse);
            changeModeProgress(getActiveModeProgress().values().next().value, multiselection, false, browse);
            updateQueryRegex(browse, getActiveQuery(browse));
            updateVisibility(browse);

            // add-playlist
            for (const menu of app.querySelectorAll('form.filter-popup.filter-add-playlist')) {
                menu.style.display = display(keyword_add_playlist);
            }

            // sidebar channels
            for (const menu of app.querySelectorAll('form.filter-popup.filter-sidebar-channels')) {
                menu.style.display = display(keyword_sidebar_channels);
            }

            // notification
            for (const menu of app.querySelectorAll('form.filter-popup.filter-notification')) {
                menu.style.display = display(keyword_notification);
            }
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
            || common.isTop(location.href)
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

    function updateQueryRegex(browse, query) {
        active.query.set(location.href, query);
        browse.setAttribute('filter-query', query);

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

        browse.querySelectorAll('form.filter-menu input#filter-query').forEach(e => e.value = query);
    }

    function updateVisibility(node) {
        node.querySelectorAll('ytd-backstage-post-thread-renderer, ytd-channel-renderer, ytd-grid-playlist-renderer, ytd-grid-video-renderer, ytd-playlist-video-renderer, ytd-rich-item-renderer, ytd-video-renderer:not(.ytd-backstage-post-renderer), ytm-shorts-lockup-view-model-v2, yt-lockup-view-model').forEach(n => updateTargetVisibility(n));
    }

    function classifyStatus(node) {
        const status = new Set();

        switch (node.nodeName) {
            case 'YTD-GRID-VIDEO-RENDERER':
            case 'YTD-VIDEO-RENDERER':
            case 'YTD-RICH-ITEM-RENDERER':
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
            case 'YT-LOCKUP-VIEW-MODEL':
                const metadata_line = node.querySelector('div#metadata-line, yt-content-metadata-view-model');
                const byline_container = node.querySelector('div#byline-container, lockup-attachments-view-model');
                const badge = node.querySelector('p.ytd-badge-supported-renderer, yt-thumbnail-badge-view-model');
                if (metadata_line || byline_container || badge) {
                    const t = (metadata_line?.textContent ?? '') + '\n' + (byline_container?.textContent ?? '');
                    const l = badge?.textContent ?? '';
                    if (lang.isLive_metadata(t) || lang.isLive_status_label(l)) {
                        status.add('live');
                    } else if (lang.isStreamed_metadata(t)) {
                        status.add('streamed');
                    } else if (lang.isScheduled_metadata(t)) {
                        status.add('scheduled');

                        const video_button = node.querySelector('yt-button-shape > button[aria-label]') ?? node.querySelector('yt-button-shape');
                        if (video_button) {
                            const t = video_button.getAttribute('aria-label') ?? video_button.textContent;
                            if (lang.isNotificationOn_button(t)) {
                                status.add('notification_on');
                            } else if (lang.isNotificationOff_button(t)) {
                                status.add('notification_off');
                            } else {
                                // Unknown notification status
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
                                    status.add('video'); // membership only video
                                }
                            }
                        }

                        const slim_media = node.querySelector('ytd-rich-grid-slim-media');
                        if (slim_media) {
                            status.add('short');
                        } else {
                            status.add('video');
                        }
                    }
                } else {
                    const shorts = node.querySelector('ytm-shorts-lockup-view-model-v2');
                    if (shorts) {
                        status.add('short');
                    }
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
                        // Unknown channel notification
                    }
                } else {
                    // sponsor
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
                const progress = node.querySelector('div#progress, yt-thumbnail-overlay-progress-bar-view-model');
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
        let text_node;
        switch (node.nodeName) {
            // subscriptions?flow=1, library
            case 'YTD-GRID-VIDEO-RENDERER':
                text_node = node.querySelector('a#video-title');
                if (text_node) {
                    return matchQuery(text_node.textContent);
                }
                break;

            // subscriptions?flow=2, history
            case 'YTD-VIDEO-RENDERER':
                if (!node.classList.contains('ytd-backstage-post-renderer')) {
                    text_node = node.querySelector('a#video-title');
                    if (text_node) {
                        return matchQuery(text_node.textContent);
                    }
                } else {
                    // lazy load
                }

                break;

            // playlist
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
                text_node = node.querySelector('div#meta');
                if (text_node) {
                    return matchQuery(text_node.textContent);
                }
                break;

            // channel
            case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
                text_node = node.querySelector('div#content');
                if (text_node) {
                    return matchQuery(text_node.textContent);
                }
                break;

            case 'YTD-GRID-PLAYLIST-RENDERER':
                text_node = node.querySelector('a#video-title');
                if (text_node) {
                    return matchQuery(text_node.textContent);
                }
                break;

            // channel, playlists, shorts, library
            case 'YTD-RICH-ITEM-RENDERER':
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
                text_node = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle, h3.shortsLockupViewModelHostOutsideMetadataTitle');
                if (text_node) {
                    const textContent = text_node.getAttribute('aria-label');
                    if (textContent) {
                        return matchQuery(textContent);
                    }
                }

                text_node = node.querySelector('h3.ytd-rich-grid-media, .ytd-rich-grid-slim-media, .yt-core-attributed-string');
                if (text_node) {
                    return matchQuery(text_node.textContent);
                }

                break;

            // channels
            case 'YTD-CHANNEL-RENDERER':
                text_node = node.querySelector('div#info');
                if (text_node) {
                    return matchQuery(text_node.textContent);
                }
                break;

            case 'YT-LOCKUP-VIEW-MODEL':
                text_node = node.querySelector('span.yt-core-attributed-string');
                if (text_node) {
                    return matchQuery(text_node.textContent);
                }
                break;
        }

        // default: visible
        return true;
    }

    async function onNodeLoaded(node, is_menu_target) {
        let n;
        switch (node.nodeName) {
            case 'YTD-BROWSE':
            case 'YTD-SECTION-LIST-RENDERER':
            case 'YTD-TABBED-PAGE-HEADER':
            case 'YTD-FEED-FILTER-CHIP-BAR-RENDERER':
                if (is_menu_target) {
                    await insertMenu(node);
                }
                break;

            case 'YTD-POPUP-CONTAINER':
            case 'YT-MULTI-PAGE-MENU-SECTION-RENDERER':
            case 'YTD-GUIDE-SECTION-RENDERER':
                insertPopupMenu(node);
                break;

            // subscriptions?flow=1, library
            case 'YTD-GRID-VIDEO-RENDERER':
                if (is_menu_target) {
                    updateTargetVisibility(node);
                }
                break;

            // subscriptions?flow=2, history
            case 'YTD-VIDEO-RENDERER':
                if (is_menu_target) {
                    if (!node.classList.contains('ytd-backstage-post-renderer')) {
                        updateTargetVisibility(node);
                    }
                }
                break;

            // playlist
            case 'YTD-THUMBNAIL-OVERLAY-TIME-STATUS-RENDERER':
                if (is_menu_target) {
                    n = searchParentNode(node, 'YTD-PLAYLIST-VIDEO-RENDERER');
                    if (n) {
                        updateTargetVisibility(n);
                    }
                }
                break;

            // channels
            case 'YTD-CHANNEL-RENDERER':
                if (is_menu_target) {
                    updateTargetVisibility(node);
                }
                break;

            // channel
            case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
            case 'YTD-GRID-PLAYLIST-RENDERER':
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
            case 'YTD-RICH-ITEM-RENDERER':
                if (is_menu_target) {
                    updateTargetVisibility(node);
                }
                break;

            // container
            case 'YTD-ITEM-SECTION-RENDERER':
                if (is_menu_target) {
                    updateVisibility(node);
                }
                break;
            case 'DIV':
                if (is_menu_target) {
                    if (node.id === 'contents') {
                        updateVisibility(node);
                    }
                }
                if (node.id === 'playlists' || node.id === 'items' || node.id === 'expandable-items') {
                    updatePopupVisibility([node]);
                }
                break;

            // progress
            case 'YTD-THUMBNAIL-OVERLAY-RESUME-PLAYBACK-RENDERER':
                if (is_menu_target) {
                    n = searchParentNode(node, 'YTD-PLAYLIST-VIDEO-RENDERER');
                    if (n) {
                        updateTargetVisibility(n);
                        break;
                    }

                    n = searchParentNode(node, 'YTD-GRID-VIDEO-RENDERER');
                    if (n) {
                        updateTargetVisibility(n);
                        break;
                    }

                    n = searchParentNode(node, 'YTD-VIDEO-RENDERER');
                    if (n) {
                        updateTargetVisibility(n);
                        break;
                    }

                    n = searchParentNode(node, 'YTD-RICH-ITEM-RENDERER');
                    if (n) {
                        updateTargetVisibility(n);
                        break;
                    }
                }

                break;

            // notification
            case 'YTD-NOTIFICATION-RENDERER':
                updatePopupVisibility([node.parentNode]);
                break;

            // sidebar channels
            case 'YTD-GUIDE-ENTRY-RENDERER':
                const parent = searchParentNode(node, 'YTD-GUIDE-SECTION-RENDERER');
                updatePopupVisibility([...parent.querySelectorAll('div#items')]);
                break;

            // continuation stopper
            case 'YTD-CONTINUATION-ITEM-RENDERER':
                if (common.isSubscriptions(location.href) || common.isShorts(location.href)) {
                    if (node.parentNode.children.length > limit) {
                        load_button_container.style.display = '';
                        node.style.display = 'none';
                        node.classList.remove('filter-show');
                        node.classList.add('filter-hidden');
                        node.parentNode.parentNode.appendChild(load_button_container);
                        continuation_item = node;
                    } else {
                        // continuation
                    }
                } else {
                    // continuation
                    node.style.display = '';
                    node.classList.remove('filter-hidden');
                    node.classList.add('filter-show');
                }
                break;
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

                    const spacerReferenceNode = getSpacerReferenceNode(browse);
                    if (spacerReferenceNode) {
                        spacerReferenceNode.parentNode.insertBefore(createSpacer('browse'), spacerReferenceNode);
                    } else {
                        // spacer referenceNode not found
                    }

                    await updateButtonVisibility(browse);
                    display_query(browse, 'form.filter-menu, div.filter-menu', '');
                } else {
                    // referenceNode not found
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
            return browse.querySelector('yt-page-header-renderer');
        } else if (common.isTop(location.href)) {
            return browse.querySelector('div#scroll-container')?.firstChild;
        } else {
            return browse.firstChild;
        }
    }

    function getSpacerReferenceNode(browse) {
        if (needSpacer()) {
            return browse.firstChild;
        } else if (common.isTop(location.href)) {
            return browse.querySelector('div#contents');
        } else {
            return undefined;
        }
    }

    function insertPlaylistSpacer(browse) {
        for (const sidebar of browse.querySelectorAll('ytd-playlist-sidebar-renderer')) {
            if (sidebar.firstChild.id !== 'sidebar-spacer') {
                sidebar.insertBefore(createSpacer('sidebar-spacer'), sidebar.firstChild);
            } else {
                // already exists
            }
        }

        for (const header of browse.querySelectorAll('ytd-playlist-header-renderer')) {
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

        const input = createQueryInput(menu, browse);
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
                changeMode(mode, multiselection, span.classList.contains('selected'), browse);
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
            changeMode(mode, multiselection, span.classList.contains('selected'), browse);
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
            changeMode(select.value, multiselection, select.querySelector('option.selected.' + select.value), browse);
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
            changeModeProgress(select.value, multiselection, select.querySelector('option.selected.' + select.value), browse);
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

    function createQueryInput(menu, browse) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Subscription Feed Filter');
        input.setAttribute('title', '".."  PHRASE search operator.  e.g. "Phrase including spaces"\n |    OR search operator.           e.g. Phrase1 | Phrase2\n -    NOT search operator.        e.g. -Phrase\n\nNOTE: Queries that specify OR and NOT simultaneously are not supported.');
        input.id = 'filter-query';
        input.value = getActiveQuery(browse);
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

    function insertPopupMenu(node) {
        // Save to playlist
        for (const playlists of node.querySelectorAll('ytd-add-to-playlist-renderer div#playlists')) {
            const parent = playlists.parentNode;
            if (parent) {
                const existsMenu = parent.querySelector('form.filter-popup.filter-add-playlist');
                if (existsMenu !== popupMenu.get(playlists)) {
                    if (!existsMenu) {
                        const menu = createPopupMenu([playlists], undefined, 'filter-add-playlist', keyword_add_playlist);
                        parent.insertBefore(menu, playlists);
                    } else {
                        existsMenu.containers.push(playlists);
                        popupMenu.set(playlists, menu);
                    }
                    updatePopupVisibility([playlists]);
                } else {
                    existsMenu.style.display = display(keyword_add_playlist);
                }
            }
        }

        // Sidebar Subscriptions
        for (const items of node.querySelectorAll('div#items:has(ytd-guide-entry-renderer#expander-item), div#items:has(ytd-guide-entry-renderer#collapser-item), div#expandable-items:has(ytd-guide-entry-renderer#expander-item), div#expandable-items:has(ytd-guide-entry-renderer#collapser-item)')) {
            const parent = items.parentNode;
            if (parent) {
                const existsMenu = parent.querySelector('form.filter-popup.filter-sidebar-channels');
                if (existsMenu !== popupMenu.get(items)) {
                    if (!existsMenu) {
                        const menu = createPopupMenu([items], 'ytd-guide-entry-renderer#expander-item', 'filter-sidebar-channels', keyword_sidebar_channels);
                        parent.insertBefore(menu, items);
                    } else {
                        existsMenu.containers.push(items);
                        popupMenu.set(items, menu);
                    }
                    updatePopupVisibility([items]);
                } else {
                    existsMenu.style.display = display(keyword_sidebar_channels);
                }
            }
        }

        // Notification
        for (const items of node.querySelectorAll('yt-multi-page-menu-section-renderer:has(ytd-notification-renderer) div#items')) {
            const parent = searchParentNode(items, 'YTD-MULTI-PAGE-MENU-RENDERER');
            if (parent) {
                const existsMenu = parent.querySelector('form.filter-popup.filter-notification');
                if (existsMenu !== popupMenu.get(items)) {
                    if (!existsMenu) {
                        const menu = createPopupMenu([items], undefined, 'filter-notification', keyword_notification);
                        parent.insertBefore(menu, parent.querySelector('div#container') ?? parent.firstChild);
                    } else {
                        existsMenu.containers.push(items);
                        popupMenu.set(items, menu);
                    }
                    updatePopupVisibility([items]);
                } else {
                    existsMenu.style.display = display(keyword_notification);
                }
            }
        }
    }

    function createPopupMenu(containers, expander, menu_class, settings) {
        const menu = document.createElement('form');
        menu.classList.add('filter-popup', menu_class);
        menu.style.display = display(settings);
        menu.containers = containers;

        const input = createPopupQueryInput(menu);
        menu.appendChild(createPopupQueryInputArea(input, menu.containers));
        menu.appendChild(createPopupSearchButton(input, menu.containers));

        menu.addEventListener('submit', e => {
            e.preventDefault();
            updatePopupQueryRegex(menu.containers, input.value);
            updatePopupVisibility(menu.containers);

            if (expander) {
                for (const container of menu.containers) {
                    const expander_node = container.querySelector(expander);
                    if (expander_node) {
                        expander_node.parentNode.insertBefore(spinner, expander_node);
                        setTimeout(() => {
                            expander_node.click();
                            spinner.remove();
                        }, 0);
                    }
                }
            }
        });

        for (const container of menu.containers) {
            popupMenu.set(container, menu);
        }

        return menu;
    }

    function createPopupQueryInputArea(input, containers) {
        const inputArea = document.createElement('span');
        inputArea.classList.add('filter-query', 'area');
        inputArea.appendChild(input);
        inputArea.appendChild(createPopupClearButton(input, containers));
        return inputArea;
    }

    function createPopupQueryInput(menu) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Subscription Feed Filter');
        input.setAttribute('title', '".."  PHRASE search operator.  e.g. "Phrase including spaces"\n |    OR search operator.           e.g. Phrase1 | Phrase2\n -    NOT search operator.        e.g. -Phrase\n\nNOTE: Queries that specify OR and NOT simultaneously are not supported.');
        input.id = 'filter-query';
        input.addEventListener('change', e => {
            input.blur();
            menu.requestSubmit();
        });
        return input;
    }

    function createPopupClearButton(input, containers) {
        const span = document.createElement('span');
        span.classList.add('filter-clear');
        span.innerHTML = common.button_label.clear;
        span.addEventListener('click', () => {
            input.value = '';
            updatePopupQueryRegex(containers, '');
            updatePopupVisibility(containers);
        });
        return span;
    }

    function createPopupSearchButton(input, containers) {
        const span = document.createElement('span');
        span.classList.add('filter-query', 'search');
        span.innerHTML = common.button_label.search;
        span.addEventListener('click', () => {
            updatePopupQueryRegex(containers, input.value);
            updatePopupVisibility(containers);
        });
        return span;
    }

    function updatePopupVisibility(containers) {
        for (const container of containers) {
            container.querySelectorAll('ytd-playlist-add-to-option-renderer, ytd-notification-renderer, ytd-guide-entry-renderer:not(#expander-item):not(#collapser-item):not(:has(a#endpoint[href="/feed/channels"]))').forEach(target => updatePopupTargetVisibility(container, target));
        }
    }

    function updatePopupTargetVisibility(container, target) {
        if (matchPopupQuery(container, target)) {
            target.style.display = '';
        } else {
            target.style.display = 'none';
        }
    }

    function getPopupKey(container) {
        return `${container.parentNode.nodeName}#${container.parentNode.id}>${container.nodeName}#${container.id}`;
    }

    function updatePopupQueryRegex(containers, query) {
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

        const notRegExpList = [];
        for (const q of notQueryList) {
            notRegExpList.push(new RegExp(q.replace(/"/g, ''), 'i'));
        }

        for (const container of containers) {
            const key = getPopupKey(container);
            active.regex.set(key, regExpList);
            active.notRegex.set(key, notRegExpList);
        }
    }

    function matchPopupQuery(container, target) {
        const text = target.querySelector('yt-formatted-string#label.ytd-playlist-add-to-option-renderer, yt-formatted-string.ytd-notification-renderer.message, yt-formatted-string.ytd-guide-entry-renderer.title')?.textContent ?? '';
        return matchPopupAllActiveRegex(container, text) && matchPopupAllActiveNotRegex(container, text);
    }

    function matchPopupAllActiveRegex(container, text) {
        const rs = active.regex.get(getPopupKey(container));
        if (rs) {
            for (const r of rs) {
                if (!text.match(r)) {
                    return false;
                }
            }
        }
        return true;
    }

    function matchPopupAllActiveNotRegex(container, text) {
        const rs = active.notRegex.get(getPopupKey(container));
        if (rs) {
            for (const r of rs) {
                if (!!r && text.match(r)) {
                    return false;
                }
            }
        }
        return true;
    }

    function updateTargetVisibility(node) {
        if (node.classList.contains('filter-separator')) {
            node.style.display = '';
            node.classList.add('filter-show');
            node.classList.remove('filter-hidden');
        } else if (includesStatus(node, getActiveMode(), getActiveModeProgress()) && matchTextContent(node)) {
            node.style.display = '';
            node.classList.add('filter-show');
            node.classList.remove('filter-hidden');
        } else {
            node.style.display = 'none';
            node.classList.remove('filter-show');
            node.classList.add('filter-hidden');
        }
    }

    async function onViewChanged() {
        for (const browse of app.querySelectorAll('ytd-browse')) {
            await onViewChanged_Node(browse);
        }
    }

    async function onViewChanged_Node(browse) {
        insertPlaylistSpacer(browse);
        await updateButtonVisibility(browse);
        display_query(browse, 'form.filter-menu, div.filter-menu', display(isMenuTarget()));
        updateVisibility(browse);
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

    function changeMode(mode, multi, sub, browse) {
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

        setActiveMode(modes, browse);

        browse.querySelectorAll('span.filter-button-subscriptions, span.filter-button-channels').forEach(n => n.classList.remove('selected'));
        browse.querySelectorAll('option.filter-button-subscriptions, option.filter-button-channels').forEach(n => {
            n.selected = false;
            n.classList.remove('selected');

            const i = n.innerHTML.indexOf('✔ ');
            if (i !== -1) {
                n.innerHTML = n.innerHTML.substring(i + 1);
            }
        });

        if (common.isChannels(location.href)) {
            for (const mode of modes) {
                browse.querySelectorAll('span.filter-button-channels.' + mode).forEach(n => n.classList.add('selected'));
            }
        } else {
            for (const mode of modes) {
                browse.querySelectorAll('span.filter-button-subscriptions.' + mode).forEach(n => n.classList.add('selected'));
                browse.querySelectorAll('option.filter-button-subscriptions.' + mode).forEach(n => {
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
                browse.querySelectorAll('option.filter-button-subscriptions.placeholder').forEach(n => n.selected = true);
            } else {
                browse.querySelectorAll('option.filter-button-subscriptions.selected').forEach(n => n.selected = true);
            }
        }
    }

    function changeModeProgress(mode, multi, sub, browse) {
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

        setActiveModeProgress(modes, browse);

        browse.querySelectorAll('option.filter-button-progress').forEach(n => {
            n.selected = false;
            n.classList.remove('selected');

            const i = n.innerHTML.indexOf('✔ ');
            if (i !== -1) {
                n.innerHTML = n.innerHTML.substring(i + 1);
            }
        });

        for (const mode of modes) {
            browse.querySelectorAll('option.filter-button-progress.' + mode).forEach(n => {
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
            browse.querySelectorAll('option.filter-button-progress.placeholder').forEach(n => n.selected = true);
        } else {
            browse.querySelectorAll('option.filter-button-progress.selected').forEach(n => n.selected = true);
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

    function setActiveMode(mode, browse) {
        active.mode.set(location.href, mode);
        browse.setAttribute('filter-mode', [...mode].join(' '));
    }

    function setActiveModeProgress(mode_progress, browse) {
        active.mode_progress.set(location.href, mode_progress);
        browse.setAttribute('filter-mode-progress', [...mode_progress].join(' '));
    }

    function getActiveQuery(browse) {
        const query = active.query.get(location.href);
        if (query) {
            return query;
        } else if (common.isSubscriptions(location.href)) {
            active.query.set(location.href, default_keyword);
            browse.setAttribute('filter-query', default_keyword);
            return default_keyword;
        } else {
            active.query.set(location.href, '');
            browse.setAttribute('filter-query', '');
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
        if (isMenuTarget()) {
            if (responsive) {
                for (const form of app.querySelectorAll('ytd-browse[role="main"] form.filter-menu:not(.filter-forCalc)')) {
                    for (const calc of form.parentNode.querySelectorAll('form.filter-forCalc')) {
                        form.parentNode.insertBefore(calc, form);
                        if (calc.scrollWidth <= form.parentNode.clientWidth) {
                            document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
                            document.documentElement.style.setProperty('--filter-menu-display', 'none');
                        } else {
                            document.documentElement.style.setProperty('--filter-button-display', 'none');
                            document.documentElement.style.setProperty('--filter-menu-display', 'block');
                        }
                    }
                }
            } else {
                document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
                document.documentElement.style.setProperty('--filter-menu-display', 'none');
            }
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

    const default_tab = {
        live: common.default_default_live,
        streamed: common.default_default_streamed,
        video: common.default_default_video,
        short: common.default_default_short,
        scheduled: common.default_default_scheduled,
        notification_on: common.default_default_notification_on,
        notification_off: common.default_default_notification_off,

        progress_unwatched: common.default_default_progress_unwatched,
        progress_watched: common.default_default_progress_watched,

        channels_all: common.default_default_channels_all,
        channels_personalized: common.default_default_channels_personalized,
        channels_none: common.default_default_channels_none,
    };

    const active = {
        mode: new Map(),
        mode_progress: new Map(),
        query: new Map(),
        regex: new Map(),
        notRegex: new Map(),
    };

    let keyword = common.default_keyword;
    let default_keyword = common.default_default_keyword;

    let multiselection = common.default_multiselection;
    let responsive = common.default_responsive;
    let limit = common.defaultLimit;
    let keyword_add_playlist = common.default_keyword_add_playlist;
    let keyword_sidebar_channels = false; // anti-flicker
    let keyword_notification = common.default_keyword_notification;

    const popupMenu = new Map();

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

    const spinner = document.createElement('div');
    {
        spinner.classList.add('filter-spinner');
    }

    document.addEventListener('yt-navigate-finish', async () => {
        await onViewChanged();
    });

    document.addEventListener('yt-action', async () => {
        await onResize();
    });

    chrome.storage.onChanged.addListener(async (changes, namespace) => {
        for (const browse of app.querySelectorAll('ytd-browse')) {
            await updateButtonVisibility(browse);
        }
    });

    new MutationObserver((mutations, observer) => {
        const is_menu_target = isMenuTarget();
        for (const m of mutations) {
            onNodeLoaded(m.target, is_menu_target);
        }
    }).observe(app, { subtree: true, childList: true });
}