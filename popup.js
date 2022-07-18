const button_live = chrome.i18n.getMessage('button_live');
const button_streamed = chrome.i18n.getMessage('button_streamed');
const button_live_streamed = chrome.i18n.getMessage('button_live_streamed');
const button_video = chrome.i18n.getMessage('button_video');
const button_streamed_video = chrome.i18n.getMessage('button_streamed_video');
const button_scheduled = chrome.i18n.getMessage('button_scheduled');
const button_notification_on = chrome.i18n.getMessage('button_notification_on');
const button_notification_off = chrome.i18n.getMessage('button_notification_off');
const button_channels_all = chrome.i18n.getMessage('button_channels_all');
const button_channels_personalized = chrome.i18n.getMessage('button_channels_personalized');
const button_channels_none = chrome.i18n.getMessage('button_channels_none');

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

let dragStartRow;

const mode_list = document.querySelector('div#mode_list');

function createRow(label, mode, setting, deafultValue) {
    const div = document.createElement('div');
    div.style.display = 'none';
    div.classList.add('row');
    div.classList.add(mode);
    div.setAttribute('draggable', 'true');
    div.appendChild(createLabel(label));
    div.appendChild(createToggle(mode, setting, deafultValue));
    return div;
}

function createLabel(label) {
    const div = document.createElement('div');
    div.classList.add('label');
    div.innerHTML = label;
    return div;
}

function createToggle(mode, setting, deafultValue) {
    const div = document.createElement('div');
    div.classList.add('toggle');
    div.innerHTML = '<input id="' + mode + '" class="checkbox" type="checkbox" ' + (setting === true ? 'checked' : (setting === undefined && deafultValue ? 'checked' : '')) + ' default="' + deafultValue + '" /><label for="' + mode + '" class="switch" />';
    return div;
}

function indexOf(row) {
    const list = mode_list.children;
    for (let i = 0; i < list.length; i++) {
        if (list[i] === row) {
            return i;
        }
    }
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
    mode_list.appendChild(createRow(button_live, 'live', data.live, true));
    mode_list.appendChild(createRow(button_streamed, 'streamed', data.streamed, true));
    mode_list.appendChild(createRow(button_live_streamed, 'live_streamed', data.live_streamed, false));
    mode_list.appendChild(createRow(button_video, 'video', data.video, true));
    mode_list.appendChild(createRow(button_streamed_video, 'streamed_video', data.streamed_video, false));
    mode_list.appendChild(createRow(button_scheduled, 'scheduled', data.scheduled, true));
    mode_list.appendChild(createRow(button_notification_on, 'notification_on', data.notification_on, true));
    mode_list.appendChild(createRow(button_notification_off, 'notification_off', data.notification_off, false));
    mode_list.appendChild(createRow(button_channels_all, 'channels_all', data.channels_all, true));
    mode_list.appendChild(createRow(button_channels_personalized, 'channels_personalized', data.channels_personalized, true));
    mode_list.appendChild(createRow(button_channels_none, 'channels_none', data.channels_none, true));

    for (const mode of data.order ? data.order.split(',') : defaultOrder) {
        const row = mode_list.querySelector('div.row.' + mode);
        mode_list.appendChild(row);
        row.style.display = '';
    }

    for (const div of document.querySelectorAll('div.row')) {
        div.addEventListener('dragstart', (event) => {
            dragStartRow = event.target;
            dragStartRow.classList.add('dragging');
        });

        div.addEventListener('dragover', (event) => {
            event.preventDefault();

            const dragOverRow = event.target.parentNode;
            if (dragOverRow && dragOverRow.parentNode === mode_list) {
                if (dragOverRow !== dragStartRow) {
                    if (indexOf(dragOverRow) < indexOf(dragStartRow)) {
                        dragOverRow.before(dragStartRow);
                    } else {
                        dragOverRow.after(dragStartRow);
                    }
                }
            }
        });

        div.addEventListener('dragend', (event) => {
            dragStartRow.classList.remove('dragging');
            dragStartRow = undefined;

            let list = [];
            for (const input of mode_list.querySelectorAll('input')) {
                list.push(input.id);
            }
            chrome.storage.local.set({ order: list.join(',') });
        });
    }

    for (const input of document.querySelectorAll('input.checkbox')) {
        input.addEventListener('change', () => {
            chrome.storage.local.set({ [input.id]: input.checked });
        });
    }

    document.querySelector('input#reset').addEventListener('click', () => {
        for (const input of document.querySelectorAll('input.checkbox')) {
            input.checked = input.getAttribute('default') === 'true';
        }

        for (const mode of defaultOrder) {
            mode_list.appendChild(mode_list.querySelector('div.row.' + mode));
        }

        chrome.storage.local.clear();
    });
});
