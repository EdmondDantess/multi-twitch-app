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
                    chatPosition: 'underVideo',
                    height: 200,
                    muted: false,
                    width: 350
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
        case 'window/CHANGE-WINDOWSIZE':
            return {
                ...state,
                windows: state.windows.map(w => w.channel === action.payload.channel ? {
                    ...w, width: action.payload.size.width,
                    height: action.payload.size.height,
                    channel: action.payload.channel
                } : w)
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
export const setWindowSize = (channel: string, size: { width: number, height: number }) => {
    return {
        type: 'window/CHANGE-WINDOWSIZE',
        payload: {
            size,
            channel
        }
    } as const
}


export type WindowType = {
    channel: string,
    chat: boolean,
    height: number,
    width: number,
    muted: boolean,
    chatPosition: 'underVideo' | 'rightVideo'
}
export type WindowReducerActionsType =
    ReturnType<typeof addNewWindow> |
    ReturnType<typeof setChatOpenClose> |
    ReturnType<typeof setWindowSize> |
    ReturnType<typeof deleteWindow>