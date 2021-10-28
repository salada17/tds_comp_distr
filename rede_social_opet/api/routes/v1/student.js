import { body, validationResult } from 'express-validator';
import { Student } from '../../models/student.js';

function studentRoutes(router) {
  createStudent(router);

  return router;
}

function createStudent(router) {
  router.post(
    '/students',
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('registration_code').isLength({ min: 5 }),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        Student.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          registrationCode: req.body.registration_code,
        }).then((student) => {
          const {
            id, name, email, registrationCode,
          } = student;

          res.status(201).json({
            id,
            name,
            email,
            registration_code: registrationCode,
          });
        });
      } catch (err) {
        console.log('error while creating student:', err);

        res.status(500).json({
          errors: true,
          message: 'unknown error',
        });
      }
    },
  );
}

export { studentRoutes };
