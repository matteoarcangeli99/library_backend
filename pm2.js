module.exports = {
    name        : "biblioteca",
    script      : "/opt/biblioteca/server/server.js",
    cwd:         "/opt/biblioteca/www",
    env: {
        "NODE_ENV": "development",
        "IP": "0.0.0.0",
        "PORT": 443,
        "VERSION": "v1",
        "MYSQL_ADDRESS": "progettopawm.ns0.it",
        "MYSQL_DB_NAME": "progettopawm",
        "MYSQL_DB_USER": "utente",
        "MYSQL_DB_PASS": "pincopallino"
    },
    env_production : {
        "NODE_ENV": "development",
        "IP": "0.0.0.0",
        "PORT": 443,
        "VERSION": "v1",
        "MYSQL_ADDRESS": "progettopawm.ns0.it",
        "MYSQL_DB_NAME": "progettopawm",
        "MYSQL_DB_USER": "utente",
        "MYSQL_DB_PASS": "pincopallino"
    },
    error_file: "/opt/biblioteca/logs/errors.log",
    out_file: "/opt/biblioteca/logs/out.log",
    pid_file: "/opt/biblioteca/api.pid"
};
