const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModels/token.model");

const JwtTokens = () => {
  return {

    // accessToken
    async accessToken(payload) { return await jwt.sign( payload, process.env.ACCESS_TOKEN,

        { expiresIn: process.env.Expiry_Date }
      );
    },

    // refresh token
    async refreshToken(payload) { return await jwt.sign( payload, process.env.REFRESH_TOKEN,

        { expiresIn: process.env.Expiry_Date }
      );
    },

    // verify access token
    async verifyAccessToken(token) {
      return await jwt.verify(token, process.env.ACCESS_TOKEN);
    },

    // verify refresh token
    async verifyRefreshToken() {
      return await jwt.verify(token, secret);
    },

    // save refresh token
    async saveRefreshToken(token) {
      const createToken = new Token({ token });
      await createToken.save();
    },
  };
};

module.exports = JwtTokens;
