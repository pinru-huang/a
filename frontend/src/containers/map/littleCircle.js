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

    <a href="#" class="menu-item blue"  title="回到現在位置" onClick={()=>{panToOrigin()}}><NavigationIcon className="circleIcon"/></a>
    <a href="#" class="menu-item green" title={!showStation ? "開起站點資訊" : "關閉站點資訊"} onClick={()=>{setShowStation(!showStation)}}> <MyLocationIcon className="circleIcon"></MyLocationIcon> </a>
    <a href="#" class="menu-item red" title="切換地圖樣式" onClick={()=>{setCountStyle((countStyle+1)%3)}}> <DesignServicesIcon className="circleIcon"></DesignServicesIcon></a>
    {/* <a href="#" class="menu-item purple" title="停車" onClick={()=>{setOpenParking(true); setScroll(false);}}><LocalParkingTwoToneIcon className="circleIcon"></LocalParkingTwoToneIcon></a> */}
    <a href="#" class="menu-item lightblue" title="導航到上次停車位置" onClick={()=>{findMyBike()}}><DirectionsBikeIcon className="circleIcon"></DirectionsBikeIcon> </a>
    <a href="#" class="menu-item orange" title="重整畫面" onClick={()=>{clearRoute()}}> <ReplayIcon className="circleIcon"/> </a>
    </nav>
    </>
}
export default LittleCircle