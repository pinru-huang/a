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

const NearestStations = () => {  
  //stations.sort((a, b) => a.dist - b.dist);
  const handleGetAllStations = async() => {
    const {
      data: { stations },
    } = await axios.get('/stations');
    console.log("Handle get all stations")
    console.log(stations)
    setAllStations(stations)
  }

  const [allStations, setAllStations] = useState([]);
  if(allStations.length === 0) handleGetAllStations();

    return (<>
        <Typography gutterBottom variant="h4" component="div" marginLeft="12px">
            Nearest Stations
        </Typography>
        <Button onClick={ handleGetAllStations }> Refresh </Button>
        <List sx={{ width: '100%', maxWidth: `calc(0.8*vw)`, bgcolor: 'background.paper' }}>
            {allStations.map((stop, index) => 
            <>
            <ListItem alignItems="flex-start" justifyitems='center' key={stop.label} sx={{height: '116px'}}>
                <ListItemAvatar sx={{height: '80px', width: '100px'}} >
                    <Avatar alt="Remy Sharp" src={stop.src} sx={{height: '80px', width: '80px'}}/>
                    {/* {EE2_Building_Southside} */}
                </ListItemAvatar>
                <ListItemText
                primary={stop.label}
                primaryTypographyProps={{variant: 'h5'}}
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="h6"
                        color="text.primary"
                    >
                       Distance: &nbsp; 
                       <span style={{color: 'gray'}}> {`${stop.dist} meters`} </span>
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
    </>
    )
}
export default NearestStations;