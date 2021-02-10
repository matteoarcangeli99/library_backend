const polka = require("polka");

const path = require("path");
const fs = require('fs');

/**
 * Scarica l'immagine di copertina dal FS del server
 */
polka().get("/:copertina", (_req, _res, _next) => {

    if (!_req.params.copertina) {
        console.log('Percorso non esistente nella richiesta')
        return _res.status(406).json(JOut([], {}));
    }

    var pathCopertina = path.resolve(__dirname + '/../../uploads/' + _req.params.copertina);

    console.log(pathCopertina);

    if (fs.existsSync(pathCopertina)) {
        _res.sendFile(pathCopertina);
    } else {
        return _res.status(500).json(JOut([], {}));
    }

});