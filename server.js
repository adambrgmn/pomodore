const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const config = require('./config');
const routes = require('./routes/index');

const devMode = config.env === 'development';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { colorize: true });
winston.level = process.env.LOG_LEVEL || 'silly';

const app = express();
winston.log('silly', 'Instantiated Express app');

app.set('views', path.join(config.root, 'views'));
app.set('view engine', 'jade');
app.set('appPath', path.join(config.root, 'dist'));
app.set('publicPath', path.join(config.root, 'public'));
winston.log('silly', 'Set views, view engine, appPath, publicPath');

if (devMode) {
  app.use(compression());
  app.use(helmet());
}

app.use(favicon(path.join(app.get('publicPath'), 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (devMode) {
  app.use(express.static(app.get('appPath')));
  app.use(express.static(app.get('publicPath')));
}

winston.log('silly', `Middleware setup in ${config.env} mode`);

routes(app);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;

  winston.log('error', '404 Not found middleware', err);
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });

    winston.log('error', 'Development Errorhandler', err);
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });

  winston.log('error', 'Production Errorhandler', err);
});

module.exports = app;
