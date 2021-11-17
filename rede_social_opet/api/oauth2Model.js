import { OAuthToken } from './models/oauthToken.js';
import { OAuthClient } from './models/oauthClient.js';
import { Student } from './models/student.js';

const model = {
  getAccessToken: async bearerToken => {
    const token = await OAuthToken.findOne({
      where: {
        accessToken: bearerToken
      }
    })

    return {
      accessToken: token.accessToken,
      client: {id: token.clientId},
      expires: token.refreshTokenExpiresOn,
      student: {id: token.studentId},
    };
  },

  getClient: async (clientId, clientSecret) => {
    const oAuthClient = await OAuthClient.findOne({
      where: {
        clientId: clientId,
        clientSecret: clientSecret
      }
    })

    if (!oAuthClient) {
      return;
    }

    return {
      clientId: oAuthClient.clientId,
      clientSecret: oAuthClient.clientSecret,
      grants: ['password'], // the list of OAuth2 grant types that should be allowed
    };
  },

  getRefreshToken: async bearerToken => {
    const token = await OAuthToken.findOne({
      where: {
        refreshToken: bearerToken
      }
    });

    return token;
  },

  getUser: async (email, password) => {
    const student = await Student.findOne({
      where: {
        email: email,
        password: password
      }
    });

    return student;
  },

  saveAccessToken: (token, client, user) => {
    OAuthToken.create({
      accessToken: token.accessToken,
      accessTokenExpiresOn: token.accessTokenExpiresOn,
      clientId: client.id,
      refreshToken: token.refreshToken,
      refreshTokenExpiresOn: token.refreshTokenExpiresOn,
      studentId: user.id
    });
  }
};

export default { model };
