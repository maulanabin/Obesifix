import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export default function createServer(userRoutes, mlRoutes) {
  const app = express();
  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  const corsConfig = {
    credentials: true,
    origin: true,
  };
  app.use(cors(corsConfig));

  app.use(userRoutes);
  app.use(mlRoutes);

  return app;
}
