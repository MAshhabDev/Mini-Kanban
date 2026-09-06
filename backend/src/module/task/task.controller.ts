import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { taskService } from "./task.service";

// Create Task
const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { columnId } = req.params;
    const { title, description, priority } = req.body;

    const task = await taskService.createTask(columnId as string, userId, {
      title,
      description,
      priority,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Task created successfully",
      data: task,
    });
  },
);

// Update Task Details
const updateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { id: taskId } = req.params;
    const { title, description, priority } = req.body;

    const task = await taskService.updateTask(taskId as string, userId, {
      title,
      description,
      priority,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Task updated successfully",
      data: task,
    });
  },
);

// Move Task (Drag and Drop Endpoint)
const moveTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { id: taskId } = req.params;
    const { targetColumnId, newPosition } = req.body;

    const task = await taskService.moveTask(
      taskId as string,
      userId,
      targetColumnId,
      newPosition,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Task moved successfully",
      data: task,
    });
  },
);

// Delete Task
const deleteTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const { id: taskId } = req.params;

    const result = await taskService.deleteTask(taskId as string, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: result.message,
      data: null,
    });
  },
);

export const taskController = {
  createTask,
  updateTask,
  moveTask,
  deleteTask,
};
