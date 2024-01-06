import { DataSearch, twitchAPI } from '../../../api/twitchAPI'
import { AppThunk } from '../../../app/store'
import { setError } from '../../../app/userFeedback-reducer'

type InitStateType = typeof initialState

const initialState = {
    searchingChannels: [] as DataSearch[],
}

export const searchReducer = (
    state: InitStateType = initialState,
    action: SearchReducerActionsType
): InitStateType => {
    switch (action.type) {
        case 'search/CHANNELS':
            return {
                ...state,
                searchingChannels: action.payload.data,
            }
        default:
            return state
    }
}
export const setSearchChannels = (data: DataSearch[]) => {
    return {
        type: 'search/CHANNELS',
        payload: { data },
    } as const
}

export const getSearchChannels =
    (channel: string): AppThunk =>
    async (dispatch) => {
        try {
            const res = await twitchAPI.searchChannel(channel)
            dispatch(setSearchChannels(res.data.data))
        } catch (e: any) {
            dispatch(setSearchChannels([]))
            dispatch(setError(e))
        }
    }

export type SearchReducerActionsType = ReturnType<typeof setSearchChannels>
