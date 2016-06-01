import { Router } from 'express';
import findFiles from '../lib/findFiles';
import renderApp from '../lib/renderApp';
import capitalizeFirst from '../src/lib/capitalizeFirst';
import pkg from '../package.json';

const router = Router();

router.get('*', (req, res, next) => {
  const css = [];
  const chunks = [];

  findFiles('dist/**/*.{js,css}')
    .then((files) => {
      files.forEach((file) => {
        if (file.match(/.css$/)) css.push(file);
        if (file.match(/.js$/)) chunks.push(file);
      });

      res.render('index', {
        options: {
          title: capitalizeFirst(pkg.name),
          subtitle: pkg.description,
          descriptionLong: 'Pomodore is a small, simple and – if I may say so – beautiful tomato timer. Just start a new pomodore and work until you hear the bell.',
          url: 'https://pomodore.fransvilhelm.com/',
          fbId: '1528042234158058',
          themeColor: '#000aff',
          appMountId: 'app',
          app: renderApp(),
        },
        files: {
          chunks: chunks.reverse(),
          css,
        },
      });
    })
    .catch((err) => next(err));
});

export default router;
