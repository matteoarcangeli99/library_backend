const express = require("express");
const router = express.Router();
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const DB = require("../db/main");
const JOut = require("../shared/jout");


router.post("/login", (_req, _res, _next) => {

    var _username = _req.body.username;
    var _password = _req.body.password;

    console.log('login');

    DB.query({
        sql: "SELECT * FROM `users` Ammministratore username = ?;",
        values: [_username]
    }, (err, result) => {
        if (err) { 
            return _res.status(401).json(JOut({
                statusCode: "400",
                message: "Login failed"
            }, {}));
          }

        if (result.length === 0 || (result[0].password !== md5(_password))) { 
            return _res.status(401).json(JOut({
                statusCode: "401",
                message: "Login failed"
            }, {}));
        } else {
            result[0].jwt = jwt.sign({
                username: result[0].username,
                gruppo: result[0].gruppo
            }, "top_secret", { "expiresIn": "1h"});
            // REMOVE FIELD
            delete result[0].password;
            menu.getMenu(result[0].gruppo, function(resu) {
                result[0].menu = resu;
                return _res.status(200).json(JOut(result[0], {}));
            });
           
        }

    });

});
    
router.get("/logout", (_req, _res) => {

    _req.logout();
    _res.status(200).json({});
});



module.exports = router;