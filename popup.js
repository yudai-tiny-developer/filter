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

const mode_list = document.querySelector('div#mode_list');

let drag_target_row;
let projection;
let gap;
let touch_identifier;

function createRow(label, mode, setting, deafult_value) {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.classList.add('row');
    div.classList.add(mode);
    div.setAttribute('draggable', 'true');
    div.appendChild(createLabel(label));
    div.appendChild(createToggle(mode, setting, deafult_value));
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
    div.innerHTML = '<input id="' + mode + '" class="checkbox" type="checkbox" ' + (setting === true ? 'checked' : (setting === undefined && deafult_value ? 'checked' : '')) + ' default="' + deafult_value + '" /><label for="' + mode + '" class="switch" />';
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
        for (const input of mode_list.querySelectorAll('input')) {
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

function fixWidthProjection(projection, row) {
    projection.style.width = row.clientWidth + 'px';

    for (let i = 0; i < projection.children.length; i++) {
        fixWidthProjection(projection.children[i], row.children[i]);
    }
}

function moveProjection(projection, x, y, gap_x, gap_y) {
    projection.style.left = (x - window.pageXOffset - gap_x) + 'px';
    projection.style.top = (y - window.pageYOffset - gap_y) + 'px';
}

function showProjection(projection) {
    mode_list.appendChild(projection);
    row.classList.add('touching');
}

function hideProjection(projection, row) {
    row.classList.remove('touching');
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
    'order'
], (data) => {
    mode_list.appendChild(createRow(button.live, 'live', data.live, true));
    mode_list.appendChild(createRow(button.streamed, 'streamed', data.streamed, true));
    mode_list.appendChild(createRow(button.live_streamed, 'live_streamed', data.live_streamed, false));
    mode_list.appendChild(createRow(button.video, 'video', data.video, true));
    mode_list.appendChild(createRow(button.streamed_video, 'streamed_video', data.streamed_video, false));
    mode_list.appendChild(createRow(button.scheduled, 'scheduled', data.scheduled, true));
    mode_list.appendChild(createRow(button.notification_on, 'notification_on', data.notification_on, true));
    mode_list.appendChild(createRow(button.notification_off, 'notification_off', data.notification_off, false));
    mode_list.appendChild(createRow(button.channels_all, 'channels_all', data.channels_all, true));
    mode_list.appendChild(createRow(button.channels_personalized, 'channels_personalized', data.channels_personalized, true));
    mode_list.appendChild(createRow(button.channels_none, 'channels_none', data.channels_none, true));

    for (const mode of data.order ? data.order.split(',') : defaultOrder) {
        const row = mode_list.querySelector('div.row.' + mode);
        mode_list.appendChild(row);
        row.style.display = '';
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
                showProjection(projection);

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

    for (const input of mode_list.querySelectorAll('input.checkbox')) {
        input.addEventListener('change', () => {
            chrome.storage.local.set({ [input.id]: input.checked });
        });
    }

    document.querySelector('input#reset').addEventListener('click', () => {
        for (const input of mode_list.querySelectorAll('input.checkbox')) {
            input.checked = input.getAttribute('default') === 'true';
        }

        for (const mode of defaultOrder) {
            mode_list.appendChild(mode_list.querySelector('div.row.' + mode));
        }

        chrome.storage.local.clear();
    });
});
