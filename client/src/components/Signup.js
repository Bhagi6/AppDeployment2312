import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let moblieNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, setprofilePic] = useState("./images/Noimage.png");

  let sendDataToServerUsingJSON = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let dataToSend = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      moblieNumber: moblieNoInputRef.current.value,
      password: passwordInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };
    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(dataToSend),
    };

    let JSONData = await fetch("/signup", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };
  let sendDataToServerUsingFD = async () => {
    //let myHeader = new Headers();
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("moblieNumber", moblieNoInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    for (let i = 0; i <= profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("/signup", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };

  let sendDataToServerUsingURLE = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");
    let dataToSend = new URLSearchParams();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("moblieNumber", moblieNoInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("profilePic", profilePicInputRef.current.value);
    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: dataToSend,
    };
    let JSONData = await fetch("/signup", reqOptions);
    let JSOData = await JSONData.json();
    //alert(JSOData.msg);
    console.log(JSOData);
  };
  return (
    <div className="App">
      <form>
        <h2>SIGN UP</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email ID</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Moblie Number</label>
          <input ref={moblieNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            ref={profilePicInputRef}
            onChange={(eventObj) => {
              let selectPicPath = URL.createObjectURL(eventObj.target.files[0]);
              setprofilePic(selectPicPath);
            }}
          ></input>
          <br></br>
          <img className="profilePic" src={profilePic} alt="jdhd"></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              sendDataToServerUsingJSON();
            }}
          >
            Sign Up(JSON)
          </button>
          <button
            type="button"
            onClick={() => {
              sendDataToServerUsingURLE();
            }}
          >
            Sign Up (URLE)
          </button>
          <button
            type="button"
            onClick={() => {
              sendDataToServerUsingFD();
            }}
          >
            Sign Up (FD){" "}
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
