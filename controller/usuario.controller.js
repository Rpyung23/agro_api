const UsuarioModel = require("../model/usuario.model")
class UsuarioController {
    static async readControllerLoginUsuario(empresa,usuario,pass){
        return await UsuarioModel.readModelLoginUsuario(empresa,usuario,pass)
    }
}

module.exports = UsuarioController