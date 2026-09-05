import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { columnService } from "./column.service";

// Create Column
const createColumn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { boardId } = req.params;
    const { title } = req.body;

    const column = await columnService.createColumn(
      boardId as string,
      userId,
      title,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Column created successfully",
      data: column,
    });
  },
);

// Update Column
const updateColumn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { id: columnId } = req.params;
    const { title, position } = req.body;

    const column = await columnService.updateColumn(
      columnId as string,
      userId,
      {
        title,
        position,
      },
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Column updated successfully",
      data: column,
    });
  },
);

// Delete Column
const deleteColumn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { id: columnId } = req.params;

    const result = await columnService.deleteColumn(columnId as string, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result.message,
      data: null,
    });
  },
);

export const columnController = {
  createColumn,
  updateColumn,
  deleteColumn,
};
