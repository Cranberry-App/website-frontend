let searchParams = new URLSearchParams(window.location.search);
let token = searchParams.get("token");

if (!token) {
    window.location.href = "login.html";
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
            window.location.href = "login.html";
        }
    })
}