import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/action";
import ContactUs from "./ContactUs";
import ListProduct from "./ListProduct";

export const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
   
    dispatch(getUserProfile());
  }, []);

  return (
    <div>
      {loading ? (  
        <h2>Loading...</h2>
      ) : (
        <div>
        <div>{user && <h2 style={{marginLeft:"-1200px", marginTop:"-40px"}}><i class="fa-sharp fa-solid fa-user-tie"></i> {user.fullName}</h2>}</div>
      
        <ListProduct/>
      
        </div>
      )}
    </div>
  );
};
