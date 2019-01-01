import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {fetchData} from "./actions/mainActions";
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(fetchData());

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();