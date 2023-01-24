import {loadState, saveState} from './localstorage-utils';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {windowReducer, WindowReducerActionsType} from '../components/Window/window-reducer';
import {appReducer, AppReducerActionsType} from './app-reducer';
import {searchReducer, SearchReducerActionsType} from '../components/Search/search-reducer';

const rootReducer = combineReducers({
    window: windowReducer,
    app: appReducer,
    search: searchReducer

})

export const store = legacy_createStore(rootReducer, loadState(), applyMiddleware(thunkMiddleware))

store.subscribe(() => {
    saveState({
        window: store.getState().window,
        app: store.getState().app,
        search: store.getState().search
    })
})

export type RootState = ReturnType<typeof rootReducer>

export type ActionsType =
    SearchReducerActionsType |
    AppReducerActionsType |
    WindowReducerActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>

// @ts-ignore
window.store = store;