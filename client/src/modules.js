import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { main, session } from './state';

const rootReducer = combineReducers({
  main
});

const persistedState = session.loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  session.saveState(store.getState())
});

export {
  store
};