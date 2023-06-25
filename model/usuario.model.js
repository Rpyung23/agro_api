const connDB = require("../config/conn")
class UsuarioModel
{
    static async readModelLoginUsuario(empresa,usuario,password)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select UA.FK_CodeEmpresa,UA.CodigoUsuarioAdmin,UA.NombreApellidosAdmin from usuario_admin as UA " +
                "where UA.CodigoUsuarioAdmin = '"+usuario+"' and UA.ContraseniaUsuarioAdmin = '"+password+"' and UA.EstadoUsuarioAdmin = 1"
            var datos = await conn.query(sql)
            //console.log(sql)
            return datos[0][0]
        }catch (e) {
            console.log(e)
            return null
        }
    }

    static async readModelEmpleadosPanelModel(usuario)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select table2.asistentes,table2.totEmpleados,ABS((table2.totEmpleados-table2.asistentes)) ausentes " +
                "from (select count(table1.CodigoEmpleado) totEmpleados,if(ISNULL(table1.FKCodigoEmpleado),0,count(table1.FKCodigoEmpleado)) asistentes from (select E.CodigoEmpleado,HE.FKCodigoEmpleado from empleados as E left join historial_empleado as HE " +
                "on HE.FKCodigoEmpleado = E.CodigoEmpleado left join usuario_admin_sucursal as UAS on UAS.FK_Code_Sucursal = E.FK_CodigoSucursal " +
                "where E.EstadoEmpleado = 1 and UAS.FK_CodigoUsuarioAdmin  = '"+usuario+"' group by E.CodigoEmpleado) as table1) as table2;"
            var datos = await conn.query(sql)
            //console.log(sql)
            return datos[0][0]
        }catch (e) {
            console.log(e)
            return null
        }
    }


}

module.exports = UsuarioModel