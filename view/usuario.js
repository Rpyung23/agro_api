const express = require("express")
const app = express()
const Jwt = require("../config/jwt")
const UsuarioController = require("../controller/usuario.controller")



app.post('/loginUsuario',async function (req, res)
{
    console.log(req.body)

    try{
        var datos = await UsuarioController.readControllerLoginUsuario(req.body.empresa,req.body.usuario,req.body.password)
        res.status(200).json({
            status_code: datos == null ? 300 : 200,
            datos: datos == null ? null : {
                nombres:datos.NombreApellidosAdmin,
                token: Jwt.createJwt(datos.FK_CodeEmpresa,datos.CodigoUsuarioAdmin)
            },
            msm: datos == null ? 'Usuario No existe' : 'Usuario encontrada con éxito.'
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            datos:[],
            msm:e.toString()
        })
    }
})



app.post('/list_asistencia',Jwt.veriJwt,async function (req, res)
{

    try {
        var result = await UsuarioController.readModelAllAsistenciaController(req.body.decoded.code_usuario)
        res.status(200).json({
            status_code:result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Asistencia listas' : 'Sin Asistencia',
            data: result
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
            data:[]
        })
    }
})

module.exports = app