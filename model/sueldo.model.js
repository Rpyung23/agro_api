const connDB = require('../config/conn')
class SueldoModel
{
    static async readSueldoModel(sucursal,admin)
    {

        var sqlRanchos = ""

        if(Array.isArray(sucursal))
        {
            sqlRanchos = " and UA.FK_Code_Sucursal in ("+sucursal+") "
        }

        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select HE.FKCodigoEmpleado,E.NombresApellidosEmpleado,S.NombreSucursal," +
                "convert(date(min(HE.fechaIngreso)),char(150)) fechaIngreso,convert(date(max(HE.fechaSalida)),char(150)) fechaSalida," +
                "count(HE.idHistorialEmpleado) dias_trabajados,FORMAT(CAST(sum(HE.salario_ganado) AS DECIMAL(10, 2)), 2)  " +
                "salario_ganado from historial_empleado as HE inner join empleados as E on HE.FKCodigoEmpleado = E.CodigoEmpleado " +
                "inner join sucursales as S on E.FK_CodigoSucursal = S.Code_Sucursal " +
                "inner join usuario_admin_sucursal as UA on UA.FK_Code_Sucursal = S.Code_Sucursal " +
                "where HE.is_cobrado = 0 and UA.FK_CodigoUsuarioAdmin = '"+admin+"' "+sqlRanchos+" group by HE.FKCodigoEmpleado")
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async generarCobroModel(empleado)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update historial_empleado set is_cobrado = 1 where FKCodigoEmpleado = '"+empleado+"'"
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            return false
        }
    }
}

module.exports = SueldoModel