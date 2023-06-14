const TrabajosModel = require("../model/trabajos.model")
class TrabajoController
{
    static async totalTodoTipoTrabajoEmpresaControlle(empresa,usuario)
    {
        return await TrabajosModel.totalTodoTipoTrabajoEmpresaModel(empresa,usuario)
    }

    static async insertTrabajoController(NameTrabajo, Fk_Sucursal, empresa, fotoTrabajo, fechaInicio, fechaFin,
                                    fechaLimite, notaTrabajo, FKEstadoTrabajo)
    {
        return await TrabajosModel.insertTrabajoModel(NameTrabajo, Fk_Sucursal, empresa, fotoTrabajo, fechaInicio, fechaFin,
            fechaLimite, notaTrabajo, FKEstadoTrabajo)
    }

    static async queryReadTrabajoController(empresa,sucursal,trabajo){
        return await TrabajosModel.queryReadTrabajoModel(empresa,sucursal,trabajo)
    }

    static async readDetalleTrabajoModel(empresa,sucursal,trabajo){
        return await TrabajosModel.readDetalleTrabajoModel(empresa,sucursal,trabajo)
    }

    static async readTrabajoUsuariosController(codeUsuario){
        return await TrabajosModel.readTrabajoUsuariosModel(codeUsuario)
    }
}

module.exports = TrabajoController