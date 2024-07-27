const express = require('express');
const { registerUser, loginUser, updatePaasword} = require('../controllers/userController');
const {createUser_v,  login_v ,changePassword_v} = require('../validation/userValidation');
const validate = require('../utils/validator_auth')
const router = express.Router();
const { protect,generateNewToken } = require('../middleware/authMiddleware');


router.post('/register',createUser_v,validate, registerUser);
router.post('/login',login_v,validate, loginUser);
router.patch('/changePassword',protect,changePassword_v,validate, updatePaasword);
router.post('/generateJWTtoken',generateNewToken);


module.exports = router;
