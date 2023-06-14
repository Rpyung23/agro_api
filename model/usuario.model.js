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
}

module.exports = UsuarioModel