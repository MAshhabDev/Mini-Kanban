import { prisma } from "../../lib/prisma";

const createBoard = async (userId: string, title: string, description?: string) => {
  if (!title) {
    throw new Error("Board title is required");
  }

  const board = await prisma.board.create({
    data: {
      title,
      description,
      ownerId: userId,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
      columns: {
        create: [
          { title: "To Do", position: 1000.0 },
          { title: "In Progress", position: 2000.0 },
          { title: "Done", position: 3000.0 },
        ],
      },
    },
    include: {
      columns: true,
      members: true,
    },
  });

  return board;
};

const getUserBoards = async (userId: string) => {
  const boards = await prisma.board.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } },
      ],
    },
    include: {
      owner: {
        select: { id: true, name: true, email: true },
      },
      _count: {
        select: { columns: true, members: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return boards;
};

const getBoardById = async (boardId: string, userId: string) => {


  const hasAccess = await prisma.board.findFirst({
    where: {
      id: boardId,
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } },
      ],
    },
  });

  if (!hasAccess) {
    throw new Error("Access denied: You do not have permission to view this board");
  }

  const board = await prisma.board.findUnique({
    where: { id: boardId },
    include: {
      owner: {
        select: { id: true, name: true, email: true },
      },
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      },
      columns: {
        orderBy: { position: "asc" },
        include: {
          tasks: {
            orderBy: { position: "asc" },
          },
        },
      },
    },
  });

  return board;
};

const deleteBoard = async (boardId: string, userId: string) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  if (board.ownerId !== userId) {
    throw new Error("Forbidden: Only the board owner can delete this board");
  }

  await prisma.board.delete({
    where: { id: boardId },
  });

  return { message: "Board deleted successfully" };
};

export const boardService = {
  createBoard,
  getUserBoards,
  getBoardById,
  deleteBoard,
};