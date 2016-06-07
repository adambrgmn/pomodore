const debug = require('debug')('pomodore');

const app = require('../server');
const http = require('http');
const winston = require('winston');

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
winston.log('silly', 'Port set', app.get('port'));

const server = http.createServer(app);
server.listen(port);
winston.log('silly', 'Server created');

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    winston.log('error', 'An error occured', error);
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      winston.log('error', `${bind} requires elevated privileges. Exiting...`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winston.log('error', `${bind} is already in use. Exiting...`);
      process.exit(1);
      break;
    default:
      winston.log('error', 'An error occured', error);
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  winston.log('info', `Server created and listening to port ${port} in ${app.get('env')} mode`);
  debug(`Listening on ${bind}`);
});
