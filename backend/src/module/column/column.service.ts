import { prisma } from "../../lib/prisma";

const checkBoardPermission = async (boardId: string, userId: string) => {
  const board = await prisma.board.findFirst({
    where: {
      id: boardId,
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

  if (!board) {
    throw new Error("Forbidden: You do not have permission to modify columns in this board");
  }

  return board;
};

const createColumn = async (boardId: string, userId: string, title: string) => {
  if (!title) {
    throw new Error("Column title is required");
  }

  await checkBoardPermission(boardId, userId);

  const lastColumn = await prisma.column.findFirst({
    where: { boardId },
    orderBy: { position: "desc" },
  });

  const newPosition = lastColumn ? lastColumn.position + 1000.0 : 1000.0;

  const column = await prisma.column.create({
    data: {
      boardId,
      title,
      position: newPosition,
    },
  });

  return column;
};

// 2. Update Column (Title or Position)
const updateColumn = async (
  columnId: string,
  userId: string,
  data: { title?: string; position?: number }
) => {
  const existingColumn = await prisma.column.findUnique({
    where: { id: columnId },
  });

  if (!existingColumn) {
    throw new Error("Column not found");
  }

  await checkBoardPermission(existingColumn.boardId, userId);

  const updatedColumn = await prisma.column.update({
    where: { id: columnId },
    data: {
      title: data.title !== undefined ? data.title : existingColumn.title,
      position: data.position !== undefined ? data.position : existingColumn.position,
    },
  });

  return updatedColumn;
};

// 3. Delete Column
const deleteColumn = async (columnId: string, userId: string) => {
  const existingColumn = await prisma.column.findUnique({
    where: { id: columnId },
  });

  if (!existingColumn) {
    throw new Error("Column not found");
  }

  await checkBoardPermission(existingColumn.boardId, userId);

  await prisma.column.delete({
    where: { id: columnId },
  });

  return { message: "Column deleted successfully" };
};

export const columnService = {
  createColumn,
  updateColumn,
  deleteColumn,
};