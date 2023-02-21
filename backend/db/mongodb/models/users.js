import { Schema, model } from 'mongoose';

//Function to validate the email
const validateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'User exist with this email address'],
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
});

const User = model('User', userShema);

// userShema.pre('save', async function () {
//   // Don't increment if this is NOT a newly created document
//   if (!this.isNew) return;
//   console.log('User no');
//   const id = await User.increment('id');
//   this._id = id;
// });

export default User;
