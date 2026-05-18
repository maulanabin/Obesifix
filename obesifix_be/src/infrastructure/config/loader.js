import {} from "dotenv";

export const configLoader = () => {
  const envConfig = {
    GCP_SA_URL: process.env.GCP_SA_URL,
    GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
    GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
    DEFAULT_IMAGE_URL: process.env.DEFAULT_IMAGE_URL,
    JWT_KEY: process.env.JWT_KEY,
    ML_BASE_URL: process.env.ML_BASE_URL,
  };

  return envConfig;
};

export const validateRequiredConfig = (config) => {
  const requiredKeys = ["DEFAULT_IMAGE_URL", "JWT_KEY", "ML_BASE_URL"];
  const missingKeys = requiredKeys.filter((key) => !config[key]);

  if (missingKeys.length > 0) {
    throw new Error(`Missing required environment variables: ${missingKeys.join(", ")}`);
  }
};
