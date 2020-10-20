const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

router.get("/libriUtente/:utente", (_req, _res, _next) => {
    DB.query({
        sql:'call getLibriUtente(?)',values:[_req.params.utente]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

router.get("/numberLibriUtente/:utente", (_req, _res, _next) => {
    DB.query({
        sql:'call getNumberLibriUtente(?)',values:[_req.params.utente]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

router.post('/addPrenotazione',(_req, _res) => {
    DB.query({
        sql:'call addPrenotazione(?,?,?)', values:[_req.body.utente, _req.body.libro, _req.body.dataPrenotazione]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });

  router.get('/daRestituire/:utente',(_req, _res) => {
    DB.query({
        sql:'call daRestituire(?)', values:[_req.params.utente]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });

  router.put('/returnBook',(_req, _res) => {
    DB.query({
        sql:'call returnBook(?,?,?)', values:[_req.body.utente, _req.body.libro, _req.body.dataRestituzione]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });

  module.exports = router;