const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const JOut = require("./shared/jout.js");

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


/* CORS */
app.use((_req, _res, _next) => {
    _res.header("Access-Control-Allow-Origin", "*");
    _res.header("Access-Control-Allow-Credentials", "true");
    _res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept, Authorization"
    );

    /* OPTIONS METHOD */
    if (_req.method === "OPTIONS") {
        _res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return _res.status(200).json({});
    }
    _next();
});

/* */
app.use('/api/libri', require('./api/middleware/check-auth'), require('./api/routes/libri'));
app.use('/api/prenotazioni', require('./api/middleware/check-auth'), require('./api/routes/prenotazioni'));
app.use('/api/upload', require('./api/middleware/check-auth'), require('./api/routes/upload'));
app.use('/api/download', require('./api/middleware/check-auth'), require('./api/routes/download'));
app.use('/api/genere', require('./api/middleware/check-auth'), require('./api/routes/genere'));
app.use('/api/autori', require('./api/middleware/check-auth'), require('./api/routes/autori'));
app.use('/api/authentication', require('./api/routes/authentication'));
app.use('/api/grafici', require('./api/middleware/check-auth'), require('./api/routes/grafici'));


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