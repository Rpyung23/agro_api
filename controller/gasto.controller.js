const GastoModel = require('../model/gasto.model')
class GastoController
{
    static async readUltimo5GastoUsuarioController(empresa,usuario)
    {
       return await GastoModel.readUltimo5GastoUsuarioModel(empresa,usuario)
    }

    static async readGastoUsuarioController(empresa,usuario)
    {
        return await GastoModel.readGastoUsuarioModel(empresa,usuario)
    }

    static async insertGastoUsuarioController(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo,
                                              FotoFactura, empresa, usuario_code){
        return await GastoModel.insertGastoUsuarioModel(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo,
            FotoFactura, empresa, usuario_code)
    }

}

module.exports = GastoController