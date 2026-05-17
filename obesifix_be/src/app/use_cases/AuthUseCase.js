import { v4 } from "uuid";
import { decode } from "../../infrastructure/util/hash.js";
import { signJwt, verifyJwt } from "../../infrastructure/util/jwt.js";

import Token from "../../domain/entities/Token.js";

export default class AuthUseCase {
  constructor(userRepository, tokenRepository, configLoader) {
    this.userRepository = userRepository;
    this.tokenRpository = tokenRepository;
    this.configLoader = configLoader;
  }

  async login({ email, password }) {
    const userIsExist = await this.userRepository.countByEmail(email);
    if (!userIsExist) {
      throw new Error("Incorrect email or password");
    }

    const user = await this.userRepository.getByEmail(email);
    const validPassword = decode(password, user.password);

    if (!validPassword) {
      throw new Error("Incorrect email or password");
    }

    const dataToken = {
      user_id: user.id,
      email: user.email,
    };

    // sign jwt
    const accessToken = signJwt(dataToken, "3d", this.configLoader.JWT_KEY);
    const refreshToken = signJwt(dataToken, "10d", this.configLoader.JWT_KEY);

    // pengecekkan data token di db
    const userIsLogin = await this.tokenRpository.countTokenByUserId(user.id);
    if (userIsLogin) {
      await this.tokenRpository.deleteToken(user.id);
    }

    const dataObejctToken = {
      id: v4().toString(),
      refresh_token: refreshToken,
      user_id: user.id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const token = new Token(
      dataObejctToken.id,
      dataToken.user_id,
      dataObejctToken.refresh_token,
      dataObejctToken.created_at,
      dataObejctToken.updated_at
    );

    await this.tokenRpository.store(token);

    return { accessToken, refreshToken, userId: user.id };
  }

  async refresh({ refresh_token }) {
    const dataRefreshToken = verifyJwt(
      refresh_token,
      this.configLoader.JWT_KEY
    );

    if (!dataRefreshToken.valid || dataRefreshToken.expired) {
      throw new Error("Unauthorized");
    }

    const userId = dataRefreshToken.decoded.payload.user_id;
    const email = dataRefreshToken.decoded.payload.email;

    const loggedUser = await this.tokenRpository.countTokenByUserId(userId);

    if (loggedUser !== 1) throw new Error("Unauthorized");

    const dataAccessToken = {
      user_id: userId,
      email,
    };

    const accessToken = signJwt(
      dataAccessToken,
      "3d",
      this.configLoader.JWT_KEY
    );

    return { userId, accessToken };
  }

  async logout(userId) {
    const loggedUser = await this.tokenRpository.countTokenByUserId(userId);
    if (loggedUser !== 1) throw new Error("Unauthorized");

    await this.tokenRpository.deleteToken(userId);
  }
}
