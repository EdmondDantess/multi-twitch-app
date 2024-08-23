import React from 'react';
import { LiveFollowsDataData } from '../../../api/twitchAPI';
import { addNewWindow } from '../../Window/window-reducer';
import { setError } from '../../../app/userFeedback-reducer';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { truncate } from '../../../helpers/truncateText';

const NavMySubscribes = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.window.windows);
  const liveFollows = useAppSelector((state) => state.nav.liveFollows);
  const myFollows = useAppSelector((state) => state.nav.myFollows);

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
              <div className={'my-follow__line-title-left'}>
                {truncate(f.user_name)}
              </div>
              <div className={'my-follow__line-title-right'}>
                {truncate(f.game_name, 20)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={'nav__my-follows'}>
      <span className={'labelboard'}>
        My subscribes in
        <span className={'rounded-[4px] bg-red-600 p-[1px]'}> Live</span>(
        {myFollows.length}):
      </span>
      {generateMyFollows()}
    </div>
  );
};

export default NavMySubscribes;
