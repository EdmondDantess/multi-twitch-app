import React, {useState} from 'react';
import {addNewWindow} from '../Window/window-reducer';
import {useDispatch} from 'react-redux';
import './search.css'

export const Search = () => {

    const dispatch = useDispatch()
    const [nameChannel, setNameChannel] = useState<string>('')

    function addNewWindowHandler() {
        if (nameChannel.trim() !== '') {
            dispatch(addNewWindow(nameChannel.trim()))
            setNameChannel('')
        }
        setNameChannel('')
    }

    return (
        <div className={'search'}>
            <input type="text" value={nameChannel} onChange={(e) => setNameChannel(e.currentTarget.value)}/>
            <button onClick={addNewWindowHandler}>Add Channel</button>
        </div>
    );
};
