import { Router } from "express";
import MyBike from "../models/myBike.js";
import mongoose from "mongoose";
const router = Router();

const getMyBike = async  () => {
    try {
    const myBikeData = await MyBike.findOne({ });
    console.log("Get myBike data", myBikeData);
    return myBikeData;
    } catch (e) { throw new Error("Get my Bike error: " + e); }
};

router.get("/myBike", async(req, res, next) => {
    console.log("Request get at /myBike :");
    //console.log(req.query);
    const myBikeData = await getMyBike();
    if(myBikeData.length === 0){
        console.log("Not found");
        res.json( { message: `Get All Stations not found!` } );
    } else {
        const myBike = myBikeData
        console.log(myBike)
        res.json({ myBike });
    }
}
)

router.post("/myBike", async(req, res, next) => {
    const body = req.body
    console.log(body)
    const newLocation = new MyBike({ location:{ lat: req.body.location.lat, lng: req.body.location.lng }, rating: req.body.rating, time: req.body.time});
    // console.log("Created station", newStation);
    await newLocation.save();
    console.log("location saved: ", req.body)
})

export default router;