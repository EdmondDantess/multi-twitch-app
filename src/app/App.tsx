import React, {useEffect, useState} from 'react';
import './App.css';
import {Table} from '../components/Table/Table';
import {Nav} from '../components/Nav/Nav';
import {Search} from '../components/Search/Search';
import {setToken} from './app-reducer';
import {useAppDispatch, useAppSelector} from './hooks';
import axios from 'axios';

function App() {
    const location = window.location.href
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.app.token)
    const [userId, setUserId] = useState('')

    useEffect(() => {
        dispatch(setToken(location.slice(location.indexOf('access_token=') + 13, location.indexOf('&scope='))))
        if (token !== '') {
            axios.get('https://api.twitch.tv/helix/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb',
                }
            }).then(d => setUserId(d.data.data.id))
        }
    }, [dispatch, location])

    useEffect(() => {
        if (userId !== '') {
            axios.get(`https://api.twitch.tv/helix/users?id=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb',
                }
            }).then(d => console.log(d)).catch(e => console.log(e))
        }
    }, [userId])

    return <div className="App">
        <div className={'App-nav-wrapper'}>
            <Search/>
            <Nav/>
        </div>
        <Table/>
    </div>

}

export default App;
