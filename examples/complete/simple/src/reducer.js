import { combineReducers } from 'redux'
import { reducer as firebase } from 'react-redux-firebase-immutable'
// import { reducer as firestore } from 'react-redux-firebase-immutable'

const rootReducer = combineReducers({
  firebase,
  // firestore // add this for firestore
})

export default rootReducer
