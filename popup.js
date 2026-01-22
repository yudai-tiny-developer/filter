import(chrome.runtime.getURL('common.js')).then(common =>
    import(chrome.runtime.getURL('settings.js')).then(settings =>
        import(chrome.runtime.getURL('progress.js')).then(progress =>
            chrome.storage.local.get(common.storage, data =>
                main(common, settings, progress, data)
            )
        )
    )
);

function main(common, settings, progress, data) {
    const groups = ['subscriptions', 'progress', 'channels'];

    const settings_list_1 = document.body.querySelector('div#settings_list_1');
    const settings_list_2 = document.body.querySelector('div#settings_list_2');
    const settings_list_3 = document.body.querySelector('div#settings_list_3');
    const settings_list_4 = document.body.querySelector('div#settings_list_4');
    const settings_list_5 = document.body.querySelector('div#settings_list_5');
    const settings_list_6 = document.body.querySelector('div#settings_list_6');
    const settings_lists = [settings_list_1, settings_list_2, settings_list_3, settings_list_4, settings_list_5, settings_list_6];

    const progress_class = 'progress';
    const done_class = 'done';

    const reset_button = document.body.querySelector('input#reset');
    const progress_div = document.body.querySelector('div#reset_progress');

    settings.init(groups, settings_lists);

    settings_list_1.appendChild(settings.createHeaderRow(common.button_label.visibility, common.button_label.default, 'header-main'));
    settings_list_1.appendChild(settings.createRow(data.button_label_live, common.button_label.live, 'live', data.live, true, data.default_live ? data.default_live : false, 'subscriptions', input => chrome.storage.local.set({ button_label_live: input.value }), common.button_label.clear));
    settings_list_1.appendChild(settings.createRow(data.button_label_streamed, common.button_label.streamed, 'streamed', data.streamed, true, data.default_streamed ? data.default_streamed : false, 'subscriptions', input => chrome.storage.local.set({ button_label_streamed: input.value }), common.button_label.clear));
    settings_list_1.appendChild(settings.createRow(data.button_label_video, common.button_label.video, 'video', data.video, true, data.default_video ? data.default_video : false, 'subscriptions', input => chrome.storage.local.set({ button_label_video: input.value }), common.button_label.clear));
    settings_list_1.appendChild(settings.createRow(data.button_label_short, common.button_label.short, 'short', data.short, true, data.default_short ? data.default_short : false, 'subscriptions', input => chrome.storage.local.set({ button_label_short: input.value }), common.button_label.clear));
    settings_list_1.appendChild(settings.createRow(data.button_label_scheduled, common.button_label.scheduled, 'scheduled', data.scheduled, true, data.default_scheduled ? data.default_scheduled : false, 'subscriptions', input => chrome.storage.local.set({ button_label_scheduled: input.value }), common.button_label.clear));
    settings_list_1.appendChild(settings.createRow(data.button_label_notification_on, common.button_label.notification_on, 'notification_on', data.notification_on, false, data.default_notification_on ? data.default_notification_on : false, 'subscriptions', input => chrome.storage.local.set({ button_label_notification_on: input.value }), common.button_label.clear));
    settings_list_1.appendChild(settings.createRow(data.button_label_notification_off, common.button_label.notification_off, 'notification_off', data.notification_off, false, data.default_notification_off ? data.default_notification_off : false, 'subscriptions', input => chrome.storage.local.set({ button_label_notification_off: input.value }), common.button_label.clear));

    settings_list_2.appendChild(settings.createHeaderRow(common.button_label.visibility, common.button_label.default, 'header-progress'));
    settings_list_2.appendChild(settings.createRow(data.button_label_progress_unwatched, common.button_label.progress_unwatched, 'progress_unwatched', data.progress_unwatched, true, data.default_progress_unwatched ? data.default_progress_unwatched : false, 'progress', input => chrome.storage.local.set({ button_label_progress_unwatched: input.value }), common.button_label.clear));
    settings_list_2.appendChild(settings.createRow(data.button_label_progress_watched, common.button_label.progress_watched, 'progress_watched', data.progress_watched, true, data.default_progress_watched ? data.default_progress_watched : false, 'progress', input => chrome.storage.local.set({ button_label_progress_watched: input.value }), common.button_label.clear));

    settings_list_3.appendChild(settings.createHeaderRow(common.button_label.visibility, common.button_label.default, 'header-keyword'));
    settings_list_3.appendChild(settings.createRowKeyword(common.button_label.keyword, 'keyword', data.keyword, true, data.default_keyword, input => chrome.storage.local.set({ default_keyword: input.value }), common.button_label.clear));

    settings_list_4.appendChild(settings.createRow(common.button_label.channels_all, undefined, 'channels_all', data.channels_all, true, data.default_channels_all ? data.default_channels_all : false, 'channels'));
    settings_list_4.appendChild(settings.createRow(common.button_label.channels_personalized, undefined, 'channels_personalized', data.channels_personalized, true, data.default_channels_personalized ? data.default_channels_personalized : false, 'channels'));
    settings_list_4.appendChild(settings.createRow(common.button_label.channels_none, undefined, 'channels_none', data.channels_none, true, data.default_channels_none ? data.default_channels_none : false, 'channels'));

    settings_list_5.appendChild(settings.createRow(common.button_label.multiselection, undefined, 'multiselection', data.multiselection, false));
    settings_list_5.appendChild(settings.createRow(common.button_label.responsive, undefined, 'responsive', data.responsive, true));
    settings_list_5.appendChild(settings.createRow(common.button_label.url_param_filter_mode_enabled, undefined, 'url_param_filter_mode_enabled', data.url_param_filter_mode_enabled, false));
    settings_list_5.appendChild(settings.createRow(common.button_label.limit, undefined, 'limit', data.limit, common.defaultLimit, undefined, undefined, input => chrome.storage.local.set({ limit: common.limit(input.value, common.defaultLimit, common.minLimit, common.maxLimit, common.stepLimit) }), undefined, 'step', common.minLimit, common.maxLimit, common.stepLimit, common.limit));

    settings_list_6.appendChild(settings.createRow(common.button_label.filter_subscriptions, undefined, 'filter_subscriptions', data.filter_subscriptions, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.filter_home, undefined, 'filter_home', data.filter_home, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.filter_shorts, undefined, 'filter_shorts', data.filter_shorts, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.filter_history, undefined, 'filter_history', data.filter_history, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.filter_playlist, undefined, 'filter_playlist', data.filter_playlist, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.filter_playlists, undefined, 'filter_playlists', data.filter_playlists, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.filter_hashtag, undefined, 'filter_hashtag', data.filter_hashtag, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.filter_channel, undefined, 'filter_channel', data.filter_channel, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.filter_channels, undefined, 'filter_channels', data.filter_channels, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.keyword_add_playlist, undefined, 'keyword_add_playlist', data.keyword_add_playlist, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.keyword_sidebar_channels, undefined, 'keyword_sidebar_channels', data.keyword_sidebar_channels, true));
    settings_list_6.appendChild(settings.createRow(common.button_label.keyword_notification, undefined, 'keyword_notification', data.keyword_notification, true));

    for (const settings_list of settings_lists) {
        for (const mode of common.order(data.order)) {
            const row = settings_list.querySelector('div.row.' + mode);
            if (row) {
                settings_list.appendChild(row);
                row.style.display = '';
            }
        }

        for (const div of settings_list.querySelectorAll('div.row')) {
            const draggable_label = div.querySelector('div.draggable-label');
            if (draggable_label) {
                settings.registerDraggableRow(div, draggable_label);
            }
        }

        for (const settings_list of settings_lists) {
            for (const input of settings_list.querySelectorAll('input.visibility_checkbox')) {
                input.addEventListener('change', () => {
                    let ids = {};

                    if (!input.checked) {
                        const mode = 'default_' + input.id;
                        const checkbox = settings_list.querySelector('input#' + mode);
                        if (checkbox) {
                            checkbox.checked = false;
                            ids[mode] = false;
                        }
                    }

                    ids[input.id] = input.checked;
                    chrome.storage.local.set(ids);
                });
            }

            for (const group of groups) {
                for (const input of settings_list.querySelectorAll('input.default_checkbox.' + group)) {
                    input.addEventListener('change', () => {
                        chrome.storage.local.get(common.storage, data => {
                            let ids = {};

                            if (input.checked) {
                                const mode = input.id.substring(8);
                                const checkbox = settings_list.querySelector('input#' + mode);
                                if (checkbox) {
                                    checkbox.checked = true;
                                    ids[mode] = true;
                                }
                            }

                            if (input.checked && !data.multiselection) {
                                settings_list.querySelectorAll('input.default_checkbox.' + group).forEach(n => {
                                    if (n !== input) {
                                        n.checked = false;
                                        ids[n.id] = false;
                                    }
                                });
                            }

                            ids[input.id] = input.checked;
                            chrome.storage.local.set(ids);
                        });
                    });
                }
            }
        }
    }

    settings.registerResetButton(reset_button, progress_div, progress_class, done_class, common.default_order, progress);

    chrome.storage.onChanged.addListener(() => {
        chrome.storage.local.get(common.storage, data => {
            if (!data.multiselection) {
                let ids = {};
                for (const group of groups) {
                    let first = true;
                    for (const settings_list of settings_lists) {
                        settings_list.querySelectorAll('input:checked.default_checkbox.' + group).forEach(n => {
                            if (first) {
                                first = false;
                            } else {
                                n.checked = false;
                                ids[n.id] = false;
                            }
                        });
                    }
                }
                chrome.storage.local.set(ids);
            }
        });
    });
}