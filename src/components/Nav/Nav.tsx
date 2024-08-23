import React, { memo, useEffect } from 'react';
import './nav.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getMyFollows,
  getRecommendedStreams,
  getUserData,
} from './nav-reducer';
import { Search } from './Search/Search';
import { tokenMode } from '../../common/utils/modeLocalToVercel';
import { tokenFromURL } from '../../common/utils/getTokenFromURL';
import NavMySubscribes from './navMySubscribes/NavMySubscribes';
import NavMyRecommends from './NavMyRecommends/NavMyRecommends';
import NavMyListChannels from './NavMyListChannels/NavMyListChannels';

export const Nav = memo(() => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.nav.userData);

  const isLogged = tokenMode() !== tokenFromURL;

  useEffect(() => {
    !userData.id && isLogged && dispatch(getUserData());
    if (userData.id) {
      isLogged && dispatch(getMyFollows(userData.id));
      isLogged && dispatch(getRecommendedStreams());
    }
  }, [userData.id, dispatch, isLogged]);

  useEffect(() => {
    const idIntervalLiveFollows = setInterval(() => {
      console.log('mylives');
      dispatch(getMyFollows(userData.id));
    }, 300000);
    const idIntervalRecommends = setInterval(() => {
      console.log('recommends');
      dispatch(getRecommendedStreams());
    }, 1500000);

    return () => {
      console.log('cleared');
      clearInterval(idIntervalLiveFollows);
      clearInterval(idIntervalRecommends);
    };
  }, [userData.id, isLogged]);

  return (
    <div className={'nav'}>
      <div className={'nav__userinfo'} title={'open settings'}>
        <div className={'nav__userinfo__nickname'}>
          <a
            href="https://www.twitch.tv/settings/profile"
            target={'_blank'}
            rel={'noreferrer'}
          >
            <img src={userData?.profile_image_url} alt="avatar" />
            <div className={'nav__userinfo__nickname-wrapper'}>
              <span>You logged as:</span>
              <span>{userData?.login}</span>
              <span>{userData?.email}</span>
            </div>
          </a>
        </div>
      </div>
      <Search />
      <NavMySubscribes />
      <NavMyRecommends />
      <NavMyListChannels />
    </div>
  );
});
