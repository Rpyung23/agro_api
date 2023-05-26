const connDB = require("../config/conn")
class EmpleadoModel
{
    static  async insertNewEmpleadoModel(CodigoEmpleado, NombresApellidosEmpleado, DirEmpleado, TelefonoEmpleado,
                                         EmailEmpleado,FotoEmpleado, sucursal)
    {
       try {
           var conn = await connDB().promise()
           var sql = "insert into empleados(CodigoEmpleado, NombresApellidosEmpleado, DirEmpleado, TelefonoEmpleado, EmailEmpleado," +
               "FotoEmpleado, FK_CodigoSucursal) VALUES ('"+CodigoEmpleado+"','"+NombresApellidosEmpleado+"'," +
               "'"+DirEmpleado+"','"+TelefonoEmpleado+"','"+EmailEmpleado+"','"+FotoEmpleado+"',"+sucursal+");"

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

}

module.exports = EmpleadoModel