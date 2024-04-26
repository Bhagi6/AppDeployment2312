import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom";

function Topnavigation() {
  let navigate=useNavigate();
      let storeObj=useSelector((store)=>{
          console.log(store);
          return store;
      });
      useEffect(()=>{
          if(storeObj.loginReducer.userDetails.email){
              console.log("valid login");
                  }else{
                      console.log("Invalid Login");
              navigate("/");
                  }
      })

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/leaves">Leaves</NavLink>
      <NavLink to="/tasks">tasks</NavLink>
      <NavLink to="/editprofile">Edit Profile</NavLink>
      <NavLink
        to="/"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Signout
      </NavLink>
    </nav>
  );
}

export default Topnavigation;
