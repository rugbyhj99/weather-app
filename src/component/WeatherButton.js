import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, setSelectedCity, selectedCity }) => {
    
  return (
    <div className="weather-btn">
        <Button
            style={{
                fontSize: selectedCity === "" ? '1.2rem' : '1rem',
                fontWeight: selectedCity === "" ? 700 : 500,
                backgroundColor: selectedCity === "" ? 'rgba(88, 159, 252, 0.8)' : 'transparent', 
                color: 'white', 
                borderColor: 'white', 
                borderWidth: selectedCity === "" ? '2px' : '1px',                     
            }} 
            className="btn-gap"            
            onClick={() => {setCity(""); setSelectedCity('');} }                      
        >Current Location</Button>
        {
            cities.map((item , i) => {
                return(
                    <Button
                        style={{
                            fontSize: selectedCity === item ? '1.2rem' : '1rem',
                            fontWeight: selectedCity === item ? 700 : 500,
                            backgroundColor: selectedCity === item ? 'rgba(88, 159, 252, 0.8)' : 'transparent', 
                            color: 'white', 
                            borderColor: 'white', 
                            borderWidth: selectedCity === item ? '2px' : '1px',                      
                        }}
                        className="btn-gap"
                        
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