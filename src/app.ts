import express, { json, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import appRoutes from "./api/routes";

const app = express();

app.set("port", process.env.PORT || 3001);

/* Middlewares */
app.use(json());
app.use(morgan("dev"));

/* v1 */
app.use("/", appRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export { app };
