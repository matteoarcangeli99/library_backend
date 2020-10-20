const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const JOut = require("./shared/jout.js");

app.use(require('helmet')());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* */
app.use('/api/common', require('./api/routes/common'));
app.use('/api/libri', require('./api/routes/libri'));
app.use('/api/prenotazioni', require('./api/routes/prenotazioni'));
app.use('/api/upload', require('./api/routes/upload'));
app.use('/api/administratorLogin', require('./api/administratorLogin'));
app.use('/api/download', require('./api/routes/download'));

/* ERRORI */
app.use((_req, _res, _next) => {
    _next({
          statusCode: 404,
          message: 'Resource not found.'
    });
});

app.use((_error, _req, _res, _next) => {
    _res.status(_error.statusCode ? _error.statusCode : 500)
        .json(JOut([], _error ? _error : {
            statusCode: 500,
            message: "Internal server error."
        }));
});

module.exports = app;