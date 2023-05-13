const connDB = require("../config/conn")
class ProveedorModel
{
    static async insertProveedoresEmpresaModel(empresa,NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
                                 EmailProveedor, CuentaBancaria, AtienddeProveedor)
    {
        try {
            var sql = "call registerProveedor('"+empresa+"','"+NombresApellidosProveedor+"','"+DirProveedor+"','"+TelefonoProveedor+"','"+EmailProveedor+"','"+CuentaBancaria+"','"+AtienddeProveedor+"')"
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0][0][0].status_code
        }catch (e) {
            return 400
        }
    }


    static async readProveedoresEmpresaModel(empresa)
    {
        try {
            var sql = "select P.* from proveedor as P inner join empresa_proveedor as EP on " +
                              "P.CodigoProveedor = EP.FK_CodeProveedor and EP.FK_CodeEmpresa = '"+empresa+"'"
            var conn = await connDB().promise()
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }
}

module.exports = ProveedorModel