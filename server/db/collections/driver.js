const mongoose = require('mongoose');
const { Schema } = mongoose;
const CarInfoSchema = require('./carInfo');

const DriverSchema = new Schema({
  driverInfo: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  destination: {
    lng: String,
    lat: String,
    address: String
  },
  time: Date,
  date: Date,
  capacity: Number,
  occupants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  carModel: [CarInfoSchema]
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
