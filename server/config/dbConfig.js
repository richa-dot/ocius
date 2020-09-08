let mongoose = require("mongoose");
const dbUri = 'mongodb://localhost:27017/Ocius';

mongoose.connect(dbUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, poolSize: 20 })
    .then(() => console.log("\x1b[1m", '\x1b[32m', 'Database Connection Established!', '\x1b[0m'))
    .catch(error => console.error('\x1b[31m', 'Unable to connect to database', '\x1b[0m'))
