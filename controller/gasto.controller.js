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
                                              FotoFactura, empresa, usuario_code,FK_CodeSucursal){
        return await GastoModel.insertGastoUsuarioModel(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo,
            FotoFactura, empresa, usuario_code,FK_CodeSucursal)
    }

    static async readModelGastoFechaController(empresa,sucursal,fechaI,fechaF){
        return await GastoModel.readModelGastoFechaModel(empresa,sucursal,fechaI,fechaF)
    }

}

module.exports = GastoController