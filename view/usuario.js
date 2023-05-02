const express = require("express")
const app = express()
const UsuarioController = require("../controller/usuario.controller")

app.post('/loginUsuario',async function (req, res)
{
    //console.log(req.body)

    try{
        var datos = await UsuarioController.readControllerLoginUsuario(req.body.empresa,req.body.usuario,req.body.password)
        res.status(200).json({
            status_code: datos == null ? 300 : 200,
            datos: datos == null ? null : datos,
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

module.exports = app