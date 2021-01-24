import { combineReducers } from 'redux';
//import user from './user_reducer.js';
//import comment from './comment_reducer';
// Store 안에 여러 Reducer가 있다. 이것들을 combineReducers를 이용해서 rootReducer에서 하나로 합쳐준다.
const rootReducer = combineReducers({
    // user, comment
});

export default rootReducer;