import express from "express";

export default function userRoutes(
  userController,
  authController,
  authMiddleware
) {
  const router = express.Router();

  // user auth
  router.post("/register", userController.createUser);
  router.post("/login/authjwt", authController.login);
  router.post("/refresh", authController.refresh);
  router.delete("/logout", authMiddleware.handler, authController.logout);

  // user data
  router.get("/user/:userId", authMiddleware.handler, userController.getUser);
  router.put(
    "/user/:userId",
    authMiddleware.handler,
    userController.updateUser
  );

  return router;
}
