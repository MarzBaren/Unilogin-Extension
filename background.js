
function setValue(key, value) {
    return new Promise((resolve) => {
        let item = {};
        item[key] = value;
        chrome.storage.local.set(item, function() {
            resolve();
        });
    });
}

async function getValue(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, function(result) {
            resolve(result[key]);
        });
    });
}

async function run() {
    if (await getValue('active') == null) {
        setValue('active', true)
    }
}

run()