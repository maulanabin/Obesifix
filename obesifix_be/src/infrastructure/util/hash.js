import bcrypt from "bcrypt";

export const encode = async (payload, complexity) => {
  try {
    const result = await bcrypt.hash(payload, complexity);
    return result;
  } catch (error) {
    throw error;
  }
};

export const decode = (password, userPasswordDB) => {
  return bcrypt.compareSync(password, userPasswordDB);
};
