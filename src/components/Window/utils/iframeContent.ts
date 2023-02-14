import {mode} from '../../../common/utils/modeLocalToVercel';

export const contentVideo_URL = (channel: string) => {
    return `https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=localhost&referrer=${mode}&theme=dark&time=0h0m0s&width=100%25`
}
export const contentChat_URL = (channel: string) => {
    return   `https://www.twitch.tv/embed/${channel}/chat?parent=${mode}&referrer=${mode}&darkpopout`
}