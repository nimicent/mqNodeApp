const mongoose     = require('mongoose');
const validator = require('validator');



const userSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  accountBalance: {
    type: Number,
    required: [ true, 'you need an account balance w/ fake bank']
  }
});

const User = mongoose.model('User', userSchema);

// const testUserSignup = new User({
//   name: 'Julia Nash',
//   email: 'contact@julianash.io',
//   accountBalance: 8000
// });

// testUserSignup.save().then(doc => {
//   console.log(doc);
// }).catch(err => {
//   console.log('error 🤔 ' + err)
// })
module.exports = User;