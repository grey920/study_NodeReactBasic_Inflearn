import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer';

// Store는 객체(Object) 형태의 Action만 받을 수 있다. 
// Promise나 Function 형태로 오면 당연히 받을 수 없으므로 redux-promise, redux-thunk를 이용한다
// 원래는 (createStore)만 해서 store를 생성하는데 그냥 store는 객체밖에 못 받으므로 (promiseMiddleware, ReduxThunk)도 써줌.
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore); // store 생성

ReactDOM.render(
  // App에 Redux를 연결시키는 법 
  // 1. Provider를 이용하여 감싸준다.
  // 2. Provider 안에 store를 넣어준다.
  // 3. store 안에 Reducer나 이것저것(?) 넣어준다
  <Provider
      store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
