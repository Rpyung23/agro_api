const GastoModel = require('../model/gasto.model')
class GastoController
{
    static async readUltimo5GastoUsuarioController(empresa,usuario,sucursal,semana)
    {
       return await GastoModel.readUltimo5GastoUsuarioModel(empresa,usuario,sucursal,semana)
    }

    static async readGastoUsuarioController(empresa,usuario,sucursal,semana)
    {
        return await GastoModel.readGastoUsuarioModel(empresa,usuario,sucursal,semana)
    }

    static async insertGastoUsuarioController(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo,
                                              FotoFactura, empresa, usuario_code,FK_CodeSucursal){
        return await GastoModel.insertGastoUsuarioModel(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo,
            FotoFactura, empresa, usuario_code,FK_CodeSucursal)
    }

    static async readModelGastoFechaController(empresa,sucursal,fechaI,fechaF){
        return await GastoModel.readModelGastoFechaModel(empresa,sucursal,fechaI,fechaF)
    }

    static async readModelGastoFechaSucursalController(sucursal,email,fechaI,fechaF){
        return await  GastoModel.readModelGastoFechaSucursalModel(sucursal,email,fechaI,fechaF)
    }

    static async readListUltimoGastoController(email){
        return await GastoModel.readListUltimoGastoModel(email)
    }

    static async readReporteGastoController(sucursal)
    {
        return await GastoModel.readReporteGastoModel(sucursal)
    }

}

module.exports = GastoController