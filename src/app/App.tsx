import React, {useEffect} from 'react';
import './App.css';
import {Table} from '../components/Table/Table';
import {useAppDispatch, useAppSelector} from './hooks';
import { setToken} from '../components/Login/login-reducer';
import {Login} from '../components/Login/Login';
import {location, tokenMode} from '../common/utils/modeLocalToVercel';
import {Nav} from '../components/Nav/Nav';

function App() {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.login.token)

    useEffect(() => {
        dispatch(setToken(location))
    }, [dispatch, token])

    return <div className="App">
        {
            tokenMode() === token
                ? <Login/>
                : <>
                    <Nav/>
                    <Table/>
                </>

        }
    </div>
}

export default App;
