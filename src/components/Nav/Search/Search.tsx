import { addNewWindow } from '../../Window/window-reducer'
import React, { useEffect, useState } from 'react'
import './search.css'
import { getSearchChannels, setSearchChannels } from './search-reducer'
import useDebounce from '../../../hooks/useDebounce/useDebounce'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import close from '../../../assets/icons/close.png'

export const Search = React.memo(() => {
    const dispatch = useAppDispatch()
    const windows = useAppSelector((state) => state.window.windows)
    const searchingChannels = useAppSelector(
        (state) => state.search.searchingChannels
    )
    const [searchValue, setSearchValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const search = useDebounce<string>(searchValue, 500)

    useEffect(() => {
        if (searchValue.trim() && search.trim() !== '') {
            dispatch(getSearchChannels(searchValue.trim()))
        }
        if (searchValue.trim() === '') {
            dispatch(setSearchChannels([]))
        }
    }, [dispatch, search, searchValue])

    function addWindowOnBoard(channel: string) {
        windows.find((c) => c.channel === channel)
            ? setError('Channel is exist')
            : dispatch(addNewWindow(channel))
        clearSearchInput()
    }

    function clearSearchInput() {
        dispatch(setSearchChannels([]))
        setSearchValue('')
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
                    <div
                        onClick={clearSearchInput}
                        className={'search__btn_clear'}
                    >
                        <img src={close} alt="clear" />
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
                                onClick={() =>
                                    addWindowOnBoard(c.broadcaster_login)
                                }
                            >
                                <img
                                    src={c.thumbnail_url}
                                    alt="streamer avatar"
                                    className={'search__channel-result__avatar'}
                                />
                                <div>
                                    <div>{c.display_name}</div>
                                    <div className={'text-xs'}>
                                        {c.title.length > 20 ? (
                                            <span title={c.title}>
                                                {c.title
                                                    .slice(0, 20)
                                                    .concat('...')}
                                            </span>
                                        ) : (
                                            <span>{c.game_name}</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {c.is_live && (
                                        <span
                                            className={
                                                'absolute right-0  rounded-ee bg-red-600 font-bold text-white'
                                            }
                                        >
                                            Live
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
})
