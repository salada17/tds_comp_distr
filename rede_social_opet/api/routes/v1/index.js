import authRoutes from './auth.js';
import postRoutes from './post.js';
import courseRoutes from './courses.js';

function routes(router) {
  router.get('/', (req, res) => {
    res.send('Hello World!');
  });

  authRoutes(router);
  postRoutes(router);
  courseRoutes(router);

  return router;
}

export default routes;
