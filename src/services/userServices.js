const initModels = require('../models/index');
const { connectUserDB, connectAuctionDB } = require('../../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.createUser =  async({email, password, mobile})=>{
    try {
        const { User } = await initModels();
        const user = new User({ email, password, mobile });
        let saveUser = await user.save();
        return saveUser;
    } catch (error) {
        console.log(error);
        throw new Error(error) 
    }

}


exports.getUser =  async({email, password, mobile})=>{
    try {
        const { User } = await initModels();
        console.log("email, mobile",email, mobile);
        let user ;
        if(email){
            user = await User.findOne({ email});
        }else{
            user = await User.findOne({mobile});
        }

        if (user && (await user.matchPassword(password))) {
          
            return user
          }else{
            return null;
          }
    } catch (error) {
        throw new Error(error)
    }

}
exports.getUserById=  async({id})=>{
    try {
        const { User } = await initModels();
        const user = await User.findOne({_id:id});
        return user
    } catch (error) {
        throw new Error(error)
    }

}