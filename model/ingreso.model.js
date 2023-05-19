const connDB = require('../config/conn')

class IngresoModel
{
    static async readUltimo5IngresoUsuarioModel(empresa,usuario)
    {
        try{
            var conn = await  connDB().promise()
            var sql = "select FORMAT(CAST(sum(table1.ingreso) AS DECIMAL(10, 2)), 2) as ingresos from " +
                "(select I.CantidadIngreso as ingreso from ingresos as I where " +
                "FK_CodigoUsuarioAdmin = '"+usuario+"' and FK_CodeEmpresa = '"+empresa+"' order by I.FechaCreacionIngreso desc limit 5) as table1;"

            console.log(sql)

            var datos = await conn.query(sql)
            await conn.end()
            return datos[0][0].ingreso
        }catch (e) {
            console.log(e)
            return '0.00'
        }
    }

    static async readIngresoUsuarioModel(empresa,usuario)
    {
        try{
            var conn = await  connDB().promise()
            var sql = "select FORMAT(CAST(sum(I.CantidadIngreso) AS DECIMAL(10, 2)), 2) as ingreso from ingresos as I " +
                "where FK_CodigoUsuarioAdmin = '"+usuario+"' and FK_CodeEmpresa = '"+empresa+"' order by I.FechaCreacionIngreso desc"

            var datos = await conn.query(sql)
            await conn.end()
            return datos[0][0].ingreso
        }catch (e) {
            console.log(e)
            return '0.00'
        }
    }

    static async insertIngresoModel(NombreIngreso,usuario_code,sucursal_code,empresa,name_cliente,cantidad,nota,foto)
    {
        try{
            var conn = await connDB().promise()
            var sql = "insert into ingresos(NombreIngreso, FK_CodigoUsuarioAdmin,FK_Code_Sucursal, " +
                "FK_CodeEmpresa, NameCliente, CantidadIngreso, NotaIngreso,FotoIngreso) " +
                "VALUES ('"+NombreIngreso+"','"+usuario_code+"',"+sucursal_code+",'"+empresa+"','"+name_cliente+"',"+cantidad+",'"+nota+"','"+foto+"');"
            var datos = await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

}

module.exports = IngresoModel