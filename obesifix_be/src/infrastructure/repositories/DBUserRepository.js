import UserRepository from "../../app/interfaces/UserRepository.js";
import prisma from "../database/prismaClient.js";

export default class DBUserRepository extends UserRepository {
  async create(user) {
    return await prisma.user.create({
      data: {
        ...user, // ini bisa dilakukan jika object user atributenya sesuai dengan kolom pada prisma
      },
    });
  }

  async countByEmail(email) {
    return await prisma.user.count({
      where: {
        email: email,
      },
    });
  }

  async getByEmail(email) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }

  async getById(userId) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async update(userId, payload) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: payload,
    });
  }
}
