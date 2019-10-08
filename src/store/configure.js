import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import modules from './modules';
import rootSaga from './saga';
import { createLogger } from 'redux-logger';

const configure = () => {
    const logger = createLogger(); 
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        modules,
        applyMiddleware(
            sagaMiddleware
            // ,logger
            )
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configure;