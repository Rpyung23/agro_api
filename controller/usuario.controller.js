const UsuarioModel = require("../model/usuario.model")
class UsuarioController {
    static async readControllerLoginUsuario(empresa,usuario,pass){
        return await UsuarioModel.readModelLoginUsuario(empresa,usuario,pass)
    }

    static async readModelEmpleadosPanelController(usuario){
        return await UsuarioModel.readModelEmpleadosPanelModel(usuario)
    }
}

module.exports = UsuarioController