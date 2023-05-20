
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


    static async readDetalleProveedorModel(codigoProveedor)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select P.CodigoProveedor,P.NombresApellidosProveedor,P.AtienddeProveedor,P.TelefonoEmpresa,P.TelefonoProveedor," +
                "P.DomicilioGoogle,P.DirProveedor,P.CuentaBancaria from proveedor as P where P.CodigoProveedor = '"+codigoProveedor+"'"
            var datos = await conn.query(sql)
            await conn.end()
            return datos[0]
        }catch (e) {
            return []
        }
    }

    static async updateDetalleProveedorModel(CodigoProveedor,NombresApellidosProveedor,AtienddeProveedor,
                                        TelefonoEmpresa,TelefonoProveedor,DomicilioGoogle,DirProveedor,CuentaBancaria)
    {
        try{
            var conn = await connDB().promise()
            await conn.query("update proveedor set NombresApellidosProveedor = '"+NombresApellidosProveedor+"'," +
                "AtienddeProveedor = '"+AtienddeProveedor+"',TelefonoEmpresa = '"+TelefonoEmpresa+"'," +
                "TelefonoProveedor = '"+TelefonoProveedor+"',DomicilioGoogle = '"+DomicilioGoogle+"',DirProveedor = '"+DirProveedor+"'," +
                "CuentaBancaria = '"+CuentaBancaria+"' where CodigoProveedor = '"+CodigoProveedor+"'")
            await conn.end()
            return true
        }catch (e) {
            return false
        }
    }
}

module.exports = ProveedorModel