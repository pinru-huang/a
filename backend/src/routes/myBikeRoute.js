import { Router } from "express";
import MyBike from "../models/myBike.js";
import mongoose from "mongoose";
const router = Router();

const getMyBike = async  (username) => {
    try {
    const myBikeData = await MyBike.findOne({ username });
    console.log("Get myBike data, username is "+ username + ", myBike data: " + myBikeData);
    return myBikeData;
    } catch (e) { throw new Error("Get my Bike error: " + e); }
};

const addMyBikeData = async (username, parked, parkedAt, time, lat, lng) => {
    const existing = await MyBike.findOne({ username });
    if (existing) {
        throw new Error(`data ${username} exists!!`);
        // update original data
        
    } else {
        try {
            const newMyBike = new MyBike({ username, parked, parkedAt, time, location:{lat, lng} });
            console.log("Created MyBike data", newMyBike);
            return newMyBike.save();
        } catch (e) { throw new Error("Add my bike data error: " + e); }
    }
}

const updateMyBikeData = async (username, parked, parkedAt, time, lat, lng) => {
    try {
        const existing = await MyBike.updateOne({ username }, { parked, parkedAt, time, location:{lat, lng}});
        console.log("Update my bike data");
        //return newScore.save();
    } catch (e) { throw new Error("Update my bike data error: " + e); }
}

router.get("/myBike", async(req, res, next) => {
    console.log("Request get at /myBike :");
    console.log(req.query);
    const myBikeData = await getMyBike(req.query.username);
    if(!myBikeData){
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
    console.log("Requested post at /myBike")
    const body = req.body
    console.log(body)
    //({ username, parked, parkedAt, time, location }) = body;
    const myBike = await getMyBike(body.username);
    if(!myBike){
        await addMyBikeData(body.username, !body.parked, body.parkedAt, body.time, body.location.lat, body.location.lng)
        .then(() => console.log("New my bike data created"));
        res.json({message: `Adding ${body.username}'s bike to database`, myBike: req.body});
    }else{
        await updateMyBikeData(body.username, !body.parked, body.parkedAt, body.time, body.location.lat, body.location.lng)
        .then(() => console.log("New my bike data updated"))
        res.json({message: `Updating ${body.username}'s bike position in database`, myBike: req.body});
    }
        // console.log("Created station", newStation);
    
})

export default router;