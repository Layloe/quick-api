//Packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const methodOverride = require('method-override')

const app = express()

//Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(express.static('public'))

//Database connection
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected Successfully")
    } catch (error) {
        console.error('Failed to connect', err)
    }
}

connectDB()

//Routes
const itemsRoute = ('./controllers/itemControllers')
app.use('/api', itemsRoute)

//Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))