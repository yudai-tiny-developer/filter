let groups;
let settings_lists;

let drag_target_row;
let drag_target_group;
let projection;
let gap;
let touch_identifier;
let state = {};

export function init(_groups, _settings_lists) {
    groups = _groups;
    settings_lists = _settings_lists;
}

export function createHeaderRow(button_label_visibility, button_label_default, header_class) {
    const div = document.createElement('div');
    div.classList.add('header-row');
    div.appendChild(createHeaderLabel('', `${header_class}-1`));
    div.appendChild(createHeaderLabel('', `${header_class}-2`));
    div.appendChild(createHeaderLabel(button_label_visibility, `${header_class}-3`));
    div.appendChild(createHeaderLabel(button_label_default, `${header_class}-4`));
    return div;
}

export function createRow(label, default_label, mode, setting, deafult_value, default_tab = undefined, tab_group = undefined, onChange = undefined, button_label_clear = undefined, input_class = undefined, minRate = undefined, maxRate = undefined, stepRate = undefined, limitRate = undefined) {
    const div = document.createElement('div');
    div.classList.add('row', mode);
    if (tab_group) {
        div.classList.add('row', tab_group);
        div.setAttribute('draggable', 'true');
    }
    div.appendChild(createDraggableIcon(tab_group));
    div.appendChild(createLabelInput(label, default_label, onChange, tab_group ? div : undefined, button_label_clear));
    switch (input_class) {
        case 'step':
            div.appendChild(createInputArea(setting, deafult_value, onChange, undefined, input_class, minRate, maxRate, stepRate, limitRate));
            break;
        default:
            div.appendChild(createToggle(mode, setting, deafult_value));
    }
    if (default_tab !== undefined) {
        div.appendChild(createDefaultToggle(mode, default_tab, tab_group));
    } else {
        div.appendChild(createLabel(''));
    }
    return div;
}

export function createRowKeyword(label, mode, setting, deafult_value, keyword, onChange = undefined, button_label_clear = undefined) {
    const div = document.createElement('div');
    div.classList.add('row', mode);
    div.appendChild(createDraggableIcon(undefined));
    div.appendChild(createLabelInput(label, undefined, undefined, undefined, undefined));
    div.appendChild(createToggle(mode, setting, deafult_value));

    const keyword_input = createLabelInput(keyword, '', onChange, div, button_label_clear, 'keyword_input');
    div.appendChild(keyword_input);

    return div;
}

function createDraggableIcon(draggable) {
    const div = document.createElement('div');
    if (draggable) {
        div.classList.add('draggable-label');
        div.innerHTML = '<svg width="14" height="24" viewBox="0 0 24 24" style="width: 24px; height: 24px;"><path d="M21 10H3V9h18v1Zm0 4H3v1h18v-1Z"></path></svg>';
    } else {
        div.classList.add('label');
    }
    return div;
}

function createLabelInput(label, default_label, onChange, row, button_label_clear, input_class = 'label') {
    const div = document.createElement('div');
    div.classList.add('label');

    if (default_label !== undefined) {
        const input = createInputArea(label, default_label, onChange, row, input_class);
        const clear = createClearButton(button_label_clear, input, default_label, onChange);
        input.dispatchEvent(new Event('check'));
        div.appendChild(input);
        div.appendChild(clear);
    } else {
        div.classList.add('svg-label');
        div.innerHTML = label;
    }

    return div;
}

function createInputArea(label, default_label, onChange, row, input_class = 'label', minRate = undefined, maxRate = undefined, stepRate = undefined, limitRate = undefined) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add(input_class);

    input.addEventListener('focus', () => {
        if (row) {
            row.setAttribute('draggable', 'false');
        }
    });

    input.addEventListener('blur', () => {
        if (row) {
            row.setAttribute('draggable', 'true');
        }
    });

    if (input_class === 'step') {
        input.type = 'number';
        input.value = limitRate(label, default_label, minRate, maxRate, stepRate);
        input.setAttribute('defaultValue', default_label);
        input.min = minRate;
        input.max = maxRate;
        input.step = stepRate;
    } else {
        if (label !== undefined) {
            input.value = label;
        } else {
            input.value = default_label;
        }
    }

    if (onChange) {
        input.addEventListener('change', () => {
            onChange(input);
            input.dispatchEvent(new Event('check'));
        });
    }

    input.addEventListener('reset', () => {
        input.value = default_label;
        input.dispatchEvent(new Event('check'));
    });

    return input;
}

function createClearButton(button_label_clear, input, default_label, onChange) {
    const span = document.createElement('span');
    span.classList.add('filter-clear');
    span.innerHTML = button_label_clear;

    if (onChange) {
        span.addEventListener('click', () => {
            input.dispatchEvent(new Event('reset'));
            onChange(input);
        });
    }

    input.addEventListener('check', () => {
        if (input.value === default_label) {
            span.style.visibility = 'hidden';
        } else {
            span.style.visibility = 'visible';
        }
    });

    return span;
}

function createLabel(label) {
    const div = document.createElement('div');
    div.classList.add('label');
    div.innerHTML = label;
    return div;
}

function createHeaderLabel(label, header_class) {
    const div = document.createElement('div');
    div.classList.add('header-label', header_class);
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

function onDragEnd() {
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

export function registerDraggableRow(div, draggable_label) {
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

export function registerResetButton(reset_button, progress_div, progress_class, done_class, default_order, progress) {
    reset_button.addEventListener('mousedown', () => progress.startProgress(progress_div, progress_class, done_class, state));
    reset_button.addEventListener('touchstart', () => progress.startProgress(progress_div, progress_class, done_class, state));

    reset_button.addEventListener('mouseleave', () => progress.endProgress(progress_div, progress_class, done_class, state));
    reset_button.addEventListener('touchmove', event => {
        const touch = event.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target !== reset_button) {
            progress.endProgress(progress_div, progress_class, done_class, state);
        }
    });
    reset_button.addEventListener('touchcancel', () => progress.endProgress(progress_div, progress_class, done_class, state));

    reset_button.addEventListener('mouseup', () => progress.endProgress(progress_div, progress_class, done_class, state, resetSettings, default_order));
    reset_button.addEventListener('touchend', event => {
        event.preventDefault();
        progress.endProgress(progress_div, progress_class, done_class, state, resetSettings, default_order);
    });
}

function resetSettings(default_order) {
    for (const settings_list of settings_lists) {
        for (const input of settings_list.querySelectorAll('input.checkbox')) {
            input.checked = input.getAttribute('default') === 'true';
        }

        for (const mode of default_order) {
            const row = settings_list.querySelector('div.row.' + mode);
            if (row) {
                settings_list.appendChild(row);
            }
        }

        for (const input of settings_list.querySelectorAll('input.label, input.step, input.keyword_input')) {
            input.dispatchEvent(new Event('reset'));
        }
    }

    chrome.storage.local.clear();
}