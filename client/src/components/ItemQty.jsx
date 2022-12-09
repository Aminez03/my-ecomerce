import React from 'react';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { decrementQty, incrementQty } from '../redux/action';



const ItemQty = ({ el }) => {

  

  const dispatch = useDispatch();

  return (
    <div className="ItemQty">
      {
        el.qty > 1 ?
        <div>
          <IconButton style={{color:'red'}} onClick={ () => dispatch(decrementQty(el))} ><i className="fa fa-minus-circle"></i>
          </IconButton> 
          <span style={{fontSize:"20px" , fontWeight:"600"}} >{el.qty}</span>
          <IconButton style={{color:'green'}} onClick={ () => dispatch(incrementQty(el))}><i className="fa fa-plus-circle"></i>
          </IconButton>
        </div> :
        <div>
          <IconButton style={{color:'red'}}><i className="fa fa-minus-circle"></i>
          </IconButton> 
          <span style={{fontSize:"20px" , fontWeight:"600"}} >{el.qty}</span> 
          <IconButton style={{color:'green'}} onClick={ () => dispatch(incrementQty(el))}><i className="fa fa-plus-circle"></i>
          </IconButton>
          </div>
      }
    </div>
  );
};

export default ItemQty;