const button = {
    live: chrome.i18n.getMessage('button_live'),
    streamed: chrome.i18n.getMessage('button_streamed'),
    live_streamed: chrome.i18n.getMessage('button_live_streamed'),
    video: chrome.i18n.getMessage('button_video'),
    streamed_video: chrome.i18n.getMessage('button_streamed_video'),
    scheduled: chrome.i18n.getMessage('button_scheduled'),
    notification_on: chrome.i18n.getMessage('button_notification_on'),
    notification_off: chrome.i18n.getMessage('button_notification_off'),
    channels_all: chrome.i18n.getMessage('button_channels_all'),
    channels_personalized: chrome.i18n.getMessage('button_channels_personalized'),
    channels_none: chrome.i18n.getMessage('button_channels_none')
};

const default_order = [
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

const mode_list = document.querySelector('div#mode_list');

let drag_target_row;
let projection;
let gap;
let touch_identifier;

function createHeaderRow() {
    const div = document.createElement('div');
    div.classList.add('row');
    div.appendChild(createLabel(''));
    div.appendChild(createLabel(''));
    div.appendChild(createLabel('Default'));
    return div;
}

function createRow(label, mode, setting, deafult_value, default_tab, tab_group) {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.classList.add('row');
    div.classList.add(mode);
    div.setAttribute('draggable', 'true');
    div.appendChild(createLabel(label));
    div.appendChild(createToggle(mode, setting, deafult_value));
    div.appendChild(createDefaultToggle(mode, default_tab, tab_group));
    return div;
}

function createLabel(label) {
    const div = document.createElement('div');
    div.classList.add('label');
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
    div.innerHTML = '<input id="default_' + mode + '" class="checkbox default_checkbox ' + tab_group + '" type="checkbox" ' + (setting === true ? 'checked' : '') + ' default="false" /><label for="default_' + mode + '" class="switch" />';
    return div;
}

function isBefore(over_target_row, drag_target_row) {
    for (const child of mode_list.children) {
        if (child === over_target_row) {
            return true;
        } else if (child === drag_target_row) {
            return false;
        }
    }
    return false;
}

function contains(node, x, y) {
    const rect = node.getBoundingClientRect();
    return rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom;
}

function onDragStart(event) {
    const dragTarget = event.target;
    if (!drag_target_row && dragTarget.parentNode === mode_list) {
        drag_target_row = dragTarget;
        drag_target_row.classList.add('dragging');
    }
}

function onDragOver(event) {
    const over_target_row = event.target.parentNode;
    if (drag_target_row && over_target_row && over_target_row.parentNode === mode_list && over_target_row !== drag_target_row) {
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
        for (const input of mode_list.querySelectorAll('input.visibility_checkbox')) {
            modes.push(input.id);
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
    for (const node of mode_list.querySelectorAll('div.row:not(.touching)')) {
        if (contains(node, touch.clientX, touch.clientY)) {
            return node.querySelector('div.label');
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
    mode_list.appendChild(projection);
    base.classList.add('touching');
}

function hideProjection(projection, base) {
    base.classList.remove('touching');
    mode_list.removeChild(projection);
}

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
    'order',
    'default_live',
    'default_streamed',
    'default_live_streamed',
    'default_video',
    'default_streamed_video',
    'default_scheduled',
    'default_notification_on',
    'default_notification_off',
    'default_channels_all',
    'default_channels_personalized',
    'default_channels_none',
], (data) => {
    mode_list.appendChild(createHeaderRow());
    mode_list.appendChild(createRow(button.live, 'live', data.live, true, data.default_live, 'subscriptions'));
    mode_list.appendChild(createRow(button.streamed, 'streamed', data.streamed, true, data.default_streamed, 'subscriptions'));
    mode_list.appendChild(createRow(button.live_streamed, 'live_streamed', data.live_streamed, false, data.default_live_streamed, 'subscriptions'));
    mode_list.appendChild(createRow(button.video, 'video', data.video, true, data.default_video, 'subscriptions'));
    mode_list.appendChild(createRow(button.streamed_video, 'streamed_video', data.streamed_video, false, data.default_streamed_video, 'subscriptions'));
    mode_list.appendChild(createRow(button.scheduled, 'scheduled', data.scheduled, true, data.default_scheduled, 'subscriptions'));
    mode_list.appendChild(createRow(button.notification_on, 'notification_on', data.notification_on, true, data.default_notification_on, 'subscriptions'));
    mode_list.appendChild(createRow(button.notification_off, 'notification_off', data.notification_off, false, data.default_notification_off, 'subscriptions'));
    mode_list.appendChild(createRow(button.channels_all, 'channels_all', data.channels_all, true, data.default_channels_all, 'channels'));
    mode_list.appendChild(createRow(button.channels_personalized, 'channels_personalized', data.channels_personalized, true, data.default_channels_personalized, 'channels'));
    mode_list.appendChild(createRow(button.channels_none, 'channels_none', data.channels_none, true, data.default_channels_none, 'channels'));

    for (const mode of data.order ? data.order.split(',') : default_order) {
        const row = mode_list.querySelector('div.row.' + mode);
        if (row) {
            mode_list.appendChild(row);
            row.style.display = '';
        }
    }

    for (const div of mode_list.querySelectorAll('div.row')) {
        div.addEventListener('dragstart', onDragStart);
        div.addEventListener('dragover', onDragOver);
        div.addEventListener('dragend', onDragEnd);

        div.querySelector('div.label').addEventListener('touchstart', (event) => {
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

    for (const input of mode_list.querySelectorAll('input.visibility_checkbox')) {
        input.addEventListener('change', () => {
            chrome.storage.local.set({ [input.id]: input.checked });
        });
    }

    for (const group of ['subscriptions', 'channels']) {
        for (const input of mode_list.querySelectorAll('input.default_checkbox.' + group)) {
            input.addEventListener('change', () => {
                if (input.checked) {
                    mode_list.querySelectorAll('input.default_checkbox.' + group).forEach(n => {
                        if (n !== input) {
                            n.checked = false;
                            chrome.storage.local.set({ [n.id]: false });
                        }
                    });
                }
                chrome.storage.local.set({ [input.id]: input.checked });
            });
        }
    }

    document.querySelector('input#reset').addEventListener('click', () => {
        for (const input of mode_list.querySelectorAll('input.checkbox')) {
            input.checked = input.getAttribute('default') === 'true';
        }

        for (const mode of default_order) {
            mode_list.appendChild(mode_list.querySelector('div.row.' + mode));
        }

        chrome.storage.local.clear();
    });
});
