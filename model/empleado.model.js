const connDB = require("../config/conn")
class EmpleadoModel
{
    static  async insertNewEmpleadoModel(CodigoEmpleado, NombresApellidosEmpleado, DirEmpleado, TelefonoEmpleado,
                                         EmailEmpleado,FotoEmpleado, sucursal,salario_semanal)
    {
       try {
           var conn = await connDB().promise()
           var sql = "insert into empleados(CodigoEmpleado, NombresApellidosEmpleado, DirEmpleado, TelefonoEmpleado, EmailEmpleado," +
               "FotoEmpleado, FK_CodigoSucursal,salario_semanal,salario_diario) VALUES ('"+CodigoEmpleado+"','"+NombresApellidosEmpleado+"'," +
               "'"+DirEmpleado+"','"+TelefonoEmpleado+"','"+EmailEmpleado+"','"+FotoEmpleado+"',"+sucursal+","+salario_semanal+","+parseFloat(salario_semanal/6)+");"

           await conn.query(sql)
           await conn.end()
           return true
       }catch (e) {
           console.log(e)
           return false
       }

    }

    static async readEmpleadoSucursalModel(sucursal)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select E.CodigoEmpleado,E.FK_CodigoSucursal,E.FotoEmpleado,E.NombresApellidosEmpleado " +
                "from empleados as E where E.FK_CodigoSucursal = "+sucursal

            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async queryEmpleadoSucursalModel(sucursal,empleado)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select E.CodigoEmpleado,E.FK_CodigoSucursal,E.FotoEmpleado,E.NombresApellidosEmpleado " +
                "from empleados as E where E.FK_CodigoSucursal = "+sucursal+" and E.NombresApellidosEmpleado like '%"+empleado+"%';"

            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async readEmpleadoAllUserModel(usuario_admin)
    {
        try {
            var sql = "select E.CodigoEmpleado,E.salario_diario,E.salario_semanal,E.NombresApellidosEmpleado,E.FotoEmpleado,E.EmailEmpleado,E.TelefonoEmpleado," +
                "S.NombreSucursal,E.EstadoEmpleado from empleados as E inner join sucursales as S on E.FK_CodigoSucursal = S.Code_Sucursal " +
                "inner join usuario_admin_sucursal as UA on UA.FK_Code_Sucursal = S.Code_Sucursal " +
                "where UA.FK_CodigoUsuarioAdmin = '"+usuario_admin+"'"

            //console.log(sql)
            var conn = connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async insertAsistenciaModel(FKCodigoEmpleado, fechaIngreso, fechaSalida,fotoHistorialEmpleado,
                                       notaHistorialEmpleado, idTipoPermiso, fechaHistorialPermiso)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into historial_empleado(FKCodigoEmpleado, fechaIngreso, fechaSalida, " +
                "fotoHistorialEmpleado,notaHistorialEmpleado, idTipoPermiso, fechaHistorialPermiso) " +
                "values('"+FKCodigoEmpleado+"','"+fechaIngreso+"','"+fechaSalida+"','"+fotoHistorialEmpleado+"','"+notaHistorialEmpleado+"'," +
                ""+idTipoPermiso+",'"+fechaHistorialPermiso+"');"
            await conn.query(sql)
            return true
        }catch (e) {
            console.log(e)
        }
        return false
    }

}

module.exports = EmpleadoModel