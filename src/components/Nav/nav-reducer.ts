import {AppThunk} from '../../app/store';
import {DataFollows, DataRecommends, twitchAPI, UserDataInfo} from '../../api/twitchAPI';
import {setError} from '../../app/userFeedback-reducer';

type InitStateType = typeof initialState

const initialState = {
    userData: {} as UserDataInfo,
    _myFollows: [] as DataFollows[],
    myFollows: [] as UserDataInfo[],
    recommendedStreams: [] as DataRecommends[],
}

export const navReducer = (state: InitStateType = initialState, action: NavReducerActionsType): InitStateType => {
    switch (action.type) {
        case 'nav/SET_USER_DATA':
            return {
                ...state, userData: action.payload.data
            }
        case 'nav/SET_RECOMMENDED':
            return {
                ...state, recommendedStreams: action.payload.data
            }
        case 'nav/SET_FOLLOWS':
            return {
                ...state,
                _myFollows: action.payload.dataForcalculate,
                myFollows: action.payload.data
            }
        default:
            return state
    }
}
export const setUserData = (data: UserDataInfo) => {
    return {
        type: 'nav/SET_USER_DATA',
        payload: {data}
    } as const
}
export const setMyFollows = (dataForcalculate: DataFollows[], data: UserDataInfo[]) => {
    return {
        type: 'nav/SET_FOLLOWS',
        payload: {
            dataForcalculate,
            data
        }
    } as const
}
export const setRecommendedStreams = (data: DataRecommends[]) => {
    return {
        type: 'nav/SET_RECOMMENDED',
        payload: {
            data
        }
    } as const
}
export const getUserData = (): AppThunk => async (dispatch) => {
    try {
        const res = await twitchAPI.getUserInfo()
        dispatch(setUserData(res.data.data[0]))
    } catch (e: any) {
        setError(e)
    }
}
export const getMyFollows = (id: string): AppThunk => async (dispatch, getState) => {
    try {
        const resforCalc = await twitchAPI.getMyFollowsApi(id)
        dispatch(setMyFollows(resforCalc.data.data, []))
        let ids: string = ''
        await getState().nav._myFollows.forEach(d => ids += `&id=${d.to_id}`)
        const res = await twitchAPI.getUserInfo(ids)
        dispatch(setMyFollows(resforCalc.data.data, res.data.data))
    } catch (e: any) {
        setError(e)
    }
}
export const getRecommendedStreams = (): AppThunk => async (dispatch) => {
    try {
        const res = await twitchAPI.getRecommendedStreams()
        dispatch(setRecommendedStreams(res.data.data))
    } catch (e: any) {
        setError(e)
    }
}

export type NavReducerActionsType =
    ReturnType<typeof setUserData> |
    ReturnType<typeof setMyFollows> |
    ReturnType<typeof setRecommendedStreams>



