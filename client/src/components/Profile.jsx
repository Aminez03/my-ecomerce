import React, { useEffect, useState } from "react";


import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/action";
import ListProduct from "./ListProduct";
// import BlockUi from 'react-block-ui';
// import 'react-block-ui/style.css';



export const Profile = ({products}) => {
  const { user, loading } = useSelector((state) => state.user);
  console.log( user.blocking)



  
  const dispatch = useDispatch();

  
  
  useEffect(() => {
   
    dispatch(getUserProfile());
  }, []);

  

  return (
    <div>
      {user.blocking==='yes' ? (  
       <div style={{marginTop:"150px"}}>
       
       <div class="spinner-border"  role="status">
      <span class="sr-only"></span>
      </div>
      <h2>Your account has been blocked</h2>


 </div>
      ) : 
      
      (
       <div>
        <div>{user && <h2 style={{marginLeft:"-1200px", marginTop:"-40px"}}><i class="fa-sharp fa-solid fa-user-tie"></i> {user.fullName}</h2>}</div>
      
        <ListProduct products={products}/>

        </div>

       
      
      )}
    </div>
  );
};
