import {location} from '../../common/utils/modeLocalToVercel';

type InitStateType = typeof initialState

const initialState = {
    token: '',
    'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb'
}

export const loginReducer = (state: InitStateType = initialState, action: LoginReducerActionsType): InitStateType => {
    switch (action.type) {
        case 'login/LOGIN':
            const token = action.payload.location.slice(location.indexOf('access_token=') + 13, location.indexOf('&scope='))
            return {
                ...state, token
            }
        default:
            return state
    }
}

export const setToken = (location: string) => {
    return {
        type: 'login/LOGIN',
        payload: {location}
    } as const
}


export type LoginReducerActionsType =
    ReturnType<typeof setToken>

