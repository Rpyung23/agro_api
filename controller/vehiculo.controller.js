const VehiculoModel = require("../model/vehiculo.model")
class VehiculoController
{
    static async insertVehiculoController(PlacaVehiculo, empresa_code, Fk_sucursal, KmInicial, FotoVehiculo)
    {
        return await VehiculoModel.insertVehiculoModel(PlacaVehiculo, empresa_code, Fk_sucursal, KmInicial, FotoVehiculo)
    }

    static async readVehiculoSucursalEmpresaController(empresa_code,sucursal_code)
    {
        return await VehiculoModel.readVehiculoSucursalEmpresaModel(empresa_code,sucursal_code)
    }

    static async insertGastoVehiculoModel(placa,precio,fecha,factura,foto){
        return await VehiculoModel.insertGastoVehiculoModel(placa,precio,fecha,factura,foto)
    }

    static async readVehiculoUsuarioEmpresaAllController(user_code)
    {
        return await VehiculoModel.readVehiculoUsuarioEmpresaAllModel(user_code)
    }
}

module.exports = VehiculoController