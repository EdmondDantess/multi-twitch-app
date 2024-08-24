import React from 'react';
import './login.css';
import { mode } from '../../common/utils/modeLocalToVercel';
import { iconSelector } from '../../assets/iconSelector';

export const Login = () => {
  return (
    <div className={'login'}>
      <a
        href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${mode}/&scope=user:read:follows`}
      >
        <h2>Multi Twitch</h2>
        <img src={iconSelector.logoTW} alt="logo" />
        <span>Connect via Twitch</span>
      </a>
    </div>
  );
};
