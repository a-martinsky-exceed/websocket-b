require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

let db_url = 'mongodb://127.0.0.1:27017/jwt-test';
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
const port = 3001;
const login = require('./routes/login.route')
app.use(cors({exposedHeaders: 'x-test-app-jwt-token'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', login)

app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});
