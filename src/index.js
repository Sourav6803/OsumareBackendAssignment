const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const route = require('./route/router.js');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', route);








app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

// export {addUser} = addUser
