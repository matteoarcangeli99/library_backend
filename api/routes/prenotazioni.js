const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

/**
 * Ritorna tutti i libri prenotati da un utente
 */
router.get("/libriUtente/:utente", (_req, _res, _next) => {
    DB.query({
        sql: 'call getLibriUtente(?)',
        values: [_req.params.utente]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Ritorna i libri prenotati da un utente non ripetuti e un capo vettoriale con le date di prenotazione
 */
router.get("/getBookPrenotations/:utente", (_req, _res, _next) => {
    DB.query({
        sql: 'call getBookPrenotations(?)',
        values: [_req.params.utente]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Ritorna il numero di libri prenotati da un utente
 */
router.get("/numberLibriUtente/:utente", (_req, _res, _next) => {
    DB.query({
        sql: 'call getNumberLibriUtente(?)',
        values: [_req.params.utente]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Aggiunge una prenotazione
 */
router.post('/addPrenotazione', (_req, _res, _next) => {
    DB.query({
        sql: 'call addPrenotazione(?,?,?)',
        values: [_req.body.utente, _req.body.libro, _req.body.dataPrenotazione]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Ritorna i libri che deve restiture un utente
 */
router.get('/daRestituire/:utente', (_req, _res, _next) => {
    DB.query({
        sql: 'call daRestituire(?)',
        values: [_req.params.utente]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Esegue la restituzione di un libro
 */
router.put('/returnBook/:prenotazione', (_req, _res, _next) => {
    DB.query({
        sql: 'call returnBook(?,?)',
        values: [_req.params.prenotazione, _req.body.dataRestituzione]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

module.exports = router;