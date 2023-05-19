const connDB = require('../config/conn')

class GastoModel
{
    static async readUltimo5GastoUsuarioModel(empresa,usuario)
    {
        try{
            var conn = await  connDB().promise()

            var sql = "select FORMAT(CAST(sum(table1.gasto) AS DECIMAL(10, 2)), 2) as gasto from (select G.cantidad as gasto from gastos as G " +
                "where FK_CodigoUsuarioAdmin = '"+usuario+"' and FK_CodeEmpresa = '"+empresa+"' order by G.DateTimeRegistroGasto desc limit 5) as table1;"

            /*var sql = "select FORMAT(CAST(sum(G.cantidad) AS DECIMAL(10, 2)), 2) as gasto from gastos as G " +
                "where FK_CodigoUsuarioAdmin = '"+usuario+"' and FK_CodeEmpresa = '"+empresa+"' order by G.DateTimeRegistroGasto desc limit 5;"*/
            //console.log(sql)
            var datos = await conn.query(sql)
            return datos[0][0].gasto
        }catch (e) {
            return '0.00'
        }
    }

    static async readGastoUsuarioModel(empresa,usuario)
    {
        try{
            var conn = await  connDB().promise()
            var sql = "select FORMAT(CAST(sum(G.cantidad) AS DECIMAL(10, 2)), 2) as gasto from gastos as G " +
                "where FK_CodigoUsuarioAdmin = '"+usuario+"' and FK_CodeEmpresa = '"+empresa+"' order by G.DateTimeRegistroGasto desc;"
            //console.log(sql)
            var datos = await conn.query(sql)
            return datos[0][0].gasto
        }catch (e) {
            return '0.00'
        }
    }


    static async insertGastoUsuarioModel(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo,
                                         FotoFactura, empresa, usuario_code,FK_CodeSucursal)
    {
        try{
            var sql = "insert into gastos(NombreGasto, FK_CodigoProveedor, cantidad, CodigoFactura, NotaFactura, QRealizo," +
                "FotoFactura, FK_CodeEmpresa, FK_CodigoUsuarioAdmin,FK_CodeSucursal) VALUES ('"+NombreGasto+"','"+FK_CodigoProveedor+"',"+cantidad+"," +
                "'"+CodigoFactura+"','"+NotaFactura+"','"+QRealizo+"','"+FotoFactura+"','"+empresa+"','"+usuario_code+"',"+FK_CodeSucursal+")"
            var conn = await connDB().promise()
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }


    }



}

module.exports = GastoModel