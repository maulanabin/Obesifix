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

  app.get("/", (req, res) => {
    res.status(200).send({
      status: true,
      message: "Obesifix backend is running",
    });
  });

  app.get("/health", (req, res) => {
    res.status(200).send({
      status: true,
      message: "OK",
    });
  });

  app.use(userRoutes);
  app.use(mlRoutes);

  app.use((req, res) => {
    res.status(404).send({
      status: false,
      message: "Route not found",
    });
  });

  app.use((error, req, res, next) => {
    res.status(400).send({
      status: false,
      message: error.message,
    });
  });

  return app;
}
