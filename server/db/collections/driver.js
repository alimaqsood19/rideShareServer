const mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');
const { Schema } = mongoose;
const CarInfoSchema = require('./carInfo');

const DriverSchema = new Schema({
  driverInfo: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  destination: mongoose.Schema.Types.Point,
  time: String,
  date: String,
  capacity: Number,
  occupants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  carModel: CarInfoSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
