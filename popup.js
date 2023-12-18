import(chrome.runtime.getURL('common.js')).then(common =>
    main(common)
);

function main(common) {
    function createHeaderRow() {
        const element = document.createElement('div');
        element.classList.add('header-row');
        element.appendChild(createHeaderLabel(''));
        element.appendChild(createHeaderLabel(common.button_label.visibility));
        element.appendChild(createHeaderLabel(common.button_label.default));
        return element;
    }

    function createRow(label, mode, setting, deafult_value, default_tab = undefined, tab_group = undefined) {
        const element = document.createElement('div');
        element.classList.add('row', mode);
        if (tab_group) {
            element.classList.add('row', tab_group);
            element.setAttribute('draggable', 'true');
        }
        element.appendChild(createLabel(label, tab_group));
        element.appendChild(createToggle(mode, setting, deafult_value));
        if (default_tab !== undefined) {
            element.appendChild(createDefaultToggle(mode, default_tab, tab_group));
        }
        return element;
    }

    function createLabel(label, draggable) {
        const div = document.createElement('div');
        if (draggable) {
            div.classList.add('draggable-label');
        } else {
            div.classList.add('label');
        }
        div.innerHTML = label;
        return div;
    }

    function createHeaderLabel(label) {
        const div = document.createElement('div');
        div.classList.add('header-label');
        div.innerHTML = label;
        return div;
    }

    function createToggle(mode, setting, deafult_value) {
        const div = document.createElement('div');
        div.classList.add('toggle');
        div.innerHTML = '<input id="' + mode + '" class="checkbox visibility_checkbox" type="checkbox" ' + (setting === true ? 'checked' : (setting === undefined && deafult_value ? 'checked' : '')) + ' default="' + deafult_value + '" /><label for="' + mode + '" class="switch" />';
        return div;
    }

    function createDefaultToggle(mode, setting, tab_group) {
        const div = document.createElement('div');
        div.classList.add('toggle');
        div.innerHTML = '<input id="default_' + mode + '" class="checkbox default_checkbox ' + (tab_group ? tab_group : '') + '" type="checkbox" ' + (setting === true ? 'checked' : '') + ' default="false" /><label for="default_' + mode + '" class="switch" />';
        return div;
    }

    function isBefore(over_target_row, drag_target_row) {
        for (const settings_list of settings_lists) {
            for (const child of settings_list.children) {
                if (child === over_target_row) {
                    return true;
                } else if (child === drag_target_row) {
                    return false;
                }
            }
        }
        return false;
    }

    function contains(node, x, y) {
        const rect = node.getBoundingClientRect();
        return rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom;
    }

    function identifyGroup(target_row) {
        if (settings_lists.includes(target_row.parentNode)) {
            for (const group of groups) {
                if (target_row.classList.contains(group)) {
                    return group;
                }
            }
        }
        return undefined;
    }

    function onDragStart(event) {
        const dragTarget = event.target;
        const group = identifyGroup(dragTarget);
        if (!drag_target_row && group) {
            drag_target_row = dragTarget;
            drag_target_row.classList.add('dragging');
            drag_target_group = group;
        }
    }

    function onDragOver(event) {
        const over_target_row = event.target.parentNode;
        const group = identifyGroup(over_target_row);
        if (drag_target_row && over_target_row && group === drag_target_group && over_target_row !== drag_target_row) {
            if (isBefore(over_target_row, drag_target_row)) {
                over_target_row.before(drag_target_row);
            } else {
                over_target_row.after(drag_target_row);
            }
        }
        event.preventDefault();
    }

    function onDragEnd(event) {
        if (drag_target_row) {
            drag_target_row.classList.remove('dragging');
            drag_target_row = undefined;

            let modes = [];
            for (const settings_list of settings_lists) {
                for (const input of settings_list.querySelectorAll('input.visibility_checkbox')) {
                    modes.push(input.id);
                }
            }
            chrome.storage.local.set({ order: modes.join(',') });
        }
    }

    function convertTouchEventToDragEvent(type, touch_event, dataTransfer) {
        return new DragEvent(type, {
            dataTransfer: dataTransfer,

            screenX: touch_event.changedTouches[0].screenX,
            screenY: touch_event.changedTouches[0].screenY,
            clientX: touch_event.changedTouches[0].clientX,
            clientY: touch_event.changedTouches[0].clientY,
            ctrlKey: touch_event.ctrlKey,
            shiftKey: touch_event.shiftKey,
            altKey: touch_event.altKey,
            metaKey: touch_event.metaKey,
            button: 0,
            buttons: 0,
            relatedTarget: touch_event.changedTouches[0].target,
            region: null,

            detail: touch_event.detail,
            view: touch_event.view,
            sourceCapabilities: touch_event.sourceCapabilities,

            bubbles: touch_event.bubbles,
            cancelable: touch_event.cancelable,
            composed: touch_event.composed
        });
    }

    function getTouchTarget(touch) {
        for (const settings_list of settings_lists) {
            for (const node of settings_list.querySelectorAll('div.row:not(.touching)')) {
                if (contains(node, touch.clientX, touch.clientY)) {
                    const draggable_label = node.querySelector('div.draggable-label');
                    if (draggable_label) {
                        return draggable_label;
                    }
                }
            }
        }
        return touch.target;
    }

    function getGap(row, touch) {
        const rect = row.getBoundingClientRect();
        return {
            x: touch.pageX - window.pageXOffset - rect.left,
            y: touch.pageY - window.pageYOffset - rect.top
        };
    }

    function createProjection(row) {
        const clone = row.cloneNode(true);
        clone.classList.add('projection');
        return clone;
    }

    function fixWidthProjection(projection, base) {
        projection.style.width = base.clientWidth + 'px';

        for (let i = 0; i < projection.children.length; i++) {
            fixWidthProjection(projection.children[i], base.children[i]);
        }
    }

    function moveProjection(projection, x, y, gap_x, gap_y) {
        projection.style.left = (x - window.pageXOffset - gap_x) + 'px';
        projection.style.top = (y - window.pageYOffset - gap_y) + 'px';
    }

    function showProjection(projection, base) {
        if (settings_lists.includes(projection.parentNode)) {
            projection.parentNode.appendChild(projection);
            base.classList.add('touching');
        }
    }

    function hideProjection(projection, base) {
        if (settings_lists.includes(projection.parentNode)) {
            base.classList.remove('touching');
            projection.parentNode.removeChild(projection);
        }
    }

    const groups = ['subscriptions', 'progress', 'channels'];

    let drag_target_row;
    let drag_target_group;
    let projection;
    let gap;
    let touch_identifier;

    let multiselection;

    const settings_list_1 = document.querySelector('div#settings_list_1');
    const settings_list_2 = document.querySelector('div#settings_list_2');
    const settings_list_3 = document.querySelector('div#settings_list_3');
    const settings_list_4 = document.querySelector('div#settings_list_4');
    const settings_lists = [settings_list_1, settings_list_2, settings_list_3, settings_list_4];

    chrome.storage.local.get(common.storage, (data) => {
        multiselection = data.multiselection;

        settings_list_1.appendChild(createHeaderRow());
        settings_list_1.appendChild(createRow(common.button_label.live, 'live', data.live, true, data.default_live ? data.default_live : false, 'subscriptions'));
        settings_list_1.appendChild(createRow(common.button_label.streamed, 'streamed', data.streamed, true, data.default_streamed ? data.default_streamed : false, 'subscriptions'));
        settings_list_1.appendChild(createRow(common.button_label.video, 'video', data.video, true, data.default_video ? data.default_video : false, 'subscriptions'));
        settings_list_1.appendChild(createRow(common.button_label.short, 'short', data.short, true, data.default_short ? data.default_short : false, 'subscriptions'));
        settings_list_1.appendChild(createRow(common.button_label.scheduled, 'scheduled', data.scheduled, true, data.default_scheduled ? data.default_scheduled : false, 'subscriptions'));
        settings_list_1.appendChild(createRow(common.button_label.notification_on, 'notification_on', data.notification_on, true, data.default_notification_on ? data.default_notification_on : false, 'subscriptions'));
        settings_list_1.appendChild(createRow(common.button_label.notification_off, 'notification_off', data.notification_off, false, data.default_notification_off ? data.default_notification_off : false, 'subscriptions'));

        settings_list_2.appendChild(createHeaderRow());
        settings_list_2.appendChild(createRow(common.button_label.progress_unwatched, 'progress_unwatched', data.progress_unwatched, true, data.default_progress_unwatched ? data.default_progress_unwatched : false, 'progress'));
        settings_list_2.appendChild(createRow(common.button_label.progress_watched, 'progress_watched', data.progress_watched, true, data.default_progress_watched ? data.default_progress_watched : false, 'progress'));

        settings_list_3.appendChild(createRow(common.button_label.channels_all, 'channels_all', data.channels_all, true, data.default_channels_all ? data.default_channels_all : false, 'channels'));
        settings_list_3.appendChild(createRow(common.button_label.channels_personalized, 'channels_personalized', data.channels_personalized, true, data.default_channels_personalized ? data.default_channels_personalized : false, 'channels'));
        settings_list_3.appendChild(createRow(common.button_label.channels_none, 'channels_none', data.channels_none, true, data.default_channels_none ? data.default_channels_none : false, 'channels'));

        settings_list_4.appendChild(createRow(common.button_label.keyword, 'keyword', data.keyword, true));
        settings_list_4.appendChild(createRow(common.button_label.multiselection, 'multiselection', data.multiselection, false));
        settings_list_4.appendChild(createRow(common.button_label.responsive, 'responsive', data.responsive, true));

        for (const settings_list of settings_lists) {
            let prevGroup = undefined;
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
                    div.addEventListener('dragstart', onDragStart);
                    div.addEventListener('dragover', onDragOver);
                    div.addEventListener('dragend', onDragEnd);

                    draggable_label.addEventListener('touchstart', (event) => {
                        if (touch_identifier === undefined) {
                            const touch = event.changedTouches[0];

                            gap = getGap(div, touch);

                            projection = createProjection(div);
                            fixWidthProjection(projection, div);
                            moveProjection(projection, touch.pageX, touch.pageY, gap.x, gap.y);
                            showProjection(projection, div);

                            div.dispatchEvent(convertTouchEventToDragEvent('dragstart', event));
                            touch_identifier = event.changedTouches[0].identifier;
                        }
                    });

                    div.addEventListener('touchmove', (event) => {
                        const touch = event.changedTouches[0];
                        if (touch.identifier === touch_identifier) {
                            moveProjection(projection, touch.pageX, touch.pageY, gap.x, gap.y);
                            getTouchTarget(touch).dispatchEvent(convertTouchEventToDragEvent('dragover', event));
                        }
                    });

                    div.addEventListener('touchend', (event) => {
                        const touch = event.changedTouches[0];
                        if (touch.identifier === touch_identifier) {
                            hideProjection(projection, drag_target_row);
                            getTouchTarget(touch).dispatchEvent(convertTouchEventToDragEvent('dragend', event));
                            touch_identifier = undefined;
                        }
                    });

                    div.addEventListener('touchcancel', (event) => {
                        const touch = event.changedTouches[0];
                        if (touch.identifier === touch_identifier) {
                            hideProjection(projection, drag_target_row);
                            getTouchTarget(touch).dispatchEvent(convertTouchEventToDragEvent('dragend', event));
                            touch_identifier = undefined;
                        }
                    });
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
                            let ids = {};

                            if (input.checked) {
                                const mode = input.id.substring(8);
                                const checkbox = settings_list.querySelector('input#' + mode);
                                if (checkbox) {
                                    checkbox.checked = true;
                                    ids[mode] = true;
                                }
                            }

                            if (input.checked && !multiselection) {
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
                    }
                }

                document.querySelector('input#reset').addEventListener('click', () => {
                    for (const input of settings_list.querySelectorAll('input.checkbox')) {
                        input.checked = input.getAttribute('default') === 'true';
                    }

                    for (const mode of common.default_order) {
                        const row = settings_list.querySelector('div.row.' + mode);
                        if (row) {
                            settings_list.appendChild(row);
                        }
                    }

                    chrome.storage.local.clear();
                });
            }
        }
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        chrome.storage.local.get(common.storage, (data) => {
            multiselection = data.multiselection;

            if (!multiselection) {
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