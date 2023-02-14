import {loadState, saveState} from './localstorage-utils';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {windowReducer, WindowReducerActionsType} from '../components/Window/window-reducer';
import {searchReducer, SearchReducerActionsType} from '../components/Nav/Search/search-reducer';
import {loginReducer, LoginReducerActionsType} from '../components/Login/login-reducer';
import {navReducer, NavReducerActionsType} from '../components/Nav/nav-reducer';
import {FinalUserFeedbackActionTypes, userFeedbackReducer} from './userFeedback-reducer';

const rootReducer = combineReducers({
    window: windowReducer,
    login: loginReducer,
    search: searchReducer,
    nav: navReducer,
    userFeedback: userFeedbackReducer
})

export const store = legacy_createStore(rootReducer, loadState(), applyMiddleware(thunkMiddleware))

store.subscribe(() => {
    saveState({
        window: store.getState().window,
        login: store.getState().login,
        search: store.getState().search,
        nav: store.getState().nav,
        userFeedback: store.getState().userFeedback
    })
})

export type RootState = ReturnType<typeof rootReducer>

export type ActionsType =
    SearchReducerActionsType |
    LoginReducerActionsType |
    WindowReducerActionsType |
    NavReducerActionsType |
    FinalUserFeedbackActionTypes

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>

// @ts-ignore
window.store = store;