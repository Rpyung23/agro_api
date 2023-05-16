const connDB = require('../config/conn')

class GastoModel
{
    static async readUltimo5GastoUsuarioModel(empresa,usuario)
    {
        try{
            var conn = await  connDB().promise()
            var sql = "select FORMAT(CAST(sum(G.cantidad) AS DECIMAL(10, 2)), 2) as gasto from gastos as G " +
                "where FK_CodigoUsuarioAdmin = '"+usuario+"' and FK_CodeEmpresa = '"+empresa+"' order by G.DateTimeRegistroGasto desc limit 5;"

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

            var datos = await conn.query(sql)
            return datos[0][0].gasto
        }catch (e) {
            return '0.00'
        }
    }

}

module.exports = GastoModel