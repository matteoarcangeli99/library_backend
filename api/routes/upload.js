const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout");

const multer = require('multer');
const path = require("path");
const fs = require("fs-extra");

const storage = multer.diskStorage({
    destination: function (_req, file, cb) {
        cb(null, __dirname + '/../../uploads/');
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});


const fileFilter = (_req, file, cb) => {
    console.log(file);
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 //MB
    },
    fileFilter: fileFilter
});

/**
 * Esegue il caricamento di un libro
 */
router.post("/caricaLibro", upload.single('copertina'), (_req, _res, _next) => {

    var nomefile = (!_req.file) ? '' : _req.file.filename;

    if (!nomefile) {
        return _res.status(500).json({
            error_code: 1,
            err_desc: 'error 500'
        });
    } else {

        // Rinomino immagine
        var oldPath = path.resolve(__dirname + '/../../uploads/' + nomefile);
        var newName = Math.round(new Date().getTime() / 1000).toString() + '_' + nomefile;
        var newPath = path.resolve(__dirname + '/../../uploads/' + newName);


        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                return _res.status(500).json(JOut(err, {}));
            }

            DB.query({
                sql: "call addBook (?,?,?,?,?)",
                values: [_req.body.titolo, _req.body.genere, _req.body.trama, newName, _req.body.quantita]
            }, (_err, _result) => {
                if (_err) {
                    return _res.status(500).json(JOut(err, {}));
                } else {
                    return _res.status(200).json(JOut([], {}));
                }
            });

        });

    }
});

module.exports = router;