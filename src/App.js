import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox.js'
import WeatherButton from './component/WeatherButton.js';
import ClipLoader from "react-spinners/ClipLoader";
import cloudsIcon from './images/cloudsIcon.png';
import moonIcon from './images/moonIcon.png';
import rainIcon from './images/rainIcon.png';
import snowIcon from './images/snowIcon.png';
import suncloudsIcon from './images/suncloudsIcon.png';
import sunIcon from './images/sunIcon.png';

// 1. 앱이 실행되자마자 현재위치기반의 날씨정보가 보인다
// 2. 날씨정보에는 현재도시 , 섭씨, 화씨, 날씨 상태정보가 출력된다.
// 3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할때마다 도시별 날씨가 나온다
// 5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재 위치 기반으로 돌아온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.  
function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities = [ 'paris', 'new york', 'tokyo', 'seoul'];  
  const apiKey = '5c3f5527c16ac394df9e138e146f8c8e';
  const [apiError, setAPIError] = useState("");
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherStatus, setWeatherStatus] = useState('');
  const [weatherImg, setWeatherImg] = useState('');
  const [background, setBackground] = useState('');

  // 사용자의 현재 위치를 얻기 위한 함수
  const getCurrentLocation = () => {
    // 접근권한 요청 및 위치 정보 제공
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;      
      getWeatherByCurrentLocation(lat, lon, apiKey)
    });
  };
  // 위도와 경도, apiKey를 기반으로 날씨 정보를 가져오는 함수
  const getWeatherByCurrentLocation = async(lat, lon, apiKey) => {
    try {    
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();      
      setWeather(data);    
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };
  // 도시 이름을 기반으로 날씨 정보를 가져오는 함수
  const getWeatherByCity = async() => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      let response = await fetch(url);
      let data = await response.json();
      
      setWeather(data);
      setLoading(false);
    } catch (err) {
    
      setAPIError(err.message);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    const currentTime = weather ? weather.dt : null ;
    const sunsetTime = weather ? weather.sys.sunset : null;  
    const sunriseTime = weather ? weather.sys.sunrise : null;  
    if (weather) {
      if (weather.weather[0].id >= 200 && weather.weather[0].id <= 531) {
        setWeatherStatus('비');
        setWeatherImg(rainIcon);
        setBackground(currentTime >= sunsetTime || currentTime < sunriseTime ? 'night-background' : 'rain-background');        
      } else if (weather.weather[0].id >= 600 && weather.weather[0].id <= 622) {
        setWeatherStatus('눈');
        setWeatherImg(snowIcon);
        setBackground(currentTime >= sunsetTime || currentTime < sunriseTime ? 'night-background' : 'snow-background'); 
      } else if (weather.weather[0].id >= 801 && weather.weather[0].id <= 804) {
        setWeatherStatus('구름');
        setWeatherImg(currentTime >= sunsetTime || currentTime < sunriseTime ? moonIcon : cloudsIcon);
        setBackground(currentTime >= sunsetTime || currentTime < sunriseTime ? 'night-background' : 'clouds-background');
      } else if (weather.weather[0].id === 800) {
        setWeatherStatus('맑음');
        setWeatherImg(currentTime >= sunsetTime || currentTime < sunriseTime ? moonIcon : sunIcon);
        setBackground(currentTime >= sunsetTime || currentTime < sunriseTime ? 'night-background' : 'sun-background'); 
      } else if (weather.weather[0].id === 801) {
        setWeatherStatus('해구름');
        setWeatherImg(currentTime >= sunsetTime || currentTime < sunriseTime ? moonIcon : suncloudsIcon);
        setBackground(currentTime >= sunsetTime || currentTime < sunriseTime ? 'night-background' : 'sunclouds-background'); 
      }
    }
  }, [weather]); // weather 상태가 변경될 때마다 이 로직을 실행
 
  

  useEffect( () => {
    if (city === ""){
      getCurrentLocation();
    } else {      
      getWeatherByCity(); 
    }    
  }, [city]);

  
  return (
    <div className={background}>
      {
        loading ? 
          (
            <div className="weather-container"> 
              <ClipLoader loading={loading}  size={150} aria-label="Loading Spinner" data-testid="loader"/>
            </div>
          )
        : (
            <div className="weather-container">
              <div style={ {fontSize: '5.0rem', fontWeight: 'bold', color: 'rgba(88, 159, 252, 0.6)' } }>Weather</div>
              <WeatherBox weather={weather} weatherImg={weatherImg} />
              <WeatherButton cities={cities} setCity={setCity} setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
            </div>
          )          
      }
      
    </div>
  );
}

export default App;
