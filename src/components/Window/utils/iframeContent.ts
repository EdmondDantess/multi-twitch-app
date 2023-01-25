export const contentVideo_URL = (channel: string) => {
    const vercelVid = `https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app2F&theme=dark&time=0h0m0s&width=100%25`
    const localHVid = `https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=localhost&referrer=http%3A%2F%2Flocalhost%3A3000%2F&theme=dark&time=0h0m0s&width=100%25`
    return localHVid
}
export const contentChat_URL = (channel: string) => {
    const vercelChat = `https://www.twitch.tv/embed/${channel}/chat?parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app&darkpopout`
    const localHChat = `https://www.twitch.tv/embed/${channel}/chat?parent=localhost&referrer=http%3A%2F%2Flocalhost%3A3000%&`
    return localHChat
}