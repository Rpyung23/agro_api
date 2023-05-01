const EmpresaModel = require("../model/empresa.model");

class EmpresaController
{
    static async readControllerCodigoEmpresa(codigo){
        try {
            var dato = await EmpresaModel.readModelCodigoEmpresa(codigo)
            return dato
        }catch (e) {
            return null
        }
    }
}

module.exports = EmpresaController