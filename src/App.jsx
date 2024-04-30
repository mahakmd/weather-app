import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import "./css/WeatherCard.css";


export default function App() {

  const[weathers , setWeathers] = useState([]);
  const[cityName , setCityName] = useState("");
  const[city , setCity] = useState("shiraz");
  const[errors , setErrors] = useState("");


  const KEY = "c45bbc1edcae44aa883212234242604";
   useEffect(() => {

   
      async function fetchData(){
        try{
          const res = await fetch( `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`);
          const data = await res.json();
          
          if(!res.ok){

            setErrors("not found");

          }else{
            setWeathers(data);
            setErrors("");
          }

        }catch(error){
          setErrors(error);
        }
      }

     

    fetchData();
  } , [city]);

  function handleSubmit(e){
     e.preventDefault();

     setCity(cityName);
     setCityName("");
  }


  return (
    <div className="container">
      <div className="weather-container">

        <div className="header row">
          <h1>Weather</h1>
          <form onSubmit={handleSubmit} className="row">
            <input type="text" value={cityName} id="cityName" placeholder="City Name" onChange={e => setCityName(e.target.value)} className="search-box" />
            <button type="submit" className="search-button"><CiSearch /></button>
          </form>
        </div>
      
      

       {weathers.length == 0 ?
       
       <h1 className="loader">Loading...</h1> :
          
          <div>
            {errors ? <h1 className="error">{errors}</h1> : 
              <>
              <div className="weather-card row">
                <img src={weathers.current.condition.icon} alt="img" className="img-weather" />
                <h3 className="temp">{weathers.current.temp_c}°C</h3>
                <h3>{weathers.location.name}</h3>
                <p>{weathers.current.condition.text}</p>
              </div>

              <div className="Highlight row">
              <div className="Highlight-box row">
               <span className="icon"><WiHumidity /></span> 
                  <div>
                    <p>{weathers.current.humidity}%</p>  
                    <p>Humidity</p>  
                  </div> 
                </div>

                <div className="Highlight-box row">
                  <span className="icon"><FaWind /></span>
                
                  <div>
                    <p>{weathers.current.wind_mph} km/h</p>  
                    <p>Wind Speed</p>  
                  </div> 

                </div>
              </div>
              </>
            }
            

          </div>   
       }


      </div>
      
    </div>
  )
}


