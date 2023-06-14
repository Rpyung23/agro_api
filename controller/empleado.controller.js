const EmpleadoModel = require("../model/empleado.model")
class EmpleadoController
{
    static async insertNewEmpleadoController(CodigoEmpleado, NombresApellidosEmpleado, DirEmpleado, TelefonoEmpleado,
                                             EmailEmpleado,FotoEmpleado, sucursal){
        return await EmpleadoModel.insertNewEmpleadoModel(CodigoEmpleado, NombresApellidosEmpleado, DirEmpleado, TelefonoEmpleado,
            EmailEmpleado,FotoEmpleado, sucursal)
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
}

module.exports = EmpleadoController