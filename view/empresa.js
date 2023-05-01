const express = require("express")
const app = express()
const EmpresaController = require("../controller/empresa.controller")

app.get('/empresa_info/:codigo',async function (req, res)
{
    //console.log(req.params)
    var datos = await EmpresaController.readControllerCodigoEmpresa(req.params.codigo)

    try{
        res.status(200).json({
            status_code: datos == null ? 300 : 200,
            datos: datos == null ? null : datos,
            msm: datos == null ? 'El codigo no exite.' : 'Empresa encontrada con éxito.'
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