import React, {useEffect} from 'react';
import './App.css';
import {Table} from '../components/Table/Table';
import {Nav} from '../components/Nav/Nav';
import {useAppDispatch, useAppSelector} from './hooks';
import {setToken} from '../components/Login/login-reducer';
import {Login} from '../components/Login/Login';

function App() {
    const location = window.location.href
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.login.token)

    useEffect(() => {
        dispatch(setToken(location.slice(location.indexOf('access_token=') + 13, location.indexOf('&scope='))))
    }, [dispatch, location, token])
    console.log(token)

    return <div className="App">
        {
            token === ('host:3000' || 'i-twitch-app.vercel.app')
                ? <Login/>
                : <>
                    <Nav/>
                    <Table/>
                </>

        }
    </div>
}

export default App;
