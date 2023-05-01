const connDB = require("../config/conn")
class EmpresaModel
{
    static async readModelCodigoEmpresa(codigo){
        try {
            var conn = await connDB().promise()
            var datos = await conn.query("select E.CodeEmpresa,E.nombre,E.logo from empresa as E where E.CodeEmpresa = '"+codigo+"'")
            await conn.end()
            return datos[0][0]
        }catch (e) {
            return null
        }
    }
}

module.exports = EmpresaModel