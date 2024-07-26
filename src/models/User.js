// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const { connectUserDB } = require('../config/db');

// const userDB = connectUserDB();

// const userSchema = new mongoose.Schema({
//   email: { type: String,sparse: true, unique: true },
//   password: { type: String, required: true },
//   mobile: { type: String,sparse: true, unique: true },
// }); 

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = userDB.model('User', userSchema);
// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String,  unique: true, sparse: true},
  password: { type: String, required: true },
  mobile: { type: String, unique: true, sparse: true},
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = userSchema;
