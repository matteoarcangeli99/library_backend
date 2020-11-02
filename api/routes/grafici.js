const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

/**
 * Ritorna il numero di libri letti da un utente nei vari mesi
 */
router.get("/getNumberLibriMese/:id", (_req, _res, _next) => {
    DB.query({
        sql:'call getNumberLibriMese(?)', values:[_req.params.id]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

/**
 * Ritorna i generi letti da un utente
 */
router.get("/getGeneriUtente/:id", (_req, _res, _next) => {
    DB.query({
        sql:'call getGeneriUtente(?)', values:[_req.params.id]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

module.exports = router;