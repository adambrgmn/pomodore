import { Router } from 'express';
import findFiles from '../lib/findFiles';
import renderApp from '../lib/renderApp';

const router = Router();

router.get('*', (req, res, next) => {
  const css = [];
  const chunks = [];
  console.log(renderApp());

  findFiles('dist/*.{js,css}')
    .then((files) => {
      files.forEach((file) => {
        if (file.match(/.css$/)) css.push(file);
        if (file.match(/.js$/)) chunks.push(file);
      });

      res.render('index', {
        options: {
          title: 'Pomodore',
          subtitle: 'A small and beatuiful pomodore timer',
          appMountId: 'app',
          app: '',
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
