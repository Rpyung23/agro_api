const connDB = require("../config/conn")
class TrabajosModel
{
    static async totalTodoTipoTrabajoEmpresaModel(empresa,usuario)
    {
        try{
            var conn = await connDB().promise()
            var sql = "SELECT COUNT(CASE WHEN T.FKEstadoTrabajo = 1 THEN T.idTrabajo END) as pendiente," +
                "COUNT(CASE WHEN T.FKEstadoTrabajo = 2 THEN T.idTrabajo END) as proceso," +
                "COUNT(CASE WHEN T.FKEstadoTrabajo = 3 THEN T.idTrabajo END) as finalizado " +
                "FROM trabajos AS T inner join sucursales as S on S.Code_Sucursal = T.Fk_Sucursal " +
                "inner join usuario_admin_sucursal as US on T.Fk_Sucursal = US.FK_Code_Sucursal " +
                "where Fk_Empresa = '"+empresa+"' and US.FK_CodigoUsuarioAdmin = '"+usuario+"'"
            var datos = await conn.query(sql)
            await conn.end()
            //console.log(datos[0][0])
            return datos[0][0]
        }catch (e) {
            console.log(e)
            return {
                pendiente:0,
                proceso:0,
                finalizado:0
            }
        }
    }

    static async insertTrabajoModel(NameTrabajo, Fk_Sucursal, empresa, fotoTrabajo, fechaInicio, fechaFin,
                                    fechaLimite, notaTrabajo, FKEstadoTrabajo)
    {
       try{
           var conn = await connDB().promise()
           var sql = "INSERT INTO trabajos (NameTrabajo, Fk_Sucursal, Fk_Empresa, fotoTrabajo, fechaInicio, fechaFin," +
               "fechaLimite, notaTrabajo, FKEstadoTrabajo) VALUES ('"+NameTrabajo+"', "+Fk_Sucursal+", '"+empresa+"'," +
               "'"+fotoTrabajo+"','"+fechaInicio+"', '"+fechaFin+"', '"+fechaLimite+"', '"+notaTrabajo+"',"+FKEstadoTrabajo+")"
           await conn.query(sql)
           await conn.end()
           return true
       }catch (e) {
           console.log(e)
           return false
       }


    }
}

module.exports = TrabajosModel