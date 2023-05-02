const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require("../config/env");
class Jwt {
    static createJwt(fk_empresa,usuario)
    {
        try{
            var token = jwt.sign({ empresa: fk_empresa,code_usuario: usuario}, JWT_SECRET_KEY(),{expiresIn:'24h'});
            return token
        }catch (e) {
            console.log(e)
            return null
        }
    }
}

module.exports = Jwt