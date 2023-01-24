type InitStateType = typeof initialState

const initialState = {
    token: '',
    'Client-Id': '8cux8z8nnvju38k96pniih4k0uijlb',
}

export const appReducer = (state: InitStateType = initialState, action: AppReducerActionsType): InitStateType => {
    switch (action.type) {
        case 'app/LOGIN':
            return {
                ...state, token: action.payload.token
            }
        default:
            return state
    }
}
export const setToken = (token: string) => {
    return {
        type: 'app/LOGIN',
        payload: {token}
    } as const
}

export type AppReducerActionsType =
    ReturnType<typeof setToken>



