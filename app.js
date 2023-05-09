require("./config/port")
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

/**APIS**/
const empresa  = require("./view/empresa")
const usuario  = require("./view/usuario")
const sucursal  = require("./view/sucursal")
/********/

app.use(empresa)
app.use(usuario)
app.use(sucursal)

app.listen(process.env.PORT,()=>{
    console.log("SERVER LISTEN "+process.env.PORT)
})