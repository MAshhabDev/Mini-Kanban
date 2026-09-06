import { prisma } from "../../lib/prisma";

const checkTaskPermission = async (columnId: string, userId: string) => {
  const column = await prisma.column.findUnique({
    where: { id: columnId },
    include: { board: true },
  });

  if (!column) {
    throw new Error("Column not found");
  }

  const hasAccess = await prisma.board.findFirst({
    where: {
      id: column.boardId,
      OR: [
        { ownerId: userId },
        {
          members: {
            some: {
              userId,
              role: { in: ["OWNER", "COLLABORATOR"] },
            },
          },
        },
      ],
    },
  });

  if (!hasAccess) {
    throw new Error(
      "Forbidden: You do not have permission to modify tasks in this board",
    );
  }

  return { column, board: column.board };
};

const createTask = async (
  columnId: string,
  userId: string,
  data: {
    title: string;
    description?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  },
) => {
  if (!data.title) {
    throw new Error("Task title is required");
  }

  await checkTaskPermission(columnId, userId);

  // Find last task position in this column
  const lastTask = await prisma.task.findFirst({
    where: { columnId },
    orderBy: { position: "desc" },
  });

  const newPosition = lastTask ? lastTask.position + 1000.0 : 1000.0;

  const task = await prisma.task.create({
    data: {
      columnId,
      title: data.title,
      description: data.description,
      priority: data.priority || "MEDIUM",
      position: newPosition,
    },
  });

  return task;
};

const updateTask = async (
  taskId: string,
  userId: string,
  data: {
    title?: string;
    description?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  },
) => {
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await checkTaskPermission(existingTask.columnId, userId);

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: data.title !== undefined ? data.title : existingTask.title,
      description:
        data.description !== undefined
          ? data.description
          : existingTask.description,
      priority:
        data.priority !== undefined ? data.priority : existingTask.priority,
    },
  });

  return updatedTask;
};

const moveTask = async (
  taskId: string,
  userId: string,
  targetColumnId: string,
  newPosition: number,
) => {
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await checkTaskPermission(existingTask.columnId, userId);

  if (existingTask.columnId !== targetColumnId) {
    await checkTaskPermission(targetColumnId, userId);
  }

  // Update Task Column and Position in 1 single Query
  const movedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      columnId: targetColumnId,
      position: newPosition,
    },
  });

  return movedTask;
};

const deleteTask = async (taskId: string, userId: string) => {
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await checkTaskPermission(existingTask.columnId, userId);

  await prisma.task.delete({
    where: { id: taskId },
  });

  return { message: "Task deleted successfully" };
};

export const taskService = {
  createTask,
  updateTask,
  moveTask,
  deleteTask,
};
