import { deleteWindow, setChatOpenClose, setChatPos } from './window-reducer'
import React from 'react'
import './window.css'
import { contentChat_URL, contentVideo_URL } from './utils/iframeContent'
import close from '../../assets/icons/close.png'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

type WindowPropsType = {
    channel: string
}

export const Window: React.FC<WindowPropsType> = ({ channel }) => {
    const dispatch = useAppDispatch()

    const chat = useAppSelector(
        (state) => state.window.windows.find((w) => w.channel === channel)!.chat
    )
    const chatPos = useAppSelector(
        (state) =>
            state.window.windows.find((w) => w.channel === channel)!
                .chatPosition
    )

    function chatOpenCloseHandler() {
        dispatch(setChatOpenClose(channel))
    }

    function deleteWindowHandler() {
        dispatch(deleteWindow(channel))
    }

    function changeChatPosHandler() {
        dispatch(
            setChatPos(
                channel,
                chatPos === 'underVideo' ? 'rightVideo' : 'underVideo'
            )
        )
    }

    function calcPropertyPosChat(value1: string, value2: string): any {
        return chatPos === 'underVideo' ? value1 : value2
    }

    return (
        <div
            className={`window overflow-clip`}
            style={{ flexDirection: calcPropertyPosChat('column', 'row') }}
        >
            <div className={'window__channel-name'}>{channel}</div>
            <div className={'window__handler'}>
                <div className={'window__delete'} onClick={deleteWindowHandler}>
                    <img src={close} alt="delete icon" className={'w-full'} />
                </div>
            </div>

            <iframe
                title={channel}
                src={contentVideo_URL(channel)}
                allowFullScreen
                width={calcPropertyPosChat('100%', chat ? '67%' : '100%')}
                height={chat && chatPos === 'underVideo' ? '33%' : '100%'}
            />
            {chat && (
                <iframe
                    title={'chat'}
                    src={contentChat_URL(channel)}
                    height={calcPropertyPosChat('67%', '100%')}
                    width={calcPropertyPosChat('100%', '33%')}
                />
            )}
            <div
                className={'window__chat'}
                style={{
                    width: calcPropertyPosChat('100%', '20px'),
                    height: calcPropertyPosChat('20px', '100%'),
                    writingMode: calcPropertyPosChat(
                        'horizontal-tb',
                        'vertical-rl'
                    ),
                }}
            >
                <div
                    className={'window__chat-pos'}
                    style={{
                        width: calcPropertyPosChat('10%', '100%'),
                        height: calcPropertyPosChat('100%', '10%'),
                    }}
                    onClick={changeChatPosHandler}
                >
                    {calcPropertyPosChat('🡆', '🡇')}
                </div>
                <div
                    className={'window__chat__btn'}
                    style={{
                        width: calcPropertyPosChat('90%', '20px'),
                        height: calcPropertyPosChat('100%', '90%'),
                    }}
                    onClick={chatOpenCloseHandler}
                >
                    {calcPropertyPosChat(
                        chat ? '🡅 Close chat' : '🡇 Open chat',
                        chat ? '🡇 Close chat' : '🡅 Open chat'
                    )}
                </div>
            </div>
        </div>
    )
}
