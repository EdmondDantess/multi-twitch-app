export const vercel = 'https%3A%2F%2Fmulti-twitch-app.vercel.app'
export const localhost = 'http://localhost:3000'
export const location = window.location.href

 const regime = () => {
    return location.includes('https://multi-twitch-app.vercel.app/') ? vercel : localhost
}

export const mode = regime()

export const tokenMode = () => {
    return mode === localhost ? 'host:3000' : 'i-twitch-app.vercel.app'
}