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
    //cb(null, new Date().toISOString() + file.originalname);
    cb(null, file.originalname);
  }
});


const fileFilter = (_req, file, cb) => {
  console.log(file);
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||  file.mimetype === 'image/png' ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5//MB
  },
  fileFilter: fileFilter
});


router.post("/caricaLibro", upload.single('copertina'), (_req, _res, _next) => {

    var nomefile = (!_req.file) ? '' : _req.file.filename;
    var percorso = path.resolve(__dirname + '/../../uploads');

  console.log(nomefile);
  console.log(percorso);

  if (!nomefile) {
    return _res.status(500).json({
      error_code: 1,
      err_desc: 'error 500'
    });
  } else {

    // Rinomino immagine
    console.log('ciao')
    var oldPath = path.resolve(__dirname + '/../../uploads/'+nomefile);
    console.log(oldPath)
    var newName= Math.round(new Date().getTime() / 1000).toString() + '_' + nomefile;
    console.log(newName)
    var newPath=path.resolve(__dirname+ '/../../uploads/'+newName);


    console.log(newPath);

    fs.rename(oldPath, newPath , function (err) {
      if (err) {
        return _res.status(500).json(JOut(err, {}));
      }

      var Libro = {
        titolo : _req.body.titolo,
        trama: _req.body.trama,
        quantita: _req.body.quantita,
        copertina : newName,
        genere: _req.body.genere
      };

      DB.query({
        sql: "call addBook (?,?,?,?,?)",     values: [Libro.titolo, Libro.trama, Libro.copertina, Libro.quantita, Libro.genere]
      }, (_err, _result) => {
        if (_err) {
          console.log(_err);
          return _res.status(500).json(JOut([], {}));
        } else {
          return _res.status(200).json(JOut([], {}));
        }
      });

    });

  }
});





module.exports = router;