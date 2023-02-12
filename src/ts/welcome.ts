let token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html?error=You are not logged in";
} else {
    fetch(`${apiBase}/user?id=me`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
                document.querySelector('#username').innerHTML = `@${data.name}`;
                localStorage.setItem("token", token);
            });
        } else {
            window.location.href = "login.html?error=An error occurred";
        }
    })
}