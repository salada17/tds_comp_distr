import { body, validationResult } from 'express-validator';
import { Student } from '../../models/student.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import cryptoRandomString from 'crypto-random-string';

function authRoutes(router) {
  signup(router);
  signin(router);
  googleSignin(router);

  return router;
}

function signup(router) {
  router.post(
    '/signup',
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    body('registration_code').isLength({ min: 3 }),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      Student.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        registrationCode: req.body.registration_code,
      }).then(student => {
        const {
          id, name, email, registrationCode,
        } = student;

        // Student/user is correctly created, so lets also create a token.
        const token = jwt.sign({ id: student.id }, process.env.SECRET, { expiresIn: 3600 })

        res.status(201).json({
          id,
          name,
          email,
          registration_code: registrationCode,
          token
        });
      }).catch(err => {
        console.log('error while creating student:', err);

        res.status(500).json({
          errors: true,
          message: 'unknown error',
        });
      });
    },
  );
}

function signin(router) {
  router.post(
    '/signin',
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    (req, res) => {
      Student.findOne({ where: { email: req.body.email } }).then(async student => {
        if (!student || !await student.validPassword(req.body.password)) {
          res.status(401).json({
            errors: true,
            message: 'Invalid credentials'
          })
        }

        // token expires in 1 hour.
        const token = jwt.sign({ id: student.id }, process.env.SECRET, { expiresIn: 3600 })

        res.status(200).json({
          success: true,
          token
        })
      })
    }
  )
}

function googleSignin(router) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(clientId);
  
  router.post('/auth/google', async (req, res) => {
    try {
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId
      });
  
      const { name, email } = ticket.getPayload();
  
      Student.upsert({
        name,
        email,
        password: cryptoRandomString({length: 20, type: 'alphanumeric'}),
        registrationCode: cryptoRandomString({length: 10})
      }).then(student => {
        const {
          id, name, email, registrationCode,
        } = student;
  
        return res.status(200).json({
          id,
          name,
          email,
          registration_code: registrationCode,
          token
        });
      }).catch(err => res.status(500).json({}));
    } catch (err) {
      console.log('error while validating auth with google', err);

      return res.status(500).json({errors: true, message: 'An unknown error happened'});
    }
  });
}

export default authRoutes;
