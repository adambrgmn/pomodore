import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import winston from 'winston';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import { join } from 'path';

import config from './config';
import routes from './routes/index';

winston.level = config.logLevel;

const app = express();
winston.log('silly', 'App initiated');

app.set('views', join(config.root, 'views'));
app.set('view engine', 'jade');
app.set('appPath', join(config.root, 'dist'));
app.set('publicPath', join(config.root, 'public'));

app.use(compression());
app.use(helmet());
app.use(favicon(join(app.get('publicPath'), 'icons', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(app.get('appPath')));
app.use(express.static(app.get('publicPath')));

routes(app);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

export default app;
