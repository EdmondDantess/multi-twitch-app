import React from 'react';
import logo from '../../assets/icons/logo_tw.png';
import './login.css';
import { mode } from '../../common/utils/modeLocalToVercel';

export const Login = () => {
    return (
        <div className={'login'}>
            <h2>Multi Twitch</h2>
            <a
                href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${mode}/&scope=user%3Aedit%20user%3Aread%3Aemail`}
            >
                <img
                    src={logo}
                    alt="logo"
                    style={{ height: '128px', marginTop: '-28px' }}
                />
                <span style={{ marginTop: '-22px' }}>Connect via Twitch</span>
            </a>
        </div>
    );
};
