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
const proveedor  = require("./view/proveedor")
const panel  = require("./view/panel")
const ingreso  = require("./view/ingreso")
const gasto  = require("./view/gasto")
/********/

app.use(empresa)
app.use(usuario)
app.use(sucursal)
app.use(proveedor)
app.use(panel)
app.use(ingreso)
app.use(gasto)
app.listen(process.env.PORT,()=>{
    console.log("SERVER LISTEN "+process.env.PORT)
})