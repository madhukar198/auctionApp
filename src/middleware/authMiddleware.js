const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const initModels = require('../controllers/models');
const initModels = require('../models/index');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET


const generateToken = (id)=>{

  console.log("JWT_ACCESS_SECRET==>",JWT_ACCESS_SECRET);
  console.log("JWT_REFRESH_SECRET==>",JWT_REFRESH_SECRET);
  
  const accessToken = jwt.sign({ id}, JWT_ACCESS_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: '1d' });

  return {accessToken, refreshToken}

}
  



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
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect, generateToken};
