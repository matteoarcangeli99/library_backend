module.exports = {
    name        : "biblioteca",
    script      : "/opt/biblioteca/server/server.js",
    cwd:         "/opt/biblioteca/www",
    env: {
        "PORT": 8090,
      // REMOVE  "VERSION": "v1",
        "MYSQL_ADDRESS": process.env.MYSQL_ADDRESS,
        "MYSQL_DB_NAME": process.env.MYSQL_DB_NAME,
        "MYSQL_DB_USER": process.env.MYSQL_DB_USER,
        "MYSQL_DB_PASS": process.env.MYSQL_DB_PASS
    },
    error_file: "/opt/biblioteca/logs/errors.log",
    out_file: "/opt/biblioteca/logs/out.log",
    pid_file: "/opt/biblioteca/api.pid"
};
