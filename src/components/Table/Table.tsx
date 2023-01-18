import {WindowType} from '../Window/window-reducer';
import {RootState} from '../../app/store';
import {useSelector} from 'react-redux';
import {Window} from '../Window/Window';
import React from 'react';
import './table.css'
import {useDraggable} from '@dnd-kit/core';

export const Table = React.memo(() => {
    const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)

    const {attributes, listeners, setNodeRef} = useDraggable({
        id: Math.random(),
    });

    return (
        <div className={'table'} style={{resize: 'vertical'}} ref={setNodeRef}>
            <div className={'windows'}>
                {
                    windows.map(w => {
                        return <div {...listeners} {...attributes}><Window channel={w.channel} key={w.channel}/></div>
                    })
                }
            </div>
        </div>
    );
})

