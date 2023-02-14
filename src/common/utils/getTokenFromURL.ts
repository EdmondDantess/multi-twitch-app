const getTokenFromURL = () => {
    return window.location.href.slice(window.location.href.indexOf('access_token=') + 13, window.location.href.indexOf('&scope='))
}

export const tokenFromURL = getTokenFromURL()
