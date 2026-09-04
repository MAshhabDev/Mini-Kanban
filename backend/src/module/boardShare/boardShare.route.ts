import { Router } from "express";
import { boardShareController } from "./boardShare.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/:id/share", auth(), boardShareController.shareBoard);
router.delete("/:id/members/:memberUserId", auth(), boardShareController.removeMember);

export default router;