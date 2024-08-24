import React from 'react';
import {
  deleteWindow,
  WindowType,
} from '../../../store/reducers/window-reducer';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooksStore';
import { iconSelector } from '../../../assets/iconSelector';

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
            <img src={iconSelector.close} alt={'delete icon'} />
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
