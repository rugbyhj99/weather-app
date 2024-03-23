import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, setSelectedCity, selectedCity }) => {
    console.log(cities);
  return (
    <div className="weather-btn">
        <Button 
            className="btn-gap"
            variant={selectedCity === "" ? "primary" : "outline-primary"}
            onClick={() => {setCity(""); setSelectedCity('');} }                      
        >Current Location</Button>
        {
            cities.map((item , i) => {
                return(
                    <Button
                        className="btn-gap"
                        variant={selectedCity === item ? "primary" : "outline-primary"}
                        key={i}
                        onClick={()=> {setCity(item); setSelectedCity(item);}}
                    > {item}
                    </Button>
                )
            })
        }
       
         
    </div>
  )
}

export default WeatherButton