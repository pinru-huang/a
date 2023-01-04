import * as React from 'react';
import { useState } from 'react';
import axios from '../connection';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EE2_Building_Southside from "./images/Stations/CSIE_Der_Tain_Hall.jpg"
import { Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { m } from 'framer-motion';
import Modal from '../containers/map/modal';
import { Form, redirect, useOutletContext } from 'react-router-dom';
import { useApp } from "../hook";
import ParkInModal from './map/ParkInModal';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Flex } from '@chakra-ui/react'
const densityToColor = (density) => {
  if(density === 1) return 'lime';
  else if(density === 2) return 'yellow';
  else if(density === 3) return 'orange';
  else if(density === 4) return 'red';
  else if(density === 5) return 'purple';
  else return 'grey';
}

const NearestStations = () => {  
  //stations.sort((a, b) => a.dist - b.dist);
  const [scroll2, setScroll2] = useState(false)
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selected, setSelected] = useState(0);
  const [openParking, setOpenParking] = useState(false)
  const [position, setPosition] = useState({lat: null, lng: null, time: null})
  const {defaultLocation,setDefaultLocation}=useApp();
  const [errorMessage,setErrorMessage ] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [spot, setSpot] = useState({lat: "", lng: "", time: ""})
  const [time_dis, setTime_Dis] = useState({dis: "", dur: ""})
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=> {
        setPosition({lat: position.coords.latitude, lng: position.coords.longitude, time: new Date()})
        console.log("selected", {lat: position.coords.latitude, lng: position.coords.longitude, time: new Date()})
    })
  },[])

  const getUserPosition = () => {
    let parkingSpot=null;
    // navigator.geolocation.getCurrentPosition((position)=> {
      parkingSpot = {lat: position.lat, lng: position.lng, time: new Date(), label: allStations[selected].label}
      
      setSpot(parkingSpot);
    
      console.log("p: ", parkingSpot)
      
    // })
  //   let returnValue = parkingSpot;
  //   return  returnValue
  //   setSpot("fjopjp")
  }

  async function getTime_Dis(location) {
    console.log("kfopkaf: ", position, location)
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
          origin: position,
          destination: location,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.BICYCLING,
      })
    // setTime_Dis()
    let dis = results.routes[0].legs[0].distance.text;
    let dur = results.routes[0].legs[0].duration.text
    console.log("dis: ", dis, dur)
    setTime_Dis({dis: dis, dur: dur})
  } 

  const handleGetAllStations = async() => {
    const {
      data: { stations },
    } = await axios.get('/stations');
    // console.log("Handle get all stations")
    // console.log(stations)
    const stationsSorted = stations.sort((a, b) => calcDist(position, a.location) - calcDist(position, b.location));
    setAllStations(stationsSorted)
  }

  const calcDist = (origin, location) => {
    // if(location===undefined) return
    return Math.sqrt((location.lat-origin.lat)*111.2*111.2*(location.lat-origin.lat) + (location.lng-origin.lng)*110.8*110.8*(location.lng-origin.lng))
  }

  const calculateRoute = (idx) => {
    console.log("hihi: ", idx, allStations[idx].label)
    setDefaultLocation(allStations[idx].location)
  }

  const [allStations, setAllStations] = useState([]);

  React.useEffect(()=>{
     handleGetAllStations();
  },[position])

    return (<>
    <Box sx={{ width: '50%', position:"fixed", left: "50%", top:"12%", transform: "translate(-50%, 0)" }}>
      { errorMessage? <Collapse in={errorMessage}>
                <Alert severity='error'
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        // setErrorOpen(false);
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
            
            {successMessage? <Collapse in={successMessage}>
                <Alert severity='success'
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        // setSuccessOpen(false);
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
        <Typography gutterBottom variant="h4" component="div" marginLeft="12px">
            Nearest Stations
        </Typography>
        <Button onClick={ handleGetAllStations }> Refresh </Button>
        <List sx={{ width: '100%', maxWidth: `calc(0.8*vw)`, bgcolor: 'background.paper' }}>
            {allStations.map((stop, index) => 
            <>
            <ListItem alignItems="flex-start" justifyitems='center' key={stop.label} sx={{height: '130px'}} >
                <ListItemAvatar sx={{height: '80px', width: '100px'}} onClick={()=>{ setTime_Dis(getTime_Dis(allStations[index].location)); setScroll2(true); setSelected(index); }}>
                    <Avatar alt="Remy Sharp" src={stop.src} sx={{height: '80px', width: '80px'}}/>
                    {/* {EE2_Building_Southside} */}
                </ListItemAvatar>
                <ListItemText
                primary={stop.label}
                primaryTypographyProps={{variant: 'h6'}}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="h6"
                        color="text.primary"
                    >
                       Distance: &nbsp; 
                       <span style={{color: 'gray'}}> {`${Math.ceil(calcDist(position, stop.location)*1000)} meters`} </span>
                       &nbsp; &nbsp; &nbsp; &nbsp;
                       Spaces left: &nbsp;
                       <LocationOnIcon sx={{color: densityToColor(stop.density), fontSize: 36}}/>
                    </Typography>
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" key= {`${stop.label} divider`} />
                    </>
             )}
      {/* <ListItem alignItems="flex-start" sx={{height: '80px'}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" /> */}
    </List>
    <Modal open={true} scroll={scroll2} setScroll={setScroll2} data={allStations[selected]} calculateRoute={()=>calculateRoute(selected)} time_dis={time_dis} setOpenParking={setOpenParking} mode={2}></Modal>
    {openParking? <ParkInModal openParking={openParking} setOpenParking={setOpenParking} getUserPosition={getUserPosition} spot={spot} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}></ParkInModal> : null}
    </>
    )
}
export default NearestStations;