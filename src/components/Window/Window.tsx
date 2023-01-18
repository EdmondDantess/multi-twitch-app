import {deleteWindow, setChatOpenClose, setWindowSize} from './window-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import React from 'react';
import './window.css'
import {NumberSize, Resizable} from 're-resizable';
import {Direction} from 're-resizable/lib/resizer';

type WindowPropsType = {
    channel: string
}


export const Window: React.FC<WindowPropsType> = React.memo(({channel}) => {

    const dispatch = useDispatch()
    const chat = useSelector<RootState, boolean>(state => state.window.windows.find(w => w.channel === channel)!.chat)
    const width = useSelector<RootState, number>(state => state.window.windows.find(w => w.channel === channel)!.width)
    const mute = useSelector<RootState, boolean>(state => state.window.windows.find(w => w.channel === channel)!.muted)
    const height = useSelector<RootState, number>(state => state.window.windows.find(w => w.channel === channel)!.height)

    let contentVideo_URL = `https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app2F&theme=dark&time=0h0m0s&width=100%25`
    let contentChat_URL = `https://www.twitch.tv/embed/${channel}/chat?parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app&darkpopout`
function chatOpenCloseHandler() {
        dispatch(setChatOpenClose(channel))
    }

    function deleteWindowHandler() {
        dispatch(deleteWindow(channel))
    }

    const onResize = (event: MouseEvent | TouchEvent, direction: Direction, elementRef: HTMLElement, delta: NumberSize) => {
        dispatch(setWindowSize(channel, {width: width + delta.width, height: height + delta.height}))
    };

    return <div className={'window'}>
        <span className={'window-channelname'}  >{channel}</span>
        <button className={'window-delete'} onClick={deleteWindowHandler}>X</button>
        <Resizable
            minWidth={'350px'}
            minHeight={'200px'}
            maxHeight={'90vw'}
            maxWidth={'100vh'}
            onResizeStop={onResize}
            size={{width: width + 'px', height: height + 'px'}}>
            <iframe
                title={'video'}
                src={contentVideo_URL}
                frameBorder="0"
                allowFullScreen
                height={'100%'}
                width={'100%'}></iframe>
        </Resizable>
        {
            chat && <iframe
                title={'chat'}
                id="chat_embed"
                src={contentChat_URL}
                frameBorder="0"
                height="300px"
                width={'100%'}></iframe>
        }
        <div className={'window-chat'} onClick={chatOpenCloseHandler}>{chat ? '🡅 Close chat' : '🡇 Open chat'}</div>
    </div>
})

// localhost vid  src={`https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=localhost&referrer=http%3A%2F%2Flocalhost%3A3000%2F&theme=dark&time=0h0m0s&width=100%25`}
// vercel vid  src={`https://embed.twitch.tv?allowfullscreen=true&autoplay=true&channel=${channel}&controls=true&height=100%25&layout=video&muted=false&parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app2F&theme=dark&time=0h0m0s&width=100%25`}


//chat local  src={`https://www.twitch.tv/embed/${channel}/chat?parent=localhost&referrer=http%3A%2F%2Flocalhost%3A3000%&darkpopout`}
//chat vercel  src={`https://www.twitch.tv/embed/${channel}/chat?parent=multi-twitch-app.vercel.app&referrer=https%3A%2F%2Fmulti-twitch-app.vercel.app&darkpopout`}

