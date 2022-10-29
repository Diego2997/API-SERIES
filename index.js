const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')

const routes = require('./routes')

const app = express()

// CONFIG
dotenv.config()

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


// ROUTE
app.use('/api', routes)



// SERVER
app.listen(process.env.PORT,(error)=>{
 if(error){
    console.log(`Hubo un error en el servidor ${error}`)
 }
 console.log(`Servidor en marcha en el puerto ${process.env.PORT}`)
})