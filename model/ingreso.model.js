const connDB = require('../config/conn')

class IngresoModel
{
    static async readUltimo5IngresoUsuarioModel(empresa,usuario)
    {
        try{
            var conn = await  connDB().promise()
            var sql = "select FORMAT(CAST(sum(I.CantidadIngreso) AS DECIMAL(10, 2)), 2) as ingreso from ingresos as I " +
                "where FK_CodigoUsuarioAdmin = '"+usuario+"' and FK_CodeEmpresa = '"+empresa+"' order by I.FechaCreacionIngreso desc limit 5"

            var datos = await conn.query(sql)
            await conn.end()
            return datos[0][0].ingreso
        }catch (e) {
            console.log(e)
            return '0.00'
        }
    }
}

module.exports = IngresoModel