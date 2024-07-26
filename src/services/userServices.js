const initModels = require('../models/index');
const { connectUserDB, connectAuctionDB } = require('../../config/db');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const { Error } = require('mongoose');



exports.createUser =  async({email, password, mobile})=>{
    try {
        const { User } = await initModels();
        const user = new User({ email, password, mobile });
        let saveUser = await user.save();
        return saveUser;
    } catch (error) {
        throw new Error(error) 
    }

}


exports.getUser =  async({email, password, mobile})=>{
    try {
        const { User } = await initModels();
        const user = await User.findOne({$or:[{ email }, {mobile}]});
        console.log("user-->",user);
        console.log("match password-->",await user.matchPassword(password));
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