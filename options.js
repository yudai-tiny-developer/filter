document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['key'], (result) => {
        // result.key;
    });

    document.querySelector('button#save').addEventListener('click', () => {
        const value = '';
        chrome.storage.sync.set({ 'key': value });
    });
});
