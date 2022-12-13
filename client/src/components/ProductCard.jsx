
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToCart, getAllProducts, removeProduct } from '../redux/action';

import UpdateProduct from './UpdateProduct';
import {  useEffect, useState } from 'react';




const ProductCard = ({product}) => {
    const { user } = useSelector((state) => state.user);
    const [result, setResult] = useState();


    // console.log(user);
    const dispatch = useDispatch();

    function calculeRemise(prix,remise){
        const prixNumber = parseFloat(prix)
        const remiseNumber = parseFloat(remise) 
        let resulta=0;
        if ((prixNumber && remiseNumber) && (remiseNumber >0)){ 
       resulta=prix*(1-(remise/100))
        return resulta}
      
    }
    useEffect(() => {
        let result;
        result=parseFloat(calculeRemise(product.price,product.promo))
        setResult(result.toFixed(2))
      
    }, [result])

    
    


  return (
    <Card style={{ width: '22rem', height: '44rem',  }} className="productCard">
        { (Number(result)>0)?
        <div className="promo">
        <h4 className='promo1'>Promo</h4>
        <h4 className='promo2'>{`${product.promo}% `}</h4>
        </div>:null}

    <Card.Img style={{ height: '25rem'  }} variant="top" src={product.image} alt="wait for data" />
    
    <Card.Body>
        <div className="title">
            <Card.Title  style={{fontSize: "22px" , fontWeight:"500"}}>{product.title}</Card.Title>
        </div>
        { (Number(result)>0)?
        <div>
        <Card.Text className='Promotion'>
          <h2 className='priceCardPromo' style={{  textDecoration: "line-through", marginTop:"8px",color: "black"}}>{`$ ${product.price}`}</h2>
          <h2 className='priceCardPromo'>{`(${product.promo}% off) `} </h2>
        </Card.Text>

        <Card.Text className='priceCard'>
          
          {`$ ${result}`}   
       </Card.Text>
        </div>:
        <Card.Text className='priceCard'>
          
        {`$ ${product.price}`}   
        </Card.Text>
        }
        
        {user && user.userRole === "admin" ? 
        <div className="btns_admin1">
            <Button variant="danger " onClick={() => { dispatch(removeProduct(product._id)); dispatch(getAllProducts()) }} >DELETE</Button>
            <UpdateProduct updateProd={product} />
            <Link to={`/detailProduct/${product._id}`}> <Button variant="dark"><i style={{color:"white",fontSize:'20px'}}class="fa-solid fa-magnifying-glass"></i></Button> </Link>
        </div> :
         <div className="btns_user1">
            <Button variant="dark" onClick={()=>dispatch(addToCart(product._id, 1))} ><i style={{color:"white" , fontSize:'20px'}} className='fas fa-shopping-cart'></i></Button>
            <Link to={`/detailProduct/${product._id}`}> <Button variant="dark"><i style={{color:"white",fontSize:'20px'}}class="fa-solid fa-magnifying-glass"></i></Button> </Link>
        </div> }
    </Card.Body>
</Card>
  )
}

export default ProductCard