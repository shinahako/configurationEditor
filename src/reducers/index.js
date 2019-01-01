import { combineReducers } from 'redux'
import mainReducer from './mainReducer'
import todo from './todo'
import visibilityFilter from './visibilityFilter'


const rootReducer = combineReducers({
  mainReducer
});

export default rootReducer;