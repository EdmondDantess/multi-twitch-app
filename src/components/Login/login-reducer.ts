type InitStateType = typeof initialState

const initialState = {
    token: '',
    'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb'
}

export const loginReducer = (state: InitStateType = initialState, action: LoginReducerActionsType): InitStateType => {
    switch (action.type) {
        case 'login/LOGIN':
            return {
                ...state, token: action.payload.token
            }
        default:
            return state
    }
}

export const setToken = (token: string) => {
    return {
        type: 'login/LOGIN',
        payload: {token}
    } as const
}


export type LoginReducerActionsType =
    ReturnType<typeof setToken>

