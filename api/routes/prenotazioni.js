const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 


router.get("/libriUtente/:utente", (_req, _res, _next) => {
    DB.query({
        sql:'call getLibriUtente(?)',values:[_req.params.campo]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

router.post('/addPrenotazione',(req, res) => {
    DB.query({
        sql:'call addPrenotazione(?,?,?)', values:[req.body.utente, req.body.libro, req.body.dataPrenotazione]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });
  module.exports = router;

  router.put('/returnBook',(req, res) => {
    DB.query({
        sql:'call returnBook(?,?,?)', values:[req.body.utente, req.body.libro, req.body.dataRestituzione]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });
  module.exports = router;