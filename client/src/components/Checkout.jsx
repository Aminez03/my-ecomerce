import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import "./Checkout.css";


const Checkout = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const {email,fullName, telephone,adresse}=user



    console.log(user)
 
 
    const factureSend =()=>alert("   your facture has been send    ")


    const [result, setResult] = useState();
    const [total, setTotal] = useState();

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

    
    useEffect(() => {
        let total = 0;
        let result;
    
        cartItems.forEach(el => {
            result=parseFloat(calculeRemise(el.price,el.promo))
            total += parseFloat(calculateAmount(el.qty, result)) 
            setResult(result.toFixed(2)) 
          
        });

        
        
        setTotal(total.toFixed(2))
     
    }, [total, cartItems,result]);


  return (

    <div className='checkout'>
        <div id="grid">
            <div class="column column1">
            <div class="step" id="step1">
                <div class="number">
                    <span>1</span>
                </div>

                <div class="title">
                    <h2>Email Address</h2>
                </div>
                <div class="modify">
                    <i class="fa fa-plus-circle"></i>
                </div>
            </div>
            <div class="content" id="email">
                <form class="go-right">
                    <div>
           
            <input type="email" name="email" value={email} id="email-address" placeholder="Email Address" data-trigger="change" data-validation-minlength="1" data-type="email" data-required="true" data-error-message="Enter a valid email address."/><label for="email">Email Address</label>
            
            
            
            
            
            </div>

                </form>
              
            </div>
            <div class="step" id="step2">
                <div class="number">
                    <span>2</span>
                </div>
                <div class="title">
                    <h2>Billing Information</h2>
                </div>
            </div>
            <div class="content" id="address">
                <form class="go-right">
                    <div>
                    <input type="name" name="full_name" value={fullName} id="first_name" placeholder="Full Name" data-trigger="change" data-validation-minlength="1" data-type="name" data-required="true" data-error-message="Enter Your First Name"/><label for="first_name">First Name</label>
                     </div>
            
                    <div>
                    <input type="phone" name="telephone" value={telephone} id="telephone" placeholder="Phone(+216)-00-000-000" data-trigger="change" data-validation-minlength="1" data-type="number" data-required="true" data-error-message="Enter Your Telephone Number"/><label for="telephone">Telephone</label>
                    </div>
                    <div>
                    <input type="text" name="address" value={adresse} id="address" placeholder="Address" data-trigger="change" data-validation-minlength="1" data-type="text" data-required="true" data-error-message="Enter Your Billing Address"/><label for="Address">Address</label>
                    </div>
                    <div>
                   
                    </div>
                    
                   
                    
               
                </form>
               
            </div>
        </div>
        
        <div class="column column2">
            <div class="step" id="step5">
                <div class="number">
                    <span>3</span>
                </div>
                <div class="title">
                    <h2>Finalize Order</h2>
                </div>
                <div class="modify">
                    <i class="fa fa-plus-circle"></i>
                </div>
            </div>
            <div class="content" id="final_products">
                <div class="left" id="ordered">

                    {cartItems&& React.Children.toArray(cartItems.map((el,index)=>
                    <div class="products">

                    <tr index={index}></tr>
                    <td><div class="product_image">
                        <img src={el.image} alt="images"/>
                        </div> </td>

                    <td><div class="product_details">
                    <span class="product_name">{el.title}</span></div></td>
                    <td><span style={{fontSize:"15px" ,color:"red"}} >{`Quantity:${el.qty}`}</span></td>
                    <hr />
                    <td > 
                    <div className='Promotion' style={{marginLeft:"250px"}}>
                            <h2 className='priceCardPromo' style={{ fontSize:"15px",  textDecoration: "line-through", marginTop:"8px",color: "black"}}>{`$ ${el.price}`}</h2>
                            <h2 className='priceCardPromo' style={{fontSize:"15px"}}>{`(${el.promo}% off) `} </h2>
                                                </div>
                                                <div className='priceCard' style={{marginLeft:"250px",fontSize:"15px"}}> {`$ ${calculeRemise(el.price,el.promo).toFixed(2) }`}  </div>
                    </td>




                    </div>

))}
                   
                    <div class="final">
                        <span class="title">Total <span id="calculated_total">{`${total} $`}</span></span>
                    </div>
                </div>	
                
        </div>
        </div>
        </div>

        <div>
        <form  id="fs-frm" name="simple-contact-form" accept-charset="utf-8" action="https://formspree.io/f/xnqreyke" method="POST">
        <h2 style={{fontSize:"40px", color:"red"}}> Facture</h2>
    <fieldset id="fs-frm-inputs">
   
    <input type="email" name="email" id="email-address" value={email} required=""/>
        
        <input type="text" name="telephone" id="email-address" value={telephone} required=""/>
        
        <input type="text" name="adresse" id="email-address" value={adresse} required=""/>
    
    <textarea rows="5" name="message" id="message" placeholder="Message" required=""
        defaultValue={
        cartItems.map(data => 
    
    'titre:'+data.title+', Qauantity:'+data.qty+ ", price:"+calculeRemise(data.price,data.promo).toFixed(2)+'$'+'\r'
       

        ) }
        
        style={{width:"350px", marginLeft:"100px"}}
    >

    </textarea>
    <textarea rows="1" name="Total" id="message" value={`${total} $`} 
         style={{width:"350px", marginLeft:"100px"}}
        >

        </textarea>
    </fieldset>
  <input type="submit" value="Submit"  id="input-submit" style={{marginLeft:"500px"}} onClick={factureSend} ></input>
  </form>

        </div>






    </div>
           

  )
}

export default Checkout