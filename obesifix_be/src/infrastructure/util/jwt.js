import jwt from "jsonwebtoken";

export const signJwt = (payload, expiresIn, jwtKey) => {
  const token = jwt.sign({ payload }, jwtKey, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });

  return token;
};

export const verifyJwt = (token, jwtKey) => {
  try {
    const decoded = jwt.verify(token, jwtKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt is expired or not eligible to use",
      decoded: null,
    };
  }
};
