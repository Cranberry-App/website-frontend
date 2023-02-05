document.querySelector('#github-btn').addEventListener('click', () => {
    let appInfo = oauthAppInfo.github;

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