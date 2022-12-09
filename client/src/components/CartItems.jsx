import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import {
    Button,
    Card,
    Table
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart } from "../redux/action";
import ItemQty from "./ItemQty";
import { Link } from 'react-router-dom';



const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const [result, setResult] = useState();

    console.log(cartItems)
    

    const [total, setTotal] = useState();

    // const [quantity, setQuantity] = useState(cartItems.quantity)
    function calculeRemise(prix,remise){
        const prixNumber = parseFloat(prix)
        const remiseNumber = parseFloat(remise) 
        let resulta=0;
        if ((prixNumber && remiseNumber) && (remiseNumber >0)){ 
       resulta=prix*(1-(remise/100))
        return resulta}
      
    }


    const calculateAmount = (qty, price) => {
        const qtyNumber = parseFloat(qty) || 1
        const priceNumber = parseFloat(price) || 0
        let amount = 0

        if (qtyNumber && priceNumber) {
            amount = qtyNumber * priceNumber
        }
        return amount.toFixed(2)
    }
    // const calculateQuantity = (quantity,qty)=>{

    //     quantity=cartItems.quantity;
    //     const qtyNumber = parseFloat(qty) || 1
    //     const quantityNumber = parseFloat(quantity) > parseFloat(qty);

    //     if (qtyNumber && quantityNumber) {

    //         quantity += quantity - qtyNumber
    //     }
    //     return quantity
    // }




    
    useEffect(() => {
        let total = 0;
        let result;
    
        cartItems.forEach(el => {
            result=parseFloat(calculeRemise(el.price,el.promo))
            total += parseFloat(calculateAmount(el.qty, result)) 
            setResult(result.toFixed(2)) 
          
        });
        // result=parseFloat(calculeRemise(cartItems.price,cartItems.promo))
        
        
        setTotal(total.toFixed(2))
     
    }, [total, cartItems,result]);

    const dispatch = useDispatch();


    return (
        <div className='cartItems'>
            <Table striped hover>
                <thead>
                    <tr style={{fontSize:"15px" , fontWeight:"100"}}>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        {/* <th>Quantity</th> */}
                        <th>Remove</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        cartItems && React.Children.toArray(cartItems.map((el, index) => <tr index={index}>
                            <td><Card.Img variant="top" src={el.image} style={{ width: "7rem", height: "7rem" }} /></td>
                            <td style={{fontSize:"16px" }}>{el.title}</td>
                            {/* { (Number(result)>0)? */}
                            <td > 
                            <div className='Promotion' style={{marginLeft:"250px"}}>
          <h2 className='priceCardPromo' style={{  textDecoration: "line-through", marginTop:"8px",color: "black"}}>{`$ ${el.price}`}</h2>
          <h2 className='priceCardPromo'>{`(${el.promo}% off) `} </h2>
                            </div>
                            <div className='priceCard' style={{marginLeft:"250px"}}> {`$ ${calculeRemise(el.price,el.promo).toFixed(2) }`}  </div>
                            </td>
                            {/* : */}
                            {/* <td style={{fontSize:"20px" , fontWeight:"600"}}>{`${el.price} $`}</td> */}
                            {/* } */}






                            <td><ItemQty el={el} /></td>
                            

                            <td><IconButton onClick={() => dispatch(removeFromCart(el.product))}><DeleteIcon style={{color:'DarkBlue',fontSize:"30px"}} />
                            </IconButton></td>
                        </tr>))
                    }

                </tbody>
                <tfoot>
                <tr>
                        <br /><br />
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{fontSize:"30px" , fontWeight:"600"}}>Total Price</td>
                        <td style={{fontSize:"25px" , fontWeight:"600"}}>{`${total} $`}</td>
                        <Button  size="large" type="button" variant="contained" color="primary">
                        <Link to="/Checkout" >Checkout </Link>
                        </Button>
                        <td></td>
                        
                    </tr>
                   
                </tfoot>
            </Table>
        </div>
    );
};

export default Cart;