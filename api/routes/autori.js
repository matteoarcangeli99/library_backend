const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

router.post('/addAutore',(_req, _res) => {
    DB.query({
        sql:'call insertAuthor(?,?,?)', values:[_req.body.nome, _req.body.cognome, _req.body.dataNascita]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });
  module.exports = router;