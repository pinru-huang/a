import React,{useState,useEffect} from "react";
import WbCloudyOutlinedIcon from '@mui/icons-material/WbCloudyOutlined';
const N = {
    clamp: (min, value, max) => Math.min(Math.max(min, value), max),
    rand: (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  };

// Complete URL 
// https://api.darksky.net/forecast/92162852831afbb1986efe34e1e57bc5/20.6979717,-103.4569683?callback=?

// var lat;
// var lon;
// var URL='https://api.darksky.net/forecast/92162852831afbb1986efe34e1e57bc5/';
// var API_GOOGLE = "AIzaSyCfItE_97qWsHJ6Oyb7h50_J9A2dOAd42U";
// var GURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
// // var skycons = new Skycons({"color": "white"});
// // var puerco = document.getElementById("cuerpo");
// // skycons.add("icon1",Skycons.SNOW);
// // skycons.play();

// $(document).ready(function(){
  

  
//   if (navigator.geolocation){
//    navigator.geolocation.getCurrentPosition(function(position) {
//    lat=position.coords.latitude;
//    lon=position.coords.longitude;
//    URL=URL+lat+','+lon+'?callback=?';
//      var tempF;
//      var tempC;
//    $.getJSON(URL,function(data){
//      tempF=Math.round(data.currently.temperature);
//      tempC=Math.round((tempF-32)*(5/9));     
//      var iconDarkSky=data.currently.icon;
     
     
//     //Case to select the icon and show it      
//     switch(iconDarkSky){
//       case "rain":
//         skycons.set("icon1", Skycons.PARTLY_CLOUDY_DAY);
//         skycons.play();
//         puerco.className="rain";
//         break;
//       case "clear-day":
//         skycons.set("icon1", Skycons.CLEAR_DAY);
//         skycons.play();
//         puerco.className="sunnyday";
//         break;
//       case "clear-night":
//         skycons.set("icon1", Skycons.CLEAR_NIGHT);
//         skycons.play();
//         puerco.className="night";
//         break;
//       case "wind":
//         skycons.set("icon1", Skycons.WIND);
//         skycons.play();
//         puerco.className="wind";
//         break;
//       case "fog":
//         skycons.set("icon1", Skycons.FOG);
//         skycons.play();
//         puerco.className="fog";
//         break;
//       case "cloudy":
//         skycons.set("icon1", Skycons.CLOUDY);
//         skycons.play();
//         puerco.className="cloud";
//         break;
//       case "partly-cloudy-day":
//         skycons.set("icon1", Skycons.PARTLY_CLOUDY_DAY);
//         skycons.play();
//         puerco.className="cloud";
//         break;
//       case "partly-cloudy-night":
//         skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
//         skycons.play();
//         puerco.className="cloud";
//         break;
//       default:
//     } 
     
     
//      $('.temp').html(tempC+'°C');       
//       });    
     
     
//  //BEGIN Google API: Use the lat and lon to get the city name     
//    $.getJSON(GURL+lat+','+lon+'&key='+API_GOOGLE, function(c){
// 				$(".city").html(c.results[0].address_components[3].long_name+', '+c.results[0].address_components[5].short_name);
// 				});
//  //END of Google API Function   
     
// // Two buttons, click instructions
//      $('#tempCF').click(function(){
//        $('.temp').html(tempF+'°F')
//      });
//      $('#tempFC').click(function(){
//        $('.temp').html(tempC+'°C')
//      });
// // End of the two buttons
       
//    }); // End of the Navigator Geolocalization Function 
//   }else{
//    console.log('Geolocation is not supported for this Browser/OS version yet.');
//   }
  
  
// });
// var URL = "https://api.darksky.net/forecast/92162852831afbb1986efe34e1e57bc5/";
// var API_GOOGLE = "AIzaSyCfItE_97qWsHJ6Oyb7h50_J9A2dOAd42U";
// var GURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";


const WeatherSnap = () => {
    // const [temperature] = useState(N.rand(65, 85));
    const [weatherElement, setWeatherElement] = useState({
      observationTime: new Date(),
      locationName: '',
      humid: 0,
      temperature: 0,
      windSpeed: 0,
      description: '',
      weatherCode: 0,
      rainPossibility: 0,
      comfortability: '',
    });
  
    useEffect(() => {
      console.log('execute function in useEffect');
      fetchCurrentWeather();
      fetchWeatherForecast();
    }, []);
    // useEffect(()=>{
    //   console.log(weatherElement);
    // },[weatherElement])
    
    const fetchCurrentWeather = () => {
      fetch(
        'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-507B37E0-0383-4D8C-878D-628B54EC3536&locationName=臺北',
      )
        .then(response => response.json())
        .then(data => {
          const locationData = data.records.location[0];
  
          const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
              if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
                neededElements[item.elementName] = item.elementValue;
              }
              return neededElements;
            },
            {},
          );
  
          setWeatherElement(prevState => ({
            ...prevState,
            observationTime: locationData.time.obsTime,
            locationName: locationData.locationName,
            temperature: weatherElements.TEMP,
            windSpeed: weatherElements.WDSD,
            humid: weatherElements.HUMD,
          }));
        });
    };
  
    const fetchWeatherForecast = () => {
      fetch(
        'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-507B37E0-0383-4D8C-878D-628B54EC3536&locationName=臺北市',
      )
        .then(response => response.json())
        .then(data => {
          const locationData = data.records.location[0];
          const weatherElements = locationData.weatherElement.reduce(
            (neededElements, item) => {
              if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
                neededElements[item.elementName] = item.time[0].parameter;
              }
              return neededElements;
            },
            {},
          );
  
          setWeatherElement(prevState => ({
            ...prevState,
            description: weatherElements.Wx.parameterName,
            weatherCode: weatherElements.Wx.parameterValue,
            rainPossibility: weatherElements.PoP.parameterName,
            comfortability: weatherElements.CI.parameterName,
          }));
        });
    };
    return React.createElement(
      "span",
      { className: "weather" },
      
      (weatherElement.description==='陰短暫雨'?<WbCloudyOutlinedIcon className="weather-type"/>:<i className="weather-type fa-regular fa-sun" />)
      ,
      React.createElement(
        "span",
        { className: "weather-temperature-value" },
        weatherElement.temperature
      ),
      React.createElement(
        "span",
        { className: "weather-temperature-unit" },
        "\u00B0C"
      )
    );
  };
  export default WeatherSnap;