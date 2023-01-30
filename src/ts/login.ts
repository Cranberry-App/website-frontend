document.querySelector('#github-btn').addEventListener('click', () => {
    let appInfo = {
        client_id: "e7c8ac97b628ad88bb6a",
        redirect_uri: "http://localhost:3000/oauth?app=github",
        scope: "read:user"
    }

    const params  = new URLSearchParams();
    params.append('client_id', appInfo.client_id);
    params.append('scope', appInfo.scope);
    params.append('redirect_uri', appInfo.redirect_uri);
    
    let url: URL = new URL('https://github.com/login/oauth/authorize');
    url.search = params.toString();
    window.location.href = url.href;
});

// @ts-ignore
feather.replace();