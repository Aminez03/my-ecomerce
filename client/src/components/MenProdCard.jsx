import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from 'react-bootstrap';
import { addToCart } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



  
  export default function RecipeReviewCard({ man }) {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector(state => state.product);


    const dispatch = useDispatch();

    const goSignUp =()=>alert("   ⚠️Create account!    ")



    function calculeRemise(prix,remise){
      const prixNumber = parseFloat(prix)
      const remiseNumber = parseFloat(remise) 
      let resulta=0;
      if ((prixNumber && remiseNumber) && (remiseNumber >0)){ 
     resulta=prix*(1-(remise/100))
      return resulta}
  }


    const [result, setResult] = useState();


    useEffect(() => {
      let result;
      result=parseFloat(calculeRemise(man.price,man.promo))
      setResult(result.toFixed(2))
    
  }, [result])


  
    return (
      <div className='productCardMen'>
  
      <Card sx={{ width: "22rem" , height:"47rem" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              {man.category[0].toUpperCase()}
            </Avatar>
          }
          title={man.title}
      
        />
         { (Number(result)>0)?
        <div className="promo">
        <h4 className='promo1'>Promo</h4>
        <h4 className='promo2'>{`${man.promo}% `}</h4>
        </div>:null}
        <CardMedia
          component="img"
          height="380 vh"
          width="100%"
          image={man.image}
          alt="wait for data"
        />
    { (Number(result)>0)?
        <div>
       <CardContent className='Promotion'>
          <Typography >
          <p className='priceCardPromo' style={{  textDecoration: "line-through", marginTop:"8px",color: "black"}}>{`$ ${man.price}`}</p>
          </Typography>
          <Typography  >
          <p className='priceCardPromo'>{`(${man.promo}% off) `} </p>
          </Typography>
        </CardContent>
        <CardContent >
          <Typography   >
            <p className='priceCard'>{`$ ${result}`}  </p>
          </Typography>
          </CardContent>
        </div>:
        <CardContent>
        <Typography className='priceCard'>
        {`$ ${man.price}`}   
        </Typography>
        </CardContent> 
        }
        <CardActions disableSpacing>
            {user && user.userRole === "user"?
  
           <div className="btns_user">
            <Button variant="dark" onClick={()=>dispatch(addToCart(man._id, 1))} ><i style={{color:"white" , fontSize:'20px'}} className='fas fa-shopping-cart'></i></Button>
            <Link to={`/detailProduct/${products._id}`}> <Button variant="dark"><i style={{color:"white",fontSize:'20px'}}class="fa-solid fa-magnifying-glass"></i></Button> </Link>
           </div>
            :
            <div className="btns_admin">
            <Button variant="danger" onClick={goSignUp}><i style={{color:"white" , fontSize:'20px'}} className='fas fa-shopping-cart buttoncartsignup'></i></Button>
            <Link to={`/detailProduct/${products._id}`}> <Button variant="dark" style={{marginLeft:"200px"}}><i style={{color:"white",fontSize:'20px' }}class="fa-solid fa-magnifying-glass"></i></Button> </Link>
            </div>
            }
            
        </CardActions>
      </Card>
  
      </div>
    );
  }