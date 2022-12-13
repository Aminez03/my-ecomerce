import { BLOCKUSER, DELETEUSER, GET_ALLUSERS, GET_PROFILE, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUCCESS } from "./actionTypes";




const init ={
    users:null,
    user:null,
    errors:null,
    loading:false,
    token:localStorage.getItem("token"),
    isAuth:false,
}

export const userReducer=(state=init,{type,payload})=>{
    switch (type) {
        case SIGN_UP:
        case LOGIN:
        case GET_PROFILE:
            return {
                ...state,
                loading:true};

        case SIGN_UP_SUCCESS:
             return {...state,
                 loading:false,
                 user:payload.user,
                 token:payload.token,
                 isAuth:true,
                errors:null};
        case LOGIN_SUCCESS:
            return {
            ...state,
            loading:false,
            user:payload,
            token:payload.token,
            isAuth:true};
        case GET_PROFILE_SUCCESS:
            return{
            ...state,
            loading:false,
            user:payload,
            isAuth:true,
            error:null,
            }
       
         case SIGN_UP_FAIL:
         case LOGIN_FAIL:
         case GET_PROFILE_FAIL:
            return {
                ...state,
                loading:false,
                errors:payload};

        case GET_ALLUSERS:
            return{
                ...state,
                users:payload,
                loading:false,
                errors:null,
            }
        case DELETEUSER:
                return {
                    ...state, users:state.users.filter(el => el._id !== payload)
                }
        case BLOCKUSER:
            return {
                ...state, users:state.users.map( el => el._id === payload._id ?payload :el)
            }
        case LOGOUT:
          return {
              state
          }

                
        default:
            return state;
    }


}