const express = require("express");
const router = express.Router();
const DB = require("../../db/main");
const JOut = require("../../shared/jout"); // Formatta rispota 
//const verifyToken= require("../check-auth.js")

router.get("/getAll", (_req, _res, _next) => {
    DB.query({
        sql:'call getAllLibri()'
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});


router.get('/getLibri', (req, res) => {  
    jwt.verify(req.header.token, 'top-secret', (err, authData) => {
      if(err) {
        res.sendStatus(403);
        console.log("Non valido")
      } else {/*
        res.json({
          message: 'Post created...',
          authData
        });*/
        DB.query({
            sql:'call getAllLibri()'
            }, (_err, _result) => {
            if (_err) {
                console.log(_err);
                return _res.status(500).json(JOut([], {}));
            } else { return _res.status(200).json(JOut(_result, {})); }
        });
      }
    });
  });

router.get("/getAllKinds", (_req, _res, _next) => {
    DB.query({
        sql:'call getAllKinds()'
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
});

router.post('/addGenere',(_req, _res) => {
    DB.query({
        sql:'call addGenere(?)', values:[_req.body.genere]
        }, (_err, _result) => {
        if (_err) {
            console.log(_err);
            return _res.status(500).json(JOut([], {}));
        } else { return _res.status(200).json(JOut(_result, {})); }
    });
  });

/*
  // Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }*/
module.exports = router;