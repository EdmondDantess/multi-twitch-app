import {WindowType} from '../Window/window-reducer';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';
import {Window} from '../Window/Window';
import React from 'react';
import './table.css'

export const Table = React.memo(() => {
    const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)

    return (
        <div className={'table'}>
            <div className={'windows'}>
                {windows.map(w => {
                    return <Window channel={w.channel} key={w.channel}/>
                })}
            </div>
        </div>)
})

