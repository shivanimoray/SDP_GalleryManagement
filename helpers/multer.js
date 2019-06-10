var multer  = require('multer');

//Multer configuration
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.match(/jpe|jpeg|png|gif$i/)){
            cb(new Error('File type is not supported'), false)
            return
        }
        cb(null, true)
    }
})