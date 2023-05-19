const JWT = require("../config/jwt")
const VehiculoController = require("../controller/vehiculo.controller")
const express = require('express')
const app = express()

app.post('/register_vehiculo',JWT.veriJwt,async function(req,res)
{

    try {
        var bandera = await VehiculoController.insertVehiculoController(req.body.PlacaVehiculo,req.body.decoded.empresa,
            req.body.Fk_sucursal,req.body.KmInicial,req.body.FotoVehiculo);

        res.status(200).json({
            status_code: bandera ? 200 : 300,
            msm: bandera ? 'Vehiculo ingresado con éxito' : 'No se ha podido registrar'
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString()
        })
    }

})


app.post('/read_vehiculo',JWT.veriJwt,async function(req,res)
{
    try {
        var bandera = await VehiculoController.readVehiculoSucursalEmpresaController(req.body.decoded.empresa,
            req.body.Fk_sucursal);

        res.status(200).json({
            status_code: bandera.length > 0 ? 200 : 300,
            msm: bandera.length > 0 ? 'Vehiculo ingresado con éxito' : 'No se ha podido registrar',
            datos: bandera
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
            datos:[]
        })
    }
});


module.exports = app
