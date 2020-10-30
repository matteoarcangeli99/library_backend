const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

/**
 * Ritorna tutti i libri presenti
 */
router.get("/getAll", (_req, _res, _next) => {
    DB.query({
        sql:'call getAllLibri()'
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

/**
 * Ritorna un libro dato un ID
 */
router.get("/getBook/:id", (_req, _res, _next) => {
    DB.query({
        sql:'call getBook(?)', values:[_req.params.id]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

/**
 * ritorna gli autori di un libro
 */
router.get('/getBookAuthors/:libro',(_req, _res) => {
    DB.query({
        sql:'call getBookAuthors(?)', values:[_req.params.libro]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });

module.exports = router;