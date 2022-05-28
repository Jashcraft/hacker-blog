require('dotenv').config();

const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const SeqeulizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers')
const exphbs = require('express-handlebars');
const path = require('path');



const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
  secret: process.env.SUPER_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SeqeulizeStore({
    db: sequelize
  })
}
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
})

