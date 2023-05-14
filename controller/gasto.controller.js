const GastoModel = require('../model/gasto.model')
class GastoController
{
    static async readUltimo5GastoUsuarioController(empresa,usuario)
    {
       return await GastoModel.readUltimo5GastoUsuarioModel(empresa,usuario)
    }
}

module.exports = GastoController