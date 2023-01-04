import React from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import './window.css'

type WindowPropsType = {
    chat?: boolean
    channel: string
}

export const Window: React.FC<WindowPropsType> = ({channel, chat}) => {

    return (
        <div className={'window'}>
            <ReactTwitchEmbedVideo channel={channel} chat={'mobile'} layout={'video'} height={'300px'}/>
        </div>
    );
};
