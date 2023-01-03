import { useState,useEffect} from 'react';

const Time = () => {
    const date= useCurrentDateEffect();
    const timeformat=(date)=>{
        const hours=date.getHours()%12===0?12:date.getHours()%12;
        const minutes=date.getMinutes();
        const seconds=date.getSeconds();
        return `${hours}:${minutes<10?`0${minutes}`:minutes}`
    }
    return(
      <span className="time">{timeformat(date)}</span>
    )
  }
 
  const useCurrentDateEffect = ()=> {
    const [date, setDate] = useState(new Date());
  
    useEffect(() => {
      const interval= setInterval(() => {
        const update= new Date();
  
        if(update.getSeconds() !== date.getSeconds()) {
          setDate(update);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, [date]);
    
    return date;
  }

  export default Time;