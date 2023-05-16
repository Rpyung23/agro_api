
const connDB = require("../config/conn")
class ProveedorModel
{

    static async insertProveedoresEmpresaModel(empresa,NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
                                               EmailProveedor, CuentaBancaria, AtienddeProveedor,TelefonoEmpresa,DomicilioGoogle)
    {
        try {
            var sql = "call registerProveedor('"+empresa+"','"+NombresApellidosProveedor+"','"+DirProveedor+"','"+TelefonoProveedor+"','"+EmailProveedor+"','"+CuentaBancaria+"','"+AtienddeProveedor+"','"+TelefonoEmpresa+"','"+DomicilioGoogle+"')"
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
    static async readAutocompleteProveedorModel(name)
    {
        try{
            var conn = await connDB().promise()
            var sql = "select P.NombresApellidosProveedor,P.CodigoProveedor from proveedor as P where P.NombresApellidosProveedor like '%"+name+"%'"
            console.log(sql)
            var datos = await conn.query(sql)
            //console.log(datos)
            await conn.end()
            return datos[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
}

module.exports = ProveedorModel