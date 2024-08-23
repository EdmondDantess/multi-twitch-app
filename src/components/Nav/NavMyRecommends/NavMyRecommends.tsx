import React from 'react';
import { DataRecommends } from '../../../api/twitchAPI';
import { addNewWindow } from '../../Window/window-reducer';
import { setError } from '../../../app/userFeedback-reducer';
import { truncate } from '../../../helpers/truncateText';
import redDot from '../../../assets/icons/red_dot.png';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const NavMyRecommends = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.window.windows);
  const additinalData = useAppSelector((state) => state.nav.additionalData);
  const myFollows = useAppSelector((state) => state.nav.myFollows);
  const recommendsData = useAppSelector(
    (state) => state.nav.recommendedStreams,
  );

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
            className={'avatar-rec'}
          />
          <div className={'my-follow__line-title'}>
            <div className={'my-follow__line-title-left'}>
              {truncate(r.user_name)}
            </div>
            <div className={'my-follow__line-title-right'}>
              {truncate(r.game_name, 20)}
            </div>
          </div>
          <img src={redDot} alt="live" className={'live'} />
        </div>
      );
    });
  };

  return (
    <div className={'nav__my-follows'}>
      <span className={'labelboard'}>Other streams:</span>
      {generateMyRecommends()}
    </div>
  );
};

export default NavMyRecommends;
