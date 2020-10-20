const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

router.get("/valoredb/:tabella/:campo/:id", (_req, _res, _next) => {

    if (!_req.params.tabella) {
        return _res.status(406).json(JOut([], {}));
    }

    DB.query({
        sql: `SELECT ${_req.params.campo} FROM ${_req.params.tabella} WHERE ID = ?`,
        values: [_req.params.id]
    }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});


module.exports = router;