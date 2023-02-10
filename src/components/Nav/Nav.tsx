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
                className={'nav_channel'}
                key={w.channel}>
                {w.channel}
                <div className={'nav_channels_delete'}
                     onClick={() => dispatch(deleteWindow(w.channel))}>
                    <img src={close} alt={'delete icon'}/>
                </div>
            </div>
        })
    }

    const generateMyFollows = () => {
        return myFollows.map((f) => {
            const addOnBoard = () => {
                windows.filter(w => w.channel.toLowerCase() === f.login.toLowerCase()).length === 0
                    ? dispatch(addNewWindow(f.login))
                    : alert(`${f.login} is exist`)
            }
            return <div className={'nav_my_follow'} key={f.id}
                        onClick={addOnBoard}>
                <span style={{marginLeft: '6px'}}>
                    <img src={f.profile_image_url} alt="avatar" width={'30px'}/>
                    {f.display_name}</span>
            </div>
        })
    }

    return (
        <div className={'nav'}>
            <div className={'nav_userinfo'} title={'open settings'}>
                <div className={'nav_userinfo_nickname'}>
                    <a href="https://www.twitch.tv/settings/profile" target={'_blank'} rel={'noreferrer'}>
                        <img src={userData?.profile_image_url} alt="avatar"/>
                        <div className={'nav_userinfo_nickname_wrapper'}>
                            <span style={{fontSize: '10px', fontWeight: '400'}}>You logged as:</span>
                            <span>{userData?.login}</span>
                            <span style={{fontSize: '10px', fontWeight: '400'}}>{userData?.email}</span>
                        </div>
                    </a>
                </div>
            </div>
            <Search/>
            <div className={'nav_channels'}>
                <div>Channels on board:</div>
                {generateListChannelsOnBoard()}
            </div>
            <div className={'nav_myfollows'}>
                <div>My subscriptions:</div>
                {myFollows.length > 0 && generateMyFollows()}
            </div>
        </div>
    );
})
