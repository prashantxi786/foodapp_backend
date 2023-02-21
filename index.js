const express=require('express')
const app = express()
const cors=require('cors')
const {foodRouter}=require('./routes/foods.routes')
require('dotenv').config()
const {conn}=require("./configs/db")
const { fieldAnalizer } = require('./middleware/foods.middleware')
app.use(cors())
app.use(express.json())
app.use("/foods",foodRouter)
 app.listen(process.env.port,async()=>{
    try {
        await conn
        console.log("listening at port 8080")
    } catch (error) {
        console.log(error)
    }
 })