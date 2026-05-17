import {} from "dotenv";

export const configLoader = () => {
  const envConfig = {
    GCP_SA_URL: process.env.JWT_KEY,
    GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
    GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
    DEFAULT_IMAGE_URL: process.env.DEFAULT_IMAGE_URL,
    JWT_KEY: process.env.JWT_KEY,
    ML_BASE_URL: process.env.ML_BASE_URL,
  };

  return envConfig;
};
