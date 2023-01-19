import {deleteWindow, setChatOpenClose, setChatPos} from './window-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import React from 'react';
import './window.css'
import {contentChat_URL, contentVideo_URL} from './utils/iframeContent';

type WindowPropsType = {
    channel: string
}

export const Window: React.FC<WindowPropsType> = React.forwardRef(({channel}) => {

        const dispatch = useDispatch()

        const chat = useSelector<RootState, boolean>(state => state.window.windows.find(w => w.channel === channel)!.chat)
        const width = useSelector<RootState, number>(state => state.window.windows.find(w => w.channel === channel)!.width)
        const height = useSelector<RootState, number>(state => state.window.windows.find(w => w.channel === channel)!.height)
        const chatPos = useSelector<RootState, string>(state => state.window.windows.find(w => w.channel === channel)!.chatPosition)
        const mute = useSelector<RootState, boolean>(state => state.window.windows.find(w => w.channel === channel)!.muted)

        function chatOpenCloseHandler() {
            dispatch(setChatOpenClose(channel))
        }

        function deleteWindowHandler() {
            dispatch(deleteWindow(channel))
        }

        function changeChatPosHandler() {
            dispatch(setChatPos(channel, chatPos === 'underVideo' ? 'rightVideo' : 'underVideo'))
        }

        return <div className={`window`}>
            <span className={'window-channelname'}>{channel}</span>
            <div className={'window-handler'}>
                <button className={'window-delete'} onClick={deleteWindowHandler}>X</button>
                <button className={'window-handler-chatpos'} onClick={changeChatPosHandler}>Change chat pos</button>
            </div>
            <iframe
                title={'video'}
                src={contentVideo_URL(channel)}
                frameBorder="0"
                allowFullScreen
                height={chat ? '40%' : '100%'}
                width={'100%'}></iframe>
            {
                chat && <iframe
                    title={'chat'}
                    id="chat_embed"
                    src={contentChat_URL(channel)}
                    frameBorder="0"
                    height={'60%'}
                    width={'100%'}></iframe>
            }
            <div className={chatPos === 'underVideo' ? 'window-chat-under' : 'window-chat-right'}
                 onClick={chatOpenCloseHandler}
            >
                {chat ? '🡅 Close chat' : '🡇 Open chat'}
            </div>
        </div>
    }
)

