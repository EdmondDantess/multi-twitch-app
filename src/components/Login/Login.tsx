import React from 'react';
import logo from '../../assets/icons/logo_tw.png'
import './login.css'

export const Login = () => {

    const vercel = 'https%3A%2F%2Fmulti-twitch-app.vercel.app'
    const localhost = 'http://localhost:3000'



    return (
        <div className={'login'}>
            <h2>Multi Twitch</h2>
                <a
                    href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=8cux8z8nnvju38k96pniih4k0uijlb&redirect_uri=${localhost}/&scope=user%3Aedit%20user%3Aread%3Aemail`}>
                    <img src={logo} alt="logo" style={{height: '128px', marginTop: '-28px'}}/>
                    <span style={{marginTop:'-22px'}}>Connect with Twitch</span>
                </a>
        </div>
    );
};
