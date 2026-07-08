import SearchBox from './SearchBox.jsx';
import InfoBox from "./InfoBox.jsx";
import { useState } from 'react';


export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
         city: "Delhi",
        temp: 28,
        feelsLike: 25,
        temp_min: 20,
        temp_max: 30,
        humidity: 70,
        weather: "Cloudy",
        description: "overcast clouds"
    });

    let updateInfo = (newinfo) => {
        setWeatherInfo(newinfo);
    }

    return (
        <div style={{textAlign:"center"}}>
            <h1 style={{color: "#1E293B"}}>Welcome to Weather App</h1>
            <SearchBox  updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}