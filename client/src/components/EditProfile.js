import React, { useEffect, useRef, useState } from "react";

import Topnavigation from "./Topnavigation";
import { useSelector } from "react-redux";

function EditProfile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let moblieNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, setprofilePic] = useState("./images/Noimage.png");
  let storeObj = useSelector((store) => {
    return store;
  });
  useEffect(() => {
    console.log(storeObj);
    firstNameInputRef.current.value = storeObj.userDetails.firstName;
    lastNameInputRef.current.value = storeObj.userDetails.lastName;
    ageInputRef.current.value = storeObj.userDetails.age;
    emailInputRef.current.value = storeObj.userDetails.email;
    moblieNoInputRef.current.value = storeObj.userDetails.moblieNo;
    profilePicInputRef.current.value = storeObj.userDetails.ProfilePic;
    setprofilePic(`/${storeObj.userDetails.ProfilePic}`);
  }, []);

  let updateProfileUsingFD = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("moblieNo", moblieNoInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    for (let i = 0; i <= profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "PATCH",
      body: dataToSend,
    };
    let JSONData = await fetch("/editprofile", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };
  return (
    <div className="App">
      <Topnavigation></Topnavigation>
      <form>
        <h2>Edit Profile</h2>
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
          <input ref={emailInputRef} readOnly></input>
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
              updateProfileUsingFD();
            }}
          >
            Update Profile(FD){" "}
          </button>
        </div>
      </form>
      <br></br>
    </div>
  );
}

export default EditProfile;
