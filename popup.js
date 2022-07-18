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

function createRow(label, toggle) {
    const div = document.createElement('div');
    div.classList.add('row');
    div.appendChild(label);
    div.appendChild(toggle);
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
    'channels_none'
], (data) => {
    const mode_list = document.querySelector('div#mode_list');
    if (mode_list) {
        mode_list.appendChild(createRow(createLabel(button_live), createToggle('live', data.live, true)));
        mode_list.appendChild(createRow(createLabel(button_streamed), createToggle('streamed', data.streamed, true)));
        mode_list.appendChild(createRow(createLabel(button_live_streamed), createToggle('live_streamed', data.live_streamed, false)));
        mode_list.appendChild(createRow(createLabel(button_video), createToggle('video', data.video, true)));
        mode_list.appendChild(createRow(createLabel(button_streamed_video), createToggle('streamed_video', data.streamed_video, false)));
        mode_list.appendChild(createRow(createLabel(button_scheduled), createToggle('scheduled', data.scheduled, true)));
        mode_list.appendChild(createRow(createLabel(button_notification_on), createToggle('notification_on', data.notification_on, true)));
        mode_list.appendChild(createRow(createLabel(button_notification_off), createToggle('notification_off', data.notification_off, false)));
        mode_list.appendChild(createRow(createLabel(button_channels_all), createToggle('channels_all', data.channels_all, true)));
        mode_list.appendChild(createRow(createLabel(button_channels_personalized), createToggle('channels_personalized', data.channels_personalized, true)));
        mode_list.appendChild(createRow(createLabel(button_channels_none), createToggle('channels_none', data.channels_none, true)));
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
        chrome.storage.local.clear();
    });
});
