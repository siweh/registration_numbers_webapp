const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
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
}
// which db connection to use
const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://sibu:pg1234@localhost:5432/registration_numbers_db';

const pool = new Client({
  connectionString,
  ssl: useSSL,
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
