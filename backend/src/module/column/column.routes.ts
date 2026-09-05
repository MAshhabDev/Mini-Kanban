import { Router } from "express";
import { columnController } from "./column.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/boards/:boardId/columns", auth(), columnController.createColumn);
router.patch("/columns/:id", auth(), columnController.updateColumn);
router.delete("/columns/:id", auth(), columnController.deleteColumn);

export default router;