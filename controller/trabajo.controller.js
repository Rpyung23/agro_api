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
}

module.exports = TrabajoController