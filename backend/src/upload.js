import StationsData from '../stations.json' assert {type: "json"}
import Station from './models/station.js'
import MyBike from "./models/myBike.js"

const saveStation = async (label, dist, density,pics, lat, lng ) => {
    const existing = await Station.findOne({ label });
    if (existing) throw new Error(`data ${label} exists!!`);
    try {
    const newStation = new Station({ label, dist, density, pics, location:{ lat, lng } });
    console.log("Created station", newStation);
    return newStation.save();
    } catch (e) { throw new Error("Station creation error: " + e); }
};

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
    } catch (e) { throw new Error("Database deletion failed" + e); }
};

const dataInit = async () => {
    await deleteDB();
    //await saveMyBike(true, 'Barry Lam Hall 博理館', 25.019217, 121.542462)
    for(let i=0; i<StationsData.length; i++){
        await saveStation(StationsData[i].label, StationsData[i].dist,StationsData[i].density,StationsData[i].pics, StationsData[i].location.lat, StationsData[i].location.lng);
    }
}
  
export { dataInit }