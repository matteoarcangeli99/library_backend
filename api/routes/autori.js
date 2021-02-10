const polka = require("polka");
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

/**
 * Aggiunge un autore nel
 */
polka().post('/addAutore', (_req, _res, _next) => {
    DB.query({
        sql: 'call insertAuthor(?,?,?)',
        values: [_req.body.nome, _req.body.cognome, _req.body.dataNascita]
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
 * Ritorna tutti i libri scritti da un autore
 */
polka().get('/getAuthorBooks/:autore', (_req, _res, _next) => {
    DB.query({
        sql: 'call getAuthorBooks(?)',
        values: [_req.params.autore]
    }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else {
            return _res.status(200).json(JOut(_result, {}));
        }
    });
});