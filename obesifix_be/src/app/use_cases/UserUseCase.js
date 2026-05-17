import User from "../../domain/entities/User.js";
import { v4 } from "uuid";
import { encode } from "../../infrastructure/util/hash.js";

export default class UserUseCase {
  constructor(userRepository, configLoader) {
    this.userRepository = userRepository;
    this.configLoader = configLoader;
  }

  async create({
    name,
    email,
    password,
    age,
    gender,
    height,
    weight,
    activity,
    food_type,
    picture,
  }) {
    const userIsExist = await this.userRepository.countByEmail(email);
    if (userIsExist) {
      throw new Error("Email already exists");
    }

    let userPic = picture;
    if (userPic === null) {
      userPic = this.configLoader.DEFAULT_IMAGE_URL;
    }

    const userData = {
      id: v4().toString(),
      name,
      email,
      password: await encode(password, 10),
      age,
      gender,
      height,
      weight,
      activity,
      picture: userPic,
      food_type,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // create new user
    // argumen urutannya harus sesuai dengan parameter di constructor
    const user = new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password,
      userData.age,
      userData.gender,
      userData.height,
      userData.weight,
      userData.activity,
      userData.picture,
      userData.food_type,
      userData.created_at,
      userData.updated_at
    );

    return this.userRepository.create(user);
  }

  async getUser(userId) {
    const user = this.userRepository.getById(userId);
    if (!user) throw new Error("User not found");

    return user;
  }

  async update(userId, payload) {
    await this.userRepository.update(userId, payload);
  }
}
