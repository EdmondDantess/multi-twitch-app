import {AppThunk} from '../../app/store';
import {twitchAPI, UserDataInfo} from '../../api/twitchAPI';

type InitStateType = typeof initialState

const initialState = {
    userData: {} as UserDataInfo
}

export const navReducer = (state: InitStateType = initialState, action: NavReducerActionsType): InitStateType => {
    switch (action.type) {
        case 'nav/SET_USER_DATA':
            return {
                ...state, userData: action.payload.data
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

export const getUserData = (token: string): AppThunk => async (dispatch) => {
    try {
        const res = await twitchAPI.getUserInfo(token)
        console.log(res)
        dispatch(setUserData(res.data.data[0]))
    } catch (e: any) {
        alert(e)
    }
}

export type NavReducerActionsType = ReturnType<typeof setUserData>



