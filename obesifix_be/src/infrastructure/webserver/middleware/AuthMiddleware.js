import { verifyJwt } from "../../util/jwt.js";

export default class AuthMiddleware {
  constructor(tokenRepository, configLoader) {
    this.tokenRepository = tokenRepository;
    this.configLoader = configLoader;
  }

  handler = async (req, res, next) => {
    try {
      const headerApiToken = req.get("X-API-TOKEN");
      if (!headerApiToken) {
        return res.status(403).send({
          status: false,
          message: "Unauthorized",
        });
      }
      const access_token = headerApiToken.replace(/^Bearer\s/, "");
      const decodedValue = verifyJwt(access_token, this.configLoader.JWT_KEY);
      if (!decodedValue.valid) throw new Error("Invalid token");
      if (decodedValue.expired) throw new Error("Token expired");
      req.user = decodedValue.decoded.payload;
      // mengecek apakah sudah login atau belum
      const countUser = await this.tokenRepository.countTokenByUserId(
        req.user.user_id
      );
      if (countUser !== 1) throw new Error("Unauthorized");
      return next();
    } catch (error) {
      return res.status(403).send({
        status: false,
        message: error.message,
      });
    }
  };
}
