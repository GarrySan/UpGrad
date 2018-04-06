import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
 
import { question } from './Reducers/QuestionReducer'
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, question)
let store = createStore(persistedReducer)
let persistor = persistStore(store)
export { store, persistor }
