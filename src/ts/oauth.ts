const searchParams: URLSearchParams = new URLSearchParams(window.location.search);

const oauthCode: string = searchParams.get("code");
const oauthApp: string = searchParams.get("app");

if (!oauthCode || !oauthApp) {
    window.location.href = "login.html?error=Invalid OAuth request";
}

fetch(`${apiBase}/oauth`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        code: oauthCode,
        app: oauthApp
    })
}).then(async res => {
    if (res.status == 200 || res.status == 201) {
        res.json().then(data => {
            localStorage.setItem("token", data.token);
            window.location.href = res.status == 201 ? "welcome.html" : "index.html?fromLogin=true";
        });
    } else {
        window.location.href = "login.html?error=An error occurred";
    }

    console.log(res)
});