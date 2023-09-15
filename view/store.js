const admin = require("firebase-admin")
const multer = require('multer');
const upload = multer();
const certificado = require("../config/agro-4a13f-firebase-adminsdk-6zpes-a55fd90279.json")
const express = require("express")
const app = express()

const  appFirebase = admin.initializeApp({
    credential: admin.credential.cert(certificado),
    databaseURL: 'https://agro-4a13f-default-rtdb.firebaseio.com',
    storageBucket: 'gs://agro-4a13f.appspot.com'
})

const bucket = admin.storage().bucket()

app.post("/store_agro", upload.single('file'), async function (req, res) {
    try {
        const file = req.file;

        // Verifica si se recibió un archivo válido
        if (!file) {
            return res.status(400).json({
                downloadURL: null,
                message: "No se ha enviado ningún archivo válido."
            });
        }

        // Genera un nombre de archivo único basado en la marca de tiempo en milisegundos
        const timestamp = Date.now();
        const fileExtension = file.originalname.split('.').pop(); // Obtiene la extensión del archivo
        const uniqueFileName = `${timestamp}.${fileExtension}`;

        // Procede con tu lógica para almacenar o manipular el archivo
        const fileRef = bucket.file(uniqueFileName);
        await fileRef.save(file.buffer); // Utiliza file.buffer en lugar de file.data para guardar el archivo

        // Obtén la URL de descarga
        const downloadURL = await fileRef.getSignedUrl({
            action: 'read',
            expires: '03-09-3491'  // Cambia esto según tus necesidades de expiración
        });

        console.log(downloadURL);
        res.status(200).json({
            downloadURL: downloadURL[0]
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            downloadURL: null
        });
    }
});


module.exports = app