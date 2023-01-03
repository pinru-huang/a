import { Router } from "express";
import Station from "../models/station.js";
import mongoose from "mongoose";
const router = Router();

const getAllStations = async  () => {
    try {
    const allStations = await Station.find({ });
    console.log("Get all stations", allStations);
    return allStations;
    } catch (e) { throw new Error("Get All Station error: " + e); }
};

const getStation = async  (label) => {
    try {
    const stationData = await Station.findOne({ label });
    console.log("Get station data, label is "+ label + ", station data: " + stationData);
    return stationData;
    } catch (e) { throw new Error("Get station error: " + e); }
};

const updateStationsData = async (label, density) => {
    try {
        const existing = await Station.updateOne({ label }, { density });
        console.log(`Update station ${label} data`);
        //return newScore.save();
    } catch (e) { throw new Error(`Update station ${label} data error: ` + e); }
}

router.get("/stations", async(req, res, next) => {
    console.log("Request get at /stations :");
    console.log(req.query);
    const stationsList = await getAllStations();
    if(stationsList.length === 0){
        console.log("Not found");
        res.json( { message: `Get All Stations not found!` } );
    } else {
        const stations = stationsList
        console.log(stations)
        res.json({ stations });
    }
}
)

router.post("/stations", async(req, res, next) => {
    console.log("Requested post at /stations")
    const body = req.body
    console.log(body)
    //({ username, parked, parkedAt, time, location }) = body;
    const station = await getStation(body.label);
    if(!station){
        throw new Error(`Station ${label} not found in db!`)
        //await addMyBikeData(body.username, !body.parked, body.parkedAt, body.time, /*body.location.lat, body.location.lng*/)
        //.then(() => console.log("New my bike data created"));
        //res.json({message: `Adding ${body.username}'s bike to database`, myBike: req.body});
    }else{
        await updateStationsData(body.label, body.density)
        .then(() => console.log(`Station ${body.label} data updated`))
        //res.json({message: `Updating ${body.label}'s bike position in database`, myBike: req.body});
    }
        // console.log("Created station", newStation);
    
})

router.post("/stations/distance", async(req, res, next) => {
    console.log("yeh")
    console.log(req.body)
    for(let i=0; i<req.body.distances.length; i++){
        try {
            let label = req.body.distances[i].label
            let dist = Math.ceil(req.body.distances[i].dist)
            const stationData = await Station.updateOne({ label }, { dist });
            console.log("dist saved", i , ' ', stationData)
            // console.log("Get station data, label is "+ label + ", station data: " + stationData);
            
        } catch (e) { throw new Error("Get station error: " + e); }
    }
})

export default router;