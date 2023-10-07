const express = require("express")
const JWT = require("../config/jwt");
const SueldoController = require("../controller/sueldo.controller");
const app = express()



app.post("/read_sueldos",JWT.veriJwt,async function(req,res)
{

    try{
        var response = await SueldoController.readSueldoController(req.body.sucursal,req.body.decoded.code_usuario)

        res.status(200).json({
            status_code : response.length > 0 ? 200 : 300,
            datos: response,
            msm : response.length > 0 ? 'Sueldos encontrados' : 'Sin Sueldos'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: [],
            msm : e.toString()
        })
    }
})


app.put("/generarCobro",JWT.veriJwt,async function(req,res)
{

    try{
        var response = await SueldoController.generarCobroController(req.body.empleado,req.body.decoded.code_usuario)

        res.status(200).json({
            status_code : response  ? 200 : 400,
            msm : response ? 'Sueldos pagado' : 'Sin Pagar Sueldos'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

module.exports = app