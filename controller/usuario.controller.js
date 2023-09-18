const UsuarioModel = require("../model/usuario.model")
class UsuarioController {
    static async readControllerLoginUsuario(empresa,usuario,pass){
        return await UsuarioModel.readModelLoginUsuario(empresa,usuario,pass)
    }

    static async readModelEmpleadosPanelController(usuario,sucursal){
        console.log(sucursal)
        return await UsuarioModel.readModelEmpleadosPanelModel(usuario,sucursal)
    }

    static async readModelAllAsistenciaController(usuario){
        return await UsuarioModel.readModelAllAsistenciaModel(usuario)
    }
}

module.exports = UsuarioController