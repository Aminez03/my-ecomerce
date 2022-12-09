

import { ADDPRODUCT, ADDPRODUCT_FAIL, ADDPRODUCT_SUCCESS, DELETEPRODUCT, DETAILPRODUCT, DETAILPRODUCT_FAIL, DETAILPRODUCT_SUCCESS, GETPRODUCTS,GET_MEN_PRODUCT, GET_WOMEN_PRODUCT, UPDATEPRODUCT } from "./actionTypes";

const init = {
    products:null,
    oneProduct:null,
    error:null,
    loading:false,

}

export const productReducer = ( state = init , {type, payload} ) => {
    switch (type) {
        case ADDPRODUCT: 
        case DETAILPRODUCT:
            return {
                ...state,loading:true
            }
        case ADDPRODUCT_SUCCESS:
            return {
                ...state, products:[...state.products, payload],loading:false
            }
        case ADDPRODUCT_FAIL:
            case DETAILPRODUCT_FAIL:
            return {
                ...state, error:payload,loading:false
            }
        case GETPRODUCTS:
        case GET_MEN_PRODUCT:
        case GET_WOMEN_PRODUCT:
            return {
                ...state, products:payload
            }
        case UPDATEPRODUCT:
            return {
                ...state, products:state.products.map( el => el._id === payload._id ?payload :el)
            }
        case DELETEPRODUCT:
            return {
                ...state, products:state.products.filter(el => el._id !== payload)
            }
        case DETAILPRODUCT_SUCCESS:
            return {
                ...state, oneProduct:payload,loading:false
            }
    
        default:
            return state
    }
}

export default productReducer;