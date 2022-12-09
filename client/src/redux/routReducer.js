import { combineReducers } from "redux"
import cartReducer from "./reducerCart"
import productReducer from "./reducerProduct"
import { userReducer } from "./reducerUser"

const rootReducers= combineReducers({

    user:userReducer,
    product:productReducer,
    cart:cartReducer,

})
export default rootReducers