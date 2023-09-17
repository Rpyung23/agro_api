const TrabajosModel = require("../model/trabajos.model")
class TrabajoController
{
    static async totalTodoTipoTrabajoEmpresaControlle(empresa,usuario,sucursal)
    {
        return await TrabajosModel.totalTodoTipoTrabajoEmpresaModel(empresa,usuario,sucursal)
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

    static async updateTrabajoController(idTrabajo,NameTrabajo,Fk_Sucursal,FKEstadoTrabajo,fechaInicio,fechaLimite,fechaFin){
        return await TrabajosModel.updateTrabajoModel(idTrabajo,NameTrabajo,Fk_Sucursal,FKEstadoTrabajo,fechaInicio,fechaLimite,fechaFin)
    }

}

module.exports = TrabajoController