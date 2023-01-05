import React, {memo} from 'react';
import './window.css'
import {useDispatch, useSelector} from 'react-redux';
import {deleteWindow, setChatOpenClose} from './window-reducer';
import {RootState} from '../../app/store';

type WindowPropsType = {
    channel: string
}

export const Window: React.FC<WindowPropsType> = React.memo(({channel}) => {

    const dispatch = useDispatch()
    const chat = useSelector<RootState, boolean>(state => state.window.windows.find(w => w.channel === channel)!.chat)

    function chatOpenCloseHandler() {
        dispatch(setChatOpenClose(channel))
    }

    let heightWindow = 200

    function deleteWindowHandler() {
        dispatch(deleteWindow(channel))
    }

    return <div className={'window'}>
        <button className={'window-delete'} onClick={deleteWindowHandler}>X</button>
        <iframe
            src={`https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app2F&theme=dark&time=0h0m0s&width=100%25`}
            frameBorder="0"
            allowFullScreen scrolling="no" height={chat ? heightWindow + 300 : heightWindow} width="350"></iframe>
        {chat ?
            <iframe
                id="chat_embed"
                src={`https://www.twitch.tv/embed/${channel}/chat?parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app`}
                height="300"
                width="350">
            </iframe> : <></>
        }
        <div className={'window-chat'} onClick={chatOpenCloseHandler}>{chat ? '🡅 Close chat' : '🡇 Open chat'}</div>
    </div>

})

// localhost vid  src={`https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=localhost&referrer=http%3A%2F%2Flocalhost%3A3000%2F&theme=dark&time=0h0m0s&width=100%25`}
// vercel vid  src={`https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app2F&theme=dark&time=0h0m0s&width=100%25`}


//chat local  src={`https://www.twitch.tv/embed/${channel}/chat?parent=localhost&referrer=http%3A%2F%2Flocalhost%3A3000%`}
//chat vercel  src={`https://www.twitch.tv/embed/${channel}/chat?parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app`}

