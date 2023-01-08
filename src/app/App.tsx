import React from 'react';
import './App.css';
import {Table} from '../components/Table/Table';
import {Nav} from '../components/Nav/Nav';
import {Search} from '../components/Search/Search';

function App() {
    return <div className="App">
        <div className={'App-nav-wrapper'}>
            <Search/>
            <Nav/>
        </div>
        <Table/>
    </div>

}

export default App;
