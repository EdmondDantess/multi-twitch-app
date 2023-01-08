import React from 'react';
import {deleteWindow, WindowType} from '../Window/window-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import './nav.css'

export const Nav = React.memo(() => {
    const dispatch = useDispatch()
    const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)

    return (
        <div className={'nav'}>
            <div className={'nav-channels'}>Channels:{
                windows.map(w => {
                    return <div
                        key={w.channel}>{w.channel}
                        {/*<button className={'nav-channels-muteunmute'}*/}
                        {/*        onClick={() => dispatch(deleteWindow(w.channel))}>Mute</button>*/}
                        <button className={'nav-channels-delete'}
                                onClick={() => dispatch(deleteWindow(w.channel))}>X</button>
                    </div>
                })
            }
            </div>
        </div>
    );
})
