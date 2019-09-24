const multer = require('multer')

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../tmp/uploads`);
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
            const namefile = file.originalname.split('-')[1].split('.')[0]
            const allowedName = {
                // dia: parseInt(namefile.substring(0, 2)),
                // mes: parseInt(namefile.substring(2, 4)),
                ano: parseInt(namefile.substring(4, 6)),
            } 
            if (allowedName.ano > 16)  cb(null, true);
                
        } else {
            cb('Tipo de Arquivo Inválido.');
            
        }
    }

}