
import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const MyBikeSchema = new Schema({
    parked: Boolean, // Number is shorthand for {type: Number}
    parkedAt: String, //in meters
    time: String,
    rating: Number,
    location: {
        lat: Number,
        lng: Number,
    }
});
const MyBike = mongoose.model('MyBike', MyBikeSchema);
export default MyBike;