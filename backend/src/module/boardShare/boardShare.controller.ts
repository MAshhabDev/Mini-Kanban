import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { boardShareService } from "./boardShare.service";

const shareBoard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUserId = req.user?.id as string;
    const { id: boardId } = req.params;
    const { email, role } = req.body;

    const member = await boardShareService.shareBoard(
      boardId as string,
      currentUserId,
      email,
      role,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Board shared successfully",
      data: member,
    });
  },
);

const removeMember = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentUserId = req.user?.id as string;
    const { id: boardId, memberUserId } = req.params;

    const result = await boardShareService.removeMember(
      boardId as string,
      currentUserId,
      memberUserId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result.message,
      data: null,
    });
  },
);

export const boardShareController = {
  shareBoard,
  removeMember,
};
