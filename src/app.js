const path = require('path')
const express = require('express')
const hbs = require('hbs')
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

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eduardo Hermida'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Eduardo Hermida'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Eduardo Hermida'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error:'Address needed'
        })
    }


        geocode(req.query.address,(error, {longitud, latitud, sitio}={} )=>{
            if(error){
                return res.send({error})
            }
            forecast(longitud, latitud, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                return res.send({
                    location: sitio,
                    forecast: forecastData
                })

              })
        })

})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'Search term'
        })
    }
    req.query.search

    res.send({
        products:[]
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errMessage: 'Help article not found.',
        title: 'Help',
        name: 'Eduardo Hermida'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errMessage: 'Page not found.',
        title: 'Error',
        name: 'Eduardo Hermida'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' +port)
})