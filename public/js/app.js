const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getWeather = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (messageOne.textContent = `Could not find any weather data for ${location}. Please try again with another location.`)
        }
        messageOne.textContent = data.location
        messageTwo.textContent = `Today: ${capitalizeFirstLetter(
          data.forecast.today.weather
        )} - Feel likes ${
          data.forecast.today.feels_like.morn
        }°C in the morning and ${
          data.forecast.today.feels_like.eve
        }°C in the evening`
        messageThree.textContent = `Tomorrow: ${capitalizeFirstLetter(
          data.forecast.tomorrow.weather
        )} - Feel likes ${
          data.forecast.tomorrow.feels_like.morn
        }°C in the morning and ${
          data.forecast.tomorrow.feels_like.eve
        }°C in the evening`
        // console.log(data.location)
        console.log(data.forecast.today.feels_like)
        console.log(data.forecast.tomorrow.feels_like)
      })
    }
  )
}
// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value
  messageOne.textContent = 'Searching...'
  getWeather(location)
})
