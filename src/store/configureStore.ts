import { createStore, Store, AnyAction, combineReducers, applyMiddleware } from 'redux';
import { AppState } from '.';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas';
import { LocalReducer } from './local';
import { ServerReducer } from './server';

export default function configureAppStore(): Store<AppState> {
    const rootReducer = combineReducers<AppState>({
        local: LocalReducer,
        server: ServerReducer,
      });

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore<AppState, AnyAction, {}, {}>(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);
  
    return store
}