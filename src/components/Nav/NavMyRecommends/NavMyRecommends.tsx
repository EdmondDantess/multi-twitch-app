import React from 'react';
import { DataRecommends } from '../../../api/twitchAPI';
import { addNewWindow } from '../../../store/reducers/window-reducer';
import { setError } from '../../../store/reducers/userFeedback-reducer';
import { truncate } from '../../../helpers/truncateText';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooksStore';
import { iconSelector } from '../../../assets/iconSelector';

const NavMyRecommends = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.window.windows);
  const additionalData = useAppSelector((state) => state.nav.additionalData);
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

      const user = additionalData?.find((el) => el.id === r.user_id);

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
          <img src={iconSelector.redDot} alt="live" className={'live'} />
        </div>
      );
    });
  };

  return (
    <div className={'nav__my-follows'}>
      <div className={'labelboard'}>Other streams:</div>
      {generateMyRecommends()}
    </div>
  );
};

export default NavMyRecommends;
