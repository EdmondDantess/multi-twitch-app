import React from 'react';
import './window.css'

type WindowPropsType = {
    chat?: boolean
    channel: string
}

export const Window: React.FC<WindowPropsType> = ({channel, chat}) => {

    return  <div className={'window'}>
        <iframe src={`https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app%2F&theme=dark&time=0h0m0s&width=100%25`}
                frameBorder="0"
                allowFullScreen scrolling="no" height="200" width="450"></iframe>
    </div>

};

// <iframe src={`https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=localhost&referrer=http%3A%2F%2Flocalhost%3A3000%2F&theme=dark&time=0h0m0s&width=100%25`}
// https://embed.twitch.tv?autoplay=true&channel=asd&chat=mobile&height=300px&layout=video&muted=false&parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app%2F&targetId=twitch-embed&width=480