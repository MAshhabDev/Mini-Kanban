import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { boardService } from "./board.service";

// 1. Create Board
const createBoard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { title, description } = req.body;

    const board = await boardService.createBoard(userId, title, description);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Board created successfully",
      data: board,
    });
  },
);

const getUserBoards = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const boards = await boardService.getUserBoards(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User boards fetched successfully",
      data: boards,
    });
  },
);

const getBoardById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { id } = req.params;

    const board = await boardService.getBoardById(id as string, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Board details fetched successfully",
      data: board,
    });
  },
);

const deleteBoard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { id } = req.params;

    const result = await boardService.deleteBoard(id as string, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result.message,
      data: null,
    });
  },
);

export const boardController = {
  createBoard,
  getUserBoards,
  getBoardById,
  deleteBoard,
};
