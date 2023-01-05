import React, {useState} from 'react';
import './table.css'
import {Window} from '../Window/Window';
import {useDispatch, useSelector} from 'react-redux';
import {addNewWindow, deleteWindow, WindowType} from '../Window/window-reducer';
import {RootState} from '../../app/store';

export const Table = () => {
    const dispatch = useDispatch()

    const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)

    const [nameChannel, setNameChannel] = useState<string>('')

    function addNewWindowHandler() {
        dispatch(addNewWindow(nameChannel))
        setNameChannel('')
    }

    return (
        <div className={'table'}>
            <div style={{color: 'white', fontSize: '30px', fontWeight: 'bold'}}>channels: {
                windows.map(w => {
                    return <span
                        key={w.channel}
                        style={{color: 'red', cursor: 'pointer'}}
                        onClick={() => dispatch(deleteWindow(w.channel))}> {w.channel}</span>
                })
            }</div>

            <input type="text" value={nameChannel} onChange={(e) => setNameChannel(e.currentTarget.value)}/>
            <button onClick={addNewWindowHandler}>ADD</button>

            <div className={'windows'}>
                {
                    windows.map((w, index) => {
                        return <Window channel={w.channel} key={index}/>
                    })
                }
            </div>
        </div>
    );
};

