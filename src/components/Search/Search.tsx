import { addNewWindow } from '../../store/reducers/window-reducer';
import React, { memo, useEffect, useState } from 'react';
import './search.css';
import {
  getSearchChannels,
  setSearchChannels,
} from '../../store/reducers/search-reducer';
import useDebounce from '../../hooks/useDebounce/useDebounce';
import { useAppDispatch, useAppSelector } from '../../hooks/hooksStore';
import { iconSelector } from '../../assets/iconSelector';
import { truncate } from '../../helpers/truncateText';

export const Search = memo(() => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.window.windows);
  const searchingChannels = useAppSelector(
    (state) => state.search.searchingChannels,
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const search = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    if (searchValue.trim() && search.trim() !== '') {
      dispatch(getSearchChannels(searchValue.trim()));
    }
    if (searchValue.trim() === '') {
      dispatch(setSearchChannels([]));
    }
  }, [dispatch, search, searchValue]);

  function addWindowOnBoard(channel: string) {
    windows.find((c) => c.channel === channel)
      ? setError('Channel is exist')
      : dispatch(addNewWindow(channel));
    clearSearchInput();
  }

  function clearSearchInput() {
    dispatch(setSearchChannels([]));
    setSearchValue('');
  }

  return (
    <div className={'search'}>
      {error && <div className={'search__error'}>{error}</div>}
      <div className={'search__input'}>
        <input
          placeholder={'Enter channel name'}
          type="text"
          value={searchValue}
          onChange={(e) =>
            e.currentTarget.value !== ';'
              ? setSearchValue(e.currentTarget.value)
              : null
          }
        />
        {searchValue !== '' && (
          <div onClick={clearSearchInput} className={'search__btn_clear'}>
            <img src={iconSelector.close} alt="clear" />
          </div>
        )}
      </div>
      {searchingChannels.length > 0 && (
        <div className={'search__channels-result'}>
          {searchingChannels?.map((c, index) => {
            return (
              <div
                key={index}
                className={'search__channel-result'}
                onClick={() => addWindowOnBoard(c.broadcaster_login)}
              >
                <img
                  src={c.thumbnail_url}
                  alt="streamer avatar"
                  className={'search__channel-result__avatar'}
                />
                <div>
                  <div>{truncate(c.display_name)}</div>
                  <div className={'display-name'}>
                    <span title={c.title}>{truncate(c.title)}</span>
                    <span>{truncate(c.game_name, 20)}</span>
                  </div>
                </div>
                <div>{c.is_live && <span className={'isLive'}>Live</span>}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
