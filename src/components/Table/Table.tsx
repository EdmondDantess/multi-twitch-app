import React from 'react';
import './table.css'
import {Window} from '../Window/Window';
import {useSelector} from 'react-redux';
import {WindowType} from '../Window/window-reducer';
import {RootState} from '../../app/store';

export const Table = () => {

    const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)

    return (
        <div className={'table'}>

            <div className={'windows'}>
                {
                    windows.map((w, index) => {
                        return <Window channel={w.channel} key={index+Math.random()}/>
                    })
                }
            </div>
        </div>
    );
};

