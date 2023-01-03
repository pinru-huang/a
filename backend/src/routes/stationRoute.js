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

export default router;
