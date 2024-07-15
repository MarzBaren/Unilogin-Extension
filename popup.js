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

async function setVariables() {
    document.getElementById('username').value = await getValue('username')

    if (await getValue('active')) {
        switchElement.classList.toggle('active')
    }
}

const switchElement = document.getElementById('active');
setVariables()

switchElement.addEventListener('click', function() {
    this.classList.toggle('active');
    console.log('Switch state:', this.classList.contains('active'));

    if (this.classList.contains('active')) {
        setValue('active', true)
    }else{
        setValue('active', false)
    }
});

document.getElementById('saveButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    setValue('username', username)
    setValue('password', password)

    console.log('Saved password', username, password)
    
    document.getElementById('myLabel').innerHTML = "Gemt information"

});

