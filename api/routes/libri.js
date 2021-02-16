const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

/**
 * Ritorna tutti i libri presenti
 */
router.get("/getAll", (_req, _res, _next) => {
    DB.query({
        sql: 'call getAllLibri()'
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Ritorna tutti i libri presenti paginando il risultato
 */
router.get("/getAll2", (_req, _res, _next) => {
    var page = _req.query.page;
    var pageSize = _req.query.pagesize;

    var limit1 = page * pageSize;
    var limit2 = limit1 + pageSize

    DB.query({
        sql: 'call GetLibri2(?, ?)',
        values: [limit1, limit2]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Ritorna un libro dato un ID
 */
router.get("/getBook/:id", (_req, _res, _next) => {
    DB.query({
        sql: 'call getBook(?)',
        values: [_req.params.id]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Cerca un libro in base al titolo
 */
router.get("/cercaLibro/:libro", (_req, _res, _next) => {
    DB.query({
        sql: 'call cercaLibro(?)',
        values: [_req.params.libro]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * ritorna gli autori di un libro
 */
router.get('/getBookAuthors/:libro', (_req, _res, _next) => {
    DB.query({
        sql: 'call getBookAuthors(?)',
        values: [_req.params.libro]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

/**
 * Associa il libro ad un autore
 */
router.post('/associaAutore', (_req, _res, _next) => {
    DB.query({
        sql: 'call associaAutore(?, ?)',
        values: [_req.body.libro, _req.body.autore]
    }, (_err, _result) => {
        if (_err) {
            return _res.status(500).json(JOut(_err, {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});

module.exports = router;