const IngresoModel = require('../model/ingreso.model')
class IngresoController
{
    static async readUltimo5IngresoUsuarioController(empresa,usuario)
    {
       return await IngresoModel.readUltimo5IngresoUsuarioModel(empresa,usuario)
    }
}

module.exports = IngresoController