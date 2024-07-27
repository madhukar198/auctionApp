
const jwt = require('jsonwebtoken');


const response = require('../utils/appResponse')
const AppError = require("../utils/appError")
const catchAsync= require("../utils/catchAsync")
const {createUser,  getUser, getUserById}= require("../services/userServices")
const {generateToken}= require("../middleware/authMiddleware")

exports.registerUser = catchAsync(async(req, res) => {
  const { email, password, mobile } = req.body;

    let user = await createUser({email, password, mobile})
    
    const token = generateToken(user._id)
    let data = {user, token}
    
    return response(res, `User Registered Successfully..!`, data);
  })
  
  exports.loginUser = catchAsync(async(req, res, next) => {
    const { email, password ,mobile} = req.body;

    console.log("req.body-->",req.body);
    let user = await getUser({email, password, mobile})
    console.log("user==>",user);
    if (user) {
      const token = generateToken(user._id)
      let data = {user, token}
      return response(res, `User Login Successfully..!`, data);
    } else {
      return next(new AppError('Invalid email or password', 401));
    }
})

exports.updatePaasword = catchAsync(async(req, res, next) => {
  const {oldPassword, newPassword} = req.body;
  const id = req.user.id;
    let user = await getUserById({id})
    if (user && (await user.matchPassword(oldPassword))) {
      user.password = newPassword;
      await user.save();
      return response(res, `Password updated Successfully..!`);
    } else {
      return next(new AppError('Invalid email or password', 401));
    }
})

