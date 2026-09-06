import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { authRoute } from "./module/auth/auth.routes";
import { boardRoute } from "./module/board/board.route";
import boardShareRoute from "./module/boardShare/boardShare.route";
import columnRoute from "./module/column/column.routes";
import taskRoute from "./module/task/task.route";
import { autoSeed } from "./utils/seed";

export const app: Application = express();

// Automatically seed Admin & Normal User if not exist
autoSeed();

app.use(cors({ origin: true, credentials: true }));

app.use("/api/subscription/webhook", express.raw({ type: 'application/json' }));

app.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/boards", boardRoute);
app.use("/api/boards", boardShareRoute);
app.use("/api", columnRoute);
app.use("/api", taskRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To The Kanban Server");
});

app.use(globalErrorHandler);
app.use(notFound);