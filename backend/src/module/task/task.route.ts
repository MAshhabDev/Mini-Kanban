import { Router } from "express";
import { taskController } from "./task.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/columns/:columnId/tasks", auth(), taskController.createTask);
router.patch("/tasks/:id", auth(), taskController.updateTask);
router.patch("/tasks/:id/move", auth(), taskController.moveTask); // Drag and drop route
router.delete("/tasks/:id", auth(), taskController.deleteTask);

export default router;