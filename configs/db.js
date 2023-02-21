const mongoose = require('mongoose');
require('dotenv').config()
const conn =mongoose.connect(process.env.url)
module.exports={conn}