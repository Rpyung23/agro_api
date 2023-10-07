const IngresoModel = require('../model/ingreso.model')
class IngresoController
{
    static async readUltimo5IngresoUsuarioController(empresa,usuario,sucursal)
    {
       return await IngresoModel.readUltimo5IngresoUsuarioModel(empresa,usuario,sucursal)
    }

    static async readIngresoUsuarioController(empresa,usuario,sucursal,semana)
    {
        return await IngresoModel.readIngresoUsuarioModel(empresa,usuario,sucursal,semana)
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

    static async readListUltimoIngresoController(email)
    {
        return await IngresoModel.readListUltimoIngresoModel(email)
    }

}

module.exports = IngresoController