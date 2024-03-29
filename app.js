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
const vehiculo  = require("./view/vehiculo")
const trabajo  = require("./view/trabajo")
const empleado  = require("./view/empleado")
const sueldo = require("./view/sueldo")
const store = require("./view/store")
const notification = require("./view/notification")
/********/

app.use(empresa)
app.use(usuario)
app.use(sucursal)
app.use(proveedor)
app.use(panel)
app.use(ingreso)
app.use(gasto)
app.use(vehiculo)
app.use(trabajo)
app.use(empleado)
app.use(sueldo)
app.use(store)
app.use(notification)

app.listen(process.env.PORT,()=>{
    console.log("SERVER LISTEN "+process.env.PORT)
})