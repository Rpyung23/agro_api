const connDB = require("../config/conn")
class VehiculoModel
{
    static async insertVehiculoModel(PlacaVehiculo, empresa_code, Fk_sucursal, KmInicial, FotoVehiculo)
    {
        try{
            var conn = await connDB().promise()
            var sql = "insert into vehiculo(PlacaVehiculo, FK_Empresa, Fk_sucursal, KmInicial, FotoVehiculo) " +
                "VALUES ('"+PlacaVehiculo+"','"+empresa_code+"',"+Fk_sucursal+","+KmInicial+",'"+FotoVehiculo+"');"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
    static async readVehiculoSucursalEmpresaModel(empresa_code,sucursal_code)
    {
        try{
            var conn = await connDB().promise()
            var datos = await conn.query("select V.PlacaVehiculo,V.Fk_sucursal,V.FotoVehiculo,V.FK_Empresa " +
                "from vehiculo as V where V.FK_Empresa = '"+empresa_code+"' and V.Fk_sucursal = "+sucursal_code+"")
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async insertGastoVehiculoModel(placa,precio,fecha,factura,foto)
    {
        try{
            var conn = await connDB().promise()
            var sql = "insert into gastos_vehicular(FK_PlacaVehicular, ValorGastoVehicular, FechaProximoServicio, " +
                "NumeroTicketGastoVehicular,FotoTicketGastoVehicular) VALUES " +
                "('"+placa+"',"+precio+",'"+fecha+"','"+factura+"','"+foto+"');"
            var datos = await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            return false
        }
    }

}

module.exports = VehiculoModel