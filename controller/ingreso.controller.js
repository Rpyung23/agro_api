const IngresoModel = require('../model/ingreso.model')
class IngresoController
{
    static async readUltimo5IngresoUsuarioController(empresa,usuario)
    {
       return await IngresoModel.readUltimo5IngresoUsuarioModel(empresa,usuario)
    }

    static async readIngresoUsuarioController(empresa,usuario)
    {
        return await IngresoModel.readIngresoUsuarioModel(empresa,usuario)
    }

    static async insertIngresoController(NombreIngreso,usuario_code,sucursal_code,empresa,name_cliente,cantidad,nota,foto)
    {
        return await IngresoModel.insertIngresoModel(NombreIngreso,usuario_code,sucursal_code,empresa,
            name_cliente,cantidad,nota,foto)
    }

    static async readModelIngresoFechaController(empresa,sucursal,fechaI,fechaF){
        return await IngresoModel.readModelIngresoFechaModel(empresa,sucursal,fechaI,fechaF)
    }

    static async readModelIngresoFechaSucursalController(sucursal,email,fechaI,fechaF){
        return await  IngresoModel.readModelIngresoFechaSucursalModel(sucursal,email,fechaI,fechaF)
    }

}

module.exports = IngresoController