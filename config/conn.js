const mysql = require("mysql2");

let connDB = () =>
{

    return  mysql.createConnection({
        host: "159.223.111.107",
        user: "root",
        database: "agro",
        password: "Urbano1972102030*",
        port: 3306
    });

}

module.exports = connDB