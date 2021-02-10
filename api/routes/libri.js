const polka = require("polka");
const route = polka();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

/**
 * Ritorna tutti i libri presenti
 */
route.get("/getAll", (_req, _res, _next) => {
    DB.query({
        sql: 'call getAllLibri()'
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
 * Ritorna un libro dato un ID
 */
route.get("/getBook/:id", (_req, _res, _next) => {
    DB.query({
        sql: 'call getBook(?)',
        values: [_req.params.id]
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
 * Cerca un libro in base al titolo
 */
route.get("/cercaLibro/:titolo", (_req, _res, _next) => {
    DB.query({
        sql: 'call cercaLibro(?)',
        values: [_req.params.titolo]
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
 * ritorna gli autori di un libro
 */
route.get('/getBookAuthors/:libro', (_req, _res, _next) => {
    DB.query({
        sql: 'call getBookAuthors(?)',
        values: [_req.params.libro]
    }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});
module.exports =route;