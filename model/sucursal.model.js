const connDB = require("../config/conn")
class SucursalModel
{
    static async registerSucursalModel(usuario,empresa,name,direc,telefono)
    {
        try {
            var conn = await connDB().promise()
            var response = await conn.query("call registerSucursalUserAdmin('"+usuario+"','"+empresa+"','"+name+"','"+direc+"','"+telefono+"')")
            await conn.end()
            return response[0][0][0].status_code
        }catch (e) {
            return 400;
        }
    }
    static async readSucursaleUsuarioModel(usuario,empresa)
    {
        try{
            var conn = await connDB().promise()
            var datos = await conn.query("select AUS.FK_Code_Sucursal,S.NombreSucursal from usuario_admin as UA " +
                "left join usuario_admin_sucursal as AUS on  UA.CodigoUsuarioAdmin = AUS.FK_CodigoUsuarioAdmin " +
                "left join sucursales as S on AUS.FK_Code_Sucursal = S.Code_Sucursal " +
                "where UA.CodigoUsuarioAdmin = '"+usuario+"' and UA.FK_CodeEmpresa = '"+empresa+"'")
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
        }

        return []
    }
}

module.exports = SucursalModel