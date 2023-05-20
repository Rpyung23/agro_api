const ProveedorModel = require("../model/proveedor.model")
class ProveedorController
{
    static async registerProveedorEmpresaController(empresa,NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
                                             EmailProveedor, CuentaBancaria, AtienddeProveedor,TelefonoEmpresa,DomicilioGoogle){
        return await ProveedorModel.insertProveedoresEmpresaModel(empresa,NombresApellidosProveedor, DirProveedor, TelefonoProveedor,
            EmailProveedor, CuentaBancaria, AtienddeProveedor,TelefonoEmpresa,DomicilioGoogle)
    }

    static async readProveedorEmpresaModel(empresa){
        return await ProveedorModel.readProveedoresEmpresaModel(empresa)
    }

    static async readAutocompleteProveedorController(name){
        return await ProveedorModel.readAutocompleteProveedorModel(name)
    }

    static async readDetalleProveedorController(codigo){
        return await ProveedorModel.readDetalleProveedorModel(codigo)
    }

    static async updateDetalleProveedorController(CodigoProveedor,NombresApellidosProveedor,AtienddeProveedor,
                                                  TelefonoEmpresa,TelefonoProveedor,DomicilioGoogle,DirProveedor,CuentaBancaria){
        return await ProveedorModel.updateDetalleProveedorModel(CodigoProveedor,NombresApellidosProveedor,AtienddeProveedor,
            TelefonoEmpresa,TelefonoProveedor,DomicilioGoogle,DirProveedor,CuentaBancaria)
    }
}

module.exports = ProveedorController