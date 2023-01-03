import * as React from 'react';
import { useState } from 'react';
import axios from '../connection';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import NTU_at_night from "../containers/images/NTU_at_night.jpg";
//Form
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Autocomplete from '@mui/material/Autocomplete';
import { Form, redirect, useOutletContext } from 'react-router-dom';
import "./css/buttons.css";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { duration } from '@mui/material';

const crowdedLabels = {
    1: 'Empty 車位很空',
    2: 'Plenty of spaces 仍有許多車位',
    3: 'Normal/Some spaces left 尚有一些車位',
    4: 'Full of bikes 很多腳踏車',
    5: 'No spaces left 無位可停',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${crowdedLabels[value]}`;
  }

function MyBike () {
    const [refreshedFirstTime, setRefreshedFirstTime] = useState(false)
    const [parked, setParked] = useState(false);
    const [parkLocation, setParkLocation] = useState("")
    const [crowdednessValue, setCrowdednessValue] = React.useState(0);
    const [crowdedHover, setCrowdedHover] = useState(-1)
    const [username] = useOutletContext();
    const [errorMessage, setErrorMessage] = useState("")
    const [errorOpen, setErrorOpen] = React.useState(true);
    const [successMessage, setSuccessMessage] = useState("")
    const [successOpen, setSuccessOpen] = React.useState(true);
    const [position, setPosition] = useState({lat: null, lng: null, time: null})

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position)=> {
            setPosition({lat: position.coords.latitude, lng: position.coords.longitude, time: new Date()})
            console.log("selected", {lat: position.coords.latitude, lng: position.coords.longitude, time: new Date()})
        })
    },[])

    const handleGetMyBike = async() => {
        const {
          data: { myBike },
        } = await axios.get('/myBike', {
            params: {
                username
            }
        });
        console.log("Handle get my Bike")
        console.log(myBike)
        if(myBike){
            setParked(myBike.parked);
            setParkLocation(myBike.parkedAt);
        }
        //setAllStations(stations)
    }

    const handleParkMyBike = async() => {
        const {
          data: { message, myBike },
        } = await axios.post('/myBike', {
            username, parked, parkedAt: parkLocation, time: new Date(), location: {lat: position.lat, lng: position.lng}
        });
        console.log("Handle post my Bike")
        console.log(myBike)
        if(!myBike){
            setErrorOpen(true);
            setErrorMessage("Database post my bike error!")
        } else  {
            setSuccessOpen(true);
            setSuccessMessage("Successfully saved your bike position in database.")
            setTimeout(function () {
                setSuccessOpen(false)
                setSuccessMessage("")
            }, 10000);//10 Second delay 
        }
        const {
            data: { messageStation },
          } = await axios.post('/stations', {
              label: parkLocation, density:  crowdednessValue
          });
        //setAllStations(stations)
    }

    const handleRideMyBike = async() => {
        const {
          data: { message, myBike },
        } = await axios.post('/myBike', {
            username, parked, parkedAt: parkLocation, time: new Date(), location: {lat: position.lat, lng: position.lng} 
        });
        console.log("Handle post my Bike")
        console.log(myBike)
        if(!myBike){
            setErrorOpen(true);
            setErrorMessage("Database post my bike error!")
        } else  {
            setSuccessOpen(true);
            setSuccessMessage("Successfully updated your bike status in database.")
            setTimeout(function () {
                setSuccessOpen(false)
                setSuccessMessage("")
            }, 10000);//10 Second delay 
        }
        //setAllStations(stations)
    }
    
    if(!refreshedFirstTime){
        handleGetMyBike();
        setRefreshedFirstTime(true);
    }

    return ( <>
        <Box sx={{ width: '50%', position:"fixed", left: "50%", top:"12%", transform: "translate(-50%, 0)" }}>
            { errorMessage? <Collapse in={errorOpen}>
                <Alert severity='error'
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setErrorOpen(false);
                        setErrorMessage("");
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                {errorMessage}
                </Alert>
            </Collapse> : <></>}
            {successMessage? <Collapse in={successOpen}>
                <Alert severity='success'
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setSuccessOpen(false);
                        setSuccessMessage("");
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                {successMessage}
                </Alert>
            </Collapse> : <></>}
        </Box> 
        
        <Card sx={{ maxWidth: `calc(0.8*vw)` }}>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {username}'s Bike
                <Button onClick={ handleGetMyBike }> Refresh </Button>
                </Typography>
            </CardContent>
            <CardMedia
                sx={{ height: `360px`, marginLeft: "10px", marginRight: "10px", borderRadius: "10px" }}
                image={NTU_at_night}
                title="NTU at night"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Status of My Bike: &nbsp;
                    { parked? <Chip label="Parked" color="primary" size='medium'/>
                    : <Chip label="Riding" color="secondary" size='medium'/>}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    { parkLocation ?
                     parked? `Parked at : ${parkLocation}` : `Last parked at : ${parkLocation}`
                     : "First Time using NTU Bike!! Welcome ~~"
                    }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                
                </Typography>
                
                <Autocomplete
                    disablePortal
                    onInputChange={(event, newInputValue) => {
                        setParkLocation(newInputValue);
                    }}
                    id="bike-parking-spots-list"
                    options={parkingSpots}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Parking Spot" />}
                />
                <br></br>
                <Typography gutterBottom variant="h6" component="div">
                    How many bikes are there?
                </Typography>
                <Rating
                    name="simple-controlled"
                    value={crowdednessValue}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setCrowdednessValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setCrowdedHover(newHover);
                    }}
                />{crowdednessValue !== null && (
                    <Box sx={{ ml: 2 }}>{crowdedLabels[crowdedHover !== -1 ? crowdedHover : crowdednessValue]}</Box>
                )}
            </CardContent>
            <CardActions>
                <Form>
                    <button type='submit' className='button-19'
                    //disabled={!parkLocation || !crowdednessValue}
                    onClick={async ()=> {
                        if(!parked && !parkLocation && !crowdednessValue){
                            setErrorOpen(true)
                            setErrorMessage("Parking spot and rating of how many bikes is required."); 
                            setTimeout(function () {
                                setErrorOpen(false)
                                setErrorMessage("")
                            }, 10000);//10 Second delay   
                        
                            return;
                        } else if (!parked && !parkLocation){
                            setErrorOpen(true)
                            setErrorMessage("Parking spot is required."); 
                            return;
                        } else if (!parked && !crowdednessValue){
                            setErrorOpen(true)
                            setErrorMessage("Rating of how many bikes is required."); 
                            return;
                        }
                        if(!parked){
                            setCrowdednessValue(0)
                            await handleParkMyBike();
                            await handleGetMyBike({ username });
                        }else{
                            await handleRideMyBike();
                            await handleGetMyBike({ username });
                        }
                        //setParked(!parked)
                    }}>{parked? "Ride my bike" : "Park my bike"}</button>
                </Form>
                &nbsp;
                <Form method="post"> 
                    <button type='submit' className='button-19'>Back to Home</button>
                </Form>
            </CardActions>
        </Card> </>       
    )
}

const parkingSpots = [
    {label: '1st Student Activity Center 第一學生活動中心'},
    {label: 'Astronomy Mathematics Building 天文數學館'},
    {label: 'Barry Lam Hall 博理館'},
    {label: 'Boya Lecture Building 博雅教學館'},
    {label: 'Center for Condensed Matter Sciences 凝態科學中心/物理系'},
    {label: 'College of Liberal Arts 文學院'},
    {label: 'CSIE Der Tain Hall 德田館(資工系)'},
    {label: 'CSIE Der Tain Hall Northside 德田館(資工系)北側'},
    {label: 'Department of Psychology North Hall 心理系北館'},
    {label: 'Department of Psychology South Hall 心理系南館'},
    {label: 'EE-2 building Southside 電機二館南側'},
    {label: 'EE-2 building Northside 電機二館北側'},
    {label: 'Gontong Lecture Building 共同教學館'},
    {label: 'Main Library 總圖書館'},
    {label: 'Ming Dar Hall 明達館'},
    {label: 'MK Innovation Hall 學新館'},
    {label: 'Putong Lecture Building 普通教學館'},
    {label: 'Social Sciences Building 社科院'},
    {label: 'Xinsheng Lecture Building 新生教學館'},
    {label: 'Zonghe Lecture Building 綜合教學館'},
    {label: 'Administrative Building 行政大樓'},
    {label: 'Computer and Information Networking Center 計算機及資訊網路中心(計中)'},
    {label: "Freshman Women's Dorm 大一女舍"},
    {label: "Lixian Hall Baskside 禮賢樓後側"},
    {label: 'NTU Sports Center 新體育館'},
    {label: 'Sports Field 運動場'},
    {label: "1st/3rd/5th Men's Dorm 男一/三/五舍"},
    {label: "6th/8th Men's Dorm 男六/八舍"},
    {label: "7th Men's Dorm 男七舍"},

]
export default MyBike;
export async function action(){
    //const contact = await createContact();
    //return { contact }
    console.log("Called action in my bike.js")
    return redirect("/")
}