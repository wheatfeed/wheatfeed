require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const router = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

//errorhandler harus di use paling terakhir
app.use('/', router)

app.listen(port, () => console.log(`RUNNING ON http://localhost:${port}`))