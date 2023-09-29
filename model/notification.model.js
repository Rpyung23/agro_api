const connDB = require('../config/conn')
class NotificationModel
{
    static async readNotificationModel(code_usuario)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select N.id_notificacion,N.detalle,S.NombreSucursal from notificacion as N " +
                "inner join sucursales as S on S.Code_Sucursal = N.fk_code_sucursal inner join " +
                "usuario_admin_sucursal as UAS on UAS.FK_Code_Sucursal = S.Code_Sucursal and " +
                "UAS.FK_CodigoUsuarioAdmin = '"+code_usuario+"' where N.estado = 1"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
        }
        return []
    }

    static async updateNotificationModel(notification)
    {
        try {
            var conn = await connDB().promise()
            await conn.query("update notificacion set estado = 2 where id_notificacion = "+notification)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = NotificationModel