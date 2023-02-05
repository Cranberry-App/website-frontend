if (!localStorage.getItem('token')) {
    //window.location.href = '/src/login.html';
}

document.querySelector('#profile img').addEventListener('click', () => {
    document.querySelector('#profile .menu').classList.toggle('hidden');
});

fetch(`${apiBase}/user?id=me`, {
    method: "GET",
    headers: {
        "Authorization": localStorage.getItem('token')
    }
}).then(res => {
    if (res.status == 200) {
        res.json().then(data => {
            (document.querySelector('#profile img') as HTMLImageElement).src = data.avatarUrl;
        });
    } else {
        localStorage.removeItem('token');
        //window.location.href = "/src/login.html";
    }
});

// @ts-ignore
feather.replace();