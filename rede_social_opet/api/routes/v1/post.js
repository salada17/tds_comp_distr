import { body, validationResult } from 'express-validator';
import { Course } from '../../models/course.js';
import { Post } from '../../models/post.js';
import { Student } from '../../models/student.js';

function postRoutes(router) {
  createPost(router);
}

function createPost(router) {
  router.post(
    '/posts',
    body('content').isLength({ min: 3 }),
    body('student_id').isInt(),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let courseId = req.body.course_id;

      if (!courseId) {
        // Resolve course by the current student_id
        const course = Course.findOne({
          where: { studentId: req.body.student_id },
          include: [
            {
              model: Student,
              as: 'students',
            },
          ],
        });

        courseId = course.id;
      }

      try {
        Post.create({
          content: req.body.content,
          studentId: req.body.student_id,
          courseId,
        }).then((post) => res.status(201).json(post));
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

export { postRoutes };
