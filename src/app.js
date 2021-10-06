const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('dotenv').config()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    pageTitle: 'Home',
    title: 'Weather App',
    name: 'Etienne',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    title: 'About me',
    name: 'Etienne',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help',
    title: 'Help Zone',
    info: 'how to use the app and more.',
    name: 'Etienne',
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'You must provide an address.',
    })
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location,
        forecast: forecastData,
        address,
      })
      console.log(forecastData)
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Oops',
    message: '404 - Help article not found',
    name: 'Etienne',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Oops',
    message: '404 - Page not found',
    name: 'Etienne',
  })
})

app.listen(port, () => {
  console.info(`Server is up on port ${port}`)
})
