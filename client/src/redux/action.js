import axios from "axios";
import { CARD_ADD_ITEM, CARD_ADD_ITEM_FAIL, CARD_ADD_ITEM_SUCCESS, CARD_REMOVE_ITEM,INCREMENT, DECREMENT, DETAILPRODUCT_FAIL, DETAILPRODUCT_SUCCESS, GET_PROFILE, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, SIGN_UP, SIGN_UP_FAIL, SIGN_UP_SUCCESS } from "./actionTypes"
import {ADDPRODUCT, ADDPRODUCT_FAIL, ADDPRODUCT_SUCCESS, DELETEPRODUCT, DETAILPRODUCT, GETPRODUCTS, GET_MEN_PRODUCT, GET_WOMEN_PRODUCT, UPDATEPRODUCT} from "./actionTypes"

// action user 
export const userSignUp=(newUser)=>async(dispatch)=>{
    dispatch({type:SIGN_UP});
    try {
        const res=await axios.post("/user/signUp",newUser);
        dispatch({
            type:SIGN_UP_SUCCESS,
            payload:res.data

        });
    } catch (error) {
        dispatch({
            type:SIGN_UP_FAIL,
            payload:error.response.data
        })
        
    }
}

export const Logine=(user)=>async(dispatch)=>{
    dispatch({type:LOGIN});
    try {
        const res=await axios.post("/user/signIn",user)
        localStorage.setItem("token",res.data.token)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data
        })
        
    }

}

export const getUserProfile=()=>async(dispatch)=>{
    dispatch({
        type:GET_PROFILE
    })
    const token=localStorage.getItem("token");
    const config={
        headers:{
            Authorization:token
        }
    }
    try {
        const res=await axios.get("/user/auth",config)
        // console.log(res.data)
        dispatch({
            type:GET_PROFILE_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:GET_PROFILE_FAIL,
            payload: error.response.data,
        })
    }
}
export const userLogOut = () => {

    localStorage.clear()
  document.location.href='/';
  
  return {
    type: LOGOUT
  }
  
  }


// action product

export const createProduct = (newProduct) => async (dispatch) => {
    dispatch({ type: ADDPRODUCT });
    try {
      const res = await axios.post("/product/addProduct", newProduct);
      dispatch({
        type: ADDPRODUCT_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ADDPRODUCT_FAIL,
        payload: error.response.data,
      });
    }
  };

//get all products
export const getAllProducts = () => async(dispatch) => {
  try {
    const res = await axios.get("/product/getAllProduct");
    dispatch (
      {
      type : GETPRODUCTS,
      payload : res.data
      }
    );
  } catch (error) {
    alert("get all products error")
  }
};

//get men products
export const getMenProd = () => async(dispatch) => {
  try {
    const res = await axios.get("/product/getMenProducts");
    dispatch (
      {
      type : GET_MEN_PRODUCT,
      payload : res.data
      }
    );
  } catch (error) {
    alert("get Men products error")
  }
};

//get women products
export const getWomenProd = () => async(dispatch) => {
  try {
    const res = await axios.get("/product/getWomenProducts");
    dispatch (
      {
      type : GET_WOMEN_PRODUCT,
      payload : res.data
      }
    );
  } catch (error) {
    alert("get women products error")
  }
};



//get one product
export const getOneProduct = (_id) => async(dispatch) => {
  dispatch(
    {
      type : DETAILPRODUCT,
     
    }
  )
  try {
    const res = await axios.get(`/product/getOneProduct/${_id}`);
    dispatch(
      {
        type : DETAILPRODUCT_SUCCESS,
        payload : res.data
      }
    )
  
  } catch (error) {
    dispatch({
      type:DETAILPRODUCT_FAIL,
      payload:error.response.data
    })
  }
}

//edit product
export const editeProduct = (product) => async(dispatch) => {
  try {
      const res = await axios.put(`/product/updateProduct/${product._id}`, product);
      dispatch(
          {
              type : UPDATEPRODUCT,
              payload : res.data
          }
      )
  } catch (error) {
      alert("update product error");
  }
};

//delete product
export const removeProduct = (_id) => async(dispatch) => {
  try {
    const res = axios.delete(`/product/deleteOneProduct/${_id}`);
    dispatch(
      {
        type : DELETEPRODUCT,
        payload : res.data
      }
    )
  } catch (error) {
    alert("delete product error")
  }
}

// action cart 

// add to cart 
export const addToCart = (_id, qty) => async (dispatch) => {
  dispatch({type : CARD_ADD_ITEM})
  try {
    const res = await axios.get(`/product/getOneProduct/${_id}`);
    dispatch({
      type: CARD_ADD_ITEM_SUCCESS,
      payload: {
        product: res.data._id,
        title: res.data.title,
        promo: res.data.promo,
        image: res.data.image,
        price: res.data.price,
        qty
      },
    })

  } catch (error) {
    dispatch({
      type: CARD_ADD_ITEM_FAIL,
      payload: error.response.data,
    });  
  }
;
}

// delete item from cart 
export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: CARD_REMOVE_ITEM,
    payload: id,
  });
};
// incrementer
export const incrementQty = (cartItem) => (dispatch) => {
  dispatch(
    {
      type: INCREMENT,
      payload: cartItem
    }
  )
}; 

// decrementer 
export const decrementQty = (cartItem) => (dispatch) => {
  dispatch(
    {
      type: DECREMENT,
      payload: cartItem
    }
  )
};

