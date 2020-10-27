const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 
const jwt = require("jsonwebtoken");

/**
 * Esegue il login di un utente
 */
  router.post("/userLogin", (_req, _res, _next) => {
    DB.query({
        sql: "call userLogin(?,?)",
        values: [_req.body.email, _req.body.password]
    }, (err, result) => {
        if (err) { 
            return _res.status(401).json(JOut({
                statusCode: "400",
                message: "Login failed"
            }, {}));
          }  
        if (result[0].length === 0) { 
            return _res.status(401).json(JOut({
                statusCode: "401",
                message: "Login failed"
            }, {}));
        } else {
            result[0].jwt = jwt.sign({
                email: result[0].email,
                id: result[0].ID
		   }, "top_secret", { "expiresIn": "24h"});
		   
            // REMOVE FIELD
            delete result[0].password;
			return _res.status(200).json(JOut(result[0], {}));
        }
    });
});

/**
 * Inserisce un' utente
 */
router.post("/addUser", (_req, _res, _next) => {
    DB.query({
        sql: " call addUser(?, ?, ?, ?)", values: [_req.body.nome, _req.body.cognome, _req.body.email, _req.body.password]
    }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(201).json(JOut([], {})); }
    });
});

/**
 * Esegue il logout
 */
router.get("/logout", (_req, _res) => {
    _req.logout();
    _res.status(200).json({});
});


module.exports = router;