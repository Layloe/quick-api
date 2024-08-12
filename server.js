const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const methodOverride = require('method-override')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(express.static('public'))

async function connectDB(){
    try {
        await mongoose.connect()
        console.log("Connected Successfully")
    } catch (error) {
        console.error('Failed to connect')
    }
}