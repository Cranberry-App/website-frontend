if (!localStorage.getItem('token')) {
    window.location.href = '/src/login.html?error=You are not logged in';
}

if(new URLSearchParams(window.location.search).get("fromLogin")) {
    new CustomNotification("log-in", "Logged in", 2000);
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
        window.location.href = "/src/login.html?error=An error occurred";
    }
});

fetch(`${apiBase}/channels`, {
    method: "GET",
    headers: {
        "Authorization": localStorage.getItem('token')
    }
}).then(res => {
    if (res.status !== 200) {
        switch (res.status) {
            case 401: {
                localStorage.removeItem('token');
                window.location.href = "/src/login.html?error=Unauthorized";
                break;
            } default: {
                //window.location.href = "/src/login.html?error=An error occurred";
            }
        }
    }
});

function logout() {
    localStorage.removeItem('token');
    window.location.href = "login.html";
}

document.querySelector('#message-input').addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key === "Enter") (document.querySelector('#send-message') as HTMLButtonElement).click();
});

document.querySelector('#send-message').addEventListener('click', () => {
    if ((document.querySelector('#message-input') as HTMLInputElement).value == "") return customAlert("You can't send an empty message", "Empty message", "alert-triangle");
    createMessage({profileImage: "https://via.placeholder.com/128", name: "Test"}, (document.querySelector('#message-input') as HTMLInputElement).value, "by", Date.now());
    (document.querySelector('#message-input') as HTMLInputElement).value = "";
});

function createMessage(sender: {profileImage: string, name: string}, content: string, sendDirection: "to"|"by", at: EpochTimeStamp) {
    const message = document.createElement('div');
    message.classList.add('message', sendDirection);

    const profileImage = document.createElement('img');
    profileImage.src = sender.profileImage;

    const messageContent = document.createElement('div');
    messageContent.classList.add('messageContent');

    const senderElement = document.createElement('p');
    senderElement.classList.add('sender');
    senderElement.innerText = sender.name;

    const text = document.createElement('p');
    text.classList.add('text');
    text.innerText = content;

    const timeElement = document.createElement('span');
    timeElement.classList.add("time");
    timeElement.innerText = new Date(at).toLocaleTimeString();

    messageContent.appendChild(senderElement);
    messageContent.appendChild(text);

    message.appendChild(profileImage);
    message.appendChild(messageContent);
    message.appendChild(timeElement);

    document.querySelector('#message-container').appendChild(message).scrollIntoView({behavior: "smooth"});
}

// @ts-ignore
feather.replace();
