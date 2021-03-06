const express = require('express')
const hbs = require('hbs')
const path = require('path');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000


const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.use(express.static(path.join(__dirname, '../public')))
app.set('views',viewsPath)
app.set('view engine','hbs');
hbs.registerPartials(partialsPath)

app.get('/',(req,res) => {
  res.render('index', {
    title : 'Weather',
    name : 'Saurav'
  })
})

app.get('/about' , (req,res) => {
  res.render('about',{
    title : 'About me',
    name : 'Saurav'
  })
})

app.get('/help' , (req,res) => {
  res.render('help',{
    title : 'Help page',
    name : 'Saurav'
  })
})

app.get('/products', (req,res) => {
  if(!req.query.search){
      return res.send({
        error : 'Must provide search'
      })
  }
  console.log(req.query.search);
  res.send({
    products : []
  })
})

app.get('/weather', (req,res) => {
  if(!req.query.address){
    return res.send({
      error : 'Address is required'
    })
  }

  geoCode(req.query.address,(error,{latitude ,longitude,location} = {}) => {
    if(error){
      return res.send({
        error
      })
    }
    forecast(latitude,longitude,(error, forecastData) => {
      if(error){
        return res.send({
          error
        })
      }
      res.send({
        forecast : 'Cloudy',
        location ,
        weather : forecastData
      })
    })
  })
})

app.get('/help/*',(req,res) => {
  res.render('404-help',{
    title : '404 Help',
    name : 'Saurav',
    message : 'Help Article not found'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
    title : '404',
    name : 'Saurav',
    message : 'Page not found'
  })
})

app.listen(port,() => {
  console.log('Server is running on port '+port);
})