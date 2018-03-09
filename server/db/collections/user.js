const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userAddress: {
    lng: String,
    lat: String,
    address: String
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'driver'
  },
  passenger: {
    type: Schema.Types.ObjectId,
    ref: 'passenger'
  },
  company: {
    type: String
  },
  email: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
