import React from 'react'

const WeatherBox = ({weather , weatherImg}) => {
    console.log(weather);   
    const roundedTemp = weather ? Math.round(weather.main.temp) : null;
    const roundedMaxTemp = weather ? Math.round(weather.main.temp_max) : null;
    const roundedMinTemp = weather ? Math.round(weather.main.temp_min) : null;  
    
 
  return (
    <div className="box-container">
        {/* 이렇게 쓰는 이유는 처음에 weather값이 null이라서 */}
        <h4>{weather && weather.name}</h4>
        <div style={{ height: '150px', width: '300px'}}>
            {weatherImg && <img src={weatherImg} alt="Weather icon" style={{ width: '150px',}} />}
        </div>
        {/* <h2>{weather ? .name}</h2> */}
        {/* 이것도가능하다 */}
        <h3>Now : {roundedTemp}°C </h3>
        <div>Max : {roundedMaxTemp}°C   /  Min : {roundedMinTemp}°C</div>
        
    </div>
  )
}

export default WeatherBox