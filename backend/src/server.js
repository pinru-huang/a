
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import cors from 'cors';
import mongo from './mongo.js';
// const express = require('express');
// const mongoose = require('mongoose')
// const dotenv = require('dotenv-defaults')
import Station from './models/station.js';
import MyBike from './models/myBike.js';
import routes from './routes/index.js'
import { dataInit } from './upload.js';
// import stations from "./stations"
const app = express();
const port = process.env.PORT || 4000;
mongo.connect();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
// label: String, // Number is shorthand for {type: Number}
//     dist: Number, //in meters
//     density: Number,
//     location: {
//         latitude: Number,
//         longitude: Number,
// }
const saveStation = async (label, dist, density, latitude, longitude) => {
    const existing = await Station.findOne({ label });
    if (existing) throw new Error(`data ${label} exists!!`);
    try {
    const newStation = new Station({ label, dist, density, location:{ latitude, longitude } });
    console.log("Created station", newStation);
    return newStation.save();
    } catch (e) { throw new Error("Station creation error: " + e); }
};
// parked: Boolean, // Number is shorthand for {type: Number}
// parkedAt: String, //in meters
// location: {
//     latitude: Number,
//     longitude: Number,
// }
const saveMyBike = async (parked, parkedAt, latitude, longitude) => {
    //const existing = await Station.findOne({ label });
    //if (existing) throw new Error(`data ${label} exists!!`);
    try {
    const newMyBike = new MyBike({ parked, parkedAt, location:{ latitude, longitude } });
    console.log("Created MyBike", newMyBike);
    return newMyBike.save();
    } catch (e) { throw new Error("MyBike creation error: " + e); }
};
const deleteDB = async () => {
    try {
    await Station.deleteMany({});
    await MyBike.deleteMany({});
    console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
};
   
app.get('/', (req, res) => {
 res.send('Hello, World!');
});
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    dataInit();
  await deleteDB();
//  for(let i=0; i<stations.length; i++){
//     await saveStation(stations[i].label, stations[i].dist, stations[i].density, stations[i].location.lat, stations[i].location.lng);
//  }
//  await saveMyBike(true, 'Barry Lam Hall 博理館', 25.019217, 121.542462)
});