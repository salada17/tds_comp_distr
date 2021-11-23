import { OAuth2Client } from 'google-auth-library';
import { Student } from '../models/student.js';

const jwtMiddleware = async (req, res, next) => {
  if (['/signin', '/signup', '/auth/google'].indexOf(req.url) != -1 && req.method === 'POST') {
    return next();
  }

  const token = req.headers['x-access-token'];
  
  if (!token) {
    return res.status(403).json({
      errors: true,
      message: 'Forbidden'
    });
  }

  // First verifiy if it is a valid Google token
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const googleClient = new OAuth2Client(clientId);

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: clientId
    });

    const { email } = ticket.getPayload();
    const student = await Student.findOne({ where: { email: email } });
    res.locals.studentId = student.id;
    next();
  } catch (err) {
    console.log('got an error while validating google token', err);
    return res.status(401).json({
      errors: true,
      message: 'Unauthorized'
    });
  }
}

export default jwtMiddleware;
