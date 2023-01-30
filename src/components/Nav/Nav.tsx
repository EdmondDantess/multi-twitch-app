import {addNewWindow, deleteWindow, WindowType} from '../Window/window-reducer';
import React, {useEffect} from 'react';
import './nav.css'
import close from '../../assets/icons/close.png'
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getMyFollows, getUserData} from './nav-reducer';
import {Search} from './Search/Search';

export const Nav = React.memo(() => {

    const dispatch = useAppDispatch()
    const windows = useAppSelector(state => state.window.windows)
    const token = useAppSelector(state => state.login.token)
    const userData = useAppSelector(state => state.nav.userData)
    const myFollows = useAppSelector(state => state.nav.myFollows)

    useEffect(() => {
        dispatch(getUserData(token))
        dispatch(getMyFollows(token, userData.id))
    }, [])

    const generateListChannelsOnBoard = () => {
        return windows.map((w: WindowType) => {
            return <div
                className={'nav-channel'}
                key={w.channel}>
                {w.channel}
                <div className={'nav-channels-delete'}
                     onClick={() => dispatch(deleteWindow(w.channel))}>
                    <img src={close} alt={'delete icon'}/>
                </div>
            </div>
        })
    }

    const generateMyFollows = () => {
        return myFollows.map((f) => {
            return <div className={'nav-my-follow'}
                onClick={()=>dispatch(addNewWindow(f.to_login))}>
             <span style={{marginLeft: '6px'}}>  {f.to_name}</span>
            </div>
        })
    }

    return (
        <div className={'nav'}>
            <div className={'nav-userinfo'}>
                <div className={'nav-userinfo__nickname'}>
                    <a href="https://www.twitch.tv/settings/profile" target={'_blank'} rel={'noreferrer'}>
                        <img src={userData?.profile_image_url} alt="avatar"/>
                        <span>{userData?.login}</span>
                    </a>
                </div>
            </div>
            <Search/>
            <div className={'nav-channels'}>
                <div>Channels on board:</div>
                {generateListChannelsOnBoard()}
            </div>
            <div className={'nav-myfollows'}>
                <div>My subscriptions:</div>
                {generateMyFollows()}
            </div>
        </div>
    );
})
