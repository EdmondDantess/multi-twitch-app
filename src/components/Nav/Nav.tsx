import {
    addNewWindow,
    deleteWindow,
    WindowType,
} from '../Window/window-reducer'
import React, { useEffect } from 'react'
import './nav.css'
import close from '../../assets/icons/close.png'
import red_dot from '../../assets/icons/red_dot.png'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getMyFollows, getRecommendedStreams, getUserData } from './nav-reducer'
import { Search } from './Search/Search'
import { tokenMode } from '../../common/utils/modeLocalToVercel'
import { tokenFromURL } from '../../common/utils/getTokenFromURL'
import { setError } from '../../app/userFeedback-reducer'
import { DataRecommends, LiveFollowsDataData } from '../../api/twitchAPI'

export const Nav = React.memo(() => {
    const dispatch = useAppDispatch()
    const windows = useAppSelector((state) => state.window.windows)
    const userData = useAppSelector((state) => state.nav.userData)
    const liveFollows = useAppSelector((state) => state.nav.liveFollows)
    const additinalData = useAppSelector((state) => state.nav.additionalData)
    const myFollows = useAppSelector((state) => state.nav.myFollows)
    const recommendsData = useAppSelector(
        (state) => state.nav.recommendedStreams
    )
    const isLogged = tokenMode() !== tokenFromURL

    useEffect(() => {
        !userData.id && isLogged && dispatch(getUserData())
        if (userData.id) {
            isLogged && dispatch(getMyFollows(userData.id))
            isLogged && dispatch(getRecommendedStreams())
        }
    }, [userData.id, dispatch, isLogged])

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
            )
        })
    }

    const generateMyFollows = () => {
        let follows: LiveFollowsDataData[] = [...liveFollows]
        return follows.map((f) => {
            const addOnBoard = () => {
                windows.filter(
                    (w) => w.channel.toLowerCase() === f.user_name.toLowerCase()
                ).length === 0
                    ? dispatch(addNewWindow(f.user_name))
                    : dispatch(setError(`${f.user_name} is exist on board`))
            }
            let currUser = myFollows?.find((el) => el.id === f.user_id)

            return (
                <div
                    className={'nav__my-follow'}
                    key={f.id}
                    onClick={addOnBoard}
                    title={f.title}
                >
                    <div
                        className={
                            'relative  flex flex-row overflow-clip whitespace-nowrap'
                        }
                    >
                        <img
                            src={currUser?.profile_image_url}
                            alt="avatar"
                            width={'48px'}
                            className={'rounded-r-2xl'}
                        />
                        <div className={'w-full'}>
                            <div className={'w-full text-left'}>
                                {f.user_name}
                            </div>
                            <div className={'w-full text-left'}>
                                {f.game_name}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const generateMyRecommends = () => {
        let recommends: DataRecommends[] = [
            ...recommendsData.filter((r) => r.language === 'ru'),
            ...recommendsData.filter((r) => r.language !== 'ru'),
        ]

        return recommends.map((r: DataRecommends) => {
            const addOnBoard = () => {
                windows.filter((w) => w.channel.toLowerCase() === r.user_login)
                    .length === 0
                    ? dispatch(addNewWindow(r.user_login))
                    : dispatch(setError(`${r.user_login} is exist on board`))
            }
            let user = additinalData?.find((el) => el.id === r.user_id)
            return (
                <div
                    className={'nav__my-follow'}
                    key={r.id}
                    onClick={addOnBoard}
                >
                    <img
                        src={user?.profile_image_url}
                        alt="avatar"
                        width={'48px'}
                        className={'rounded-r-2xl'}
                    />
                    <div
                        className={
                            'flex w-full flex-col overflow-clip whitespace-nowrap text-left'
                        }
                    >
                        <div className={'font-bold'}>{r.user_name}</div>
                        <div className={'text-right'}>{r.game_name}</div>
                    </div>
                    <img src={red_dot} alt="live" className={'h-4'} />
                </div>
            )
        })
    }

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
                    <span>My subscribes in Live:</span>
                    <div className={'nav__my-follows'}>
                        {generateMyFollows()}
                    </div>
                </>
            )}
            <span>Other streams:</span>
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
    )
})
