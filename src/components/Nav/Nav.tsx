import {
  addNewWindow,
  deleteWindow,
  WindowType,
} from '../Window/window-reducer';
import React, { memo, useEffect } from 'react';
import './nav.css';
import close from '../../assets/icons/close.png';
import redDot from '../../assets/icons/red_dot.png';
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
import { DataRecommends, LiveFollowsDataData } from '../../api/twitchAPI';

export const Nav = memo(() => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.window.windows);
  const userData = useAppSelector((state) => state.nav.userData);
  const liveFollows = useAppSelector((state) => state.nav.liveFollows);
  const additinalData = useAppSelector((state) => state.nav.additionalData);
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

  const generateListChannelsOnBoard = () => {
    return windows.map((w: WindowType) => {
      return (
        <div className={'nav__channel'} key={w.channel}>
          {w.channel}
          <div
            className={'nav__channels-delete'}
            onClick={() => dispatch(deleteWindow(w.channel))}
          >
            <img src={close} alt={'delete icon'} />
          </div>
        </div>
      );
    });
  };

  const generateMyFollows = () => {
    const follows: LiveFollowsDataData[] = [...liveFollows];
    return follows.map((f) => {
      const addOnBoard = () => {
        windows.filter((w) => w.channel === f.user_name).length === 0
          ? dispatch(addNewWindow(f.user_name))
          : dispatch(setError(`${f.user_name} is exist on board`));
      };
      const currUser = myFollows?.find((el) => el.id === f.user_id);

      return (
        <div
          className={'nav__my-follow'}
          key={f.id}
          onClick={addOnBoard}
          title={f.title}
        >
          <div className={'my-follow__line'}>
            <img
              src={currUser?.profile_image_url}
              alt="avatar"
              width={'48px'}
            />
            <div className={'my-follow__line-title'} title={f.title}>
              <div className={'my-follow__line-title-left'}>{f.user_name}</div>
              <div className={'my-follow__line-title-right'}>{f.game_name}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  const generateMyRecommends = () => {
    return recommendsData.map((r: DataRecommends) => {
      if (myFollows.find((el) => el.login === r.user_login)) return null;
      const addOnBoard = () => {
        windows.filter((w) => w.channel === r.user_login).length === 0
          ? dispatch(addNewWindow(r.user_login))
          : dispatch(setError(`${r.user_login} is exist on board`));
      };
      const user = additinalData?.find((el) => el.id === r.user_id);
      return (
        <div className={'nav__my-follow'} key={r.id} onClick={addOnBoard}>
          <img
            src={user?.profile_image_url}
            alt="avatar"
            width={'48px'}
            className={'rounded-r-2xl border-2 border-purple-500 bg-black'}
          />
          <div
            className={
              'flex w-full flex-col overflow-clip whitespace-nowrap text-left'
            }
          >
            <div className={'font-bold'}>{r.user_name}</div>
            <div className={'text-right text-sm'}>{r.game_name}</div>
          </div>
          <img src={redDot} alt="live" className={'h-4'} />
        </div>
      );
    });
  };

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
      {generateMyFollows().length > 0 && (
        <>
          <span className={'font-bold'}>
            My subscribes in
            <span className={'rounded-[4px] bg-red-600 p-[1px]'}>Live</span>(
            {myFollows.length}):
          </span>
          <div className={'nav__my-follows'}>{generateMyFollows()}</div>
        </>
      )}
      <span className={'font-bold'}>Other streams:</span>
      <div className={'nav__my-follows'}>{generateMyRecommends()}</div>
      {generateListChannelsOnBoard().length > 0 && (
        <>
          <span>Channels on board:</span>
          <div className={'nav__channels-onboard'}>
            {generateListChannelsOnBoard()}
          </div>
        </>
      )}
    </div>
  );
});
