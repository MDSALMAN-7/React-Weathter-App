import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import { useEffect, useRef, useState } from 'react';

export function Weather(){

    const inputRef = useRef();

    const [weatherData,setWeahterData] = useState(false);
    const allIcon = {
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":clear_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon
    }

    const search = async(city) =>{
        var api_key = "1318ca6725c69160d346c41fc0612596";
        
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcon[data.weather[0].icon]|| clear_icon;
            setWeahterData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        }
        catch(error){
            setWeahterData(false);
        }
    }

    useEffect(()=>{
        search("London");
    },[])

    function SearchClick(){
        const city = inputRef.current.value;
        if(city ===""){
            alert("Enter city name");
            return;
        }
        
        search(city);
    }

    return(
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="" onClick={SearchClick} />
            </div>
            {weatherData?<>
                <img src={weatherData.icon} alt="" className='weather-icon' />
                <p className='temperature'>{weatherData.temperature}°C</p>
                <p className='location'>{weatherData.location}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} km/h</p>
                        <span>Wind speed</span>
                    </div>
                </div>
            </div>
            </>:<></>}
            
        </div>
    )
}