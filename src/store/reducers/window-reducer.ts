type InitStateType = typeof initialState;

const initialState = {
  windows: [] as WindowType[],
};

export const windowReducer = (
  state: InitStateType = initialState,
  action: WindowReducerActionsType,
): InitStateType => {
  switch (action.type) {
    case 'window/ADD_NEW_WINDOW':
      return {
        ...state,
        windows: [
          ...state.windows,
          {
            channel: action.payload.channel,
            chat: true,
            muted: false,
            chatPosition: 'rightVideo',
            height: 4,
            width: 12,
            x: 0,
            y: 0,
          },
        ],
      };
    case 'window/DELETE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(
          (w) => w.channel !== action.payload.channel,
        ),
      };
    case 'window/CHAT_OPENCLOSE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.channel === action.payload.channel ? { ...w, chat: !w.chat } : w,
        ),
      };
    case 'window/MUTE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.channel === action.payload.channel ? { ...w, muted: !w.muted } : w,
        ),
      };
    case 'window/CHAT_CHANGE_POS':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.channel === action.payload.channel
            ? { ...w, chatPosition: action.payload.pos }
            : w,
        ),
      };
    case 'window/CHANGE_WINDOW_SIZE_AND_POSITION':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.channel === action.payload.channel
            ? {
                ...w,
                width: action.payload.size.width,
                height: action.payload.size.height,
                channel: action.payload.channel,
                x: action.payload.pos.x,
                y: action.payload.pos.y,
              }
            : w,
        ),
      };
    default:
      return state;
  }
};
export const addNewWindow = (channel: string) => {
  return {
    type: 'window/ADD_NEW_WINDOW',
    payload: { channel },
  } as const;
};
export const deleteWindow = (channel: string) => {
  return {
    type: 'window/DELETE_WINDOW',
    payload: { channel },
  } as const;
};
export const setChatOpenClose = (channel: string) => {
  return {
    type: 'window/CHAT_OPENCLOSE',
    payload: { channel },
  } as const;
};

export const setMuteWindow = (channel: string) => {
  return {
    type: 'window/MUTE_WINDOW',
    payload: {
      channel,
    },
  } as const;
};
export const setWindowSize = (
  channel: string,
  size: { width: number; height: number },
  pos: { x: number; y: number },
) => {
  return {
    type: 'window/CHANGE_WINDOW_SIZE_AND_POSITION',
    payload: {
      size,
      channel,
      pos,
    },
  } as const;
};

export type WindowType = {
  channel: string;
  chat: boolean;
  height: number;
  width: number;
  muted: boolean;
  chatPosition: 'underVideo' | 'rightVideo';
  x: number;
  y: number;
};
export const setChatPos = (
  channel: string,
  pos: 'underVideo' | 'rightVideo',
) => {
  return {
    type: 'window/CHAT_CHANGE_POS',
    payload: {
      channel,
      pos,
    },
  } as const;
};
export type WindowReducerActionsType =
  | ReturnType<typeof addNewWindow>
  | ReturnType<typeof setChatOpenClose>
  | ReturnType<typeof setWindowSize>
  | ReturnType<typeof setMuteWindow>
  | ReturnType<typeof deleteWindow>
  | ReturnType<typeof setChatPos>;
