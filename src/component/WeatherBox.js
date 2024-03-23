import React from 'react'

const WeatherBox = ({weather}) => {
    console.log("weather?", weather)
    const roundedTemp = weather ? Math.round(weather.main.temp) : null;
    const roundedMaxTemp = weather ? Math.round(weather.main.temp_max) : null;
    const roundedMinTemp = weather ? Math.round(weather.main.temp_min) : null;  
    const currentTime = weather ? weather.dt : null ;
    const sunsetTime = weather ? weather.sys.sunrise : null;
 
    // console.log(weather.weather[0].id);
    let weatherStatus = '';
    let weatherImage = '';
    if (weather && weather.weather[0].id >= 200 && weather.weather[0].id <= 531) {
        weatherStatus = '비';
        weatherImage = '/images/rainIcon.png';
    } else if (weather && weather.weather[0].id >= 600 && weather.weather[0].id <= 622) {
        weatherStatus = '눈';
        weatherImage = '/images/snowIcon.png';
    } else if (weather && weather.weather[0].id >= 801 && weather.weather[0].id <= 804) {
        weatherStatus = '구름';
        weatherImage = currentTime < sunsetTime ? '/images/moonIcon.png' :'/images/cloudIcon.png';
    } else if (weather && weather.weather[0].id === 800) {
        weatherStatus = '맑음';
        weatherImage = currentTime < sunsetTime ? '/images/moonIcon.png' : '/images/sunIcon.png';
    } else {
        weatherStatus = '해구름'; // 
        weatherImage = currentTime < sunsetTime ? '/images/moonIcon.png' : '/images/hazeIcon.png';
    }
    console.log("뉴욕" , currentTime < sunsetTime);
    
 
  return (
    <div className="box-container">
        {/* 이렇게 쓰는 이유는 처음에 weather값이 null이라서 */}
        <h4>{weather && weather.name}</h4>
        <div style={{ height: '150px', width: '300px'}}>
            {weatherImage && <img src={weatherImage} alt="Weather icon" style={{ width: '150px',}} />}
        </div>
        {/* <h2>{weather ? .name}</h2> */}
        {/* 이것도가능하다 */}
        <h3>Now : {roundedTemp}°C </h3>
        <div>Max : {roundedMaxTemp}°C   /  Min : {roundedMinTemp}°C</div>
        
    </div>
  )
}

export default WeatherBox