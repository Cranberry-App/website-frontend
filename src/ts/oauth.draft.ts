const searchParams: URLSearchParams = new URLSearchParams(window.location.search);

const oauthCode: string = searchParams.get("token");
const oauthApp: string = searchParams.get("app");
/*
if (!oauthCode || !oauthApp) {
    //window.location.href = "login.html";
    alert("No code or app");
}
*/
fetch(`${apiBase}/oauth`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        code: oauthCode,
        app: oauthApp
    })
}).then(async res => {/*
    if (res.status == 200 || res.status == 201) {
        res.json().then(data => {
            localStorage.setItem("token", data.token);
            window.location.href = "welcome.html";
        });
    } else {
        //window.location.href = "login.html";
        alert("Error");
    }*/

    console.log(res)
});