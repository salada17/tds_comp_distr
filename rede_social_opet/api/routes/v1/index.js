import { studentRoutes } from './student.js';
import { postRoutes } from './post.js';

function routes(router) {
  router.get('/', (req, res) => {
    res.send('Hello World!');
  });

  studentRoutes(router);
  postRoutes(router);

  return router;
}

export { routes };
