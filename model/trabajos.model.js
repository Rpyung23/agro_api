const connDB = require("../config/conn")
class TrabajosModel
{
    static async totalTodoTipoTrabajoEmpresaModel(empresa,usuario,sucursal)
    {
        try{
            var conn = await connDB().promise()
            var sql = "SELECT COUNT(CASE WHEN T.FKEstadoTrabajo = 1 THEN T.idTrabajo END) as pendiente," +
                "COUNT(CASE WHEN T.FKEstadoTrabajo = 2 THEN T.idTrabajo END) as proceso," +
                "COUNT(CASE WHEN T.FKEstadoTrabajo = 3 THEN T.idTrabajo END) as finalizado " +
                "FROM trabajos AS T inner join sucursales as S on S.Code_Sucursal = T.Fk_Sucursal " +
                "inner join usuario_admin_sucursal as US on T.Fk_Sucursal = US.FK_Code_Sucursal " +
                "where FK_Code_Sucursal = "+sucursal+" and Fk_Empresa = '"+empresa+"' and US.FK_CodigoUsuarioAdmin = '"+usuario+"'"
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
    static async queryReadTrabajoModel(empresa,sucursal,trabajo)
    {

        try{
            var conn = await connDB().promise()
            var sql = "select T.idTrabajo,T.NameTrabajo,convert(T.fechaLimite,char(150)) fechaLimite,T.FKEstadoTrabajo,upper(ET.detalle) detalleEstado " +
                "from trabajos as T inner join estado_trabajo as ET on T.FKEstadoTrabajo = ET.idEstadoTrabajo " +
                "where T.FKEstadoTrabajo in (1,2) and T.NameTrabajo like '%"+trabajo+"%' " +
                "and T.Fk_Empresa = '"+empresa+"' and T.Fk_Sucursal = "+sucursal
           console.log(sql)
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async readDetalleTrabajoModel(empresa,sucursal,trabajo)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select T.idTrabajo,T.NameTrabajo,T.fotoTrabajo,convert(T.fechaInicio,char(150)) fechaInicio," +
                "convert(T.fechaFin,char(150)) fechaFin," +
                "convert(T.fechaLimite,char(150)) fechaLimite,T.notaTrabajo,T.FKEstadoTrabajo from trabajos as T where T.idTrabajo = "+trabajo
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async readTrabajoUsuariosModel(codeUsuario)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select T.idTrabajo,T.NameTrabajo,convert(T.fechaInicio,char(150)) fechaInicio," +
                "convert(T.fechaFin,char(150)) fechaFin,convert(T.fechaLimite,char(150)) fechaLimite,T.FKEstadoTrabajo," +
                "ET.detalle,S.NombreSucursal,T.Fk_Sucursal from trabajos as T inner join estado_trabajo as ET on " +
                "T.FKEstadoTrabajo = ET.idEstadoTrabajo inner join sucursales as S on S.Code_Sucursal = T.Fk_Sucursal " +
                "inner join usuario_admin_sucursal as UAS on UAS.FK_Code_Sucursal = S.Code_Sucursal where " +
                "UAS.FK_CodigoUsuarioAdmin = '"+codeUsuario+"' order by T.Fk_Sucursal asc"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }


    static async updateTrabajoModel(idTrabajo,NameTrabajo,Fk_Sucursal,FKEstadoTrabajo,fechaInicio,fechaLimite,fechaFin,nota)
    {
        try{
            var conn = await connDB().promise()
            var sql = "update trabajos set NameTrabajo = '"+NameTrabajo+"',Fk_Sucursal= "+Fk_Sucursal+",FKEstadoTrabajo="+FKEstadoTrabajo+"," +
                "fechaInicio='"+fechaInicio+"',fechaLimite='"+fechaLimite+"',notaTrabajo='"+nota+"',fechaFin='"+fechaFin+"' where idTrabajo = "+idTrabajo
            console.log(sql)
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