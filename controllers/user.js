import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import * as fs from "fs";




export const login = async (req, res, next) => {
  const time = new Date(Date.now()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    ReportLoginAttempt(time, email, password, false);
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }
  ReportLoginAttempt(time, email, password, true);
  sendCookies(user, res, `Welcome back, ${user.name}!!`, 200);
};

const ReportLoginAttempt = (time, email, password, status)=>{
    const message = `RESULT : Login Status:: ${status} :: login attempted at ${time} by ${email} with password : ${password} \n`;

    fs.appendFile("LoginAttempts1.txt", message, function (err) {
        if (err) throw err;
        console.log("Success while working with File System");
      });
};

export const logout = async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "User Logged out",
    });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user)
    return res.status(404).json({
      success: false,
      message: "User already exists",
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  sendCookies(user, res, "Registered successfully!!", 201);
};

export const getMyProfile = (req, res) => {
  //const user = await User.findById(id);
  res.status(200).json({
    success: true,
    user: req.user,
    message: req.middleWareMessage,
  });
};
