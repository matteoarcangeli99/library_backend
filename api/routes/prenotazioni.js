const polka = require("polka");
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

/**
 * Ritorna tutti i libri prenotati da un utente
 */
polka().get("/libriUtente/:utente", (_req, _res, _next) => {
    DB.query({
        sql: 'call getLibriUtente(?)',
        values: [_req.params.utente]
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
 * Ritorna i libri prenotati da un utente non ripetuti e un capo vettoriale con le date di prenotazione
 */
polka().get("/getBookPrenotations/:utente", (_req, _res, _next) => {
    DB.query({
        sql: 'call getBookPrenotations(?)',
        values: [_req.params.utente]
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
 * Ritorna il numero di libri prenotati da un utente
 */
polka().get("/numberLibriUtente/:utente", (_req, _res, _next) => {
    DB.query({
        sql: 'call getNumberLibriUtente(?)',
        values: [_req.params.utente]
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
 * Aggiunge una prenotazione
 */
polka().post('/addPrenotazione', (_req, _res, _next) => {
    DB.query({
        sql: 'call addPrenotazione(?,?,?)',
        values: [_req.body.utente, _req.body.libro, _req.body.dataPrenotazione]
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
 * Ritorna i libri che deve restiture un utente
 */
polka().get('/daRestituire/:utente', (_req, _res, _next) => {
    DB.query({
        sql: 'call daRestituire(?)',
        values: [_req.params.utente]
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
 * Esegue la restituzione di un libro 
 */
polka().put('/returnBook/:prenotazione', (_req, _res, _next) => {
    DB.query({
        sql: 'call returnBook(?,?)',
        values: [_req.params.prenotazione, _req.body.dataRestituzione]
    }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});