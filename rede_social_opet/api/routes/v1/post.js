import { body, validationResult } from 'express-validator';
import { Post } from '../../models/post.js';

function postRoutes(router) {
  createPost(router);
  updatePost(router);
  getAllPosts(router);
  getPostById(router);

  return router;
}

function getPostById(router) {
  router.get('/posts/:postId', async (req, res) => {
    const post = await Post.findByPk(req.params.postId)
    return res.json({ post });
  });
}

function createPost(router) {
  router.post(
    '/posts',
    body('content').isLength({ min: 3 }),
    body('title').isLength({ min: 3 }),
    body('url').isLength({ min: 5 }),
    body('course_id').isInt(),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        Post.create({
          title: req.body.title,
          content: req.body.content,
          url: req.body.url,
          studentId: res.locals.studentId,
          courseId: req.body.course_id
        }).then(post => {
          const { id, studentId, courseId } = post;
          
          res.status(201).json({
            id,
            student_id: studentId,
            course_id: courseId
          })
        });
      } catch (err) {
        console.log('error while creating post:', err);

        res.status(500).json({
          errors: true,
          message: 'unknown error',
        });
      }
    },
  );
}

function updatePost(router) {
  router.put(
    '/posts/:postId',
    body('content').isLength({ min: 3 }),
    body('title').isLength({ min: 3 }),
    body('url').isLength({ min: 5 }),
    body('course_id').isInt(),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        Post.update({
          title: req.body.title,
          content: req.body.content,
          url: req.body.url,
          studentId: res.locals.studentId,
          courseId: req.body.course_id
        }, { where: { id: req.params.postId}}).then(_ => {
          res.status(200).json({
            updated: true
          })
        });
      } catch (err) {
        console.log('error while creating post:', err);

        res.status(500).json({
          errors: true,
          message: 'unknown error',
        });
      }
    },
  );
}

function getAllPosts(router) {
  router.get('/posts', async (req, res) => {
    const posts = await Post.findAll();
    
    return res.json({ posts });
  });
}

export default postRoutes;
