import {deleteWindow, WindowType} from '../Window/window-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import React from 'react';
import './nav.css'
import close from '../../assets/icons/close.png'


export const Nav = React.memo(() => {
    const dispatch = useDispatch()
    const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)

    return (
        <div className={'nav'}>
            <div className={'nav-channels'}>Channels:{
                windows.map(w => {
                    return <div
                        className={'nav-channel'}
                        key={w.channel}>{w.channel}
                        {/*<button className={'nav-channels-muteunmute'}*/}
                        {/*        onClick={() => dispatch(deleteWindow(w.channel))}>Mute</button>*/}
                        <div className={'nav-channels-delete'}
                                onClick={() => dispatch(deleteWindow(w.channel))}>
                            <img src={close} alt={'del'}/>
                        </div>
                    </div>
                })
            }
            </div>
        </div>
    );
})
