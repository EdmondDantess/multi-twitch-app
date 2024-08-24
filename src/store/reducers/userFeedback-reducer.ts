const initialState = {
  circularEntity: false,
  error: null as UserFeedBackErrorType,
};

export const userFeedbackReducer = (
  state: InitialStateType = initialState,
  action: FinalUserFeedbackActionTypes,
): InitialStateType => {
  switch (action.type) {
    case 'userFeedback/START_CIRCULAR':
      return { ...state, circularEntity: true };
    case 'userFeedback/STOP_CIRCULAR':
      return { ...state, circularEntity: false };
    case 'userFeedback/SET_ERROR':
      return { ...state, error: action.payload.error };
    case 'userFeedback/TOGGLE_IS_LOADED':
    default:
      return state;
  }
};

export const toggleIsLoaded = (isLoaded: boolean) =>
  ({ type: 'userFeedback/TOGGLE_IS_LOADED', payload: { isLoaded } } as const);

export const startCircular = () =>
  ({ type: 'userFeedback/START_CIRCULAR', payload: {} } as const);

export const stopCircular = () =>
  ({ type: 'userFeedback/STOP_CIRCULAR', payload: {} } as const);

export const setError = (error: UserFeedBackErrorType) =>
  ({ type: 'userFeedback/SET_ERROR', payload: { error } } as const);

export type UserFeedBackErrorType = string | null;

type InitialStateType = typeof initialState;

export type FinalUserFeedbackActionTypes =
  | ReturnType<typeof startCircular>
  | ReturnType<typeof stopCircular>
  | ReturnType<typeof toggleIsLoaded>
  | ReturnType<typeof setError>;
