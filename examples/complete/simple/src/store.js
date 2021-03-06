import { createStore, compose } from 'redux'
import rootReducer from './reducer'
import { firebase as fbConfig } from './config'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { reactReduxFirebase } from 'react-redux-firebase-immutable'
import { reduxFirestore } from 'redux-firestore'

export default function configureStore (initialState, history) {
  // Initialize Firebase instance
  firebase.initializeApp(fbConfig)

  const reduxFirebaseConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
    enableLogging: false
  }

  const createStoreWithMiddleware = compose(
    // enhance store with store.firebase
    reactReduxFirebase(firebase, reduxFirebaseConfig),
    // enhance store with store.firestore
    reduxFirestore(firebase),
    // support redux devtools
    typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
