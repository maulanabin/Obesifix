import TokenRepository from "../../app/interfaces/TokenRepository.js";
import prisma from "../database/prismaClient.js";

export default class DBTokenRepository extends TokenRepository {
  async store(token) {
    return await prisma.token.create({
      data: {
        ...token,
      },
    });
  }

  async countTokenByUserId(userId) {
    const user = await prisma.token.count({
      where: {
        user_id: userId,
      },
    });
    return user;
  }

  async deleteToken(userId) {
    return await prisma.token.delete({
      where: {
        user_id: userId,
      },
    });
  }
}
