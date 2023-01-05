type InitStateType = typeof initialState

const initialState = {
    windows: [] as WindowType[]
}

export const windowReducer = (state: InitStateType = initialState, action: WindowReducerActionsType): InitStateType => {
    switch (action.type) {
        case 'window/ADD-NEW-WINDOW':
            return {
                ...state, windows: [...state.windows, {channel: action.payload.channel, chat: false, height: '300px'}]
            }
        case 'window/DELETE-WINDOW':
            return {
                ...state, windows: state.windows.filter(w => w.channel !==  action.payload.channel)
            }
        default:
            return state
    }
}
export const addNewWindow = (channel: string) => {
    return {
        type: 'window/ADD-NEW-WINDOW',
        payload: {channel}
    } as const
}
export const deleteWindow = (channel: string) => {
    return {
        type: 'window/DELETE-WINDOW',
        payload: {channel}
    } as const
}


export type WindowType = {
    channel: string,
    chat: boolean,
    height: string
}
export type WindowReducerActionsType =
    ReturnType<typeof addNewWindow> |
    ReturnType<typeof deleteWindow>