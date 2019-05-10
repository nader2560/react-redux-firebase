import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase-immutable'

const rootReducer = combineReducers({
  firebase
})

export default rootReducer
