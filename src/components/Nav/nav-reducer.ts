import {AppThunk} from '../../app/store';
import {DataFollows, twitchAPI, UserDataInfo} from '../../api/twitchAPI';

type InitStateType = typeof initialState

const initialState = {
    userData: {} as UserDataInfo,
    myFollows: [] as DataFollows[]
}

export const navReducer = (state: InitStateType = initialState, action: NavReducerActionsType): InitStateType => {
    switch (action.type) {
        case 'nav/SET_USER_DATA':
            return {
                ...state, userData: action.payload.data
            }
        case 'nav/SET_FOLLOWS':
            return {
                ...state, myFollows: action.payload.data
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
export const setMyFollows = (data: DataFollows[]) => {
    return {
        type: 'nav/SET_FOLLOWS',
        payload: {data}
    } as const
}
export const getUserData = (token: string): AppThunk => async (dispatch) => {
    try {
        const res = await twitchAPI.getUserInfo(token)
        dispatch(setUserData(res.data.data[0]))
    } catch (e: any) {
        alert(e)
    }
}
export const getMyFollows = (token: string, id: string): AppThunk => async (dispatch) => {
    try {
        const res = await twitchAPI.getMyFollowsApi(token, id)
        dispatch(setMyFollows(res.data.data))
    } catch (e: any) {
        alert(e)
    }
}

export type NavReducerActionsType = ReturnType<typeof setUserData> | ReturnType<typeof setMyFollows>



