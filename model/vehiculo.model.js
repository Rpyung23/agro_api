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

    static async insertGastoVehiculoModel(placa,precio,fecha,factura,foto,KmCarga)
    {
        try{
            var conn = await connDB().promise()
            var sql = "insert into gastos_vehicular(FK_PlacaVehicular, ValorGastoVehicular, FechaProximoServicio, " +
                "NumeroTicketGastoVehicular,FotoTicketGastoVehicular,KmCarga) VALUES " +
                "('"+placa+"',"+precio+",'"+fecha+"','"+factura+"','"+foto+"',"+KmCarga+");"
            console.log(sql)
            var datos = await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }


    static async readVehiculoUsuarioEmpresaAllModel(user_code)
    {
        try{
            var conn = await connDB().promise()
            var datos = await conn.query("select V.PlacaVehiculo,V.DetalleVehiculo,V.KmInicial," +
                "V.KmMantenimiento,count(GV.CodeGastoVehicular) NoServicios,S.NombreSucursal " +
                "from vehiculo as V left join gastos_vehicular as GV on V.PlacaVehiculo = GV.FK_PlacaVehicular " +
                "left join usuario_admin_sucursal as US on V.Fk_sucursal = US.FK_Code_Sucursal left join sucursales as S " +
                "on US.FK_Code_Sucursal = S.Code_Sucursal where US.FK_CodigoUsuarioAdmin = '"+user_code+"' " +
                "group by V.PlacaVehiculo;")
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }


    static async readHistorialControlVehicularModel(placa)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select GV.FK_PlacaVehicular,GV.ValorGastoVehicular," +
                "convert(date(GV.FechaProximoServicio),char(150)) FechaProximoServicio,GV.KmCarga " +
                "from gastos_vehicular as GV where GV.FK_PlacaVehicular = '"+placa+"'"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

}

module.exports = VehiculoModel