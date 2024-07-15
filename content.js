function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }
  
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
	if (await getValue('active')) {
		if (document.querySelector('[value="uni_idp"]')) {
			document.querySelector('[value="uni_idp"]').click();
			await sleep(800);
		}else if (document.title.includes('Unilogin') && document.querySelector('[alt="Børne- og Undervisningsministeriet - Styrelsen for IT og læring"]')) {

			if (document.querySelector('[id="form-error-message-form-error"]')) {
				document.querySelector('[for="form-error"]').innerHTML = 'Auto-Unilogin fejlet. Opdater venligst dine oplysninger'
				return;
			}

			username = document.querySelector('[id="username"]')
			if (username) {
				username.value = await getValue('username')

				document.querySelector('[type="submit"]').click()
				await sleep(800);
			}

			password = document.querySelector('[name="password"]')
			if(password) {
				password.value = await getValue('password')
				document.querySelector('[type="submit"]').click()
				await sleep(800);
			}
		}
	}

	setTimeout(run, 300)
}	

async function getValue(key) {
	return new Promise((resolve) => {
		chrome.storage.local.get(key, function(result) {
			resolve(result[key]);
		});
	});
}

run()