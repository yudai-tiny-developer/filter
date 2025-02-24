import(chrome.runtime.getURL('common.js')).then(common => {
    const lang = document.documentElement.getAttribute('lang');
    import(chrome.runtime.getURL('lang/' + (lang ? lang : 'en') + '.js')).then(lang => {
        main(document.querySelector('ytd-app') ?? document.body, common, lang);
    });
});

async function main(app, common, lang) {
    async function loadSettings() {
        await chrome.storage.local.get(common.storage).then(data => {
            live = common.value(data.live, common.default_value.live);
            streamed = common.value(data.streamed, common.default_value.streamed);
            video = common.value(data.video, common.default_value.video);
            short = common.value(data.short, common.default_value.short);
            scheduled = common.value(data.scheduled, common.default_value.scheduled);
            notification_on = common.value(data.notification_on, common.default_value.notification_on);
            notification_off = common.value(data.notification_off, common.default_value.notification_off);

            progress_unwatched = common.value(data.progress_unwatched, common.default_value.progress_unwatched);
            progress_watched = common.value(data.progress_watched, common.default_value.progress_watched);

            channels_all = common.value(data.channels_all, common.default_value.channels_all);
            channels_personalized = common.value(data.channels_personalized, common.default_value.channels_personalized);
            channels_none = common.value(data.channels_none, common.default_value.channels_none);

            keyword = common.value(data.keyword, common.default_value.keyword);

            default_tab.live = common.value(data.default_live, common.default_value.default_live);
            default_tab.streamed = common.value(data.default_streamed, common.default_value.default_streamed);
            default_tab.video = common.value(data.default_video, common.default_value.default_video);
            default_tab.short = common.value(data.default_short, common.default_value.default_short);
            default_tab.scheduled = common.value(data.default_scheduled, common.default_value.default_scheduled);
            default_tab.notification_on = common.value(data.default_notification_on, common.default_value.default_notification_on);
            default_tab.notification_off = common.value(data.default_notification_off, common.default_value.default_notification_off);

            default_tab.progress_unwatched = common.value(data.default_progress_unwatched, common.default_value.default_progress_unwatched);
            default_tab.progress_watched = common.value(data.default_progress_watched, common.default_value.default_progress_watched);

            default_tab.channels_all = common.value(data.default_channels_all, common.default_value.default_channels_all);
            default_tab.channels_personalized = common.value(data.default_channels_personalized, common.default_value.default_channels_personalized);
            default_tab.channels_none = common.value(data.default_channels_none, common.default_value.default_channels_none);

            multiselection = common.value(data.multiselection, common.default_value.multiselection);
            responsive = common.value(data.responsive, common.default_value.responsive);
            limit = common.value(data.limit, common.default_value.limit);
            default_keyword = common.value(data.default_keyword, common.default_value.default_keyword);

            settings = data;
        });
    }

    function isFilterTarget() {
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

    function needContinuationItemControl() {
        return common.isSubscriptions(location.href)
            || common.isShorts(location.href)
            ;
    }

    function insertMenu(browse) {
        if (!browse.querySelector('form.filter-menu:not(.filter-forCalc)')) {
            const referenceNode = getReferenceNode(browse);
            referenceNode.parentNode.insertBefore(createMenu(browse), referenceNode);
            if (needSpacer()) {
                referenceNode.parentNode.insertBefore(createSpacer(), referenceNode);
            }
        } else {
            // already exists
        }
    }

    function getReferenceNode(browse) {
        if (forTwoColumnBrowseResultsRenderer()) {
            return browse.querySelector('ytd-two-column-browse-results-renderer');
        } else if (forPageHeaderRenderer()) {
            return browse.querySelector('yt-page-header-renderer');
        } else {
            return browse.firstChild;
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

        menu.appendChild(createButton(browse, common.button_label.all, 'all'));
        menu.appendChild(createButton(browse, common.button_label.live, 'live'));
        menu.appendChild(createButton(browse, common.button_label.streamed, 'streamed'));
        menu.appendChild(createButton(browse, common.button_label.video, 'video'));
        menu.appendChild(createButton(browse, common.button_label.short, 'short', true));
        menu.appendChild(createButton(browse, common.button_label.scheduled, 'scheduled'));
        menu.appendChild(createButton(browse, common.button_label.notification_on, 'notification_on'));
        menu.appendChild(createButton(browse, common.button_label.notification_off, 'notification_off'));

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

        menu.appendChild(createButtonChannels(browse, common.button_label.all, 'all'));
        menu.appendChild(createButtonChannels(browse, common.button_label.channels_all, 'channels_all'));
        menu.appendChild(createButtonChannels(browse, common.button_label.channels_personalized, 'channels_personalized'));
        menu.appendChild(createButtonChannels(browse, common.button_label.channels_none, 'channels_none'));

        const input = createQueryInput(menu);
        menu.appendChild(createQueryInputArea(browse, input));
        menu.appendChild(createSearchButton(browse, input));

        menu.addEventListener('submit', e => {
            e.preventDefault();
            updateQueryRegex(browse, input.value);
            updateVisibility(browse);
            window.scroll({ top: 0, behavior: 'instant' });
        });

        createNodeForCalc(menu, browse);

        return menu;
    }

    function createButton(browse, text, mode, isShorts) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-button', 'filter-button-subscriptions', mode);
        span.innerHTML = text;
        span.addEventListener('click', () => {
            if (isShorts && common.isSubscriptions(location.href)) {
                location.href = 'https://www.youtube.com/feed/subscriptions/shorts';
            } else {
                changeMode(browse, mode, multiselection, span.classList.contains('selected'));
                updateVisibility(browse);
                window.scroll({ top: 0, behavior: 'instant' });
            }
        });
        return span;
    }

    function createButtonChannels(browse, text, mode) {
        const span = document.createElement('span');
        span.style.display = 'none';
        span.classList.add('filter-button', 'filter-button-channels', mode);
        span.innerHTML = text;
        span.addEventListener('click', () => {
            changeMode(browse, mode, multiselection, span.classList.contains('selected'));
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
            changeMode(browse, select.value, multiselection, select.querySelector('option.selected.' + select.value));
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
            changeModeProgress(browse, select.value, multiselection, select.querySelector('option.selected.' + select.value));
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

    function createQueryInputArea(browse, input) {
        const inputArea = document.createElement('span');
        inputArea.style.display = 'none';
        inputArea.classList.add('filter-query', 'area');
        inputArea.appendChild(input);
        inputArea.appendChild(createClearButton(browse, input));
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

    function createClearButton(browse, input) {
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

    function createSearchButton(browse, input) {
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

    function createNodeForCalc(menu, browse) {
        if (!browse.querySelector('form.filter-forCalc')) {
            const node = menu.cloneNode(true);
            node.classList.add('filter-forCalc');
            browse.appendChild(node);
        }
    }

    function createSpacer() {
        const spacer = document.createElement('div');
        spacer.classList.add('filter-menu', 'spacer');
        return spacer;
    }

    function updateMenu(browse) {
        for (const menu of browse.querySelectorAll('form.filter-menu')) {
            const select = menu.querySelector('select.filter-menu');
            const progress = menu.querySelector('select.filter-menu-progress');

            menu.appendChild(menu.querySelector('span.filter-button-subscriptions.all'));
            menu.appendChild(menu.querySelector('span.filter-button-channels.all'));
            select.appendChild(select.querySelector('option.filter-button-subscriptions.all'));
            progress.appendChild(progress.querySelector('option.filter-button-progress.progress_all'));

            for (const mode of common.order(settings.order)) {
                if (mode === 'keyword' || mode === 'multiselection' || mode === 'responsive') {
                    // continue
                } else if (mode.startsWith('progress_')) {
                    const option = progress.querySelector('option.filter-button-progress.' + mode);
                    const option_text = settings['button_label_' + mode];
                    if (option_text) {
                        option.innerHTML = option_text;
                    } else {
                        option.innerHTML = common.button_label[mode];
                    }
                    progress.appendChild(option);
                } else if (mode.startsWith('channels_')) {
                    const span = menu.querySelector('span.filter-button.' + mode);
                    const span_text = settings['button_label_' + mode];
                    if (span_text) {
                        span.innerHTML = span_text;
                    } else {
                        span.innerHTML = common.button_label[mode];
                    }
                    menu.appendChild(span);
                } else {
                    const span = menu.querySelector('span.filter-button.' + mode);
                    const span_text = settings['button_label_' + mode];
                    if (span_text) {
                        span.innerHTML = span_text;
                    } else {
                        span.innerHTML = common.button_label[mode];
                    }
                    menu.appendChild(span);

                    const option = select.querySelector('option.filter-button.' + mode);
                    const option_text = settings['button_label_' + mode];
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

            if (common.isSubscriptions(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', common.any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display(menu, 'span.filter-button-subscriptions.live', common.display(live));
                display(menu, 'span.filter-button-subscriptions.streamed', common.display(streamed));
                display(menu, 'span.filter-button-subscriptions.video', common.display(video));
                display(menu, 'span.filter-button-subscriptions.short', common.display(short));
                display(menu, 'span.filter-button-subscriptions.scheduled', common.display(scheduled));
                display(menu, 'span.filter-button-subscriptions.notification_on', common.display(notification_on));
                display(menu, 'span.filter-button-subscriptions.notification_off', common.display(notification_off));

                display(menu, 'select.filter-menu', common.any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display(menu, 'option.filter-button-subscriptions.all', common.any([live, streamed, video, short, scheduled, notification_on, notification_off]));
                display(menu, 'option.filter-button-subscriptions.live', common.display(live));
                display(menu, 'option.filter-button-subscriptions.streamed', common.display(streamed));
                display(menu, 'option.filter-button-subscriptions.video', common.display(video));
                display(menu, 'option.filter-button-subscriptions.short', common.display(short));
                display(menu, 'option.filter-button-subscriptions.scheduled', common.display(scheduled));
                display(menu, 'option.filter-button-subscriptions.notification_on', common.display(notification_on));
                display(menu, 'option.filter-button-subscriptions.notification_off', common.display(notification_off));

                display(menu, 'select.filter-menu-progress', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_all', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_unwatched', common.display(progress_unwatched));
                display(menu, 'option.filter-button-progress.progress_watched', common.display(progress_watched));

                display(menu, 'span.filter-button-channels.all', 'none');
                display(menu, 'span.filter-button-channels.channels_all', 'none');
                display(menu, 'span.filter-button-channels.channels_personalized', 'none');
                display(menu, 'span.filter-button-channels.channels_none', 'none');

                display(menu, 'span.filter-query', common.display(keyword));
            } else if (common.isLibrary(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', '');
                display(menu, 'span.filter-button-subscriptions.live', '');
                display(menu, 'span.filter-button-subscriptions.streamed', '');
                display(menu, 'span.filter-button-subscriptions.video', '');
                display(menu, 'span.filter-button-subscriptions.short', '');
                display(menu, 'span.filter-button-subscriptions.scheduled', '');
                display(menu, 'span.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu', '');
                display(menu, 'option.filter-button-subscriptions.all', '');
                display(menu, 'option.filter-button-subscriptions.live', '');
                display(menu, 'option.filter-button-subscriptions.streamed', '');
                display(menu, 'option.filter-button-subscriptions.video', '');
                display(menu, 'option.filter-button-subscriptions.short', '');
                display(menu, 'option.filter-button-subscriptions.scheduled', '');
                display(menu, 'option.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu-progress', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_all', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_unwatched', common.display(progress_unwatched));
                display(menu, 'option.filter-button-progress.progress_watched', common.display(progress_watched));

                display(menu, 'span.filter-button-channels.all', 'none');
                display(menu, 'span.filter-button-channels.channels_all', 'none');
                display(menu, 'span.filter-button-channels.channels_personalized', 'none');
                display(menu, 'span.filter-button-channels.channels_none', 'none');

                display(menu, 'span.filter-query', common.display(keyword));
            } else if (common.isPlaylist(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', '');
                display(menu, 'span.filter-button-subscriptions.live', '');
                display(menu, 'span.filter-button-subscriptions.streamed', '');
                display(menu, 'span.filter-button-subscriptions.video', '');
                display(menu, 'span.filter-button-subscriptions.short', 'none');
                display(menu, 'span.filter-button-subscriptions.scheduled', '');
                display(menu, 'span.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu', '');
                display(menu, 'option.filter-button-subscriptions.all', '');
                display(menu, 'option.filter-button-subscriptions.live', '');
                display(menu, 'option.filter-button-subscriptions.streamed', '');
                display(menu, 'option.filter-button-subscriptions.video', '');
                display(menu, 'option.filter-button-subscriptions.short', 'none');
                display(menu, 'option.filter-button-subscriptions.scheduled', '');
                display(menu, 'option.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu-progress', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_all', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_unwatched', common.display(progress_unwatched));
                display(menu, 'option.filter-button-progress.progress_watched', common.display(progress_watched));

                display(menu, 'span.filter-button-channels.all', 'none');
                display(menu, 'span.filter-button-channels.channels_all', 'none');
                display(menu, 'span.filter-button-channels.channels_personalized', 'none');
                display(menu, 'span.filter-button-channels.channels_none', 'none');

                display(menu, 'span.filter-query', common.display(keyword));
            } else if (common.isHistory(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', '');
                display(menu, 'span.filter-button-subscriptions.live', '');
                display(menu, 'span.filter-button-subscriptions.streamed', 'none');
                display(menu, 'span.filter-button-subscriptions.video', '');
                display(menu, 'span.filter-button-subscriptions.short', '');
                display(menu, 'span.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu', '');
                display(menu, 'option.filter-button-subscriptions.all', '');
                display(menu, 'option.filter-button-subscriptions.live', '');
                display(menu, 'option.filter-button-subscriptions.streamed', 'none');
                display(menu, 'option.filter-button-subscriptions.video', '');
                display(menu, 'option.filter-button-subscriptions.short', '');
                display(menu, 'option.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu-progress', 'none');
                display(menu, 'option.filter-button-progress.progress_all', 'none');
                display(menu, 'option.filter-button-progress.progress_unwatched', 'none');
                display(menu, 'option.filter-button-progress.progress_watched', 'none');

                display(menu, 'span.filter-button-channels.all', 'none');
                display(menu, 'span.filter-button-channels.channels_all', 'none');
                display(menu, 'span.filter-button-channels.channels_personalized', 'none');
                display(menu, 'span.filter-button-channels.channels_none', 'none');

                display(menu, 'span.filter-query', common.display(keyword));
            } else if (common.isHashTag(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', '');
                display(menu, 'span.filter-button-subscriptions.live', '');
                display(menu, 'span.filter-button-subscriptions.streamed', 'none');
                display(menu, 'span.filter-button-subscriptions.video', '');
                display(menu, 'span.filter-button-subscriptions.short', '');
                display(menu, 'span.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu', '');
                display(menu, 'option.filter-button-subscriptions.all', '');
                display(menu, 'option.filter-button-subscriptions.live', '');
                display(menu, 'option.filter-button-subscriptions.streamed', 'none');
                display(menu, 'option.filter-button-subscriptions.video', '');
                display(menu, 'option.filter-button-subscriptions.short', '');
                display(menu, 'option.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu-progress', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_all', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_unwatched', common.display(progress_unwatched));
                display(menu, 'option.filter-button-progress.progress_watched', common.display(progress_watched));

                display(menu, 'span.filter-button-channels.all', 'none');
                display(menu, 'span.filter-button-channels.channels_all', 'none');
                display(menu, 'span.filter-button-channels.channels_personalized', 'none');
                display(menu, 'span.filter-button-channels.channels_none', 'none');

                display(menu, 'span.filter-query', common.display(keyword));
            } else if (common.isPlaylists(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', 'none');
                display(menu, 'span.filter-button-subscriptions.live', 'none');
                display(menu, 'span.filter-button-subscriptions.streamed', 'none');
                display(menu, 'span.filter-button-subscriptions.video', 'none');
                display(menu, 'span.filter-button-subscriptions.short', 'none');
                display(menu, 'span.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu', 'none');
                display(menu, 'option.filter-button-subscriptions.all', 'none');
                display(menu, 'option.filter-button-subscriptions.live', 'none');
                display(menu, 'option.filter-button-subscriptions.streamed', 'none');
                display(menu, 'option.filter-button-subscriptions.video', 'none');
                display(menu, 'option.filter-button-subscriptions.short', 'none');
                display(menu, 'option.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu-progress', 'none');
                display(menu, 'option.filter-button-progress.progress_all', 'none');
                display(menu, 'option.filter-button-progress.progress_unwatched', 'none');
                display(menu, 'option.filter-button-progress.progress_watched', 'none');

                display(menu, 'span.filter-button-channels.all', 'none');
                display(menu, 'span.filter-button-channels.channels_all', 'none');
                display(menu, 'span.filter-button-channels.channels_personalized', 'none');
                display(menu, 'span.filter-button-channels.channels_none', 'none');

                display(menu, 'span.filter-query', common.display(keyword));
            } else if (common.isChannel(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', 'none');
                display(menu, 'span.filter-button-subscriptions.live', 'none');
                display(menu, 'span.filter-button-subscriptions.streamed', 'none');
                display(menu, 'span.filter-button-subscriptions.video', 'none');
                display(menu, 'span.filter-button-subscriptions.short', 'none');
                display(menu, 'span.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu', 'none');
                display(menu, 'option.filter-button-subscriptions.all', 'none');
                display(menu, 'option.filter-button-subscriptions.live', 'none');
                display(menu, 'option.filter-button-subscriptions.streamed', 'none');
                display(menu, 'option.filter-button-subscriptions.video', 'none');
                display(menu, 'option.filter-button-subscriptions.short', 'none');
                display(menu, 'option.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu-progress', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_all', common.any([progress_unwatched, progress_watched]));
                display(menu, 'option.filter-button-progress.progress_unwatched', common.display(progress_unwatched));
                display(menu, 'option.filter-button-progress.progress_watched', common.display(progress_watched));

                display(menu, 'span.filter-button-channels.all', 'none');
                display(menu, 'span.filter-button-channels.channels_all', 'none');
                display(menu, 'span.filter-button-channels.channels_personalized', 'none');
                display(menu, 'span.filter-button-channels.channels_none', 'none');

                display(menu, 'span.filter-query', common.display(keyword));
            } else if (common.isShorts(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', 'none');
                display(menu, 'span.filter-button-subscriptions.live', 'none');
                display(menu, 'span.filter-button-subscriptions.streamed', 'none');
                display(menu, 'span.filter-button-subscriptions.video', 'none');
                display(menu, 'span.filter-button-subscriptions.short', 'none');
                display(menu, 'span.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu', 'none');
                display(menu, 'option.filter-button-subscriptions.all', 'none');
                display(menu, 'option.filter-button-subscriptions.live', 'none');
                display(menu, 'option.filter-button-subscriptions.streamed', 'none');
                display(menu, 'option.filter-button-subscriptions.video', 'none');
                display(menu, 'option.filter-button-subscriptions.short', 'none');
                display(menu, 'option.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu-progress', 'none');
                display(menu, 'option.filter-button-progress.progress_all', 'none');
                display(menu, 'option.filter-button-progress.progress_unwatched', 'none');
                display(menu, 'option.filter-button-progress.progress_watched', 'none');

                display(menu, 'span.filter-button-channels.all', 'none');
                display(menu, 'span.filter-button-channels.channels_all', 'none');
                display(menu, 'span.filter-button-channels.channels_personalized', 'none');
                display(menu, 'span.filter-button-channels.channels_none', 'none');

                display(menu, 'span.filter-query', common.display(keyword));
            } else if (common.isChannels(location.href)) {
                display(menu, 'span.filter-button-subscriptions.all', 'none');
                display(menu, 'span.filter-button-subscriptions.live', 'none');
                display(menu, 'span.filter-button-subscriptions.streamed', 'none');
                display(menu, 'span.filter-button-subscriptions.video', 'none');
                display(menu, 'span.filter-button-subscriptions.short', 'none');
                display(menu, 'span.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'span.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu', 'none');
                display(menu, 'option.filter-button-subscriptions.all', 'none');
                display(menu, 'option.filter-button-subscriptions.live', 'none');
                display(menu, 'option.filter-button-subscriptions.streamed', 'none');
                display(menu, 'option.filter-button-subscriptions.video', 'none');
                display(menu, 'option.filter-button-subscriptions.short', 'none');
                display(menu, 'option.filter-button-subscriptions.scheduled', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_on', 'none');
                display(menu, 'option.filter-button-subscriptions.notification_off', 'none');

                display(menu, 'select.filter-menu-progress', 'none');
                display(menu, 'option.filter-button-progress.progress_all', 'none');
                display(menu, 'option.filter-button-progress.progress_unwatched', 'none');
                display(menu, 'option.filter-button-progress.progress_watched', 'none');

                display(menu, 'span.filter-button-channels.all', common.any([channels_all, channels_personalized, channels_none]));
                display(menu, 'span.filter-button-channels.channels_all', common.display(channels_all));
                display(menu, 'span.filter-button-channels.channels_personalized', common.display(channels_personalized));
                display(menu, 'span.filter-button-channels.channels_none', common.display(channels_none));

                display(menu, 'span.filter-query', common.display(keyword));
            }

            onResize();

            changeMode(browse, getActiveMode().values().next().value, multiselection, false);
            changeModeProgress(browse, getActiveModeProgress().values().next().value, multiselection, false);
            updateQueryRegex(menu, getActiveQuery());
        }
    }

    function display(node, query, value) {
        node.querySelectorAll(query).forEach(n => n.style.display = value);
    }

    function updateVisibility(browse) {
        if (common.isSubscriptions(location.href)) {
            browse.querySelectorAll('ytd-rich-item-renderer, ytd-item-section-renderer').forEach(node => updateTargetVisibility(node));
        } else if (common.isLibrary(location.href)) {
            browse.querySelectorAll('ytd-grid-video-renderer, yt-lockup-view-model').forEach(node => updateTargetVisibility(node));
        } else if (common.isPlaylist(location.href)) {
            browse.querySelectorAll('ytd-playlist-video-renderer').forEach(node => updateTargetVisibility(node));
        } else if (common.isHistory(location.href)) {
            browse.querySelectorAll('ytd-video-renderer, ytm-shorts-lockup-view-model-v2').forEach(node => updateTargetVisibility(node));
        } else if (common.isHashTag(location.href)) {
            browse.querySelectorAll('ytd-rich-item-renderer').forEach(node => updateTargetVisibility(node));
        } else if (common.isPlaylists(location.href)) {
            browse.querySelectorAll('ytd-rich-item-renderer').forEach(node => updateTargetVisibility(node));
        } else if (common.isChannel(location.href)) {
            browse.querySelectorAll('ytd-grid-video-renderer, yt-lockup-view-model, ytm-shorts-lockup-view-model-v2, ytd-rich-item-renderer, ytd-backstage-post-thread-renderer').forEach(node => updateTargetVisibility(node));
        } else if (common.isShorts(location.href)) {
            browse.querySelectorAll('ytd-rich-item-renderer').forEach(node => updateTargetVisibility(node));
        } else if (common.isChannels(location.href)) {
            browse.querySelectorAll('ytd-channel-renderer').forEach(node => updateTargetVisibility(node));
        }
    }

    function updateTargetVisibility(node) {
        switch (node.nodeName) {
            case 'YTD-ITEM-SECTION-RENDERER':
                if (!common.isSubscriptions(location.href)) {
                    break;
                }
            case 'YTD-RICH-ITEM-RENDERER':
            case 'YTD-GRID-VIDEO-RENDERER':
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
            case 'YTD-VIDEO-RENDERER':
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
            case 'YT-LOCKUP-VIEW-MODEL':
            case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
            case 'YTD-CHANNEL-RENDERER':
                if (includesStatus(node, getActiveMode(), getActiveModeProgress()) && matchTextContent(node)) {
                    node.style.display = '';
                } else {
                    node.style.display = 'none';
                }
                break;
            case 'YTD-THUMBNAIL-OVERLAY-RESUME-PLAYBACK-RENDERER':
                const progress_node = searchParentNode(node, ['YTD-RICH-ITEM-RENDERER', 'YTD-GRID-VIDEO-RENDERER', 'YTD-PLAYLIST-VIDEO-RENDERER', 'YTD-VIDEO-RENDERER', 'YTD-ITEM-SECTION-RENDERER']);
                if (progress_node) {
                    updateTargetVisibility(progress_node);
                }
                break;
            case 'YTD-CONTINUATION-ITEM-RENDERER':
                update_continuation_item(node);
                break;
        }
    }

    function searchParentNode(node, nodeNames) {
        for (let n = node; n; n = n.parentNode) {
            for (const nodeName of nodeNames) {
                if (n.nodeName === nodeName) {
                    return n;
                }
            }
        }
        return undefined;
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

    function classifyStatus(node) {
        const status = new Set();

        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
            case 'YTD-GRID-VIDEO-RENDERER':
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
            case 'YTD-VIDEO-RENDERER':
            case 'YTD-ITEM-SECTION-RENDERER':
                const live_badge = node.querySelector('div.badge-style-type-live-now-alternate, badge-shape.badge-shape-wiz--thumbnail-live');
                if (live_badge) {
                    status.add('live');
                }

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

                        const video_button = node.querySelector('ytd-toggle-button-renderer yt-formatted-string,ytd-toggle-button-renderer yt-button-shape');
                        if (video_button) {
                            const t = video_button.textContent;
                            if (lang.isNotificationOn_button(t)) {
                                status.add('notification_on');
                            } else if (lang.isNotificationOff_button(t)) {
                                status.add('notification_off');
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
                                    // workaround: membership only video
                                    status.add('video');
                                }
                            }
                        }

                        const members_only_badge = node.querySelector('div.badge-style-type-members-only');
                        if (members_only_badge) {
                            status.add('video');
                        }
                    }
                }

                break;

            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
                status.add('short');
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
                    }
                }

                break;
        }
        return status;
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

    function classifyStatusProgress(node) {
        const status = new Set();

        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
            case 'YTD-GRID-VIDEO-RENDERER':
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
            case 'YTD-VIDEO-RENDERER':
            case 'YTD-ITEM-SECTION-RENDERER':
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
        let text;
        switch (node.nodeName) {
            case 'YTD-RICH-ITEM-RENDERER':
            case 'YTD-GRID-VIDEO-RENDERER':
            case 'YTD-PLAYLIST-VIDEO-RENDERER':
            case 'YTD-VIDEO-RENDERER':
            case 'YTD-ITEM-SECTION-RENDERER':
            case 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2':
            case 'YT-LOCKUP-VIEW-MODEL':
                text = node.querySelector('h3.shortsLockupViewModelHostMetadataTitle');
                if (text) {
                    return matchQuery(text.getAttribute('aria-label'));
                }

                text = node.querySelector('h3');
                if (text) {
                    return matchQuery(text.textContent);
                }

                break;

            case 'YTD-BACKSTAGE-POST-THREAD-RENDERER':
                text = node.querySelector('div#content');
                if (text) {
                    return matchQuery(text.textContent);
                }

                break;

            case 'YTD-CHANNEL-RENDERER':
                text = node.querySelector('yt-formatted-string#description');
                if (text) {
                    return matchQuery(text.textContent);
                }

                break;
        }

        // default: visible
        return true;
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

    function changeMode(browse, mode, multi, sub) {
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

    function changeModeProgress(browse, mode, multi, sub) {
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

    function onResize() {
        if (responsive) {
            const form = app.querySelector('ytd-browse[role="main"] form.filter-menu:not(.filter-forCalc)')
            if (form && form.parentNode.scrollWidth !== 0) {
                const calc = form.parentNode.querySelector('form.filter-forCalc');
                if (calc) {
                    form.parentNode.insertBefore(calc, form);
                    clearInterval(resize_interval);
                    resize_interval = setInterval(() => {
                        if (calc.scrollWidth !== 0) {
                            clearInterval(resize_interval);
                            if (calc.scrollWidth <= form.parentNode.scrollWidth) {
                                document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
                                document.documentElement.style.setProperty('--filter-menu-display', 'none');
                            } else {
                                document.documentElement.style.setProperty('--filter-button-display', 'none');
                                document.documentElement.style.setProperty('--filter-menu-display', 'block');
                            }
                        }
                    }, 100);
                }
            }
        } else {
            document.documentElement.style.setProperty('--filter-button-display', 'inline-flex');
            document.documentElement.style.setProperty('--filter-menu-display', 'none');
        }
    }

    function onNavigateStart() {
        for (const browse of app.querySelectorAll('ytd-browse')) {
            hideMenu(browse);
        }
        hide_load_button();
    }

    function onNavigateFinish() {
        const browse = app.querySelector('ytd-browse[role="main"]');
        if (browse) {
            updateMenu(browse);
            showMenu(browse);
            updateVisibility(browse);

            const continuation_item = browse.querySelector('ytd-continuation-item-renderer');
            if (continuation_item) {
                update_continuation_item(continuation_item);
            }
        }
        show_load_button();
    }

    function showMenu(browse) {
        browse.querySelectorAll('form.filter-menu:not(.filter-forCalc), div.filter-menu').forEach(menu => menu.style.visibility = '');
    }

    function hideMenu(browse) {
        browse.querySelectorAll('form.filter-menu:not(.filter-forCalc), div.filter-menu').forEach(menu => menu.style.visibility = 'hidden');
    }

    function show_load_button() {
        load_button_container.style.visibility = '';
    }

    function hide_load_button() {
        load_button_container.style.visibility = 'hidden';
    }

    function update_continuation_item(continuation_item) {
        if (needContinuationItemControl()) {
            continuation_item.parentNode.parentNode.appendChild(load_button_container);
            if (continuation_item.parentNode.children.length > limit) {
                load_button_container.style.display = '';
                continuation_item.style.display = 'none';
            } else {
                load_button_container.style.display = 'none';
                continuation_item.style.display = '';
            }
        }
    }

    function observe_browse() {
        new MutationObserver((mutations, observer) => {
            if (isFilterTarget()) {
                for (const mutation of mutations) {
                    for (const addedNode of mutation.addedNodes) {
                        if (addedNode.nodeName === 'YTD-BROWSE') {
                            on_browse_added(addedNode);
                        }
                    }
                }
            }
        }).observe(app.querySelector('ytd-page-manager'), { childList: true });
    }

    function on_browse_added(browse) {
        insertMenu(browse);
        updateMenu(browse);

        display(browse, 'form.filter-menu, div.filter-menu', '')

        on_observe_target_container_found(browse);
        observe_observe_target_container(browse, 'ytd-section-list-renderer, ytd-playlist-video-list-renderer');
    }

    function observe_observe_target_container(browse, query) {
        for (const container of browse.querySelectorAll(query)) {
            on_observe_target_container_found(container);
        }

        new MutationObserver((mutations, observer) => {
            if (isFilterTarget()) {
                for (const container of browse.querySelectorAll(query)) {
                    on_observe_target_container_found(container);
                }
            }
        }).observe(browse, { childList: true });
    }

    function on_observe_target_container_found(container) {
        observe_update_target_container(container, 'div#contents, div#items, div#grid-container, div#overlays');
    }

    function observe_update_target_container(container, query) {
        if (!observers_observe_update_target_container.has(container)) {
            observers_observe_update_target_container.add(container);

            for (const node of container.querySelectorAll(query)) {
                on_update_target_container_found(node);
            }

            new MutationObserver((mutations, observer) => {
                if (isFilterTarget()) {
                    for (const node of container.querySelectorAll(query)) {
                        on_update_target_container_found(node);
                    }
                }
            }).observe(container, { childList: true });
        }
    }

    function on_update_target_container_found(node) {
        if (!observers_on_update_target_container_found.has(node)) {
            observers_on_update_target_container_found.add(node);

            for (const child of node.children) {
                updateTargetVisibility(child);
            }

            new MutationObserver((mutations, observer) => {
                if (isFilterTarget()) {
                    for (const mutation of mutations) {
                        for (const addedNode of mutation.addedNodes) {
                            updateTargetVisibility(addedNode);
                        }
                    }
                }
            }).observe(node, { childList: true });
        }
    }

    let live;
    let streamed;
    let video;
    let short;
    let scheduled;
    let notification_on;
    let notification_off;
    let progress_unwatched;
    let progress_watched;
    let channels_all;
    let channels_personalized;
    let channels_none;
    let keyword;
    let multiselection;
    let responsive;
    let limit = common.defaultLimit;
    let default_keyword;
    let settings;
    let resize_interval;

    const observers_observe_update_target_container = new Set();
    const observers_on_update_target_container_found = new Set();

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

    const load_button_container = document.createElement('div');
    {
        load_button_container.style.display = 'none';
        load_button_container.classList.add('filter-button-load');

        const load_button = document.createElement('button');
        load_button.innerText = common.button_label.load;
        load_button.classList.add('yt-spec-button-shape-next', 'yt-spec-button-shape-next--tonal', 'yt-spec-button-shape-next--mono', 'yt-spec-button-shape-next--size-m');
        load_button.addEventListener('click', () => {
            const continuation_item = app.querySelector('ytd-browse[role="main"] ytd-continuation-item-renderer');
            if (continuation_item) {
                load_button_container.style.display = 'none';
                continuation_item.style.display = '';
                window.scroll({ top: app.scrollHeight, behavior: 'instant' });
            }
        });
        load_button_container.appendChild(load_button);
    }

    chrome.storage.onChanged.addListener(async () => {
        await loadSettings();
        const browse = app.querySelector('ytd-browse[role="main"]');
        if (browse) {
            updateMenu(browse);
        }
    });

    window.addEventListener('resize', onResize);
    document.addEventListener('yt-navigate-start', onNavigateStart);
    document.addEventListener('yt-navigate-finish', onNavigateFinish);

    await loadSettings();
    observe_browse();
}