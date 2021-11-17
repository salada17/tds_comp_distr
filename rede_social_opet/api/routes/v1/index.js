import authRoutes from './auth.js';
import postRoutes from './post.js';

function routes(router) {
  router.get('/', (req, res) => {
    res.send('Hello World!');
  });

  authRoutes(router);
  postRoutes(router);

  return router;
}

export default routes;
