const express = require("express")
const EmpleadoController = require("../controller/empleado.controller")
const JWT = require("../config/jwt")
const app = express()

app.post("/create_empleado",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await EmpleadoController.insertNewEmpleadoController(req.body.CodigoEmpleado,
            req.body.NombresApellidosEmpleado, req.body.DirEmpleado, req.body.TelefonoEmpleado,
            req.body.EmailEmpleado,req.body.FotoEmpleado, req.body.sucursal,req.body.salario_semanal)

        res.status(200).json({
            status_code : response ? 200 : 400,
            msm : response ? 'Empleado registrado con éxito' : 'No se ha podido registrar el empleado'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})


app.post("/read_empleado_sucursal",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await EmpleadoController.readEmpleadoSucursalController(req.body.sucursal)

        res.status(200).json({
            status_code : response.length > 0 ? 200 : 300,
            datos: response,
            msm : response.length > 0 ? 'Empleados encontrados' : 'Sin empleados'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: [],
            msm : e.toString()
        })
    }
})


app.post("/query_empleado_sucursal",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await EmpleadoController.queryEmpleadoSucursalController(req.body.sucursal,req.body.empleado)

        res.status(200).json({
            status_code : response.length > 0 ? 200 : 300,
            datos: response,
            msm : response.length > 0 ? 'Empleados encontrados' : 'Sin empleados'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: [],
            msm : e.toString()
        })
    }
})


app.post("/read_empleado_all_usuario_admin",JWT.veriJwt,async function(req,res)
{

    try{
        var response = await EmpleadoController.readEmpleadoAllUserController(req.body.decoded.code_usuario)

        res.status(200).json({
            status_code : response.length > 0 ? 200 : 300,
            datos: response,
            msm : response.length > 0 ? 'Empleados encontrados' : 'Sin empleados'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: [],
            msm : e.toString()
        })
    }
})


app.post("/empleado_asistencia",JWT.veriJwt,async function(req,res)
{
    console.log(req.body)

    try{
        var response = await EmpleadoController.insertAsistenciaController(req.body.empleado,
            req.body.fechaIngreso, req.body.fechaSalida,req.body.fotoHistorialEmpleado,
            req.body.notaHistorialEmpleado, req.body.idTipoPermiso, req.body.fechaHistorialPermiso)

        res.status(200).json({
            status_code : response ? 200 : 400,
            msm : response ? 'Asistencia registrado con éxito' : 'No se ha podido registrar la Asistencia'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

module.exports = app