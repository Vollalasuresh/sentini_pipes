const mongoose = require('mongoose')

const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  user_Type: {
    type: String,
    required: true
  },
  mail_Id: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  pinCode: {
    type: Number,
    required: true
  },
  address: [],
  password: {
    type: String,
    required: true
  },
  userId: {
    type: String
  }


})

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
userSchema.methods.validPassword = (password, user) => {

  console.log(password, user.password)
  return bcrypt.compareSync(password, user.password);
}

const User = mongoose.model('User', userSchema)
module.exports = User;