type InitStateType = typeof initialState

const initialState = {
    windows: [] as WindowType[]
}

export const windowReducer = (state: InitStateType = initialState, action: WindowReducerActionsType): InitStateType => {
    switch (action.type) {
        case 'window/ADD-NEW-WINDOW':
            return {
                ...state,
                windows: [...state.windows, {
                    channel: action.payload.channel,
                    chat: false,
                    height: '300px',
                    muted: false,
                    width: '350px'
                }]
            }
        case 'window/DELETE-WINDOW':
            return {
                ...state, windows: state.windows.filter(w => w.channel !== action.payload.channel)
            }
        case 'window/CHAT-OPENCLOSE':
            return {
                ...state,
                windows: state.windows.map(w => w.channel === action.payload.channel ? {...w, chat: !w.chat} : w)
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
export const setChatOpenClose = (channel: string) => {
    return {
        type: 'window/CHAT-OPENCLOSE',
        payload: {channel}
    } as const
}


export type WindowType = {
    channel: string,
    chat: boolean,
    height: string,
    width: string,
    muted: boolean
}
export type WindowReducerActionsType =
    ReturnType<typeof addNewWindow> |
    ReturnType<typeof setChatOpenClose> |
    ReturnType<typeof deleteWindow>