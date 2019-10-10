const multer = require('multer')

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../tmp/uploads`)
        },
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}_${file.originalname}`
            cb(null, fileName)
        }
    }),

    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    
    fileFilter: function(req, file, cb) {
        const allowedMimes = [
            'application/rtf',
            'application/msword'
        ];

        if (allowedMimes.includes(file.mimetype)) {
              cb(null, true);
        } else {
            cb('Tipo de Arquivo Inválido.');
            
        }
    }

}