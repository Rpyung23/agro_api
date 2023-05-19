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
    
}

module.exports = VehiculoController