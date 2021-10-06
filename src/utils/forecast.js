const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const key = '475606e75b5c68704dd04dca251d5e4a'
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${process.env.WEATHER_API_KEY}&units=metric`

  request({ url, json: true }, (error, { body }) => {
    const { message, daily } = body
    const time = (day) => new Date(daily[day].dt * 1000).toLocaleString()

    if (error) {
      callback('Unable to connect to weather forecast!', null)
    } else if (message) {
      callback('Unable to find location. Please try another search.', null)
    } else {
      callback(null, {
        today: {
          time: time(0),
          feels_like: daily[0].feels_like,
          weather: daily[0].weather[0].description,
          humidity: daily[0].humidity,
        },
        tomorrow: {
          time: time(1),
          feels_like: daily[1].feels_like,
          weather: daily[1].weather[0].description,
          humidity: daily[1].humidity,
        },
      })
    }
  })
}

module.exports = forecast
