import {addNewWindow, WindowType} from '../Window/window-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import React, {useState} from 'react';
import './search.css'

export const Search = React.memo(() => {

    const dispatch = useDispatch()
    const windows = useSelector<RootState, WindowType[]>(state => state.window.windows)
    const [nameChannel, setNameChannel] = useState<string>('')
    const [error, setError] = useState<string | null>(null)


    function addNewWindowHandler() {
        if ((nameChannel.trim() !== '') && nameChannel !== windows.find(w => w.channel === nameChannel.trim())?.channel) {
            dispatch(addNewWindow(nameChannel.trim()))
            setNameChannel('')
            setError(null)
        } else {
            setError(`${nameChannel} exists`)
            setTimeout(()=>{
                 setError(null)
            }, 10000)
        }
    }

    return (
        <div className={'search'}>
            {error ? <div className={'search-error'}>{error}</div> : <></>}
            <input
                style={error ?  {border: '1px solid red'}: {}}
                type="text"
                   value={nameChannel}
                   onChange={(e) => setNameChannel(e.currentTarget.value)}/>
            <button onClick={addNewWindowHandler}>Add Channel</button>
        </div>
    );
})
