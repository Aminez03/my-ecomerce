import { CARD_ADD_ITEM, CARD_ADD_ITEM_FAIL, CARD_ADD_ITEM_SUCCESS, CARD_REMOVE_ITEM, DECREMENT, INCREMENT } from "./actionTypes";

const init = {
    cartItems: [],
    loading:false,
    error:null,
    
  };
  
  export const cartReducer = (state = init, { type, payload }) => {
    switch (type) {
      case CARD_ADD_ITEM:
        return {
            ...state,loading:true
        }
        case CARD_ADD_ITEM_SUCCESS:
        const item = payload;
        const existItem = state.cartItems.find(
          (el) => el.product === item.product
        );
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((el) =>
              el.product === existItem.product ? item : el
            ),loading:false
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],loading:false
          };
        }
        case CARD_ADD_ITEM_FAIL:
            return {
                ...state, error:payload,loading:false
            }
    


      case CARD_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((el) => el.product !== payload),
        };
  
      case INCREMENT:
        return {
          ...state,
          cartItems: state.cartItems.filter((el) =>
            el.product === payload.product
              ? { ...el, qty: (payload.qty += 1) }
              : el
          ),
        };
  
      case DECREMENT:
        return {
          ...state,
          cartItems: state.cartItems.filter((el) =>
            el.product === payload.product
              ? { ...el, qty: (payload.qty -= 1) }
              : el
          ),
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  