import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox( { updateInfo } ) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY ="dafc8c28426d3d6288338fc4b0a125e8";

    let getWeatherInfo = async () => {
        try { 
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await response.json();

         let result = {
            city: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            feelsLike: data.main.feels_like,
            weather: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        };
        console.log(result);
        return result;
    }  catch(err){
        console.error("Error fetching weather data:", err);
        throw err;
        };
    }


    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        try {        
        evt.preventDefault();
        console.log("Searching weather for city:", city);
        setCity("");
        let newinfo = await getWeatherInfo();
        updateInfo(newinfo);
    }
    catch(err){
        setError(true);
        console.error("Error in handleSubmit:", err);
        }
    }
  return (
    <div className="SearchBox">
        <form onSubmit={handleSubmit}>
            <TextField id="City" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
            <br /><br />
            <Button variant="contained" type="submit" >Search</Button>
            {error && <p style={{color: "red"}}>Could not fetch weather data. Please try again.</p>}
    </form>
    </div>
  );
}