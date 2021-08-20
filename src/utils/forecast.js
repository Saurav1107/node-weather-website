const request = require('request');

const forecast = (lat , long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=1678a03238610ebb15b3b3bf837cf7f0&query='+ encodeURIComponent(lat) + ','+encodeURIComponent(long)
  request({url , json: true }, (error,{body}) => {
    if(error){
      callback('Unable to Connect to weather service',undefined)
    }else if(body.error){
      callback('unable to find location',undefined)
    }else{
    const temp = body.current.temperature
    const feelslike = body.current.feelslike
    const desc = body.current.weather_descriptions[0]
    const humidity = body.current.humidity 
    callback(undefined,desc + '. It is currently '+ temp + ' degrees out there And it feels Like ' + feelslike + ' degrees and Humidity is '+humidity+'%');
    }
  
  })
}

module.exports = forecast