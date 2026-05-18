import {} from "dotenv/config";

import UserUseCase from "./app/use_cases/UserUseCase.js";
import AuthUseCase from "./app/use_cases/AuthUseCase.js";

import DBUserRepository from "./infrastructure/repositories/DBUserRepository.js";
import DBTokenRepository from "./infrastructure/repositories/DBTokenRepository.js";

import UserController from "./infrastructure/webserver/controllers/UserController.js";
import AuthController from "./infrastructure/webserver/controllers/AuthController.js";

import createServer from "./infrastructure/webserver/server.js";
import {
  configLoader,
  validateRequiredConfig,
} from "./infrastructure/config/loader.js";

import userRoutes from "./infrastructure/webserver/routes/userRoutes.js";
import mlRoutes from "./infrastructure/webserver/routes/mlRoutes.js";
import MLController from "./infrastructure/webserver/controllers/MLController.js";
import MLUseCase from "./app/use_cases/MLUseCase.js";
import AuthMiddleware from "./infrastructure/webserver/middleware/AuthMiddleware.js";

const configload = configLoader();
validateRequiredConfig(configload);

const userRepository = new DBUserRepository();
const tokenRepository = new DBTokenRepository();

const userUseCase = new UserUseCase(userRepository, configload);
const authUseCase = new AuthUseCase(
  userRepository,
  tokenRepository,
  configload
);
const mlUseCase = new MLUseCase(userRepository, configload);

const authMiddleware = new AuthMiddleware(tokenRepository, configload);

const userController = new UserController(userUseCase);
const authController = new AuthController(authUseCase);
const mlController = new MLController(mlUseCase);

const ruserRouter = userRoutes(userController, authController, authMiddleware);
const mlRouter = mlRoutes(mlController, authMiddleware);

const app = createServer(ruserRouter, mlRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));
