const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('dotenv').config();
const flash = require('express-flash');
const session = require('express-session');
const FactoryFunctionsRoutes = require('./routes/routes');
const RegNumbersFactory = require('./regNumbersFactory');
const { Pool } = require('pg');

let app = express();

const Client = Pool;

//should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
  console.log('im herreeeeeee');
}

// console.log(local);
// console.log(process.env.DATABASE_URL);
// console.log(process.env);
// which db connection to use
//const connectionString = process.env.DATABASE_URL;
const connectionString =
  'postgres://npupycqfaqevnx:4f73b6bb87fc6da171a1bb5c6717f8ffeb9a0e7b566c89f66906fc666e4e2c78@ec2-54-210-226-209.compute-1.amazonaws.com:5432/d1qh9hmp12n4b0';

const pool = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

let regNumber = RegNumbersFactory(pool);

let routes = FactoryFunctionsRoutes(regNumber);

// parse routerlication in ->/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse routerlication in -> / json
app.use(bodyParser.json());

app.use(
  session({
    cookie: {
      secure: true,
      maxAge: 60000,
    },
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(express.static('public'));
app.engine('hbs', exphbs({ defaultLayout: false }));
app.set('view engine', 'hbs');

app.get('/', routes.home);
app.post('/reg_numbers', routes.addRegNumbers);
app.get('/reg_numbers:town', routes.getRegNumbers);
app.post('/reset', routes.reset);

let PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log('App started on PORT: ', PORT);
});
