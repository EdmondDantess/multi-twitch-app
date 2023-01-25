import {deleteWindow, WindowType} from '../Window/window-reducer';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import React from 'react';
import './nav.css'
import close from '../../assets/icons/close.png'
import {useAppDispatch} from '../../app/hooks';

export const Nav = React.memo(() => {
    const dispatch = useAppDispatch()
    const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)

    const vercel = 'https%3A%2F%2Fmulti-twitch-app.vercel.app'
    const localhost = 'http://localhost:3000'

    return (
        <div className={'nav'}>
            <a href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=8cux8z8nnvju38k96pniih4k0uijlb&redirect_uri=${vercel}/&scope=user%3Aedit%20user%3Aread%3Aemail`}>Connect
                with Twitch</a>

            <div className={'nav-channels'}>Channels on board:{
                windows.map(w => {
                    return <div
                        className={'nav-channel'}
                        key={w.channel}>{w.channel}
                        {/*<button className={'nav-channels-muteunmute'}*/}
                        {/*        onClick={() => dispatch(deleteWindow(w.channel))}>Mute</button>*/}
                        <div className={'nav-channels-delete'}
                             onClick={() => dispatch(deleteWindow(w.channel))}>
                            <img src={close} alt={'delete icon'}/>
                        </div>
                    </div>
                })
            }
            </div>
        </div>
    );
})
