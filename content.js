import(chrome.runtime.getURL('common.js')).then(common => {
    const lang = document.documentElement.getAttribute('lang');
    import(chrome.runtime.getURL('lang/' + (lang ? lang : 'en') + '.js')).then(lang => {
        main(document.querySelector('ytd-app') ?? document.body, common, lang);
    });
});

function main(app, common, lang) {
    const live_icon = '<svg style="width: 18px; height: 18px;" viewBox="0 0 18 18"><path d="M9 8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Zm1.11 2.13.71.71C11.55 10.11 12 9.11 12 8c0-1.11-.45-2.11-1.18-2.84l-.71.71c.55.55.89 1.3.89 2.13 0 .83-.34 1.58-.89 2.13Zm-4.93.71.71-.71C5.34 9.58 5 8.83 5 8c0-.83.34-1.58.89-2.13l-.71-.71C4.45 5.89 4 6.89 4 8c0 1.11.45 2.11 1.18 2.84Zm7.05 1.41.71.71C14.21 11.69 15 9.94 15 8s-.79-3.69-2.06-4.96l-.71.71C13.32 4.84 14 6.34 14 8c0 1.66-.68 3.16-1.77 4.25Zm-9.17.71.71-.71C2.68 11.16 2 9.66 2 8c0-1.66.68-3.16 1.77-4.25l-.71-.71C1.79 4.31 1 6.06 1 8s.79 3.69 2.06 4.96Z"></path></svg>';
    const streamed_icon = '<svg style="width: 18px; height: 18px;" viewBox="0 0 26 26"><path clip-rule="evenodd" d="M13.847 5.248c-1.638-.448-3.384-.285-4.91.458C7.853 6.233 6.933 7.026 6.254 8H8.5c.552 0 1 .448 1 1s-.448 1-1 1H3V4.5c0-.552.448-1 1-1s1 .448 1 1v1.843c.823-1.018 1.865-1.853 3.061-2.435 1.963-.956 4.207-1.165 6.313-.59 2.106.577 3.931 1.899 5.135 3.72 1.204 1.822 1.704 4.02 1.408 6.183-.296 2.163-1.369 4.145-3.018 5.576-1.649 1.431-3.762 2.214-5.945 2.203-2.184-.011-4.289-.816-5.923-2.264-1.634-1.448-2.686-3.441-2.96-5.607-.07-.548.319-1.049.867-1.118.548-.07 1.048.319 1.117.867.213 1.685 1.031 3.235 2.302 4.361 1.272 1.126 2.909 1.752 4.607 1.76 1.698.01 3.342-.6 4.624-1.712 1.283-1.113 2.117-2.655 2.347-4.337.23-1.683-.159-3.392-1.095-4.809-.936-1.417-2.355-2.445-3.993-2.893ZM13 7.5c0-.552-.448-1-1-1s-1 .448-1 1v5.015l.419.299 3.5 2.5c.45.32 1.074.217 1.395-.233.32-.45.217-1.074-.233-1.395L13 11.486V7.5Z" fill-rule="evenodd"></path></svg>';
    const video_icon = '<svg style="width: 18px; height: 18px;" viewBox="0 0 26 26"><g width="24" height="24" viewBox="0 0 24 24" class="style-scope tp-yt-iron-icon"><path d="M4 5.99982H3V20.9998H18V19.9998H4V5.99982Z" class="style-scope tp-yt-iron-icon"></path><path d="M6 2.99982V17.9998H21V2.99982H6ZM11 13.9998V6.99982L17 10.4998L11 13.9998Z" class="style-scope tp-yt-iron-icon"></path></g></svg>';
    const short_icon = '<svg style="width: 18px; height: 18px;" viewBox="0 0 26 26"><path d="m17.77 10.32-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"></path></svg>';
    const scheduled_icon = '<svg style="width: 18px; height: 18px;" viewBox="0 0 26 26"><path clip-rule="evenodd" d="M20.5 12c0 4.694-3.806 8.5-8.5 8.5S3.5 16.694 3.5 12 7.306 3.5 12 3.5s8.5 3.806 8.5 8.5Zm1.5 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-9.25-5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v5.375l.3.225 4 3c.331.248.802.181 1.05-.15.248-.331.181-.801-.15-1.05l-3.7-2.775V7Z" fill-rule="evenodd"></path></svg>';
    const notification_on_icon = '<svg style="width: 18px; height: 18px;" viewBox="0 0 26 26"><path d="M21.5 8.99992H19.5V8.80992C19.5 6.89992 18.39 5.18991 16.6 4.32991L17.47 2.52991C19.96 3.71991 21.5 6.12992 21.5 8.80992V8.99992ZM4.5 8.80992C4.5 6.89992 5.61 5.18991 7.4 4.32991L6.53 2.52991C4.04 3.71991 2.5 6.12992 2.5 8.80992V8.99992H4.5V8.80992ZM12 21.9999C13.1 21.9999 14 21.0999 14 19.9999H10C10 21.0999 10.9 21.9999 12 21.9999ZM20 17.3499V18.9999H4V17.3499L6 15.4699V10.3199C6 7.39991 7.56 5.09992 10 4.33992V3.95991C10 2.53991 11.49 1.45991 12.99 2.19991C13.64 2.51991 14 3.22991 14 3.95991V4.34991C16.44 5.09991 18 7.40991 18 10.3299V15.4799L20 17.3499Z"></path></svg>';
    const notification_off_icon = '<svg style="width: 18px; height: 18px;" viewBox="0 0 26 26"><path d="M3.85,3.15L3.15,3.85l3.48,3.48C6.22,8.21,6,9.22,6,10.32v5.15l-2,1.88V19h14.29l1.85,1.85l0.71-0.71L3.85,3.15z M5,18 v-0.23l2-1.88v-5.47c0-0.85,0.15-1.62,0.41-2.3L17.29,18H5z M10,20h4c0,1.1-0.9,2-2,2S10,21.1,10,20z M9.28,5.75l-0.7-0.7 c0.43-0.29,0.9-0.54,1.42-0.7V3.96c0-1.42,1.49-2.5,2.99-1.76C13.64,2.52,14,3.23,14,3.96v0.39c2.44,0.75,4,3.06,4,5.98v4.14l-1-1 v-3.05c0-2.47-1.19-4.36-3.13-5.1c-1.26-0.53-2.64-0.5-3.84,0.03C9.76,5.46,9.52,5.59,9.28,5.75z"></path></svg>';

    function updateButtonVisibility(browse) {
        chrome.storage.local.get(common.storage).then(data => {
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

                        let icon = '';
                        switch (mode) {
                            case 'live': icon = live_icon; break;
                            case 'streamed': icon = streamed_icon; break;
                            case 'video': icon = video_icon; break;
                            case 'short': icon = short_icon; break;
                            case 'scheduled': icon = scheduled_icon; break;
                            case 'notification_on': icon = notification_on_icon; break;
                            case 'notification_off': icon = notification_off_icon; break;
                        }

                        if (span_text !== undefined) {
                            span.innerHTML = icon + span_text;
                        } else {
                            span.innerHTML = icon + common.button_label[mode];
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
            suggest = common.value(data.suggest, common.default_suggest);

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
            suggestions = common.value(data.suggestions, common.default_suggestions).split(/\r?\n/).filter(line => line.trim() !== "");

            const filter_subscriptions = common.value(data.filter_subscriptions, common.default_filter_subscriptions);
            const filter_home = common.value(data.filter_home, common.default_filter_home);
            const filter_shorts = common.value(data.filter_shorts, common.default_filter_shorts);
            const filter_history = common.value(data.filter_history, common.default_filter_history);
            const filter_playlist = common.value(data.filter_playlist, common.default_filter_playlist);
            const filter_playlists = common.value(data.filter_playlists, common.default_filter_playlists);
            const filter_hashtag = common.value(data.filter_hashtag, common.default_filter_hashtag);
            const filter_channel = common.value(data.filter_channel, common.default_filter_channel);
            const filter_channels = common.value(data.filter_channels, common.default_filter_channels);

            url_param_filter_mode_enabled = common.value(data.url_param_filter_mode_enabled, common.default_url_param_filter_mode_enabled);

            if (common.isSubscriptions(location.href)) {
                if (filter_subscriptions) {
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
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else if (common.isHome(location.href)) {
                if (filter_home) {
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
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else if (common.isShorts(location.href)) {
                if (filter_shorts) {
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
                } else {
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else if (common.isHistory(location.href)) {
                if (filter_history) {
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
                } else {
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else if (common.isPlaylists(location.href)) {
                if (filter_playlists) {
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
                } else {
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else if (common.isPlaylist(location.href)) {
                if (filter_playlist) {
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
                } else {
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else if (common.isHashTag(location.href)) {
                if (filter_hashtag) {
                    display_query(browse, 'span.filter-button-subscriptions.all', '');
                    display_query(browse, 'span.filter-button-subscriptions.live', '');
                    display_query(browse, 'span.filter-button-subscriptions.streamed', 'none');
                    display_query(browse, 'span.filter-button-subscriptions.video', '');
                    display_query(browse, 'span.filter-button-subscriptions.short', '');
                    display_query(browse, 'span.filter-button-subscriptions.scheduled', display(scheduled));
                    display_query(browse, 'span.filter-button-subscriptions.notification_on', display(notification_on));
                    display_query(browse, 'span.filter-button-subscriptions.notification_off', display(notification_off));

                    display_query(browse, 'select.filter-menu', '');
                    display_query(browse, 'option.filter-button-subscriptions.all', '');
                    display_query(browse, 'option.filter-button-subscriptions.live', '');
                    display_query(browse, 'option.filter-button-subscriptions.streamed', 'none');
                    display_query(browse, 'option.filter-button-subscriptions.video', '');
                    display_query(browse, 'option.filter-button-subscriptions.short', '');
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

                    browse.setAttribute('filter-menu', 'false');
                } else {
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else if (common.isChannel(location.href)) {
                if (filter_channel) {
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
                } else {
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else if (common.isChannels(location.href)) {
                if (filter_channels) {
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
                } else {
                    hide_filter(browse);
                    browse.setAttribute('filter-menu', 'false');
                }
            } else {
                // Unknown location.href
                browse.setAttribute('filter-menu', 'false');
            }

            onResize();

            changeMode(getActiveMode().values().next().value, multiselection, false, browse);
            changeModeProgress(getActiveModeProgress().values().next().value, browse);
            updateQuery(browse, getActiveQuery(browse));
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

    function hide_filter(browse) {
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

        display_query(browse, 'span.filter-query', 'none');
    }

    function isMenuTarget() {
        return common.isSubscriptions(location.href)
            || common.isHome(location.href)
            || common.isShorts(location.href)
            || common.isHistory(location.href)
            || common.isPlaylists(location.href)
            || common.isPlaylist(location.href)
            || common.isHashTag(location.href)
            || common.isChannel(location.href)
            || common.isChannels(location.href)
            ;
    }

    function isUrlParamsTarget() {
        return common.isSubscriptions(location.href)
            || common.isHome(location.href)
            || common.isHistory(location.href)
            || common.isPlaylist(location.href)
            || common.isHashTag(location.href)
            || common.isChannel(location.href)
            || common.isChannels(location.href)
            ;
    }

    function updateVisibility(node, shallow) {
        if (common.isSubscriptions(location.href)) {
            shallow ? onNodeLoaded_Subscriptions(node) : node.querySelectorAll('YTD-RICH-ITEM-RENDERER, YTD-BROWSE').forEach(n => onNodeLoaded_Subscriptions(n));
        } else if (common.isHome(location.href)) {
            shallow ? onNodeLoaded_Home(node) : node.querySelectorAll('YTD-RICH-ITEM-RENDERER, YT-LOCKUP-VIEW-MODEL, YTD-RICH-GRID-MEDIA, YTD-FEED-FILTER-CHIP-BAR-RENDERER, DIV').forEach(n => onNodeLoaded_Home(n));
        } else if (common.isShorts(location.href)) {
            shallow ? onNodeLoaded_Shorts(node) : node.querySelectorAll('YTD-RICH-ITEM-RENDERER, YTD-BROWSE').forEach(n => onNodeLoaded_Shorts(n));
        } else if (common.isHistory(location.href)) {
            shallow ? onNodeLoaded_History(node) : node.querySelectorAll('YT-LOCKUP-VIEW-MODEL,YTM-SHORTS-LOCKUP-VIEW-MODEL-V2, YTD-VIDEO-RENDERER, YTD-BROWSE').forEach(n => onNodeLoaded_History(n));
        } else if (common.isPlaylists(location.href)) {
            shallow ? onNodeLoaded_Playlists(node) : node.querySelectorAll('YTD-RICH-ITEM-RENDERER, YTD-BROWSE').forEach(n => onNodeLoaded_Playlists(n));
        } else if (common.isPlaylist(location.href)) {
            shallow ? onNodeLoaded_Playlist(node) : node.querySelectorAll('YTD-PLAYLIST-VIDEO-RENDERER, YTD-THUMBNAIL-OVERLAY-RESUME-PLAYBACK-RENDERER, YTD-BROWSE').forEach(n => onNodeLoaded_Playlist(n));
        } else if (common.isHashTag(location.href)) {
            shallow ? onNodeLoaded_HashTag(node) : node.querySelectorAll('YTD-RICH-ITEM-RENDERER, YTD-BROWSE, TP-YT-APP-HEADER').forEach(n => onNodeLoaded_HashTag(n));
        } else if (common.isChannel(location.href)) {
            shallow ? onNodeLoaded_Channel(node) : node.querySelectorAll('YTD-CHANNEL-FEATURED-CONTENT-RENDERER, YTD-GRID-VIDEO-RENDERER, YTD-GRID-CHANNEL-RENDERER, YTD-POST-RENDERER, YTM-SHORTS-LOCKUP-VIEW-MODEL-V2, YTD-RICH-ITEM-RENDERER, YT-LOCKUP-VIEW-MODEL, YTD-BACKSTAGE-POST-THREAD-RENDERER, YTD-BROWSE').forEach(n => onNodeLoaded_Channel(n));
        } else if (common.isChannels(location.href)) {
            shallow ? onNodeLoaded_Channels(node) : node.querySelectorAll('YTD-CHANNEL-RENDERER, YTD-BROWSE').forEach(n => onNodeLoaded_Channels(n));
        } else if (common.isVideoPlayer(location.href)) {
            shallow ? onNodeLoaded_VideoPlayer(node) : node.querySelectorAll('YT-LOCKUP-VIEW-MODEL, YTM-SHORTS-LOCKUP-VIEW-MODEL-V2, YTD-COMPACT-VIDEO-RENDERER, YTD-VIDEO-RENDERER, YTD-COMPACT-MOVIE-RENDERER, YT-CHIP-CLOUD-RENDERER').forEach(n => onNodeLoaded_VideoPlayer(n));
        }
    }

    function updateTargetVisibility(node, matchTextContent, classifyModeStatus, classifyProgressStatus) {
        if (includesStatus(node, getActiveMode(), getActiveModeProgress(), classifyModeStatus, classifyProgressStatus) && matchTextContent(node)) {
            node.style.display = '';
            node.classList.add('filter-show');
            node.classList.remove('filter-hidden');
        } else {
            node.style.cssText = 'display: none !important;';
            node.classList.remove('filter-show');
            node.classList.add('filter-hidden');
        }
    }

    function updateQuery(browse, query) {
        set_cache_query(query);
        browse.setAttribute('filter-query', query);
        browse.querySelectorAll('form.filter-menu input#filter-query').forEach(e => e.value = query);
    }

    function matchQuery(text) {
        const query = get_cache_query();
        if (!query) return true;

        const evaluator = createQueryEvaluator(query?.toLowerCase());
        return evaluator(text?.toLowerCase());
    }

    function onNodeLoaded_Subscriptions(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchTextContent_Subscriptions_RichItemRenderer, classifyModeStatus_Subscriptions_RichItemRenderer, classifyProgressStatus_Subscriptions_RichItemRenderer);
                {
                    const section = searchParentNode(node, 'YTD-RICH-SECTION-RENDERER');
                    if (section) {
                        const items = section.querySelectorAll('ytd-rich-item-renderer');
                        if (items.length > 0) {
                            const visibled_items = Array.from(items).filter(n => n.style.display !== 'none');
                            section.style.display = visibled_items.length === 0 ? 'none' : '';
                        }
                    }
                }
                break;
            case 'YTD-BROWSE':
                insertMenu_Subscriptions(node);
                break;
            case 'YTD-CONTINUATION-ITEM-RENDERER':
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
                break;
        }
    }

    function insertMenu_Subscriptions(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            menu.classList.add('position-fixed', 'with-space');
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }

        if (browse.getAttribute('filter-menu') === 'true') {
            set_frosted_glass_mode();
        } else {
            reset_frosted_glass_mode();
        }
    }

    function matchTextContent_Subscriptions_RichItemRenderer(node) {
        const title = node.querySelector('div#meta a#video-title-link') ?? node.querySelector('yt-lockup-metadata-view-model > div:nth-child(2) > h3');
        const channel_name = node.querySelector('yt-content-metadata-view-model > div:nth-child(1) > span:nth-child(1)');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        const shorts_title = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (shorts_title) {
            return matchQuery(shorts_title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Subscriptions_RichItemRenderer(node) {
        const status = new Set();

        const metadata = node.querySelector('div#metadata-line') ?? node.querySelector('yt-content-metadata-view-model > div:nth-child(2)');
        if (metadata) {
            const t = metadata.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            } else if (lang.isScheduled_metadata(t)) {
                status.add('scheduled');

                const notification_button = node.querySelector('div#buttons button') ?? node.querySelector('lockup-attachments-view-model button');
                if (notification_button) {
                    const t = notification_button.textContent;
                    if (lang.isNotificationOn_button(t)) {
                        status.add('notification_on');
                    } else if (lang.isNotificationOff_button(t)) {
                        status.add('notification_off');
                    }
                }
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        const shorts = node.querySelector('ytm-shorts-lockup-view-model-v2');
        if (shorts) {
            status.add('short');
        }

        const collection = node.querySelector('yt-collection-thumbnail-view-model');
        if (collection) {
            status.add('collection');
        }

        return status;
    }

    function classifyProgressStatus_Subscriptions_RichItemRenderer(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress') ?? node.querySelector('yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onNodeLoaded_Home(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchTextContent_Home_RichItemRenderer, classifyModeStatus_Home_RichItemRenderer, classifyProgressStatus_Home_RichItemRenderer);
                break;
            case 'YT-LOCKUP-VIEW-MODEL':
                {
                    const n = searchParentNode(node, 'YTD-RICH-ITEM-RENDERER');
                    if (n) {
                        updateTargetVisibility(n, matchTextContent_Home_RichItemRenderer, classifyModeStatus_Home_RichItemRenderer, classifyProgressStatus_Home_RichItemRenderer);
                    }
                }
                break;
            case 'YTD-RICH-GRID-MEDIA':
                updateTargetVisibility(node, matchTextContent_Home_RichGridMedia, classifyModeStatus_Home_RichGridMedia, classifyProgressStatus_Home_RichGridMedia);
                break;
            case 'YTD-FEED-FILTER-CHIP-BAR-RENDERER':
                insertMenu_Home(node);
                break;
            case 'DIV':
                if (node.id === 'header' && node.childElementCount === 0) {
                    insertMenu_Home(node);
                }
                break;
        }
    }

    function insertMenu_Home(node) {
        const browse = searchParentNode(node, 'YTD-BROWSE');
        if (browse) {
            if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
                const referenceNode = browse.querySelector('div#scroll-container');
                if (referenceNode) {
                    const menu = createMenu(browse, true);
                    referenceNode.insertBefore(menu, referenceNode.firstChild);

                    const calc = createNodeForCalc(menu, browse);
                    referenceNode.insertBefore(calc, referenceNode.firstChild);

                    updateButtonVisibility(browse);
                    display_query(browse, 'form.filter-menu, div.filter-menu', '');
                } else {
                    // referenceNode not found
                    // as a workaround, create a filter under div#masthead-ad
                    const referenceNode = browse.querySelector('div#masthead-ad');
                    if (referenceNode) {
                        const menu = createMenu(browse, true);
                        referenceNode.insertBefore(menu, referenceNode.firstChild);

                        const calc = createNodeForCalc(menu, browse);
                        referenceNode.insertBefore(calc, referenceNode.firstChild);

                        updateButtonVisibility(browse);
                        display_query(browse, 'form.filter-menu, div.filter-menu', '');
                    } else {
                        // referenceNode not found
                    }
                }
            } else {
                // already exists
                // move the filter created under div#masthead-ad to its proper location
                const menu = browse.querySelector('div#masthead-ad > form.filter-menu:not(.filter-forCalc)');
                const calc = browse.querySelector('div#masthead-ad > form.filter-menu.filter-forCalc');
                if (menu && calc) {
                    const referenceNode = browse.querySelector('div#scroll-container');
                    if (referenceNode) {
                        referenceNode.insertBefore(menu, referenceNode.firstChild);
                        referenceNode.insertBefore(calc, referenceNode.firstChild);

                        updateButtonVisibility(browse);
                        display_query(browse, 'form.filter-menu, div.filter-menu', '');
                    } else {
                        // referenceNode not found
                    }
                }
            }
        } else {
            // not target
        }
    }

    function matchTextContent_Home_RichItemRenderer(node) {
        const title = node.querySelector('yt-lockup-metadata-view-model > div > h3'); // video: div:nth-child(2), collection: div:nth-child(1)
        const channel_name = node.querySelector('yt-content-metadata-view-model > div:nth-child(1) > span:nth-child(1)');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        const shorts_metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (shorts_metadata) {
            return matchQuery(shorts_metadata.textContent);
        }

        const collection_metadata = node.querySelector('yt-collection-thumbnail-view-model yt-lockup-metadata-view-model'); // old style collection
        if (collection_metadata) {
            return matchQuery(collection_metadata.textContent);
        }

        const ad_metadata = node.querySelector('feed-ad-metadata-view-model');
        if (ad_metadata) {
            return matchQuery(ad_metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Home_RichItemRenderer(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model > div:nth-child(2)');
        if (metadata) {
            const t = metadata.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            } else if (lang.isScheduled_metadata(t)) {
                status.add('scheduled');

                const notification_button = node.querySelector('lockup-attachments-view-model button');
                if (notification_button) {
                    const t = notification_button.textContent;
                    if (lang.isNotificationOn_button(t)) {
                        status.add('notification_on');
                    } else if (lang.isNotificationOff_button(t)) {
                        status.add('notification_off');
                    }
                }
            }
        }

        const metadata_line = node.querySelector('div#metadata-line');
        if (metadata_line) {
            const t = metadata_line.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            } else if (lang.isScheduled_metadata(t)) {
                status.add('scheduled');

                const notification_button = node.querySelector('div#buttons button') ?? node.querySelector('lockup-attachments-view-model button');
                if (notification_button) {
                    const t = notification_button.textContent;
                    if (lang.isNotificationOn_button(t)) {
                        status.add('notification_on');
                    } else if (lang.isNotificationOff_button(t)) {
                        status.add('notification_off');
                    }
                }
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        const shorts = node.querySelector('ytm-shorts-lockup-view-model-v2');
        if (shorts) {
            status.add('short');
        }

        const collection = node.querySelector('yt-collection-thumbnail-view-model');
        if (collection) {
            status.add('collection');
        }

        const ad_slot = node.querySelector('ytd-ad-slot-renderer');
        if (ad_slot) {
            status.add('ad');
        }

        return status;
    }

    function classifyProgressStatus_Home_RichItemRenderer(node) {
        const status = new Set();

        const progress = node.querySelector('yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchTextContent_Home_RichGridMedia(node) {
        const title = node.querySelector('a#video-title-link');
        const channel_name = node.querySelector('yt-content-metadata-view-model > div:nth-child(1) > span:nth-child(1)');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Home_RichGridMedia(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model > div:nth-child(2)');
        if (metadata) {
            const t = metadata.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            } else if (lang.isScheduled_metadata(t)) {
                status.add('scheduled');

                const notification_button = node.querySelector('lockup-attachments-view-model button');
                if (notification_button) {
                    const t = notification_button.textContent;
                    if (lang.isNotificationOn_button(t)) {
                        status.add('notification_on');
                    } else if (lang.isNotificationOff_button(t)) {
                        status.add('notification_off');
                    }
                }
            }
        }

        const metadata_line = node.querySelector('div#metadata-line');
        if (metadata_line) {
            const t = metadata_line.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            } else if (lang.isScheduled_metadata(t)) {
                status.add('scheduled');

                const notification_button = node.querySelector('div#buttons button') ?? node.querySelector('lockup-attachments-view-model button');
                if (notification_button) {
                    const t = notification_button.textContent;
                    if (lang.isNotificationOn_button(t)) {
                        status.add('notification_on');
                    } else if (lang.isNotificationOff_button(t)) {
                        status.add('notification_off');
                    }
                }
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        const shorts = node.querySelector('ytm-shorts-lockup-view-model-v2');
        if (shorts) {
            status.add('short');
        }

        const collection = node.querySelector('yt-collection-thumbnail-view-model');
        if (collection) {
            status.add('collection');
        }

        return status;
    }

    function classifyProgressStatus_Home_RichGridMedia(node) {
        const status = new Set();

        const progress = node.querySelector('yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onNodeLoaded_Shorts(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchTextContent_Shorts_RichItemRenderer, classifyModeStatus_Shorts_RichItemRenderer, classifyProgressStatus_Shorts_RichItemRenderer);
                break;
            case 'YTD-BROWSE':
                insertMenu_Shorts(node);
                break;
            case 'YTD-CONTINUATION-ITEM-RENDERER':
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
                break;
        }
    }

    function insertMenu_Shorts(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            menu.classList.add('position-fixed', 'with-space');
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }

        if (browse.getAttribute('filter-menu') === 'true') {
            set_frosted_glass_mode();
        } else {
            reset_frosted_glass_mode();
        }
    }

    function matchTextContent_Shorts_RichItemRenderer(node) {
        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.getAttribute('aria-label'));
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Shorts_RichItemRenderer(node) {
        return undefined;
    }

    function classifyProgressStatus_Shorts_RichItemRenderer(node) {
        return undefined;
    }

    function onNodeLoaded_History(node) {
        switch (node.nodeName) {
            case 'YT-LOCKUP-VIEW-MODEL':
                updateTargetVisibility(node, matchTextContent_History_LockupViewModel, classifyModeStatus_History_LockupViewModel, classifyProgressStatus_History_LockupViewModel);
                break;
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
                updateTargetVisibility(node, matchTextContent_History_ShortsLockupViewModelV2, classifyModeStatus_History_ShortsLockupViewModelV2, classifyProgressStatus_History_ShortsLockupViewModelV2);
                break;
            case 'YTD-VIDEO-RENDERER':
                updateTargetVisibility(node, matchTextContent_History_VideoRenderer, classifyModeStatus_History_VideoRenderer, classifyProgressStatus_History_VideoRenderer);
                break;
            case 'YTD-BROWSE':
                insertMenu_History(node);
                break;
        }
    }

    function insertMenu_History(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            menu.classList.add('position-fixed', 'with-space-header');
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }

        if (browse.getAttribute('filter-menu') === 'true') {
            set_frosted_glass_mode();
        } else {
            reset_frosted_glass_mode();
        }
    }

    function matchTextContent_History_LockupViewModel(node) {
        const title = node.querySelector('yt-lockup-metadata-view-model > div:nth-child(2) > h3');
        const channel_name = node.querySelector('yt-content-metadata-view-model > div:nth-child(1) > span:nth-child(1)');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        const shorts_metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (shorts_metadata) {
            return matchQuery(shorts_metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_History_LockupViewModel(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model > div:nth-child(1) > span:nth-child(3)');
        if (metadata) {
            const t = metadata.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        if (status.size === 0) {
            // workaround: Member-only Video
            status.add('video');
        }

        return status;
    }

    function classifyProgressStatus_History_LockupViewModel(node) {
        return undefined;
    }

    function matchTextContent_History_ShortsLockupViewModelV2(node) {
        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_History_ShortsLockupViewModelV2(node) {
        const status = new Set();

        status.add('short');

        return status;
    }

    function classifyProgressStatus_History_ShortsLockupViewModelV2(node) {
        return undefined;
    }

    function matchTextContent_History_VideoRenderer(node) {
        const title = node.querySelector('h3.title-and-badge');
        const channel_name = node.querySelector('ytd-channel-name');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_History_VideoRenderer(node) {
        const status = new Set();

        const metadata = node.querySelector('div#metadata-line');
        if (metadata) {
            const t = metadata.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isVideo_metadata(t)) {
                const shorts = node.querySelector('badge-shape:has(path[d="m17.77 10.32-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"])');
                if (shorts) {
                    status.add('short');
                } else {
                    status.add('video');
                }
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        return status;
    }

    function classifyProgressStatus_History_VideoRenderer(node) {
        return undefined;
    }

    function onNodeLoaded_Playlists(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchTextContent_Playlists_RichItemRenderer, classifyModeStatus_Playlists_RichItemRenderer, classifyProgressStatus_Playlists_RichItemRenderer);
                break;
            case 'YTD-BROWSE':
                insertMenu_Playlists(node);
                break;
        }
    }

    function insertMenu_Playlists(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            menu.classList.add('position-fixed', 'with-space-header');
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }

        if (browse.getAttribute('filter-menu') === 'true') {
            set_frosted_glass_mode();
        } else {
            reset_frosted_glass_mode();
        }
    }

    function matchTextContent_Playlists_RichItemRenderer(node) {
        const title = node.querySelector('yt-lockup-metadata-view-model > div:nth-child(1) > h3');
        const channel_name = node.querySelector('yt-content-metadata-view-model > div:nth-child(1) > span:nth-child(1)');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Playlists_RichItemRenderer(node) {
        return undefined;
    }

    function classifyProgressStatus_Playlists_RichItemRenderer(node) {
        return undefined;
    }

    function onNodeLoaded_Playlist(node) {
        switch (node.nodeName) {
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
                updateTargetVisibility(node, matchTextContent_Playlist_VideoRenderer, classifyModeStatus_Playlist_VideoRenderer, classifyProgressStatus_Playlist_VideoRenderer);
                break;
            case 'YTD-THUMBNAIL-OVERLAY-RESUME-PLAYBACK-RENDERER':
                {
                    const n = searchParentNode(node, 'YTD-PLAYLIST-VIDEO-RENDERER');
                    if (n) {
                        updateTargetVisibility(n, matchTextContent_Playlist_VideoRenderer, classifyModeStatus_Playlist_VideoRenderer, classifyProgressStatus_Playlist_VideoRenderer);
                    }
                }
                break;
            case 'YTD-BROWSE':
                insertMenu_Playlist(node);
                break;
        }
    }

    function insertMenu_Playlist(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            menu.classList.add('position-fixed', 'with-space-playlist-header');
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }
    }

    function matchTextContent_Playlist_VideoRenderer(node) {
        const title = node.querySelector('a#video-title');
        const channel_name = node.querySelector('ytd-channel-name');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Playlist_VideoRenderer(node) {
        const status = new Set();

        const info = node.querySelector('div#byline-container yt-formatted-string#video-info');
        if (info) {
            const t = info.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                const title = node.querySelector('div#meta a#video-title');
                if (title) {
                    const t = title.textContent.toLowerCase();
                    if (t.includes('#shorts')) {
                        status.add('short');
                    } else {
                        status.add('video');
                    }
                } else {
                    status.add('video');
                }
            }
        }

        const metadata_line = node.querySelector('div#metadata-line');
        if (metadata_line) {
            const t = metadata_line.textContent;
            if (lang.isScheduled_metadata(t)) {
                status.add('scheduled');
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        return status;
    }

    function classifyProgressStatus_Playlist_VideoRenderer(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onNodeLoaded_HashTag(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchTextContent_HashTag_RichItemRenderer, classifyModeStatus_HashTag_RichItemRenderer, classifyProgressStatus_HashTag_RichItemRenderer);
                break;
            case 'YTD-BROWSE':
                insertMenu_HashTag(node);
                break;
            case 'TP-YT-APP-HEADER':
                {
                    const n = searchParentNode(node, 'YTD-BROWSE');
                    if (n) {
                        insertMenu_HashTag(n);
                    }
                }
                break;
        }
    }

    function insertMenu_HashTag(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const header = browse.querySelector('div#page-header-container');
            if (header) {
                const menu = createMenu(browse, true);
                header.insertBefore(menu, header.firstChild);

                const calc = createNodeForCalc(menu, browse);
                header.insertBefore(calc, header.firstChild);

                updateButtonVisibility(browse);
                display_query(browse, 'form.filter-menu, div.filter-menu', '');
            }
        } else {
            // already exists
        }
    }

    function matchTextContent_HashTag_RichItemRenderer(node) {
        const title = node.querySelector('yt-formatted-string#video-title');
        const channel_name = node.querySelector('yt-formatted-string#text.ytd-channel-name');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_HashTag_RichItemRenderer(node) {
        const status = new Set();

        const metadata_line = node.querySelector('div#metadata-line');
        if (metadata_line) {
            const t = metadata_line.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                const shorts = node.querySelector('badge-shape:has(path[d="m17.77 10.32-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"])');
                if (shorts) {
                    status.add('short');
                } else {
                    status.add('video');
                }
            } else if (lang.isScheduled_metadata(t)) {
                status.add('scheduled');

                const notification_button = node.querySelector('div#buttons button');
                if (notification_button) {
                    const t = notification_button.textContent;
                    if (lang.isNotificationOn_button(t)) {
                        status.add('notification_on');
                    } else if (lang.isNotificationOff_button(t)) {
                        status.add('notification_off');
                    }
                }
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        return status;
    }

    function classifyProgressStatus_HashTag_RichItemRenderer(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onNodeLoaded_Channel(node) {
        switch (node.nodeName) {
            case 'YTD-CHANNEL-FEATURED-CONTENT-RENDERER':
                updateTargetVisibility(node, matchTextContent_Channel_ChannelFeaturedContentRenderer, classifyModeStatus_Channel_ChannelFeaturedContentRenderer, classifyProgressStatus_Channel_ChannelFeaturedContentRenderer);
                break;
            case 'YTD-GRID-VIDEO-RENDERER':
                updateTargetVisibility(node, matchTextContent_Channel_GridVideoRenderer, classifyModeStatus_Channel_GridVideoRenderer, classifyProgressStatus_Channel_GridVideoRenderer);
                break;
            case 'YTD-GRID-CHANNEL-RENDERER':
                updateTargetVisibility(node, matchTextContent_Channel_GridChannelRenderer, classifyModeStatus_Channel_GridChannelRenderer, classifyProgressStatus_Channel_GridChannelRenderer);
                break;
            case 'YTD-POST-RENDERER':
                updateTargetVisibility(node, matchTextContent_Channel_PostRenderer, classifyModeStatus_Channel_PostRenderer, classifyProgressStatus_Channel_PostRenderer);
                break;
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
                updateTargetVisibility(node, matchTextContent_Channel_ShortsLockupViewModelV2, classifyModeStatus_Channel_ShortsLockupViewModelV2, classifyProgressStatus_Channel_ShortsLockupViewModelV2);
                break;
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchTextContent_Channel_RichItemRenderer, classifyModeStatus_Channel_RichItemRenderer, classifyProgressStatus_Channel_RichItemRenderer);
                break;
            case 'YT-LOCKUP-VIEW-MODEL':
                updateTargetVisibility(node, matchTextContent_Channel_LockupViewModel, classifyModeStatus_Channel_LockupViewModel, classifyProgressStatus_Channel_LockupViewModel);
                break;
            case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
                updateTargetVisibility(node, matchTextContent_Channel_BackstagePostThreadRenderer, classifyModeStatus_Channel_BackstagePostThreadRenderer, classifyProgressStatus_Channel_BackstagePostThreadRenderer);
                break;
            case 'YTD-BROWSE':
                insertMenu_Channel(node);
                break;
        }
    }

    function insertMenu_Channel(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);

            const referenceNode = browse.querySelector('ytd-two-column-browse-results-renderer');
            if (referenceNode) {
                browse.insertBefore(menu, referenceNode);

                const calc = createNodeForCalc(menu, browse);
                browse.insertBefore(calc, referenceNode);

                updateButtonVisibility(browse);
                display_query(browse, 'form.filter-menu, div.filter-menu', '');
            }
        }
    }

    function matchTextContent_Channel_ChannelFeaturedContentRenderer(node) {
        const title = node.querySelector('a#video-title');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channel_ChannelFeaturedContentRenderer(node) {
        return undefined;
    }

    function classifyProgressStatus_Channel_ChannelFeaturedContentRenderer(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchTextContent_Channel_GridVideoRenderer(node) {
        const title = node.querySelector('a#video-title');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channel_GridVideoRenderer(node) {
        return undefined;
    }

    function classifyProgressStatus_Channel_GridVideoRenderer(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchTextContent_Channel_GridChannelRenderer(node) {
        const title = node.querySelector('span#title');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channel_GridChannelRenderer(node) {
        return undefined;
    }

    function classifyProgressStatus_Channel_GridChannelRenderer(node) {
        return undefined;
    }

    function matchTextContent_Channel_PostRenderer(node) {
        const text = node.querySelector('div#post-text');
        if (text) {
            return matchQuery(text.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channel_PostRenderer(node) {
        return undefined;
    }

    function classifyProgressStatus_Channel_PostRenderer(node) {
        return undefined;
    }

    function matchTextContent_Channel_ShortsLockupViewModelV2(node) {
        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channel_ShortsLockupViewModelV2(node) {
        return undefined;
    }

    function classifyProgressStatus_Channel_ShortsLockupViewModelV2(node) {
        return undefined;
    }

    function matchTextContent_Channel_RichItemRenderer(node) {
        const title = node.querySelector('a#video-title-link');
        if (title) {
            return matchQuery(title.textContent);
        }

        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channel_RichItemRenderer(node) {
        return undefined;
    }

    function classifyProgressStatus_Channel_RichItemRenderer(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchTextContent_Channel_LockupViewModel(node) {
        const metadata = node.querySelector('yt-lockup-metadata-view-model > div:nth-child(1) > h3');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channel_LockupViewModel(node) {
        return undefined;
    }

    function classifyProgressStatus_Channel_LockupViewModel(node) {
        return undefined;
    }

    function matchTextContent_Channel_BackstagePostThreadRenderer(node) {
        const content = node.querySelector('div#content');
        if (content) {
            return matchQuery(content.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channel_BackstagePostThreadRenderer(node) {
        return undefined;
    }

    function classifyProgressStatus_Channel_BackstagePostThreadRenderer(node) {
        return undefined;
    }

    function onNodeLoaded_Channels(node) {
        switch (node.nodeName) {
            case 'YTD-CHANNEL-RENDERER':
                updateTargetVisibility(node, matchTextContent_Channels_ChannelRenderer, classifyModeStatus_Channels_ChannelRenderer, classifyProgressStatus_Channels_ChannelRenderer);
                break;
            case 'YTD-BROWSE':
                insertMenu_Channels(node);
                break;
        }
    }

    function insertMenu_Channels(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            menu.classList.add('position-fixed', 'with-space-header');
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }

        if (browse.getAttribute('filter-menu') === 'true') {
            set_frosted_glass_mode();
        } else {
            reset_frosted_glass_mode();
        }
    }

    function matchTextContent_Channels_ChannelRenderer(node) {
        const info = node.querySelector('div#info');
        if (info) {
            return matchQuery(info.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_Channels_ChannelRenderer(node) {
        const status = new Set();

        const notification = node.querySelector('ytd-subscription-notification-toggle-button-renderer-next button[aria-label]');
        if (notification) {
            const t = notification.getAttribute('aria-label');
            if (lang.isChannelsAllNotifications(t)) {
                status.add('channels_all');
            } else if (lang.isChannelsPersonalizedNotifications(t)) {
                status.add('channels_personalized');
            } else if (lang.isChannelsNoNotifications(t)) {
                status.add('channels_none');
            }
        } else {
            status.add('channels_purchased');
        }

        return status;
    }

    function classifyProgressStatus_Channels_ChannelRenderer(node) {
        return undefined;
    }

    function onNodeLoaded_VideoPlayer(node) {
        switch (node.nodeName) {
            case 'YT-LOCKUP-VIEW-MODEL':
                updateTargetVisibility(node, matchTextContent_VideoPlayer_LockupViewModel, classifyModeStatus_VideoPlayer_LockupViewModel, classifyProgressStatus_VideoPlayer_LockupViewModel);
                break;
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2': // old style shorts
                updateTargetVisibility(node, matchTextContent_VideoPlayer_ShortsLockupViewModelV2, classifyModeStatus_VideoPlayer_ShortsLockupViewModelV2, classifyProgressStatus_VideoPlayer_ShortsLockupViewModelV2);
                break;
            case 'YTD-VIDEO-RENDERER':
                updateTargetVisibility(node, matchTextContent_VideoPlayer_VideoRenderer, classifyModeStatus_VideoPlayer_VideoRenderer, classifyProgressStatus_VideoPlayer_VideoRenderer);
                break;
            case 'YTD-COMPACT-MOVIE-RENDERER':
                updateTargetVisibility(node, matchTextContent_VideoPlayer_CompactMovieRenderer, classifyModeStatus_VideoPlayer_CompactMovieRenderer, classifyProgressStatus_VideoPlayer_CompactMovieRenderer);
                break;
            case 'YTD-COMPACT-VIDEO-RENDERER':
                updateTargetVisibility(node, matchTextContent_VideoPlayer_CompactVideoRenderer, classifyModeStatus_VideoPlayer_CompactVideoRenderer, classifyProgressStatus_VideoPlayer_CompactVideoRenderer);
                break;
            case 'YT-CHIP-CLOUD-RENDERER':
                insertMenu_VideoPlayer(node);
                break;
        }
    }

    function insertMenu_VideoPlayer(node) {
        const browse = searchParentNode(node, 'YTD-WATCH-FLEXY');
        if (browse) {
            if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
                const referenceNode = browse.querySelector('div#related ytd-watch-next-secondary-results-renderer');
                if (referenceNode) {
                    const menu = createMenu(browse, false);
                    menu.classList.add('with-space-related');
                    referenceNode.insertBefore(menu, referenceNode.firstChild);

                    const calc = createNodeForCalc(menu, browse);
                    referenceNode.insertBefore(calc, referenceNode.firstChild);

                    updateButtonVisibility(browse);
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

    function matchTextContent_VideoPlayer_LockupViewModel(node) {
        const title = node.querySelector('yt-lockup-metadata-view-model > div:nth-child(2) > h3');
        const channel_name = node.querySelector('yt-content-metadata-view-model > div:nth-child(1)');
        if (title || channel_name) {
            return matchQuery(`${title?.textContent}\n${channel_name?.textContent}`);
        }

        const shorts_metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (shorts_metadata) {
            return matchQuery(shorts_metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_VideoPlayer_LockupViewModel(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model > div:nth-child(2)');
        if (metadata) {
            const t = metadata.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        return status;
    }

    function classifyProgressStatus_VideoPlayer_LockupViewModel(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress, yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchTextContent_VideoPlayer_ShortsLockupViewModelV2(node) { // old style shorts
        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_VideoPlayer_ShortsLockupViewModelV2(node) { // old style shorts
        const status = new Set();

        status.add('short');

        return status;
    }

    function classifyProgressStatus_VideoPlayer_ShortsLockupViewModelV2(node) { // old style shorts
        return undefined;
    }

    function matchTextContent_VideoPlayer_VideoRenderer(node) {
        const title = node.querySelector('h3.title-and-badge');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_VideoPlayer_VideoRenderer(node) {
        const status = new Set();

        const metadata = node.querySelector('div#metadata-line');
        if (metadata) {
            const t = metadata.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isVideo_metadata(t)) {
                const shorts = node.querySelector('badge-shape:has(path[d="m17.77 10.32-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"])');
                if (shorts) {
                    status.add('short');
                } else {
                    status.add('video');
                }
            }
        }

        for (const badge of node.querySelectorAll('div.badge > p, yt-thumbnail-badge-view-model > badge-shape > div')) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        return status;
    }

    function classifyProgressStatus_VideoPlayer_VideoRenderer(node) {
        return undefined;
    }

    function matchTextContent_VideoPlayer_CompactMovieRenderer(node) {
        const title = node.querySelector('div.details h3');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_VideoPlayer_CompactMovieRenderer(node) {
        const status = new Set();

        status.add('video');

        return status;
    }

    function classifyProgressStatus_VideoPlayer_CompactMovieRenderer(node) {
        const status = new Set();

        status.add('progress_unwatched');

        return status;
    }

    function matchTextContent_VideoPlayer_CompactVideoRenderer(node) {
        const title = node.querySelector('div.details h3');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyModeStatus_VideoPlayer_CompactVideoRenderer(node) {
        const status = new Set();

        status.add('short');

        return status;
    }

    function classifyProgressStatus_VideoPlayer_CompactVideoRenderer(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress, yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function updatePopupVisibility(containers) {
        for (const container of containers) {
            container.querySelectorAll('yt-list-item-view-model, ytd-notification-renderer, ytd-guide-entry-renderer:not(#expander-item):not(#collapser-item):not(#header-entry)').forEach(target => updatePopupTargetVisibility(container, target));
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

    function updatePopupQuery(containers, query) {
        for (const container of containers) {
            const key = getPopupKey(container);
            active.query.set(key, query);
        }
    }

    function matchPopupQuery(container, target) {
        const query = active.query.get(getPopupKey(container));
        if (!query) return true;

        const evaluator = createQueryEvaluator(query?.toLowerCase());
        const text = target.querySelector('span.yt-core-attributed-string, yt-formatted-string.ytd-notification-renderer.message, yt-formatted-string.ytd-guide-entry-renderer.title')?.textContent ?? '';
        return evaluator(text?.toLowerCase());
    }

    function onAppNodeLoaded(node) {
        switch (node.nodeName) {
            // notification
            case 'YTD-NOTIFICATION-RENDERER':
                updatePopupVisibility([node.parentNode]);
                break;

            // sidebar channels
            case 'YTD-GUIDE-ENTRY-RENDERER':
                const parent = searchParentNode(node, 'YTD-GUIDE-SECTION-RENDERER');
                updatePopupVisibility([...parent.querySelectorAll('div#items')]);
                break;

            case 'DIV':
                if (node.id === 'playlists' || node.id === 'items' || node.id === 'expandable-items') {
                    updatePopupVisibility([node]);
                }
                break;

            // add to playlist
            case 'YT-SHEET-VIEW-MODEL':
                insertPopupMenu(node);
                break;

            // notification
            case 'YT-MULTI-PAGE-MENU-SECTION-RENDERER':
                insertPopupMenu(node);
                break;

            // sidebar channels
            case 'YTD-GUIDE-SECTION-RENDERER':
                insertPopupMenu(node);
                break;

            // Refresh the cached page
            case 'YTD-APP':
                onViewChanged();
                break;
        }
    }

    function onViewChanged() {
        for (const browse of app.querySelectorAll('ytd-browse, ytd-watch-flexy')) {
            onViewChanged_Node(browse);
        }
    }

    function onViewChanged_Node(browse) {
        updateButtonVisibility(browse);
        display_query(browse, 'form.filter-menu, div.filter-menu', display(isMenuTarget()));
        updateVisibility(browse);
    }

    function includesStatus(node, status_mode, status_progress, classifyModeStatus, classifyProgressStatus) {
        return includesModeStatus(node, status_mode, classifyModeStatus) && includesProgressStatus(node, status_progress, classifyProgressStatus);
    }

    function includesModeStatus(node, status_mode, classifyModeStatus) {
        if (!status_mode || status_mode.size === 0 || status_mode.has('all')) {
            return true;
        } else {
            const node_status_mode = classifyModeStatus(node);
            if (node_status_mode && node_status_mode.size > 0) {
                for (const s of status_mode) {
                    if (node_status_mode.has(s)) {
                        return true;
                    }
                }
            } else {
                // unknown node
            }
            return false;
        }
    }

    function includesProgressStatus(node, status_progress, classifyProgressStatus) {
        if (!status_progress || status_progress.size === 0 || status_progress.has('progress_all')) {
            return true;
        } else {
            const node_status_progress = classifyProgressStatus(node);
            if (node_status_progress && node_status_progress.size > 0) {
                for (const s of status_progress) {
                    if (node_status_progress.has(s)) {
                        return true;
                    }
                }
            } else {
                // unknown node
            }
            return false;
        }
    }

    function createMenu(browse, scroll) {
        const menu = document.createElement('form');
        menu.style.display = 'none';
        menu.classList.add('filter-menu');

        menu.appendChild(createButton(common.button_label.all, 'all', browse, scroll));
        menu.appendChild(createButton(common.button_label.live, 'live', browse, scroll));
        menu.appendChild(createButton(common.button_label.streamed, 'streamed', browse, scroll));
        menu.appendChild(createButton(common.button_label.video, 'video', browse, scroll));
        menu.appendChild(createButton(common.button_label.short, 'short', browse, scroll));
        menu.appendChild(createButton(common.button_label.scheduled, 'scheduled', browse, scroll));
        menu.appendChild(createButton(common.button_label.notification_on, 'notification_on', browse, scroll));
        menu.appendChild(createButton(common.button_label.notification_off, 'notification_off', browse, scroll));

        const select = createSelect(browse, scroll);
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

        const progress = createSelectProgress(browse, scroll);
        progress.appendChild(createOptionProgress(common.button_label.progress_placeholder));
        progress.appendChild(createOptionProgress(common.button_label.progress_all, 'progress_all'));
        progress.appendChild(createOptionProgress(common.button_label.progress_unwatched, 'progress_unwatched'));
        progress.appendChild(createOptionProgress(common.button_label.progress_watched, 'progress_watched'));
        menu.appendChild(progress);

        menu.appendChild(createButtonChannels(common.button_label.all, 'all', browse, scroll));
        menu.appendChild(createButtonChannels(common.button_label.channels_all, 'channels_all', browse, scroll));
        menu.appendChild(createButtonChannels(common.button_label.channels_personalized, 'channels_personalized', browse, scroll));
        menu.appendChild(createButtonChannels(common.button_label.channels_none, 'channels_none', browse, scroll));

        const input = createQueryInput(menu, browse);
        menu.appendChild(createQueryInputArea(input, browse, scroll));
        menu.appendChild(createSearchButton(input, browse, scroll));

        menu.addEventListener('submit', e => {
            e.preventDefault();
            updateQuery(browse, input.value);
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });

        return menu;
    }

    function createNodeForCalc(menu) {
        const nodeForCalc = menu.cloneNode(true);
        nodeForCalc.classList.add('filter-forCalc');
        return nodeForCalc;
    }

    function createButton(text, mode, browse, scroll) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.setAttribute('translate', 'no');
        span.classList.add('filter-button', 'filter-button-subscriptions', mode);
        span.innerHTML = text;
        span.addEventListener('click', () => {
            changeMode(mode, multiselection, span.classList.contains('selected'), browse);
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });
        return span;
    }

    function createButtonChannels(text, mode, browse, scroll) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.setAttribute('translate', 'no');
        span.classList.add('filter-button', 'filter-button-channels', mode);
        span.innerHTML = text;
        span.addEventListener('click', () => {
            changeMode(mode, multiselection, span.classList.contains('selected'), browse);
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });
        return span;
    }

    function createSelect(browse, scroll) {
        const select = document.createElement('select');
        select.style.display = 'none';
        select.classList.add('filter-menu', 'filter-menu-subscriptions');
        select.addEventListener('change', () => {
            changeMode(select.value, multiselection, select.querySelector('option.selected.' + select.value), browse);
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });
        return select;
    }

    function createOption(text, mode) {
        const option = document.createElement('option');
        option.setAttribute('translate', 'no');
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

    function createSelectProgress(browse, scroll) {
        const select = document.createElement('select');
        select.style.display = 'none';
        select.classList.add('filter-menu', 'filter-menu-progress');
        select.addEventListener('change', () => {
            changeModeProgress(select.value, browse);
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });
        return select;
    }

    function createOptionProgress(text, mode) {
        const option = document.createElement('option');
        option.setAttribute('translate', 'no');
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

    function createQueryInputArea(input, browse, scroll) {
        const inputArea = document.createElement('span');
        inputArea.style.display = 'none';
        inputArea.classList.add('filter-query', 'area');
        inputArea.appendChild(input);
        inputArea.appendChild(createClearButton(input, browse, scroll));
        return inputArea;
    }

    function createQueryInput(menu, browse) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Subscription Feed Filter');
        input.setAttribute('title', '" "  PHRASE search operator.   e.g. "Phrase including spaces"\n |    OR search operator.           e.g. Phrase1 | Phrase2\n -    NOT search operator.        e.g. -Phrase\n ( )  Grouping operator.            e.g. Phrase1 (Phrase2 | Phrase3)');
        input.setAttribute('translate', 'no');
        input.id = 'filter-query';
        input.value = getActiveQuery(browse);
        input.addEventListener('change', e => {
            input.blur();
            menu.requestSubmit();
        });

        attachSuggest(input);

        return input;
    }

    function createClearButton(input, browse, scroll) {
        const span = document.createElement('span');
        span.classList.add('filter-clear');
        span.innerHTML = common.button_label.clear;
        span.addEventListener('click', () => {
            input.value = '';
            updateQuery(browse, '');
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });
        return span;
    }

    function createSearchButton(input, browse, scroll) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-query', 'search');
        span.innerHTML = common.button_label.search;
        span.addEventListener('click', () => {
            updateQuery(browse, input.value);
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });
        return span;
    }

    function insertPopupMenu(node) {
        // Save to playlist
        for (const playlists of node.querySelectorAll('yt-list-view-model')) {
            if (playlists.querySelector('toggleable-list-item-view-model')) {
                const parent = node.querySelector('div.ytContextualSheetLayoutHeaderContainer');
                if (parent) {
                    const existsMenu = parent.querySelector('form.filter-popup.filter-add-playlist');
                    if (existsMenu !== popupMenu.get(playlists)) {
                        if (!existsMenu) {
                            const menu = createPopupMenu([playlists], undefined, 'filter-add-playlist', keyword_add_playlist);
                            parent.append(menu);
                        } else {
                            existsMenu.containers.push(playlists);
                            existsMenu.clearInput();
                            popupMenu.set(playlists, menu);
                        }
                        updatePopupVisibility([playlists]);
                    } else {
                        existsMenu.clearInput();
                        updatePopupVisibility([playlists]);
                        existsMenu.style.display = display(keyword_add_playlist);
                    }
                }
            } else { // If a previously created "Save to playlist" dropdown menu was being reused as a different menu
                const parent = node.querySelector('div.ytContextualSheetLayoutHeaderContainer');
                if (parent) {
                    const existsMenu = parent.querySelector('form.filter-popup.filter-add-playlist');
                    if (existsMenu) {
                        existsMenu.style.display = 'none';
                    }
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

        menu.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            input.focus();
        });

        menu.addEventListener('submit', e => {
            e.preventDefault();
            updatePopupQuery(menu.containers, input.value);
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

        menu.clearInput = () => {
            input.value = '';
            updatePopupQuery(menu.containers, '');
        };

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

        attachSuggest(input);

        return input;
    }

    function createPopupClearButton(input, containers) {
        const span = document.createElement('span');
        span.classList.add('filter-clear');
        span.innerHTML = common.button_label.clear;
        span.addEventListener('click', () => {
            input.value = '';
            updatePopupQuery(containers, '');
            updatePopupVisibility(containers);
        });
        return span;
    }

    function createPopupSearchButton(input, containers) {
        const span = document.createElement('span');
        span.classList.add('filter-query', 'search');
        span.innerHTML = common.button_label.search;
        span.addEventListener('click', () => {
            updatePopupQuery(containers, input.value);
            updatePopupVisibility(containers);
        });
        return span;
    }

    function get_url_param_filter_mode() {
        if (url_param_filter_mode_enabled) {
            const url = new URL(location);
            const filter_mode = url.searchParams.get('filter-mode');
            if (filter_mode) {
                return filter_mode.split(',');
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    function changeMode(mode, multi, sub, browse) {
        const modes = multi ? getActiveMode() : new Set();

        if (!mode) {
            const url_param_filter_mode = get_url_param_filter_mode();
            if (url_param_filter_mode) {
                for (const m of url_param_filter_mode) {
                    modes.add(m);
                }
            }

            if (modes.size === 0) {
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

    function get_url_param_filter_mode_progress() {
        if (url_param_filter_mode_enabled) {
            const url = new URL(location);
            const filter_mode = url.searchParams.get('filter-mode-progress');
            if (filter_mode) {
                return filter_mode.split(',');
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    function changeModeProgress(mode, browse) {
        const modes = new Set();

        if (!mode) {
            const url_param_filter_mode = get_url_param_filter_mode_progress();
            if (url_param_filter_mode) {
                for (const m of url_param_filter_mode) {
                    modes.add(m);
                }
            }

            if (modes.size === 0) {
                if (common.isSubscriptions(location.href)) {
                    if (default_tab.progress_unwatched) modes.add('progress_unwatched');
                    if (default_tab.progress_watched) modes.add('progress_watched');
                    if (modes.size === 0) modes.add('progress_all');
                } else {
                    modes.add('progress_all');
                }
            }
        } else {
            if (mode === 'progress_all') {
                modes.clear();
            } else {
                modes.delete('progress_all');
            }
            modes.add(mode);
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
            });
        }

        browse.querySelectorAll('option.filter-button-progress.selected').forEach(n => n.selected = true);
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
        const mode = get_cache_mode();
        if (mode) {
            return mode;
        } else {
            return new Set();
        }
    }

    function getActiveModeProgress() {
        const mode_progress = get_cache_mode_progress();
        if (mode_progress) {
            return mode_progress;
        } else {
            return new Set();
        }
    }

    function setActiveMode(mode, browse) {
        set_cache_mode(mode);
        browse.setAttribute('filter-mode', [...mode].join(' '));

        if (url_param_filter_mode_enabled && isUrlParamsTarget()) {
            const url = new URL(location);
            url.searchParams.set('app', url.searchParams.get('app') ?? 'desktop');
            url.searchParams.set('filter-mode', [...mode].join(','));
            history.replaceState({}, '', url);
        }
    }

    function setActiveModeProgress(mode_progress, browse) {
        set_cache_mode_progress(mode_progress);
        browse.setAttribute('filter-mode-progress', [...mode_progress].join(' '));

        if (url_param_filter_mode_enabled && isUrlParamsTarget()) {
            const url = new URL(location);
            url.searchParams.set('app', url.searchParams.get('app') ?? 'desktop');
            url.searchParams.set('filter-mode-progress', [...mode_progress].join(','));
            history.replaceState({}, '', url);
        }
    }

    function getActiveQuery(browse) {
        const query = get_cache_query();
        if (query !== undefined) {
            return query;
        } else if (common.isSubscriptions(location.href)) {
            set_cache_query(default_keyword);
            browse.setAttribute('filter-query', default_keyword);
            return default_keyword;
        } else {
            set_cache_query('');
            browse.setAttribute('filter-query', '');
            return '';
        }
    }

    function createQueryEvaluator(query) {
        function tokenize(input) {
            const tokens = [];
            const regex = /\(|\)|\||-?"(?:\\"|[^"])*"|-?[^\s()|]+/g;
            let match;
            while ((match = regex?.exec(input)) !== null) {
                tokens?.push(match[0]);
            }
            return tokens;
        }

        function parse(tokens) {
            let pos = 0;

            function peek() {
                return tokens[pos];
            }

            function consume(expected) {
                const token = tokens[pos];
                if (expected && token !== expected) {
                    return '';
                }
                pos++;
                return token;
            }

            function parseExpression() {
                let node = parseAnd();
                while (peek() === '|') {
                    consume('|');
                    node = { type: 'or', left: node, right: parseAnd() };
                }
                return node;
            }

            function parseAnd() {
                let node = parseNot();
                while (peek() && peek() !== ')' && peek() !== '|') {
                    node = { type: 'and', left: node, right: parseNot() };
                }
                return node;
            }

            function parseNot() {
                if (peek() && peek().startsWith('-')) {
                    let token = consume();
                    if (token === '-') {
                        const expr = parsePrimary();
                        return { type: 'not', expr };
                    } else if (token?.startsWith('-"') && token?.endsWith('"')) {
                        return {
                            type: 'not',
                            expr: { type: 'keyword', value: token?.slice(2, -1) }
                        };
                    } else {
                        return {
                            type: 'not',
                            expr: { type: 'keyword', value: token?.slice(1) }
                        };
                    }
                }
                return parsePrimary();
            }

            function parsePrimary() {
                if (peek() === '(') {
                    consume('(');
                    const expr = parseExpression();
                    consume(')');
                    return expr;
                }
                const token = consume();
                if (token?.startsWith('"') && token?.endsWith('"')) {
                    return { type: 'keyword', value: token?.slice(1, -1) };
                }
                return { type: 'keyword', value: token };
            }

            const ast = parseExpression();
            if (pos < tokens?.length) {
                return '';
            }
            return ast;
        }

        function compile(ast) {
            switch (ast?.type) {
                case 'keyword':
                    return text => text?.includes(ast?.value);
                case 'not': {
                    const fn = compile(ast?.expr);
                    return text => !fn(text);
                }
                case 'and': {
                    const left = compile(ast?.left);
                    const right = compile(ast?.right);
                    return text => left(text) && right(text);
                }
                case 'or': {
                    const left = compile(ast?.left);
                    const right = compile(ast?.right);
                    return text => left(text) || right(text);
                }
            }
        }

        const tokens = tokenize(query);
        const ast = parse(tokens);
        return compile(ast);
    }

    function onResize() {
        if (isMenuTarget()) {
            if (responsive) {
                for (const form of app.querySelectorAll('ytd-browse[role="main"] form.filter-menu:not(.filter-forCalc), ytd-watch-flexy[role="main"] form.filter-menu:not(.filter-forCalc)')) {
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
                const form = app.querySelector('ytd-watch-flexy[role="main"] form.filter-menu:not(.filter-forCalc)');
                if (form) { // video page filter must be responsive
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
                } else {
                    document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
                    document.documentElement.style.setProperty('--filter-menu-display', 'none');
                }
            }
        }
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

    function cache_key(url) {
        const u = new URL(url);
        const pathname = u.pathname;

        if (common.isSubscriptions(pathname)) {
            return 'subscriptions';
        } else if (common.isShorts(pathname)) {
            return 'shorts';
        } else if (common.isHistory(pathname)) {
            return 'history';
        } else if (common.isPlaylists(pathname)) {
            return 'playlists';
        } else if (common.isPlaylist(pathname)) {
            return pathname;
        } else if (common.isChannels(pathname)) {
            return 'channels';
        } else if (common.isChannel(pathname)) {
            return pathname;
        } else if (common.isHashTag(pathname)) {
            return pathname;
        } else if (common.isHome(pathname)) {
            return 'top';
        } else if (common.isVideoPlayer(pathname)) {
            return 'video_player';
        } else {
            return pathname;
        }
    }

    function get_cache_mode() {
        return active.mode.get(cache_key(location.href));
    }

    function set_cache_mode(mode) {
        active.mode.set(cache_key(location.href), mode);
    }

    function get_cache_mode_progress() {
        return active.mode_progress.get(cache_key(location.href));
    }

    function set_cache_mode_progress(mode_progress) {
        active.mode_progress.set(cache_key(location.href), mode_progress);
    }

    function get_cache_query() {
        return active.query.get(cache_key(location.href));
    }

    function set_cache_query(query) {
        active.query.set(cache_key(location.href), query);
    }

    function set_frosted_glass_mode() {
        document.getElementById('frosted-glass').classList.replace('without-chipbar', 'with-chipbar');
        document.getElementById('masthead').setAttribute('frosted-glass-mode', 'with-chipbar');
    }

    function reset_frosted_glass_mode() {
        document.getElementById('frosted-glass').classList.replace('with-chipbar', 'without-chipbar');
        document.getElementById('masthead').setAttribute('frosted-glass-mode', 'without-chipbar');
    }

    function attachSuggest(input) {
        let box = null;

        function createBox() {
            box = document.createElement('ul');
            box.style.position = 'fixed';
            box.style.zIndex = '3000';
            box.style.listStyle = 'none';
            box.style.margin = '0';
            box.style.padding = '4px 0';
            box.style.border = '1px solid #ccc';
            box.style.background = '#fff';
            box.style.fontSize = '14px';
            box.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
            input.parentNode.appendChild(box);
        }

        function positionBox() {
            const parent_rect = input.getBoundingClientRect();
            const box_rect = box.getBoundingClientRect();
            box.style.transform = `translate(0, ${parent_rect.height + box_rect.height / 2}px)`;
            box.style.minWidth = `${parent_rect.width + 20}px`;
        }

        function show() {
            if (!suggest) {
                input.setAttribute('autocomplete', 'on');
                return;
            }

            input.setAttribute('autocomplete', 'off');

            if (!suggestions || suggestions.length === 0) return;
            if (!box) createBox();
            box.innerHTML = '';

            suggestions.forEach(text => {
                const li = document.createElement('li');
                li.textContent = text;
                li.style.padding = '4px 8px';
                li.style.cursor = 'pointer';

                li.addEventListener('mousedown', e => {
                    e.preventDefault();
                    input.value = text;
                    input.dispatchEvent(new Event('change'));
                    hide();
                });

                li.addEventListener('mouseenter', () => {
                    li.style.background = '#ccc';
                });

                li.addEventListener('mouseleave', () => {
                    li.style.background = '';
                });

                box.appendChild(li);
            });

            positionBox();
            box.style.visibility = 'visible';
        }

        function hide() {
            if (box) box.style.visibility = 'hidden';
        }

        input.addEventListener('focus', () => {
            if (input.value === '') show();
        });

        input.addEventListener('input', () => {
            hide();
        });

        input.addEventListener('blur', () => {
            hide();
        });
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
    };

    let keyword = common.default_keyword;
    let default_keyword = undefined;

    let suggest;
    let suggestions = undefined;

    let multiselection = common.default_multiselection;
    let responsive = common.default_responsive;
    let limit = common.defaultLimit;
    let keyword_add_playlist = common.default_keyword_add_playlist;
    let keyword_sidebar_channels = false; // anti-flicker
    let keyword_notification = common.default_keyword_notification;

    let url_param_filter_mode_enabled = common.default_url_param_filter_mode_enabled;

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

    document.addEventListener('yt-action', () => {
        onResize();
    });

    document.addEventListener('yt-navigate-finish', () => {
        onViewChanged();
    });

    document.addEventListener('yt-service-request-completed', () => {
        onViewChanged();
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        onViewChanged();
    });

    new MutationObserver((mutations, observer) => {
        for (const m of mutations) {
            updateVisibility(m.target, true);
            onAppNodeLoaded(m.target);
        }
    }).observe(app, { subtree: true, childList: true });

    const popup_detect_interval = setInterval(() => {
        const popup = app?.querySelector('ytd-popup-container');
        if (!popup) {
            return;
        }

        clearInterval(popup_detect_interval);

        new MutationObserver((mutations, observer) => {
            for (const m of mutations) {
                const node = m.target;
                switch (node.nodeName) {
                    case 'TP-YT-IRON-DROPDOWN':
                        insertPopupMenu(node);
                        break;
                }
            }
        }).observe(popup, { subtree: true, attributeFilter: ['style'] });
    }, 500);
}