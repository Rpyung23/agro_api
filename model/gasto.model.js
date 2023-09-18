const connDB = require('../config/conn')

class GastoModel {
    static async readUltimo5GastoUsuarioModel(empresa, usuario,sucursal) {
        try {
            var conn = await connDB().promise()

            var sql = "select FORMAT(CAST(sum(table1.gasto) AS DECIMAL(10, 2)), 2) as gasto from (select G.cantidad as gasto from gastos as G " +
                "where FK_CodigoUsuarioAdmin = '" + usuario + "' and FK_CodeEmpresa = '" + empresa + "' and FK_CodeSucursal = "+sucursal+" order by G.DateTimeRegistroGasto desc limit 5) as table1;"

            /*var sql = "select FORMAT(CAST(sum(G.cantidad) AS DECIMAL(10, 2)), 2) as gasto from gastos as G " +
                "where FK_CodigoUsuarioAdmin = '"+usuario+"' and FK_CodeEmpresa = '"+empresa+"' order by G.DateTimeRegistroGasto desc limit 5;"*/
            //console.log(sql)
            var datos = await conn.query(sql)
            return datos[0][0].gasto
        } catch (e) {
            return '0.00'
        }
    }

    static async readGastoUsuarioModel(empresa, usuario,sucursal) {
        try {
            var conn = await connDB().promise()
            var sql = "select FORMAT(CAST(sum(G.cantidad) AS DECIMAL(10, 2)), 2) as gasto from gastos as G " +
                "where FK_CodigoUsuarioAdmin = '" + usuario + "' and FK_CodeEmpresa = '" + empresa + "' and FK_CodeSucursal = "+sucursal+" order by G.DateTimeRegistroGasto desc;"
            //console.log(sql)
            var datos = await conn.query(sql)
            return datos[0][0].gasto
        } catch (e) {
            return '0.00'
        }
    }


    static async insertGastoUsuarioModel(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo,
                                         FotoFactura, empresa, usuario_code, FK_CodeSucursal) {
        try {
            var sql = "insert into gastos(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo," +
                "FotoFactura, FK_CodeEmpresa, FK_CodigoUsuarioAdmin,FK_CodeSucursal) VALUES ('" + NombreGasto + "','" + FK_CodigoProveedor + "'," + cantidad + "," +
                "'" + CodigoFactura + "','" + NotaFactura + "','" + QRealizo + "','" + FotoFactura + "','" + empresa + "','" + usuario_code + "'," + FK_CodeSucursal + ")"
            var conn = await connDB().promise()
            await conn.query(sql)
            await conn.end()
            return true
        } catch (e) {
            console.log(e)
            return false
        }


    }


    static async readModelGastoFechaModel(empresa, sucursal, fechaI, fechaF) {
        try {
            var conn = await connDB().promise()


            var sql = "select FORMAT(CAST(if(ISNULL(sum(G.cantidad)),0,sum(G.cantidad)) AS DECIMAL(10, 2)), 2) gasto from gastos as G where " +
                "G.FK_CodeSucursal = " + sucursal + " and G.FK_CodeEmpresa = '" + empresa + "' and " +
                "date(G.DateTimeRegistroGasto) between '" + fechaI + "' and '" + fechaF + "'"
            console.log(sql)
            var datos = await conn.query(sql)
            await conn.end()

            return datos[0][0].gasto
        } catch (e) {
            console.log(e)
            return '0.00'
        }
    }


    static async readModelGastoFechaSucursalModel(sucursal, email, fechaI, fechaF) {
        var sqlRanchos = ""

        if (Array.isArray(sucursal)) {
            sqlRanchos = "and IAS.FK_Code_Sucursal in (" + sucursal + ")"
        }

        try {
            var conn = await connDB().promise()
            var sql = "select G.CodeGasto,convert(date(G.DateTimeRegistroGasto),char(150)) DateTimeRegistroGasto," +
                "G.NombreGasto,G.CodigoFactura,G.QRealizo,G.cantidad,S.NombreSucursal from gastos as G " +
                "inner join usuario_admin_sucursal as IAS on G.FK_CodeSucursal = IAS.FK_Code_Sucursal " +
                "inner join sucursales as S on IAS.FK_Code_Sucursal = S.Code_Sucursal where " +
                "date(G.DateTimeRegistroGasto) between '" + fechaI + "' and '" + fechaF + "' " +
                "and IAS.FK_CodigoUsuarioAdmin = 'admin01@gmail.com' " + sqlRanchos

            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        } catch (e) {
            console.log(e)
            return []
        }
    }

    static async readListUltimoGastoModel(email)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select NombreGasto,FORMAT(cantidad,2) cantidad,NotaFactura,QRealizo,FK_CodeSucursal,S.NombreSucursal " +
                "from gastos as G inner join usuario_admin_sucursal as USC on " +
                "USC.FK_CodigoUsuarioAdmin = G.FK_CodigoUsuarioAdmin inner join sucursales as S " +
                "on S.Code_Sucursal = USC.FK_Code_Sucursal where " +
                "G.FK_CodigoUsuarioAdmin = '"+email+"' order by DateTimeRegistroGasto desc limit 5"

            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }


}

module.exports = GastoModel