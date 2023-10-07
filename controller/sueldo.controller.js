const SueldoModel = require("../model/sueldo.model")
class SueldoController
{
    static async readSueldoController(sucursal,admin)
    {
        return SueldoModel.readSueldoModel(sucursal,admin)
    }

    static async generarCobroController(empleado,admin){
        return SueldoModel.generarCobroModel(empleado,admin)
    }
}


module.exports = SueldoController