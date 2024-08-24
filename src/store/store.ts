import { loadState, saveState } from '../helpers/localstorage-utils';
// eslint-disable-next-line camelcase
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  windowReducer,
  WindowReducerActionsType,
} from './reducers/window-reducer';
import {
  searchReducer,
  SearchReducerActionsType,
} from './reducers/search-reducer';
import {
  loginReducer,
  LoginReducerActionsType,
} from './reducers/login-reducer';
import { navReducer, NavReducerActionsType } from './reducers/nav-reducer';
import {
  FinalUserFeedbackActionTypes,
  userFeedbackReducer,
} from './reducers/userFeedback-reducer';

const rootReducer = combineReducers({
  window: windowReducer,
  login: loginReducer,
  search: searchReducer,
  nav: navReducer,
  userFeedback: userFeedbackReducer,
});

export const store = legacy_createStore(
  rootReducer,
  loadState(),
  applyMiddleware(thunkMiddleware),
);

store.subscribe(() => {
  saveState({
    window: store.getState().window,
    login: store.getState().login,
    search: store.getState().search,
    nav: store.getState().nav,
    userFeedback: store.getState().userFeedback,
  });
});

export type RootState = ReturnType<typeof rootReducer>;

export type ActionsType =
  | SearchReducerActionsType
  | LoginReducerActionsType
  | WindowReducerActionsType
  | NavReducerActionsType
  | FinalUserFeedbackActionTypes;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsType
>;
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;
