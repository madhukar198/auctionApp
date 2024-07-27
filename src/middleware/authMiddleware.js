const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const initModels = require('../controllers/models');
const initModels = require('../models/index');
const AppError = require("../utils/appError")
const response = require('../utils/appResponse')


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET


const generateToken = (id)=>{
  
  const accessToken = jwt.sign({ id}, JWT_ACCESS_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: '1d' });

  return {accessToken, refreshToken}

}

const generateNewToken = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
      const { User } = await initModels();
      let userData = await User.findById(decoded.id).select('-password');

      if(!userData){
        return next(new AppError('User not found, Please Re-Login', 400));
      }

      let id = userData._id.toString()

      let generateNewToken = generateToken(id)
      return response(res, `New Token Generated Successfully..!`, generateNewToken);

    } catch (error) {
      return next(new AppError('Not authorized, token failed', 400));
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
  



const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log("token -->",token );
      const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
      console.log("decoded-->",decoded);
      const { User } = await initModels();
      req.user = await User.findById(decoded.id).select('-password');
      console.log("req.user-->",req.user);
      next();
    } catch (error) {
      // res.status(401).json({ message: 'Not authorized, token failed' });
      return next(new AppError('Not authorized, token failed', 400));
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect,generateNewToken, generateToken};
