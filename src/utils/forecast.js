const request = require('postman-request')

const forecast = (long, lat,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=c654654cfb968dea815ee9acfcf7459d&query='+lat+','+long
    request({ url,json: true },(error, {body})=>{
        if (error){
           callback('Unable to connect to server',undefined)    
        } else if (body.error){
            callback('No match places found',undefined)    
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                current: body.current.temperature,
                feeling: body.current.feelslike
            })
        }
    })

}

module.exports = forecast