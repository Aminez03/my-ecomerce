
import {createStore,compose, applyMiddleware} from "redux"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk"
import rootReducers from "./routReducer"
const devtools=window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const persistConfig = {
    key: "authType",
    storage: storage,
  };
  
  const pReducer = persistReducer(persistConfig, rootReducers);

const store=createStore(pReducer,compose(applyMiddleware(thunk),devtools))

const persistor = persistStore(store);

export { persistor, store };