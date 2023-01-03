import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../css/ParkInModal.scss"
import { Input } from '@chakra-ui/react';
import ReactStars from "react-rating-stars-component" ;
import { useState, useEffect} from 'react';
import axios from '../../connection';
import { formatRelative } from "date-fns";
import { useOutletContext } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ParkInModal({openParking, setOpenParking, getUserPosition, parkingSpots, setParkingSpots, spot}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState(0)
  const [bikeClicked, setBikeClicked] = useState(0)
  const [username] = useOutletContext();

  const addParkingSpot = async() => {
    if(rating===0) alert("Please select the bike density !")
    let tok = await getUserPosition();
    // setTimeout(console.log('jiji'), 1000)
    console.log("fuck", spot)
    
  }

  useEffect(()=>{
    setRating(bikeClicked);
  }, [bikeClicked])

  const saveMyBike = async(data) => {
    await axios.post('/myBike', {
      // TODO Part III-3-b: store the comment to the DB
      location: {lat: data.location.lat, lng: data.location.lng},
      time: formatRelative(data.time, new Date()),
      username: data.username,
      parked: false,
      parkedAt: data.parkedAt
  })
  const {
    data: { messageStation },
  } = await axios.post('/stations', {
      label: data.parkedAt, density:  rating
  });
  }

  useEffect(()=>{
 
    let tok2 = {location: {lat: spot.lat, lng: spot.lng}, time: spot.time, rating: rating, parked: false, username: username, parkedAt: spot.label}
    // setParkingSpots([...parkingSpots, tok2])
    console.log("name: ", tok2)
    saveMyBike(tok2)
  }, [spot])

  useEffect(()=>{
    console.log(parkingSpots)
  }, [parkingSpots])

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openParking}
        onClose={()=>setOpenParking(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='parkInModal'>
          <div className='texts'>
            <h1>PARK IN!!</h1>
            {/* <p>fuck</p> */}
          </div>
          <div className='form'>
            <div className='texts'>
            <h3>Please select the bike density</h3>
            {/* <p>fuck</p> */}
          </div>
          <div className='bikes'>
            {/* <ReactStars
            key={`stars_${rating}`}
            count={5}
            onChange={changeRating}
            size={18}
            activeColor="#ffd700"
          /> */
          } 
            
            <img className={bikeClicked>0 ? "bike bikeClicked" : "bike"} width="30px" src="bicycle-solid.svg" onClick={()=>{ bikeClicked===1 ? setBikeClicked(0) : setBikeClicked(1)}}></img>

            <img className={bikeClicked>1 ? "bike bikeClicked" : "bike"} width="30px" src="bicycle-solid.svg" onClick={()=>{ bikeClicked===2 ? setBikeClicked(0) : setBikeClicked(2)}}></img>
          
            <img className={bikeClicked>2 ? "bike bikeClicked" : "bike"} width="30px" src="bicycle-solid.svg" onClick={()=>{ bikeClicked===3 ? setBikeClicked(0) : setBikeClicked(3)}}></img>
            <img className={bikeClicked>3 ? "bike bikeClicked" : "bike"} width="30px" src="bicycle-solid.svg" onClick={()=>{ bikeClicked===4 ? setBikeClicked(0) : setBikeClicked(4)}}></img>
            <img className={bikeClicked>4 ? "bike bikeClicked" : "bike"} width="30px" src="bicycle-solid.svg" onClick={()=>{ bikeClicked===5 ? setBikeClicked(0) : setBikeClicked(5)}}></img>
            <Button onClick={()=>{addParkingSpot();}}><h3>Park In</h3></Button>
            {/* <img width="30px" src="bicycle-solid.svg"></img>
            <img width="30px" src="bicycle-solid.svg"></img>
            <img width="30px" src="bicycle-solid.svg"></img>
            <img width="30px" src="bicycle-solid.svg"></img> */}
          </div>
          
            
          </div>
        </div>
      </Modal>
    </div>
  );
}