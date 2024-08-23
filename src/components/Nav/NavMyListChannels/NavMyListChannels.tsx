import React from 'react';
import { deleteWindow, WindowType } from '../../Window/window-reducer';
import close from '../../../assets/icons/close.png';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const NavMyListChannels = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.window.windows);

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

  return (
    <div className={'nav__channels-onboard'}>
      <span>Channels on board:</span>
      {generateListChannelsOnBoard()}
    </div>
  );
};

export default NavMyListChannels;
