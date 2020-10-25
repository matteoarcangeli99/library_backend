const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 

  router.post("/userLogin", (_req, _res, _next) => {

    var email = _req.body.email;
    var _password = _req.body.password;

    console.log('login');

    DB.query({
        sql: "SELECT * FROM Utente WHERE email = ?;",
        values: [email]
    }, (err, result) => {
        if (err) { 
            return _res.status(401).json(JOut({
                statusCode: "400",
                message: "Login failed"
            }, {}));
          }

        if (result.length === 0 || (result[0].password !== _password)) { 
            return _res.status(401).json(JOut({
                statusCode: "401",
                message: "Login failed"
            }, {}));
        } else {
			//console.log("Ok");
			console.log(result[0]);
            result[0].jwt = jwt.sign({
                email: result[0].email,
                id: result[0].ID
		   }, "top_secret", { "expiresIn": "24h"});
		   
            // REMOVE FIELD
			delete result[0].password;
			return _res.status(200).json(JOut(result[0], {}));
          /*  menu.getMenu(result[0].gruppo, function(resu) {
                result[0].menu = resu;
                return _res.status(200).json(JOut(result[0], {}));
            });
           */
        }
    });
});

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


router.get("/logout", (_req, _res) => {
    _req.logout();
    _res.status(200).json({});
});


module.exports = router;