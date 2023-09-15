const EmpleadoModel = require("../model/empleado.model")
class EmpleadoController
{
    static async insertNewEmpleadoController(CodigoEmpleado, NombresApellidosEmpleado, DirEmpleado, TelefonoEmpleado,
                                             EmailEmpleado,FotoEmpleado, sucursal,salario_semanal){
        return await EmpleadoModel.insertNewEmpleadoModel(CodigoEmpleado, NombresApellidosEmpleado, DirEmpleado, TelefonoEmpleado,
            EmailEmpleado,FotoEmpleado, sucursal,salario_semanal)
    }

    static async readEmpleadoSucursalController(sucursal){
        return await EmpleadoModel.readEmpleadoSucursalModel(sucursal)
    }

    static async queryEmpleadoSucursalController(sucursal,empleado){
        return await EmpleadoModel.queryEmpleadoSucursalModel(sucursal,empleado)
    }

    static async readEmpleadoAllUserController(usuario_admin){
        return await EmpleadoModel.readEmpleadoAllUserModel(usuario_admin)
    }

    static async insertAsistenciaController(FKCodigoEmpleado, fechaIngreso, fechaSalida,fotoHistorialEmpleado,
                                       notaHistorialEmpleado, idTipoPermiso, fechaHistorialPermiso){
        return await EmpleadoModel.insertAsistenciaModel(FKCodigoEmpleado, fechaIngreso, fechaSalida,fotoHistorialEmpleado,
            notaHistorialEmpleado, idTipoPermiso, fechaHistorialPermiso)
    }

    static async readHistorialController(empleado){
        return await  EmpleadoModel.readHistorialModel(empleado)
    }

}

module.exports = EmpleadoController