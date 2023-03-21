import {
    addNewWindow,
    deleteWindow,
    WindowType,
} from '../Window/window-reducer';
import React, { useEffect } from 'react';
import './nav.css';
import close from '../../assets/icons/close.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    getMyFollows,
    getRecommendedStreams,
    getUserData,
} from './nav-reducer';
import { Search } from './Search/Search';
import { tokenMode } from '../../common/utils/modeLocalToVercel';
import { tokenFromURL } from '../../common/utils/getTokenFromURL';
import { setError } from '../../app/userFeedback-reducer';
import { DataRecommends } from '../../api/twitchAPI';

export const Nav = React.memo(() => {
    const dispatch = useAppDispatch();
    const windows = useAppSelector((state) => state.window.windows);
    const userData = useAppSelector((state) => state.nav.userData);
    const myFollows = useAppSelector((state) => state.nav.myFollows);
    const recommendsData = useAppSelector(
        (state) => state.nav.recommendedStreams,
    );
    const isLogged = tokenMode() !== tokenFromURL;

    useEffect(() => {
        !userData.id && isLogged && dispatch(getUserData());
        if (userData.id) {
            isLogged && dispatch(getMyFollows(userData.id));
            isLogged && dispatch(getRecommendedStreams());
        }
    }, [userData.id]);

    const generateListChannelsOnBoard = () => {
        return windows.map((w: WindowType) => {
            return (
                <div className={'nav_channel'} key={w.channel}>
                    {w.channel}
                    <div
                        className={'nav_channels_delete'}
                        onClick={() => dispatch(deleteWindow(w.channel))}
                    >
                        <img src={close} alt={'delete icon'} />
                    </div>
                </div>
            );
        });
    };

    const generateMyFollows = () => {
        return myFollows.map((f) => {
            const addOnBoard = () => {
                windows.filter(
                    (w) => w.channel.toLowerCase() === f.login.toLowerCase(),
                ).length === 0
                    ? dispatch(addNewWindow(f.login))
                    : dispatch(setError(`${f.login} is exist on board`));
            };
            return (
                <div
                    className={'nav_my_follow'}
                    key={f.id}
                    onClick={addOnBoard}
                >
                    <div style={{ marginLeft: '6px' }}>
                        <img
                            src={f.profile_image_url}
                            alt="avatar"
                            width={'30px'}
                        />
                        {f.display_name}
                    </div>
                </div>
            );
        });
    };

    const generateMyRecommends = () => {
        return recommendsData.map((r: DataRecommends) => {
            const addOnBoard = () => {
                windows.filter(
                    (w) =>
                        w.channel.toLowerCase() === r.user_login.toLowerCase(),
                ).length === 0
                    ? dispatch(addNewWindow(r.user_login))
                    : dispatch(setError(`${r.game_name} is exist on board`));
            };
            return (
                <div
                    className={'nav_my_follow'}
                    key={r.id}
                    onClick={addOnBoard}
                >
                    <span style={{ marginLeft: '6px' }}>
                        <b>{r.user_name} </b>
                        <div>game:{r.game_name}</div>
                    </span>
                </div>
            );
        });
    };

    return (
        <div className={'nav'}>
            <div className={'nav_userinfo'} title={'open settings'}>
                <div className={'nav_userinfo_nickname'}>
                    <a
                        href="https://www.twitch.tv/settings/profile"
                        target={'_blank'}
                        rel={'noreferrer'}
                    >
                        <img src={userData?.profile_image_url} alt="avatar" />
                        <div className={'nav_userinfo_nickname_wrapper'}>
                            <span
                                style={{ fontSize: '10px', fontWeight: '400' }}
                            >
                                You logged as:
                            </span>
                            <span>{userData?.login}</span>
                            <span
                                style={{ fontSize: '10px', fontWeight: '400' }}
                            >
                                {userData?.email}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
            <Search />
            {generateListChannelsOnBoard().length > 0 && (
                <>
                    <span>Channels on board:</span>
                    <div className={'nav_channels'}>
                        {generateListChannelsOnBoard()}
                    </div>
                </>
            )}
            {generateMyFollows().length > 0 && (
                <>
                    <span>My subscribes:</span>
                    <div className={'nav_myfollows'}>
                        {myFollows.length > 0 && generateMyFollows()}
                    </div>
                </>
            )}
            <span>Other streams:</span>
            <div className={'nav_myfollows'}>{generateMyRecommends()}</div>
        </div>
    );
});
