import {loadState, saveState} from './localstorage-utils';
import {combineReducers, createStore} from 'redux';
import {windowReducer} from '../components/Window/window-reducer';

const rootReducer = combineReducers({
    window: windowReducer

})

export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState({
        window: store.getState().window
    })
})

export type RootState = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;