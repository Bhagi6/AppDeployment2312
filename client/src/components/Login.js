import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios"

function Login() {
  axios.defaults.baseURL="https://localhost:4567";
  let emailInputRef = useRef();
  let passwordInputRef = useRef();

  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    //console.log(localStorage.getItem("email"));
    //console.log(localStorage.getItem("password"));
   validateToken();
  }, []);
  let validateToken = async () => {
          if (localStorage.getItem("token")) {
            //emailInputRef.current.value=localStorage.getItem("email");
            //passwordInputRef.current.value=localStorage.getItem("password");
            //onLoginBtnClick();

            let dataToSend = new FormData();
            dataToSend.append("token", localStorage.getItem("token"));
            let reqOptions = {
              method: "POST",
              body: dataToSend,
            };
            let JSONData = await fetch(
              "http://localhost:4567/validateToken",
              reqOptions
            );
            let JSOData = await JSONData.json();
            if (JSOData.status == "success") {
              //localStorage.setItem("email",emailInputRef.current.value);
              //localStorage.setItem("password",passwordInputRef.current.value);
              // localStorage.setItem("token",JSOData.data.token)
              dispatch({ type: "Login", data: JSOData.data });
              navigate("/home");
            } else {
              alert(JSOData.msg);
            }
      console.log(JSOData);
        }
     };
  let onLoginBtnClick = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch(
      "http://localhost:4567/validateLogin",
      reqOptions
    );
    let JSOData = await JSONData.json();
    if (JSOData.status == "success") {
      //localStorage.setItem("email",emailInputRef.current.value);
      //localStorage.setItem("password",passwordInputRef.current.value);
      localStorage.setItem("token", JSOData.data.token);
      dispatch({ type: "Login", data: JSOData.data });
      navigate("/home");
    } else {
      alert(JSOData.msg);
    }
    console.log(JSOData);
  };

  let dispatchFunc=()=>{
    return async ()=>{
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);
      let response= await axios.post("/validateLogin",dataToSend);
      console.log(response);
      // let reqOptions = {
      //   method: "POST",
      //   body: dataToSend,
      // };
      // let JSONData = await fetch(
      //   "http://localhost:4567/validateLogin",
      //   reqOptions
      // );
      //let JSOData = await JSONData.json();
      if (response.data.status == "success") {
        //localStorage.setItem("email",emailInputRef.current.value);
        //localStorage.setItem("password",passwordInputRef.current.value);
        localStorage.setItem("token", response.data.data.token);
        dispatch({ type: "Login", data: response.data.data });
        navigate("/home");
      } else {
        alert(response.data.data.msg);
      }
      console.log(response);
    }
  }
  return (
    <div className="App">
      <form>
        <h2>LOGIN</h2>
        <div>
          <label>Email ID</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <button
          type="button"
          onClick={() => {
            dispatchFunc();
          }}
        >
          Login In
        </button>
      </form>
      <br></br>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Login;
