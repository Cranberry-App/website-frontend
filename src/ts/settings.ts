// @ts-ignore
feather.replace();

if (!localStorage.getItem('token')) {
    //window.location.href = '/src/login.html';
}

fetch(`${apiBase}/user?id=me`, {
    method: "GET",
    headers: {
        "Authorization": localStorage.getItem('token')
    }
}).then(res => {
    if (res.status == 200) {
        res.json().then(data => {
            (document.querySelector('#profile-image img') as HTMLImageElement).src = data.avatarUrl;
            (document.querySelector('#usernameInput') as HTMLInputElement).value = data.name;
            (document.querySelector('#emailInput') as HTMLInputElement).value = data.email;
        });
    } else {
        localStorage.removeItem('token');
        //window.location.href = "/src/login.html";
    }
});

document.querySelector('#shuffle-image').addEventListener('click', () => {
    let randomNum = Math.floor(Math.random() * 1000000);
    let newAvatarUrl = `https://source.boringavatars.com/${(document.querySelector('#avatarType') as HTMLSelectElement).value}/400/${randomNum}`;
    (document.querySelector('#profile-image img') as HTMLImageElement).src = newAvatarUrl;
});

document.querySelector('#save-button').addEventListener('click', () => {
    fetch(`${apiBase}/user`, {
        method: 'PATCH',
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify({
            name: (document.querySelector('#usernameInput') as HTMLInputElement).value,
            avatarUrl: (document.querySelector('#profile-image img') as HTMLImageElement).src
        })
    }).then(async res => {
        const data = await res.json();
        if (res.status === 200) {
            (document.querySelector('#profile-image img') as HTMLImageElement).src = data.avatarUrl;
            (document.querySelector('#usernameInput') as HTMLInputElement).value = data.name;
            (document.querySelector('#emailInput') as HTMLInputElement).value = data.email;
        } else {
            alert(data.error);
        }
    });
});