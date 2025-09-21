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
            } else if (common.isLibrary(location.href)) {
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
            } else if (common.isHashTag(location.href)) {
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
            } else if (common.isVideoPlayer(location.href)) {
                display_query(browse, 'span.filter-button-subscriptions.all', '');
                display_query(browse, 'span.filter-button-subscriptions.live', display(live));
                display_query(browse, 'span.filter-button-subscriptions.streamed', display(streamed));
                display_query(browse, 'span.filter-button-subscriptions.video', display(video));
                display_query(browse, 'span.filter-button-subscriptions.short', display(short));
                display_query(browse, 'span.filter-button-subscriptions.scheduled', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_on', 'none');
                display_query(browse, 'span.filter-button-subscriptions.notification_off', 'none');

                display_query(browse, 'select.filter-menu', '');
                display_query(browse, 'option.filter-button-subscriptions.all', '');
                display_query(browse, 'option.filter-button-subscriptions.live', display(live));
                display_query(browse, 'option.filter-button-subscriptions.streamed', display(streamed));
                display_query(browse, 'option.filter-button-subscriptions.video', display(video));
                display_query(browse, 'option.filter-button-subscriptions.short', display(short));
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
                // Unknown location.href
                browse.setAttribute('filter-menu', 'false');
            }

            onResize();

            changeMode(getActiveMode().values().next().value, multiselection, false, browse);
            changeModeProgress(getActiveModeProgress().values().next().value, browse);
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
            || common.isTop(location.href)
            || common.isShorts(location.href)
            || common.isLibrary(location.href)
            || common.isHistory(location.href)
            || common.isPlaylists(location.href)
            || common.isPlaylist(location.href)
            || common.isHashTag(location.href)
            || common.isChannel(location.href)
            || common.isChannels(location.href)
            || common.isVideoPlayer(location.href)
            ;
    }

    function isPositionFixedTarget() {
        return common.isSubscriptions(location.href)
            // || common.isTop(location.href)
            || common.isShorts(location.href)
            || common.isLibrary(location.href)
            || common.isHistory(location.href)
            || common.isPlaylists(location.href)
            || common.isPlaylist(location.href)
            // || common.isHashTag(location.href)
            // || common.isChannel(location.href)
            || common.isChannels(location.href)
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
        if (common.isSubscriptions(location.href)) {
            node.querySelectorAll('ytd-rich-item-renderer').forEach(n => updateTargetVisibility(n, matchSubscriptionsRichItemRendererTextContent, classifySubscriptionsRichItemRendererModeStatus, classifySubscriptionsRichItemRendererProgressStatus));
        } else if (common.isTop(location.href)) {
            node.querySelectorAll('ytd-rich-item-renderer').forEach(n => updateTargetVisibility(n, matchTopRichItemRendererTextContent, classifyTopRichItemRendererModeStatus, classifyTopRichItemRendererProgressStatus));
            node.querySelectorAll('ytd-rich-grid-media').forEach(n => updateTargetVisibility(n, matchTopRichGridMediaTextContent, classifyTopRichGridMediaModeStatus, classifyTopRichGridMediaProgressStatus));
        } else if (common.isShorts(location.href)) {
            node.querySelectorAll('ytd-rich-item-renderer').forEach(n => updateTargetVisibility(n, matchShortsRichItemRendererTextContent, classifyShortsRichItemRendererModeStatus, classifyShortsRichItemRendererProgressStatus));
        } else if (common.isLibrary(location.href)) {
            node.querySelectorAll('ytd-rich-item-renderer').forEach(n => updateTargetVisibility(n, matchLibraryRichItemRendererTextContent, classifyLibraryRichItemRendererModeStatus, classifyLibraryRichItemRendererProgressStatus));
        } else if (common.isHistory(location.href)) {
            node.querySelectorAll('yt-lockup-view-model').forEach(n => updateTargetVisibility(n, matchHistoryLockupViewModelTextContent, classifyHistoryLockupViewModelModeStatus, classifyHistoryLockupViewModelProgressStatus));
            node.querySelectorAll('ytm-shorts-lockup-view-model-v2').forEach(n => updateTargetVisibility(n, matchHistoryShortsLockupViewModelV2TextContent, classifyHistoryShortsLockupViewModelV2ModeStatus, classifyHistoryShortsLockupViewModelV2ProgressStatus));
            node.querySelectorAll('ytd-video-renderer').forEach(n => updateTargetVisibility(n, matchHistoryVideoRendererTextContent, classifyHistoryVideoRendererModeStatus, classifyHistoryVideoRendererProgressStatus));
        } else if (common.isPlaylists(location.href)) {
            node.querySelectorAll('ytd-rich-item-renderer').forEach(n => updateTargetVisibility(n, matchPlaylistsRichItemRendererTextContent, classifyPlaylistsRichItemRendererModeStatus, classifyPlaylistsRichItemRendererProgressStatus));
        } else if (common.isPlaylist(location.href)) {
            node.querySelectorAll('ytd-playlist-video-renderer').forEach(n => updateTargetVisibility(n, matchPlaylistVideoRendererTextContent, classifyPlaylistVideoRendererModeStatus, classifyPlaylistVideoRendererProgressStatus));
        } else if (common.isHashTag(location.href)) {
            node.querySelectorAll('ytd-rich-item-renderer').forEach(n => updateTargetVisibility(n, matchHashTagRichItemRendererTextContent, classifyHashTagRichItemRendererModeStatus, classifyHashTagRichItemRendererProgressStatus));
        } else if (common.isChannel(location.href)) {
            node.querySelectorAll('ytd-channel-featured-content-renderer').forEach(n => updateTargetVisibility(n, matchChannelChannelFeaturedContentRendererTextContent, classifyChannelChannelFeaturedContentRendererModeStatus, classifyChannelChannelFeaturedContentRendererProgressStatus));
            node.querySelectorAll('ytd-grid-video-renderer').forEach(n => updateTargetVisibility(n, matchChannelGridVideoRendererTextContent, classifyChannelGridVideoRendererModeStatus, classifyChannelGridVideoRendererProgressStatus));
            node.querySelectorAll('ytd-grid-channel-renderer').forEach(n => updateTargetVisibility(n, matchChannelGridChannelRendererTextContent, classifyChannelGridChannelRendererModeStatus, classifyChannelGridChannelRendererProgressStatus));
            node.querySelectorAll('ytd-post-renderer').forEach(n => updateTargetVisibility(n, matchChannelPostRendererTextContent, classifyChannelPostRendererModeStatus, classifyChannelPostRendererProgressStatus));
            node.querySelectorAll('ytm-shorts-lockup-view-model-v2').forEach(n => updateTargetVisibility(n, matchChannelShortsLockupViewModelV2TextContent, classifyChannelShortsLockupViewModelV2ModeStatus, classifyChannelShortsLockupViewModelV2ProgressStatus));
            node.querySelectorAll('ytd-rich-item-renderer').forEach(n => updateTargetVisibility(n, matchChannelRichItemRendererTextContent, classifyChannelRichItemRendererModeStatus, classifyChannelRichItemRendererProgressStatus));
            node.querySelectorAll('yt-lockup-view-model').forEach(n => updateTargetVisibility(n, matchChannelLockupViewModelTextContent, classifyChannelLockupViewModelModeStatus, classifyChannelLockupViewModelProgressStatus));
            node.querySelectorAll('ytd-backstage-post-thread-renderer').forEach(n => updateTargetVisibility(n, matchChannelBackstagePostThreadRendererTextContent, classifyChannelBackstagePostThreadRendererModeStatus, classifyChannelBackstagePostThreadRendererProgressStatus));
        } else if (common.isChannels(location.href)) {
            node.querySelectorAll('ytd-channel-renderer').forEach(n => updateTargetVisibility(n, matchChannelsChannelRendererTextContent, classifyChannelsChannelRendererModeStatus, classifyChannelsChannelRendererProgressStatus));
        } else if (common.isVideoPlayer(location.href)) {
            node.querySelectorAll('yt-lockup-view-model').forEach(n => updateTargetVisibility(n, matchVideoPlayerLockupViewModelTextContent, classifyVideoPlayerLockupViewModelModeStatus, classifyVideoPlayerLockupViewModelProgressStatus));
            node.querySelectorAll('ytm-shorts-lockup-view-model-v2').forEach(n => updateTargetVisibility(n, matchVideoPlayerShortsLockupViewModelV2TextContent, classifyVideoPlayerShortsLockupViewModelV2ModeStatus, classifyVideoPlayerShortsLockupViewModelV2ProgressStatus));
        }
    }

    function onSubscriptionsNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchSubscriptionsRichItemRendererTextContent, classifySubscriptionsRichItemRendererModeStatus, classifySubscriptionsRichItemRendererProgressStatus);
                break;
            case 'YTD-BROWSE':
                insertSubscriptionsMenu(node);
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

    function insertSubscriptionsMenu(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            browse.insertBefore(createSpacer('browse'), browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }
    }

    function matchSubscriptionsRichItemRendererTextContent(node) {
        const title = node.querySelector('div#meta a#video-title-link') ?? node.querySelector('yt-lockup-metadata-view-model div:nth-child(2) h3');
        if (title) {
            return matchQuery(title.textContent);
        }

        const shorts_title = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (shorts_title) {
            return matchQuery(shorts_title.textContent);
        }

        // default: visible
        return true;
    }

    function classifySubscriptionsRichItemRendererModeStatus(node) {
        const status = new Set();

        const metadata = node.querySelector('div#metadata-line') ?? node.querySelector('yt-content-metadata-view-model div:nth-child(2)');
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

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div:nth-child(2)');
        if (badge) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        const shorts = node.querySelector('ytm-shorts-lockup-view-model-v2');
        if (shorts) {
            status.add('short');
        }

        if (status.size === 0) {
            // Member-only Video
            status.add('video');
        }

        return status;
    }

    function classifySubscriptionsRichItemRendererProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress') ?? node.querySelector('yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onTopNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchTopRichItemRendererTextContent, classifyTopRichItemRendererModeStatus, classifyTopRichItemRendererProgressStatus);
                break;
            case 'YT-LOCKUP-VIEW-MODEL':
                {
                    const n = searchParentNode(node, 'YTD-RICH-ITEM-RENDERER');
                    if (n) {
                        updateTargetVisibility(n, matchTopRichItemRendererTextContent, classifyTopRichItemRendererModeStatus, classifyTopRichItemRendererProgressStatus);
                    }
                }
                break;
            case 'YTD-RICH-GRID-MEDIA':
                updateTargetVisibility(node, matchTopRichGridMediaTextContent, classifyTopRichGridMediaModeStatus, classifyTopRichGridMediaProgressStatus);
                break;
            case 'YTD-FEED-FILTER-CHIP-BAR-RENDERER':
                insertTopMenu(node);
                break;
        }
    }

    function insertTopMenu(node) {
        const browse = searchParentNode(node, 'YTD-BROWSE');
        if (browse) {
            if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
                const referenceNode = browse.querySelector('div#scroll-container');
                if (referenceNode) {
                    const menu = createMenu(browse, true);
                    referenceNode.insertBefore(menu, referenceNode.firstChild);

                    const calc = createNodeForCalc(menu, browse);
                    referenceNode.insertBefore(calc, referenceNode.firstChild);

                    const spacerReferenceNode = browse.querySelector('div#contents');
                    if (spacerReferenceNode) {
                        spacerReferenceNode.parentNode.insertBefore(createSpacer('browse'), spacerReferenceNode);
                    } else {
                        // spacer referenceNode not found
                    }

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

    function matchTopRichItemRendererTextContent(node) {
        const metadata = node.querySelector('yt-lockup-metadata-view-model div:nth-child(2) h3');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        const shorts_metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (shorts_metadata) {
            return matchQuery(shorts_metadata.textContent);
        }

        const collection = node.querySelector('yt-collection-thumbnail-view-model');
        if (collection) {
            const collection_metadata = node.querySelector('yt-lockup-metadata-view-model');
            if (collection_metadata) {
                return matchQuery(collection_metadata.textContent);
            }
        }

        // default: visible
        return true;
    }

    function classifyTopRichItemRendererModeStatus(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model div:nth-child(2)');
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

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div:nth-child(2)');
        if (badge) {
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

        if (status.size === 0) {
            // Member-only Video
            status.add('video');
        }

        return status;
    }

    function classifyTopRichItemRendererProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchTopRichGridMediaTextContent(node) {
        const title = node.querySelector('a#video-title-link');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyTopRichGridMediaModeStatus(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model div:nth-child(2)');
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

        const shorts = node.querySelector('ytm-shorts-lockup-view-model-v2');
        if (shorts) {
            status.add('short');
        }

        const collection = node.querySelector('yt-collection-thumbnail-view-model');
        if (collection) {
            status.add('collection');
        }

        if (status.size === 0) {
            // Member-only Video
            status.add('video');
        }

        return status;
    }

    function classifyTopRichGridMediaProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onShortsNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchShortsRichItemRendererTextContent, classifyShortsRichItemRendererModeStatus, classifyShortsRichItemRendererProgressStatus);
                break;
            case 'YTD-BROWSE':
                insertShortsMenu(node);
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

    function insertShortsMenu(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            browse.insertBefore(createSpacer('browse'), browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }
    }

    function matchShortsRichItemRendererTextContent(node) {
        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.getAttribute('aria-label'));
        }

        // default: visible
        return true;
    }

    function classifyShortsRichItemRendererModeStatus(node) {
        return undefined;
    }

    function classifyShortsRichItemRendererProgressStatus(node) {
        return undefined;
    }

    function onLibraryNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchLibraryRichItemRendererTextContent, classifyLibraryRichItemRendererModeStatus, classifyLibraryRichItemRendererProgressStatus);
                break;
            case 'YTD-BROWSE':
                insertLibraryMenu(node);
                break;
        }
    }

    function insertLibraryMenu(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            browse.insertBefore(createSpacer('browse'), browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }
    }

    function matchLibraryRichItemRendererTextContent(node) {
        const metadata = node.querySelector('yt-lockup-metadata-view-model div:nth-child(2) h3');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        const shorts_metadata = node.querySelector('ytd-rich-grid-media div#meta h3');
        if (shorts_metadata) {
            return matchQuery(shorts_metadata.textContent);
        }

        const collection = node.querySelector('yt-collection-thumbnail-view-model');
        if (collection) {
            const collection_metadata = node.querySelector('yt-lockup-metadata-view-model');
            if (collection_metadata) {
                return matchQuery(collection_metadata.textContent);
            }
        }

        // default: visible
        return true;
    }

    function classifyLibraryRichItemRendererModeStatus(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model div:nth-child(2)');
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

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div:nth-child(2)');
        if (badge) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        const shorts = node.querySelector('badge-shape:has(path[d="m17.77 10.32-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"])');
        if (shorts) {
            status.add('short');
        }

        const collection = node.querySelector('yt-collection-thumbnail-view-model');
        if (collection) {
            status.add('collection');
        }

        return status;
    }

    function classifyLibraryRichItemRendererProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress, yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onHistoryNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YT-LOCKUP-VIEW-MODEL':
                updateTargetVisibility(node, matchHistoryLockupViewModelTextContent, classifyHistoryLockupViewModelModeStatus, classifyHistoryLockupViewModelProgressStatus);
                break;
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
                updateTargetVisibility(node, matchHistoryShortsLockupViewModelV2TextContent, classifyHistoryShortsLockupViewModelV2ModeStatus, classifyHistoryShortsLockupViewModelV2ProgressStatus);
                break;
            case 'YTD-VIDEO-RENDERER':
                updateTargetVisibility(node, matchHistoryVideoRendererTextContent, classifyHistoryVideoRendererModeStatus, classifyHistoryVideoRendererProgressStatus);
                break;
            case 'YTD-BROWSE':
                insertHistoryMenu(node);
                break;
        }
    }

    function insertHistoryMenu(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            browse.insertBefore(createSpacer('browse'), browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }
    }

    function matchHistoryLockupViewModelTextContent(node) {
        const metadata = node.querySelector('yt-lockup-metadata-view-model div:nth-child(2) h3');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        const shorts_metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (shorts_metadata) {
            return matchQuery(shorts_metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyHistoryLockupViewModelModeStatus(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model div:nth-child(1) span:nth-child(3)');
        if (metadata) {
            const t = metadata.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            }
        }

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div:nth-child(2)');
        if (badge) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        if (status.size === 0) {
            // Member-only Video
            status.add('video');
        }

        return status;
    }

    function classifyHistoryLockupViewModelProgressStatus(node) {
        return undefined;
    }

    function matchHistoryShortsLockupViewModelV2TextContent(node) {
        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyHistoryShortsLockupViewModelV2ModeStatus(node) {
        const status = new Set();

        status.add('short');

        return status;
    }

    function classifyHistoryShortsLockupViewModelV2ProgressStatus(node) {
        return undefined;
    }

    function matchHistoryVideoRendererTextContent(node) {
        const title = node.querySelector('h3.title-and-badge');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyHistoryVideoRendererModeStatus(node) {
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

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div:nth-child(2)');
        if (badge) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        if (status.size === 0) {
            // Member-only Video
            status.add('video');
        }

        return status;
    }

    function classifyHistoryVideoRendererProgressStatus(node) {
        return undefined;
    }

    function onPlaylistsNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchPlaylistsRichItemRendererTextContent, classifyPlaylistsRichItemRendererModeStatus, classifyPlaylistsRichItemRendererProgressStatus);
                break;
            case 'YTD-BROWSE':
                insertPlaylistsMenu(node);
                break;
        }
    }

    function insertPlaylistsMenu(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            browse.insertBefore(createSpacer('browse'), browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }
    }

    function matchPlaylistsRichItemRendererTextContent(node) {
        const text_node = node.querySelector('yt-lockup-metadata-view-model div:nth-child(1) h3');
        if (text_node) {
            return matchQuery(text_node.textContent);
        }

        // default: visible
        return true;
    }

    function classifyPlaylistsRichItemRendererModeStatus(node) {
        return undefined;
    }

    function classifyPlaylistsRichItemRendererProgressStatus(node) {
        return undefined;
    }

    function onPlaylistNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
                updateTargetVisibility(node, matchPlaylistVideoRendererTextContent, classifyPlaylistVideoRendererModeStatus, classifyPlaylistVideoRendererProgressStatus);
                break;
            case 'YTD-THUMBNAIL-OVERLAY-RESUME-PLAYBACK-RENDERER':
                {
                    const n = searchParentNode(node, 'YTD-PLAYLIST-VIDEO-RENDERER');
                    if (n) {
                        updateTargetVisibility(n, matchPlaylistVideoRendererTextContent, classifyPlaylistVideoRendererModeStatus, classifyPlaylistVideoRendererProgressStatus);
                    }
                }
                break;
            case 'YTD-BROWSE':
                insertPlaylistMenu(node);
                break;
        }
    }

    function insertPlaylistMenu(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            browse.insertBefore(createSpacer('browse'), browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }
    }

    function matchPlaylistVideoRendererTextContent(node) {
        const title = node.querySelector('a#video-title');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyPlaylistVideoRendererModeStatus(node) {
        const status = new Set();

        const info = node.querySelector('div#byline-container yt-formatted-string#video-info');
        if (info) {
            const t = info.textContent;
            if (lang.isLive_metadata(t)) {
                status.add('live');
            } else if (lang.isStreamed_metadata(t)) {
                status.add('streamed');
            } else if (lang.isVideo_metadata(t)) {
                status.add('video');
            }
        }

        const metadata_line = node.querySelector('div#metadata-line');
        if (metadata_line) {
            const t = metadata_line.textContent;
            if (lang.isScheduled_metadata(t)) {
                status.add('scheduled');
            }
        }

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div:nth-child(2)');
        if (badge) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        return status;
    }

    function classifyPlaylistVideoRendererProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onHashTagNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchHashTagRichItemRendererTextContent, classifyHashTagRichItemRendererModeStatus, classifyHashTagRichItemRendererProgressStatus);
                break;
            case 'YTD-BROWSE':
                insertHashTagMenu(node);
                break;
            case 'TP-YT-APP-HEADER':
                {
                    const n = searchParentNode(node, 'YTD-BROWSE');
                    if (n) {
                        insertHashTagMenu(n);
                    }
                }
                break;
        }
    }

    function insertHashTagMenu(browse) {
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

    function matchHashTagRichItemRendererTextContent(node) {
        const title = node.querySelector('yt-formatted-string#video-title');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyHashTagRichItemRendererModeStatus(node) {
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

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div:nth-child(2)');
        if (badge) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        return status;
    }

    function classifyHashTagRichItemRendererProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function onChannelNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-CHANNEL-FEATURED-CONTENT-RENDERER':
                updateTargetVisibility(node, matchChannelChannelFeaturedContentRendererTextContent, classifyChannelChannelFeaturedContentRendererModeStatus, classifyChannelChannelFeaturedContentRendererProgressStatus);
                break;
            case 'YTD-GRID-VIDEO-RENDERER':
                updateTargetVisibility(node, matchChannelGridVideoRendererTextContent, classifyChannelGridVideoRendererModeStatus, classifyChannelGridVideoRendererProgressStatus);
                break;
            case 'YTD-GRID-CHANNEL-RENDERER':
                updateTargetVisibility(node, matchChannelGridChannelRendererTextContent, classifyChannelGridChannelRendererModeStatus, classifyChannelGridChannelRendererProgressStatus);
                break;
            case 'YTD-POST-RENDERER':
                updateTargetVisibility(node, matchChannelPostRendererTextContent, classifyChannelPostRendererModeStatus, classifyChannelPostRendererProgressStatus);
                break;
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
                updateTargetVisibility(node, matchChannelShortsLockupViewModelV2TextContent, classifyChannelShortsLockupViewModelV2ModeStatus, classifyChannelShortsLockupViewModelV2ProgressStatus);
                break;
            case 'YTD-RICH-ITEM-RENDERER':
                updateTargetVisibility(node, matchChannelRichItemRendererTextContent, classifyChannelRichItemRendererModeStatus, classifyChannelRichItemRendererProgressStatus);
                break;
            case 'YT-LOCKUP-VIEW-MODEL':
                updateTargetVisibility(node, matchChannelLockupViewModelTextContent, classifyChannelLockupViewModelModeStatus, classifyChannelLockupViewModelProgressStatus);
                break;
            case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
                updateTargetVisibility(node, matchChannelBackstagePostThreadRendererTextContent, classifyChannelBackstagePostThreadRendererModeStatus, classifyChannelBackstagePostThreadRendererProgressStatus);
                break;
            case 'YTD-BROWSE':
                insertChannelMenu(node);
                break;
        }
    }

    function insertChannelMenu(browse) {
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

    function matchChannelChannelFeaturedContentRendererTextContent(node) {
        const title = node.querySelector('a#video-title');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyChannelChannelFeaturedContentRendererModeStatus(node) {
        return undefined;
    }

    function classifyChannelChannelFeaturedContentRendererProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchChannelGridVideoRendererTextContent(node) {
        const title = node.querySelector('a#video-title');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyChannelGridVideoRendererModeStatus(node) {
        return undefined;
    }

    function classifyChannelGridVideoRendererProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchChannelGridChannelRendererTextContent(node) {
        const title = node.querySelector('span#title');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyChannelGridChannelRendererModeStatus(node) {
        return undefined;
    }

    function classifyChannelGridChannelRendererProgressStatus(node) {
        return undefined;
    }

    function matchChannelPostRendererTextContent(node) {
        const text = node.querySelector('div#post-text');
        if (text) {
            return matchQuery(text.textContent);
        }

        // default: visible
        return true;
    }

    function classifyChannelPostRendererModeStatus(node) {
        return undefined;
    }

    function classifyChannelPostRendererProgressStatus(node) {
        return undefined;
    }

    function matchChannelShortsLockupViewModelV2TextContent(node) {
        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyChannelShortsLockupViewModelV2ModeStatus(node) {
        return undefined;
    }

    function classifyChannelShortsLockupViewModelV2ProgressStatus(node) {
        return undefined;
    }

    function matchChannelRichItemRendererTextContent(node) {
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

    function classifyChannelRichItemRendererModeStatus(node) {
        return undefined;
    }

    function classifyChannelRichItemRendererProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchChannelLockupViewModelTextContent(node) {
        const metadata = node.querySelector('yt-lockup-metadata-view-model div:nth-child(1) h3');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyChannelLockupViewModelModeStatus(node) {
        return undefined;
    }

    function classifyChannelLockupViewModelProgressStatus(node) {
        return undefined;
    }

    function matchChannelBackstagePostThreadRendererTextContent(node) {
        const content = node.querySelector('div#content');
        if (content) {
            return matchQuery(content.textContent);
        }

        // default: visible
        return true;
    }

    function classifyChannelBackstagePostThreadRendererModeStatus(node) {
        return undefined;
    }

    function classifyChannelBackstagePostThreadRendererProgressStatus(node) {
        return undefined;
    }

    function onChannelsNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YTD-CHANNEL-RENDERER':
                updateTargetVisibility(node, matchChannelsChannelRendererTextContent, classifyChannelsChannelRendererModeStatus, classifyChannelsChannelRendererProgressStatus);
                break;
            case 'YTD-BROWSE':
                insertChannelsMenu(node);
                break;
        }
    }

    function insertChannelsMenu(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const menu = createMenu(browse, true);
            browse.insertBefore(menu, browse.firstChild);

            const calc = createNodeForCalc(menu, browse);
            browse.insertBefore(calc, browse.firstChild);

            browse.insertBefore(createSpacer('browse'), browse.firstChild);

            updateButtonVisibility(browse);
            display_query(browse, 'form.filter-menu, div.filter-menu', '');
        } else {
            // already exists
        }
    }

    function matchChannelsChannelRendererTextContent(node) {
        const info = node.querySelector('div#info');
        if (info) {
            return matchQuery(info.textContent);
        }

        // default: visible
        return true;
    }

    function classifyChannelsChannelRendererModeStatus(node) {
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
        }

        return status;
    }

    function classifyChannelsChannelRendererProgressStatus(node) {
        return undefined;
    }

    function onVideoPlayerNodeLoaded(node) {
        switch (node.nodeName) {
            case 'YT-LOCKUP-VIEW-MODEL':
                updateTargetVisibility(node, matchVideoPlayerLockupViewModelTextContent, classifyVideoPlayerLockupViewModelModeStatus, classifyVideoPlayerLockupViewModelProgressStatus);
                break;
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
                updateTargetVisibility(node, matchVideoPlayerShortsLockupViewModelV2TextContent, classifyVideoPlayerShortsLockupViewModelV2ModeStatus, classifyVideoPlayerShortsLockupViewModelV2ProgressStatus);
                break;
            case 'YTD-VIDEO-RENDERER':
                updateTargetVisibility(node, matchVideoPlayerVideoRendererTextContent, classifyVideoPlayerVideoRendererModeStatus, classifyVideoPlayerVideoRendererProgressStatus);
                break;
            case 'YT-CHIP-CLOUD-RENDERER':
                insertVideoPlayerMenu(node);
                break;
        }
    }

    function insertVideoPlayerMenu(node) {
        const browse = searchParentNode(node, 'YTD-WATCH-FLEXY');
        if (browse) {
            if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
                const referenceNode = browse.querySelector('div#related ytd-watch-next-secondary-results-renderer');
                if (referenceNode) {
                    const menu = createMenu(browse, false);
                    referenceNode.insertBefore(menu, referenceNode.firstChild);

                    const calc = createNodeForCalc(menu, browse);
                    referenceNode.insertBefore(calc, referenceNode.firstChild);

                    const spacerReferenceNode = browse.querySelector('div#related ytd-item-section-renderer');
                    if (spacerReferenceNode) {
                        spacerReferenceNode.parentNode.insertBefore(createSpacer('browse'), spacerReferenceNode);
                    } else {
                        // spacer referenceNode not found
                    }

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

    function matchVideoPlayerLockupViewModelTextContent(node) {
        const metadata = node.querySelector('yt-lockup-metadata-view-model div:nth-child(2) h3');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        const shorts_metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (shorts_metadata) {
            return matchQuery(shorts_metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyVideoPlayerLockupViewModelModeStatus(node) {
        const status = new Set();

        const metadata = node.querySelector('yt-content-metadata-view-model div:nth-child(2)');
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

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div');
        if (badge) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        if (status.size === 0) {
            // Member-only Video
            status.add('video');
        }

        return status;
    }

    function classifyVideoPlayerLockupViewModelProgressStatus(node) {
        const status = new Set();

        const progress = node.querySelector('div#progress, yt-thumbnail-overlay-progress-bar-view-model');
        if (progress) {
            status.add('progress_watched');
        } else {
            status.add('progress_unwatched');
        }

        return status;
    }

    function matchVideoPlayerShortsLockupViewModelV2TextContent(node) {
        const metadata = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
        if (metadata) {
            return matchQuery(metadata.textContent);
        }

        // default: visible
        return true;
    }

    function classifyVideoPlayerShortsLockupViewModelV2ModeStatus(node) {
        const status = new Set();

        status.add('short');

        return status;
    }

    function classifyVideoPlayerShortsLockupViewModelV2ProgressStatus(node) {
        return undefined;
    }

    function matchVideoPlayerVideoRendererTextContent(node) {
        const title = node.querySelector('h3.title-and-badge');
        if (title) {
            return matchQuery(title.textContent);
        }

        // default: visible
        return true;
    }

    function classifyVideoPlayerVideoRendererModeStatus(node) {
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

        const badge = node.querySelector('div.badge > p') ?? node.querySelector('yt-thumbnail-badge-view-model > badge-shape > div:nth-child(2)');
        if (badge) {
            const t = badge.textContent;
            if (lang.isLive_status_label(t)) {
                status.add('live');
            }
        }

        if (status.size === 0) {
            // Member-only Video
            status.add('video');
        }

        return status;
    }

    function classifyVideoPlayerVideoRendererProgressStatus(node) {
        return undefined;
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
            case 'YTD-POPUP-CONTAINER':
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

    function createMenu(browse, scroll) {
        const menu = document.createElement('form');
        menu.style.display = 'none';

        if (isPositionFixedTarget()) {
            menu.classList.add('filter-menu', 'position-fixed');
        } else {
            menu.classList.add('filter-menu');
        }

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
            updateQueryRegex(browse, input.value);
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });

        return menu;
    }

    function createSpacer(id) {
        const spacer = document.createElement('div');
        spacer.classList.add('filter-menu', 'spacer');
        spacer.id = id;
        return spacer;
    }

    function createButton(text, mode, browse, scroll) {
        const span = document.createElement('span');
        span.style.display = 'none';
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
        input.setAttribute('title', '".."  PHRASE search operator.  e.g. "Phrase including spaces"\n |    OR search operator.           e.g. Phrase1 | Phrase2\n -    NOT search operator.        e.g. -Phrase\n\nNOTE: Queries that specify OR and NOT simultaneously are not supported.');
        input.id = 'filter-query';
        input.value = getActiveQuery(browse);
        input.addEventListener('change', e => {
            input.blur();
            menu.requestSubmit();
        });
        return input;
    }

    function createClearButton(input, browse, scroll) {
        const span = document.createElement('span');
        span.classList.add('filter-clear');
        span.innerHTML = common.button_label.clear;
        span.addEventListener('click', () => {
            input.value = '';
            updateQueryRegex(browse, '');
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
            updateQueryRegex(browse, input.value);
            updateVisibility(browse);
            if (scroll) {
                window.scroll({ top: 0, behavior: 'instant' });
            }
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

    function updateTargetVisibility(node, matchTextContent, classifyModeStatus, classifyProgressStatus) {
        if (node.classList.contains('filter-separator')) {
            node.style.display = '';
            node.classList.add('filter-show');
            node.classList.remove('filter-hidden');
        } else if (includesStatus(node, getActiveMode(), getActiveModeProgress(), classifyModeStatus, classifyProgressStatus) && matchTextContent(node)) {
            node.style.display = '';
            node.classList.add('filter-show');
            node.classList.remove('filter-hidden');
        } else {
            node.style.cssText = 'display: none !important;';
            node.classList.remove('filter-show');
            node.classList.add('filter-hidden');
        }
    }

    function onViewChanged() {
        for (const browse of app.querySelectorAll('ytd-browse')) {
            onViewChanged_Node(browse);
        }
    }

    function onViewChanged_Node(browse) {
        insertPlaylistSpacer(browse);
        updateButtonVisibility(browse);
        display_query(browse, 'form.filter-menu, div.filter-menu', display(isMenuTarget()));
        updateVisibility(browse);
    }

    function includesStatus(node, status_mode, status_progress, classifyModeStatus, classifyProgressStatus) {
        return includesModeStatus(node, status_mode, classifyModeStatus) && includesProgressStatus(node, status_progress, classifyProgressStatus);
    }

    function includesModeStatus(node, status, classifyModeStatus) {
        if (!status || status.size === 0 || status.has('all')) {
            return true;
        } else {
            for (const s of status) {
                const node_status = classifyModeStatus(node);
                if (!node_status || node_status.size === 0 || node_status.has(s)) {
                    return true;
                }
            }
            return false;
        }
    }

    function includesProgressStatus(node, status, classifyProgressStatus) {
        if (!status || status.size === 0 || status.has('progress_all')) {
            return true;
        } else {
            for (const s of status) {
                const node_status = classifyProgressStatus(node);
                if (!node_status || node_status.size === 0 || node_status.has(s)) {
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

    function changeModeProgress(mode, browse) {
        const modes = new Set();

        if (!mode) {
            if (common.isSubscriptions(location.href)) {
                if (default_tab.progress_unwatched) modes.add('progress_unwatched');
                if (default_tab.progress_watched) modes.add('progress_watched');
                if (modes.size === 0) modes.add('progress_all');
            } else {
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

    document.addEventListener('yt-navigate-finish', () => {
        onViewChanged();
    });

    document.addEventListener('yt-action', () => {
        onResize();
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (const browse of app.querySelectorAll('ytd-browse')) {
            updateButtonVisibility(browse);
        }
    });

    new MutationObserver((mutations, observer) => {
        if (common.isSubscriptions(location.href)) {
            for (const m of mutations) {
                onSubscriptionsNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isTop(location.href)) {
            for (const m of mutations) {
                onTopNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isShorts(location.href)) {
            for (const m of mutations) {
                onShortsNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isLibrary(location.href)) {
            for (const m of mutations) {
                onLibraryNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isHistory(location.href)) {
            for (const m of mutations) {
                onHistoryNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isPlaylists(location.href)) {
            for (const m of mutations) {
                onPlaylistsNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isPlaylist(location.href)) {
            for (const m of mutations) {
                onPlaylistNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isHashTag(location.href)) {
            for (const m of mutations) {
                onHashTagNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isChannel(location.href)) {
            for (const m of mutations) {
                onChannelNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isChannels(location.href)) {
            for (const m of mutations) {
                onChannelsNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else if (common.isVideoPlayer(location.href)) {
            for (const m of mutations) {
                onVideoPlayerNodeLoaded(m.target);
                onAppNodeLoaded(m.target);
            }
        } else {
            for (const m of mutations) {
                onAppNodeLoaded(m.target);
            }
        }
    }).observe(app, { subtree: true, childList: true });
}