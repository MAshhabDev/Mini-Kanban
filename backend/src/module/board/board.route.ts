import { Router } from "express";
import { boardController } from "./board.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/", auth(), boardController.createBoard);
router.get("/", auth(), boardController.getUserBoards);
router.get("/:id", auth(), boardController.getBoardById);
router.delete("/:id", auth(), boardController.deleteBoard);

export const boardRoute = router;
