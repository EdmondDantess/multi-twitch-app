import { addNewWindow } from '../../Window/window-reducer';
import React, { useEffect, useState } from 'react';
import './search.css';
import { getSearchChannels, setSearchChannels } from './search-reducer';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import close from '../../../assets/icons/close.png';

export const Search = React.memo(() => {
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
    }, [search, searchValue]);

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
            {error && <div className={'search_error'}>{error}</div>}
            <div className={'search_input_wrapper'}>
                <input
                    placeholder={'Enter channel name'}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.currentTarget.value)}
                />
                {searchValue !== '' && (
                    <div
                        onClick={clearSearchInput}
                        className={'search_clear_btn'}
                    >
                        <img src={close} alt="clear" />
                    </div>
                )}
            </div>
            {searchingChannels.length > 0 && (
                <div
                    className={'search_result_channels'}
                    onBlur={clearSearchInput}
                >
                    {searchingChannels.map((c) => {
                        return (
                            <div
                                key={c.broadcaster_login}
                                className={'search_result_channel'}
                                onClick={() =>
                                    addWindowOnBoard(c.broadcaster_login)
                                }
                            >
                                <img
                                    src={c.thumbnail_url}
                                    alt="streamer avatar"
                                    className={'search_streamer_avatar'}
                                />
                                <div>
                                    <div>{c.display_name}</div>
                                    <div style={{ fontSize: '12px' }}>
                                        {c.title.length > 20 ? (
                                            <span title={c.title}>
                                                {c.title
                                                    .slice(0, 20)
                                                    .concat('...')}
                                            </span>
                                        ) : (
                                            <span>{c.title}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {c.is_live && (
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'white',
                                                backgroundColor: 'red',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            Live
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
});
