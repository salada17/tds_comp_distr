import { body, validationResult } from 'express-validator';
import { Post } from '../../models/post.js';

function postRoutes(router) {
  createPost(router);
}

function createPost(router) {
  router.post(
    '/posts',
    body('content').isLength({ min: 3 }),
    body('course_id').isInt(),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        Post.create({
          content: req.body.content,
          studentId: res.locals.studentId,
          courseId: req.body.course_id,
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

export default postRoutes;
