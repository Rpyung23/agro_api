const connDB = require("../config/conn")
class UsuarioModel
{
    static async readModelLoginUsuario(empresa,usuario,password)
    {
        try{
            var conn = await connDB().promise()
            var datos = await conn.query("select UA.FK_CodeEmpresa,UA.CodigoUsuarioAdmin,UA.NombreApellidosAdmin from usuario_admin as UA " +
                "where UA.CodigoUsuarioAdmin = '"+usuario+"' and UA.ContraseniaUsuarioAdmin = '"+password+"' and UA.EstadoUsuarioAdmin = 1")
            return datos[0][0]
        }catch (e) {
            return null
        }
    }
}

module.exports = UsuarioModel