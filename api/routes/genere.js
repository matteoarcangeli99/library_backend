const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

/**
 * Ritorna tutti i generi dei libri
 */
router.get("/getAllKinds", (_req, _res, _next) => {
    DB.query({
        sql: 'call getAllKinds()'
    }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Aggiunge un nuovo genere 
 */
router.post('/addGenere', (_req, _res, _next) => {
    DB.query({
        sql: 'call addGenere(?)',
        values: [_req.body.genere]
    }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

module.exports = router;