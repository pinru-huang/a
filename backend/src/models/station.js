import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const StationSchema = new Schema({
    label: String, // Number is shorthand for {type: Number}
    dist: Number, //in meters
    density: Number,
    pics: [String],
    location: {
        lat: Number,
        lng: Number,
    }
});
const Station = mongoose.model('Station', StationSchema);
export default Station;