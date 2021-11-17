import express from 'express';
import routes from './routes/v1/index.js';
import cors from 'cors'
import authMiddleware from './middlewares/auth.js';
import * as dotEnvSafe from 'dotenv-safe';
//import * as oauthServer from 'express-oauth-server';
//import model from './oauth2Model.js';

dotEnvSafe.config();

const app = express();
const port = 3001;
const router = express.Router();
router.use(authMiddleware);

//app.oauth = oauthServer({ model });

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes(router));

//app.post('/oauth/token', app.oauth.token());

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
