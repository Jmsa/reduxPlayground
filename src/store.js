import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import {reducer} from './reducers';
import sagas from './sagas'

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
// export const store = createStore(reducer);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)


// then run the saga
sagaMiddleware.run(sagas)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.log(store.getState()));