const SueldoModel = require("../model/sueldo.model")
class SueldoController
{
    static async readSueldoController(sucursal,admin)
    {
        return SueldoModel.readSueldoModel(sucursal,admin)
    }

    static async generarCobroController(empleado){
        return SueldoModel.generarCobroModel(empleado)
    }
}


module.exports = SueldoController