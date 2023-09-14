const connDB = require('../config/conn')

class IngresoModel
{
    static async readUltimo5IngresoUsuarioModel(empresa,usuario)
    {
        try{
            var conn = await  connDB().promise()
            var sql = "select FORMAT(CAST(sum(table1.ingreso) AS DECIMAL(10, 2)), 2) as ingreso from " +
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

    static async readModelIngresoFechaModel(empresa,sucursal,fechaI,fechaF)
    {
        try{
            var conn = await connDB().promise()



            var sql = "select FORMAT(CAST(if(ISNULL(sum(I.CantidadIngreso)),0,sum(I.CantidadIngreso)) AS DECIMAL(10, 2)), 2) ingreso " +
                "from ingresos as I where I.FK_Code_Sucursal = "+sucursal+" and I.FK_CodeEmpresa = '"+empresa+"' and date(I.FechaCreacionIngreso) " +
                "between '"+fechaI+"' and '"+fechaF+"'"
            //console.log(sql)
            var datos = await conn.query(sql)
            await conn.end()

            return datos[0][0].ingreso
        }catch (e) {
            console.log(e)
            return  '0.00'
        }
    }

    static async readModelIngresoFechaSucursalModel(sucursal,email,fechaI,fechaF)
    {
        var sqlRanchos = ""

        if(Array.isArray(sucursal))
        {
            sqlRanchos = "and IAS.FK_Code_Sucursal in ("+sucursal+")"
        }

        try{
            var conn = await connDB().promise()
            var sql = "select I.CodigoIngreso,convert(date(I.FechaCreacionIngreso),char(150)) FechaCreacionIngreso," +
                "I.NotaIngreso,I.CantidadIngreso,S.NombreSucursal from ingresos as I " +
                "inner join usuario_admin_sucursal as IAS on I.FK_Code_Sucursal = IAS.FK_Code_Sucursal " +
                "inner join sucursales as S on IAS.FK_Code_Sucursal = S.Code_Sucursal where " +
                "date(I.FechaCreacionIngreso) between '"+fechaI+"' and '"+fechaF+"' " +
                "and IAS.FK_CodigoUsuarioAdmin = 'admin01@gmail.com' and I.EstadoIngreso = 1 "+sqlRanchos

            var datos = await  conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readListUltimoIngresoModel(email)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select I.NombreIngreso,FORMAT(I.CantidadIngreso,2) CantidadIngreso,I.NotaIngreso,I.FK_Code_Sucursal," +
                "S.NombreSucursal from ingresos as I inner join usuario_admin_sucursal as USC on " +
                "USC.FK_CodigoUsuarioAdmin = I.FK_CodigoUsuarioAdmin inner join sucursales as S on " +
                "S.Code_Sucursal = USC.FK_Code_Sucursal where I.FK_CodigoUsuarioAdmin = '"+email+"' " +
                "order by I.FechaCreacionIngreso desc limit 5"

            var data = await conn.query(sql)
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
}

module.exports = IngresoModel