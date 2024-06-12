const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({path: './config/config.env'})


//Setting routes
const classrooms = require('./routes/classroom');
const student = require ('./routes/student')

//                                                                                                                                                                                                                                                                                 app.use('/api/v1', poles)
app.use('/api/v1', classrooms)
app.use('/api/v1', student)



module.exports = app
