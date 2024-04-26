const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));
let authorize=(req,res,next)=>{
  console.log(req.headers.authorization);
  next();
}
app.use(authorize)
let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  Age: Number,
  email: String,
  password: String,
  moblieNo: String,
  ProfilePic: String,
});
let user = new mongoose.model("user", userSchema);

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
let hashedPassword=await bcrypt.hash(req.body.password,10);

  try {
    let newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      Age: req.body.age,
      email: req.body.email,
      Password: hashedPassword,
      moblieNo: req.body.moblieNo,
      ProfilePic: req.file.path,
    });
    let userList = user.find().and({ email: req.body.email });
    if (userList.length > 0) {
      res.json({ status: "failure", msg: "User already exist" });
    } else {
      await user.insertMany([newUser]);
      res.json({ status: "success", msg: "User Created Successfully" });
    }
  } catch (err) {
    res.json({ status: "err", msg: "Unable to create Account", err: err });
  }
});

app.post("/validateLogin", upload.none(), async (req, res) => {
  console.log(req.body);
  let userDetails = await user.find().and({ email: req.body.email });
  if (userDetails.length > 0) {
    let isPasswordCorrect=await bcrypt.compare(req.body.password,userDetails[0].password)
    if (isPasswordCorrect) {
      let token = jwt.sign(
        { email: req.body.email, password: req.body.password },
        "BRN2312Batch"
      );
      let details = {
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        age: userDetails[0].age,
        email: userDetails[0].email,
        moblieNo: userDetails[0].moblieNo,
        ProfilePic: userDetails[0].ProfilePic,
        token: token,
      };
      res.json({ status: "success", data: details });
    } else {
      res.json({ status: "failure", msg: "invalid password" });
    }
  } else {
    res.json({ status: "failure", msg: "User does not exist" });
  }
  console.log(userDetails);
  res.json(["Sending some dummy data"]);
});

app.post("/validateToken", upload.none(), async (req, res) => {
  console.log(req.body);
  let decryptedToken = jwt.verify(req.body.token, "BRN2312Batch");
  console.log(decryptedToken);
  let userDetails = await user.find().and({ email: req.decryptedToken.email });
  if (userDetails.length > 0) {
    if (userDetails[0].password == decryptedToken.password) {
      // let token=jwt.sign({email:req.body.email,
      // password:req.body.password},"BRN2312Batch");
      let details = {
        firstName: userDetails[0].firstName,
        lastName: userDetails[0].lastName,
        age: userDetails[0].age,
        email: userDetails[0].email,
        moblieNo: userDetails[0].moblieNo,
        ProfilePic: userDetails[0].ProfilePic,
      };
      res.json({ status: "success", data: details });
    } else {
      res.json({ status: "failure", msg: "invalid password" });
    }
  } else {
    res.json({ status: "failure", msg: "User does not exist" });
  }
  console.log(userDetails);
});
app.patch("/editprofile", upload.single("ProfilePic"), async (req, res) => {
  console.log(req.body);

  if (req.body.firstName.trim().length > 0) {
    let result = await user.updateMany(
      { email: req.body.email },
      { firstName: req.body.firstName }
    );
    console.log(result);
  }
  if (req.body.lastName.trim().length > 0) {
    let result = await user.updateMany(
      { email: req.body.email },
      { lastName: req.body.lastName }
    );
    console.log(result);
  }
  if (req.body.age > 0) {
    let result = await user.updateMany(
      { email: req.body.email },
      { age: req.body.age }
    );
    console.log(result);
  }
  if (req.body.password.trim().length > 0) {
    let result = await user.updateMany(
      { email: req.body.email },
      { password: req.body.password }
    );
    console.log(result);
  }
  if (req.body.moblieNo.trim().length > 0) {
    let result = await user.updateMany(
      { email: req.body.email },
      { moblieNo: req.body.moblieNo }
    );
    console.log(result);
  }
  if (req.file.path) {
    let result = await user.updateMany(
      { email: req.body.email },
      { ProfilePic: req.file.path }
    );
    console.log(result);
  }
  res.json({ status: "success", msg: "Profile Updated Succssfully." });
});
app.delete("/deleteProfile", upload.none(), async (req, res) => {
  try {
    let result = await user.deleteMany({ email: req.body.email });
    res.json({ status: "success", msg: "User Deleted Successfully" });
  } catch (err) {
    res.json({ status: "failure", msg: "unable to delete User" });
  }
});
app.listen(process.env.port, () => {
  console.log("Listening to port 4567");
});
let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.mdburl);
    //await mongoose.connect("mongodb://localhost:27017");
    console.log("Connected sucessfully to the MongoDB Database");
  } catch (err) {
    console.log("Unable to connect to Database");
  }
};
connectToMDB();
