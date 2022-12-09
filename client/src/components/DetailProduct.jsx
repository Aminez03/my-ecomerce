import { Card, Button, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import React, { useEffect, useState,  } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { addToCart, getOneProduct,  } from '../redux/action';



const DetailProduct = () => {
    //reducer state
    const { oneProduct,loading } = useSelector(state => state.product);
    const [result, setResult] = useState();

  
    console.log(oneProduct)
    const dispatch = useDispatch();
    const { _id } = useParams();
    function calculeRemise(prix,remise){
        const prixNumber = parseFloat(prix)
        const remiseNumber = parseFloat(remise) 
        let resulta=0;
        if ((prixNumber && remiseNumber) && (remiseNumber >0)){ 
       resulta=prix*(1-(remise/100))
        return resulta}
      
    }
    

    useEffect(() => {
       dispatch(getOneProduct(_id));
       let result;
       result=parseFloat(calculeRemise(oneProduct.price,oneProduct.promo))
       setResult(result.toFixed(2))
     
   
 
}, [_id,result])

    return (
      <div className='detail'>
        {
            loading?<h1>Loding</h1>:oneProduct&&
      <Card className="detailCard">
      <CardMedia
          component="img"
          alt="green iguana"
          sx={{ height: '28rem', width:"300px" }}
          image={oneProduct.image}
          className='detailImageCard'
      />
      <CardContent>

        
          <Typography id='titleDetailproduct' >
             {oneProduct.title}
          </Typography>
{/*           
          <Typography  className='priceDetailproduct ui teal tag label'>
             {`$ ${oneProduct.price}`} 
          </Typography> */}




          { (Number(result)>0)?
        <div>
        <Typography className='Promotion' style={{marginLeft:"400px" , marginTop:"10px",width:"300px"}}>
          <h2 className='priceCardPromo' style={{  textDecoration: "line-through", marginTop:"8px",color: "black",fontSize:"25px"}}>{`$ ${oneProduct.price}`}</h2>
          <h2 className='priceCardPromo' style={{fontSize:"25px", marginLeft:"15px"}}>{`(${oneProduct.promo}% off) `} </h2>
        </Typography>

        {/* <Typography className='priceCard'>
       </Typography> */}
       <Typography  className='priceDetailproduct ui teal tag label'>
       {`$ ${result}`}  
        </Typography>

        </div>:
        <Typography  className='priceDetailproduct ui teal tag label'>
          
        {`$ ${oneProduct.price}`}   
        </Typography>
        }

          <Typography  className='categoryDetailproduct ui brown block header'>
              {oneProduct.category}
          </Typography>


          <Typography  className="descriptionDetailproduct">
              <p>{oneProduct.description}</p>
          </Typography>

          <Typography  >
          <div className="ui vertical animated button Detailbutton  " tabIndex="0">
                  <div className="hidden content ">

                    <i className="shop icon addDetailbutton"></i>
                  </div>
                  <div className="visible content addDetailbutton "   >
                    <button onClick={()=>dispatch(addToCart(oneProduct._id, 1))} style={{border:"none" ,backgroundColor:"Gainsboro",fontSize:"20px",color:"red"}} >Add to Cart</button></div>
                </div>
          </Typography>


      </CardContent>
      <CardActions>
          <Link to="/"><Button size="small">Back</Button></Link>
      </CardActions>
  </Card>
  
}
  </div>


       

   
    )
}

export default DetailProduct