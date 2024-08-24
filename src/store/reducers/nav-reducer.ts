import { AppThunk } from '../store';
import {
  DataRecommends,
  LiveFollowsDataData,
  twitchAPI,
  UserDataInfo,
} from '../../api/twitchAPI';
import { setError } from './userFeedback-reducer';

const initialState = {
  userData: {} as UserDataInfo,
  myFollows: [] as UserDataInfo[],
  additionalData: [] as UserDataInfo[],
  recommendedStreams: [] as DataRecommends[],
  liveFollows: [] as LiveFollowsDataData[],
};
type InitStateType = typeof initialState;

export const navReducer = (
  state: InitStateType = initialState,
  action: NavReducerActionsType,
): InitStateType => {
  switch (action.type) {
    case 'nav/SET_USER_DATA':
      return {
        ...state,
        userData: action.payload.data,
      };
    case 'nav/SET_RECOMMENDED':
      return {
        ...state,
        recommendedStreams: action.payload.data,
      };
    case 'nav/SET_FOLLOWS':
      return {
        ...state,
        myFollows: action.payload.data,
      };
    case 'nav/SET_USER_DATA_RECOMMENDS':
      return {
        ...state,
        additionalData: action.payload,
      };
    case 'nav/SET_LIVE_FOLLOWS':
      return {
        ...state,
        liveFollows: action.payload.data,
      };
    default:
      return state;
  }
};
export const setUserData = (data: UserDataInfo) => {
  return {
    type: 'nav/SET_USER_DATA',
    payload: { data },
  } as const;
};
export const setRecommendsDataAdditional = (data: UserDataInfo[]) => {
  return {
    type: 'nav/SET_USER_DATA_RECOMMENDS',
    payload: data,
  } as const;
};
export const setMyFollows = (data: UserDataInfo[]) => {
  return {
    type: 'nav/SET_FOLLOWS',
    payload: {
      data,
    },
  } as const;
};
export const setLiveFollows = (data: LiveFollowsDataData[]) => {
  return {
    type: 'nav/SET_LIVE_FOLLOWS',
    payload: {
      data,
    },
  } as const;
};
export const setRecommendedStreams = (data: DataRecommends[]) => {
  return {
    type: 'nav/SET_RECOMMENDED',
    payload: {
      data,
    },
  } as const;
};
export const getUserData = (): AppThunk => async (dispatch) => {
  try {
    const res = await twitchAPI.getUserInfo();
    dispatch(setUserData(res.data.data[0]));
  } catch (e: any) {
    setError(e);
  }
};
export const getMyFollows =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const liveFollows = await twitchAPI.getLiveFollows(id);
      dispatch(setLiveFollows(liveFollows.data.data));
      const ids = (arr: LiveFollowsDataData[]) => {
        let result = '';
        arr.forEach((el) => (result += `&id=${el.user_id}`));
        return result.slice(1);
      };
      const usersDatas = await twitchAPI.getUserInfo(
        ids(liveFollows.data.data),
      );
      dispatch(setMyFollows(usersDatas.data.data));
    } catch (e: any) {
      setError(e);
    }
  };
export const getRecommendedStreams =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const res = await twitchAPI.getRecommendedStreams();
      dispatch(setRecommendedStreams(res.data.data));
      const ids = (arr: DataRecommends[]) => {
        let result = '';
        arr.forEach((el) => (result += `&id=${el.user_id}`));
        return result.slice(1);
      };
      const usersDatas = await twitchAPI.getUserInfo(
        ids(getState().nav.recommendedStreams),
      );
      dispatch(setRecommendsDataAdditional(usersDatas.data.data));
    } catch (e: any) {
      setError(e);
    }
  };

export type NavReducerActionsType =
  | ReturnType<typeof setUserData>
  | ReturnType<typeof setMyFollows>
  | ReturnType<typeof setRecommendedStreams>
  | ReturnType<typeof setRecommendsDataAdditional>
  | ReturnType<typeof setLiveFollows>;
