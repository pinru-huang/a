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

const stations = [
    {label: '1st Student Activity Center 第一學生活動中心', dist: 200},
    {label: 'Astronomy Mathematics Building 天文數學館', dist: 1500},
    {label: 'Barry Lam Hall 博理館', dist: 300, src: "/static/media/Barry_Lam_Hall.450fe36207c086a7f957.PNG",
    location:{latitude: 25.019217, longitude: 121.542462}},
    {label: 'Boya Lecture Building 博雅教學館', dist: 1200},
    {label: 'Center for Condensed Matter Sciences 凝態科學中心/物理系', dist: 1700},
    {label: 'College of Liberal Arts 文學院', dist: 900},
    {label: 'CSIE Der Tain Hall 德田館(資工系)', dist: 250, src: "/static/media/CSIE_Der_Tain_Hall.58c8386d988cea018508.jpg",
    location:{latitude: 25.019448298802605, longitude: 121.54144852479706}},
    {label: 'CSIE Der Tain Hall Northside 德田館(資工系)北側', dist: 350},
    {label: 'Department of Psychology North Hall 心理系北館', dist: 500},
    {label: 'Department of Psychology South Hall 心理系南館', dist: 390},
    {label: 'EE-2 building Southside 電機二館南側', dist: 50, src: "/static/media/EE-2_Building_Southside.28baf89d8937375365f0.jpg",
    location:{latitude: 25.018467, longitude: 121.542027}},
    {label: 'EE-2 building Northside 電機二館北側', dist: 260,
    location:{latitude: 25.019135, longitude: 121.541993}},
    {label: 'Gontong Lecture Building 共同教學館', dist: 1900},
    {label: 'Main Library 總圖書館', dist: 200},
    {label: 'Ming Dar Hall 明達館', dist: 270},
    {label: 'MK Innovation Hall 學新館', dist: 320},
    {label: 'Putong Lecture Building 普通教學館', dist: 1000},
    {label: 'Social Sciences Building 社科院', dist: 480},
    {label: 'Xinsheng Lecture Building 新生教學館', dist: 700},
    {label: 'Zonghe Lecture Building 綜合教學館', dist: 450},
]

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

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=> {
        setPosition({lat: position.coords.latitude, lng: position.coords.longitude, time: new Date()})
        console.log("selected", {lat: position.coords.latitude, lng: position.coords.longitude, time: new Date()})
    })
  },[])


  const handleGetAllStations = async() => {
    const {
      data: { stations },
    } = await axios.get('/stations');
    console.log("Handle get all stations")
    console.log(stations)
    const stationsSorted = stations.sort((a, b) => calcDist(position, a.location) - calcDist(position, b.location));
    setAllStations(stationsSorted)
  }

  const calcDist = (origin, location) => {
    // if(location===undefined) return
    return Math.sqrt((location.lat-origin.lat)*111.2*111.2*(location.lat-origin.lat) + (location.lng-origin.lng)*110.8*110.8*(location.lng-origin.lng))
  }

  var time_dis = {dur: 0, dis: 0}
  const calculateRoute = () => {

  }

  const [allStations, setAllStations] = useState([]);

  React.useEffect(()=>{
     handleGetAllStations();
  },[position])

    return (<>
        <Typography gutterBottom variant="h4" component="div" marginLeft="12px">
            Nearest Stations
        </Typography>
        <Button onClick={ handleGetAllStations }> Refresh </Button>
        <List sx={{ width: '100%', maxWidth: `calc(0.8*vw)`, bgcolor: 'background.paper' }}>
            {allStations.map((stop, index) => 
            <>
            <ListItem alignItems="flex-start" justifyitems='center' key={stop.label} sx={{height: '130px'}} >
                <ListItemAvatar sx={{height: '80px', width: '100px'}} onClick={()=>{setScroll2(true); setSelected(index)}}>
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
            <Modal open={true} scroll={scroll2} setScroll={setScroll2} data={allStations[selected]} calculateRoute={()=>calculateRoute()} time_dis={time_dis} setOpenParking={setOpenParking}></Modal>
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
    </>
    )
}
export default NearestStations;