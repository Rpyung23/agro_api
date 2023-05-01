require("./config/port")
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

/**APIS**/
const empresa  = require("./view/empresa")
/********/

app.use(empresa)

app.listen(process.env.PORT,()=>{
    console.log("SERVER LISTEN "+process.env.PORT)
})