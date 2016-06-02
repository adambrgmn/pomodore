import { Router } from 'express';
import findFiles from '../lib/findFiles';
import renderApp from '../lib/renderApp';
import capitalizeFirst from '../src/lib/capitalizeFirst';
import pkg from '../package.json';
import fs from 'fs';
import { resolve } from 'path';

const router = new Router();

router.get('*', (req, res, next) => {
  findFiles('dist/**/*.{js,css}')
    .then((files) => {
      files.manifest = fs.readFileSync(resolve(__dirname, '..', 'dist', files.manifest), 'utf8');

      res.render('index', {
        options: {
          title: capitalizeFirst(pkg.name),
          subtitle: pkg.description,
          descriptionLong: 'Pomodore is a small, simple and – if I may say so – beautiful tomato timer. Just start a new pomodore and work until you hear the bell.',
          url: 'http://pomodore.fransvilhelm.com/',
          fbId: '1528042234158058',
          gaId: 'UA-71140948-1',
          themeColor: '#000aff',
          appMountId: 'app',
          app: renderApp(),
        },
        files,
      });
    })
    .catch((err) => next(err));
});

export default router;
