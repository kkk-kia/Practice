import './App.css';
import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [cityName, setCityName] = useState("")
  const [citySubmit, setCitySubmit] = useState("")
  const [temp, setTemp] = useState("")
  const [humidity, setHumidity] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("")
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [night, setNight] = useState("d")

  const [show, setShow] = useState(false)


  async function fetchApi() {

    // setCitySubmit(cityName)
    if (cityName === "") { return }
    else {
      setNight("d")

      const geocoding = await axios(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&mode=json&appid=5b8cc728f73a3836644bbb92e0e4e128`)
      const lat = await geocoding.data[0].lat
      const lon = await geocoding.data[0].lon

      fetchApi2(await lat,await lon)

      async function fetchApi2(lat,lon) {

        const cityInfo = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${await lat}&lon=${await lon}&units=metric&appid=5b8cc728f73a3836644bbb92e0e4e128`)
        console.log(cityInfo);
        console.log(cityInfo.data);
        setTemp(cityInfo.data.main.temp.toFixed(0))
        setHumidity(cityInfo.data.main.humidity)
        setDescription(cityInfo.data.weather[0].description)
        setIcon(cityInfo.data.weather[0].icon)
        setName(cityInfo.data.name)
        setCountry(cityInfo.data.sys.country)
        if (cityInfo.data.weather[0].icon[cityInfo.data.weather[0].icon.length - 1] === "n") { setNight("n") }
        console.log(icon[icon.length - 1]);
        setShow(true)
      }




    }
  }




  return (
    <div className={`App ${night}`}>
      <div className='input'>
        <input onChange={(e) => { setCityName(e.target.value) }}></input>
        <button onClick={fetchApi}>cehck</button>
      </div>

      {(show === true) && (
        <div className='info'>
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
          <p>{temp + " °c"}</p>
          <p>{name + "-" + country}</p>
          <p>{description}</p>
          <p>{"humidity= " + humidity + "%"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
