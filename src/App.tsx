import React from 'react';
import './App.css';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"

function App() {
    return <div className="App">
        <ReactTwitchEmbedVideo channel="dreadztv" layout={'video'} height={'300px'} />
        <ReactTwitchEmbedVideo channel="bratiki94" layout={'video'} height={'300px'} />
        <ReactTwitchEmbedVideo channel="restoratorgame" layout={'video'} height={'300px'} />
        <ReactTwitchEmbedVideo channel="tommykaylive" layout={'video'} height={'300px'} />
    </div>

}

export default App;
