const SucursalModel = require("../model/sucursal.model")
class SucursalController {
    static async registerSucursalController(usuario,empresa,name,direc,telefono){
        return await SucursalModel.registerSucursalModel(usuario,empresa,name,direc,telefono)
    }

    static async readSucursalUsuarioController(usuario,empresa){
        return await SucursalModel.readSucursaleUsuarioModel(usuario,empresa)
    }

}

module.exports = SucursalController