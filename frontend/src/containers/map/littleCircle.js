import "../css/littleCircle.css"
import NavigationIcon from '@mui/icons-material/Navigation';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ReplayIcon from '@mui/icons-material/Replay';
import LocalParkingTwoToneIcon from '@mui/icons-material/LocalParkingTwoTone';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
function LittleCircle({panToOrigin, clearRoute, setShowStation, setOpenParking,setScroll, showStation, findMyBike, setCountStyle, countStyle}){
    return <>
    <nav class="menu">
    <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open" />
    <label class="menu-open-button" for="menu-open" >
        <span class="lines line-1"></span>
        <span class="lines line-2"></span>
        <span class="lines line-3"></span>
    </label>
    {/* <i class="fa fa-diamond"></i> <DirectionsBikeIcon className="circleIcon"></DirectionsBikeIcon>*/}
    <a href="#" class="menu-item blue"  onClick={()=>{panToOrigin()}}><NavigationIcon className="circleIcon"/></a>
    <a href="#" class="menu-item green" onClick={()=>{setShowStation(!showStation)}}> <MyLocationIcon className="circleIcon"></MyLocationIcon> </a>
    <a href="#" class="menu-item red" onClick={()=>{setCountStyle((countStyle+1)%3)}}> <DesignServicesIcon className="circleIcon"></DesignServicesIcon></a>
    <a href="#" class="menu-item purple" onClick={()=>{setOpenParking(true); setScroll(false);}}><LocalParkingTwoToneIcon className="circleIcon"></LocalParkingTwoToneIcon></a>
    <a href="#" class="menu-item lightblue" onClick={()=>{findMyBike()}}> <i class="fa fa-diamond"></i> <DirectionsBikeIcon className="circleIcon"></DirectionsBikeIcon> </a>
    <a href="#" class="menu-item orange" onClick={()=>{clearRoute()}}> <ReplayIcon className="circleIcon"/> </a>
    </nav>
    </>
}
export default LittleCircle