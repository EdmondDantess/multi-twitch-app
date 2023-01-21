import {deleteWindow, setChatOpenClose, setChatPos} from './window-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import React, {useRef} from 'react';
import './window.css'
import {contentChat_URL, contentVideo_URL} from './utils/iframeContent';
import close from '../../assets/icons/close.png'

type WindowPropsType = {
    channel: string
}

export const Window: React.FC<WindowPropsType> = React.forwardRef(({channel}) => {

        const dispatch = useDispatch()
        const refIframe = useRef<any>()

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

        return <div className={`window`}
                    style={{flexDirection: chatPos === 'underVideo' ? 'column' : 'row'}}>
            <div className={'window-channelname'}>{channel}</div>
            <div className={'window-handler'}>
                <div className={'window-delete'} onClick={deleteWindowHandler}>
                    <img src={close} alt="" style={{width: '100%'}}/>
                </div>

            </div>

            <iframe
                ref={refIframe}
                title={channel}
                src={contentVideo_URL(channel)}
                frameBorder="0"
                allowFullScreen
                height={chat && chatPos === 'underVid' ? '20%' : '100%'}
                width={chat && chatPos === 'underVid' ? '75%' : '100%'}
            ></iframe>

            {
                chat && <iframe
                    title={'chat'}
                    id="chat_embed"
                    src={contentChat_URL(channel)}
                    frameBorder="0"
                    height={chatPos === 'underVideo' ? '80%' : '100%'}
                    width={chatPos === 'underVideo' ? '100%' : '30%'}></iframe>
            }

            <div className={'window-chat-wrapper'}
                 style={{
                     width: chatPos === 'underVideo' ? '100%' : '20px',
                     height: chatPos === 'underVideo' ? '20px' : '100%',
                     writingMode: chatPos === 'rightVideo'
                         ? 'vertical-rl'
                         : 'horizontal-tb'
                 }}
            >
                <div className={'window-handler-chatpos'}
                     style={{
                         width: chatPos === 'underVideo' ? '10%' : '100%',
                         height: chatPos === 'underVideo' ? '100%' : '10%',
                     }}
                     onClick={changeChatPosHandler}>{
                    chatPos === 'underVideo'
                        ? '🡆'
                        : '🡇'}
                </div>
                <div className={'window-chat-btn'}
                     style={{
                         width: chatPos === 'underVideo' ? '90%' : '20px',
                         height: chatPos === 'underVideo' ? '100%' : '90%',
                     }}
                     onClick={chatOpenCloseHandler}
                >
                    {chatPos === 'underVideo'
                        ? <>{chat ? '🡅 Close chat' : '🡇 Open chat'}</>
                        : <>{chat ? '🡇 Close chat' : '🡅 Open chat'}</>
                    }
                </div>
            </div>
        </div>
    }
)

