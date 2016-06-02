# Pomodore
## v3.1.1

A small but beautiful tomato-timer built with React and others.

Feel free to copy and steal as much as you like. Or tell me if you think I can improve something, cause i do believe thats possible.

## To run development and build:
npm run start to run the node development server with webpack hmr enabled

"preview": "export NODE_ENV=production && npm run build && node server",
"build": "export NODE_ENV=production && rimraf dist && webpack --progress --profile --colors",
"build:stats": "webpack --profile --json > stats.json",
"test": "mocha --compilers js:babel-core/register --require ./test/setup.js --require ignore-styles 'app/**/*.spec.@(js|jsx)'",
"test:watch": "npm run test -- --watch --watch-extensions jsx",

TODO: Update deployment method
