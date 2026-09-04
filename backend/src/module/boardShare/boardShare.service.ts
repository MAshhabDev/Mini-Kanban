import { BoardRole } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const shareBoard = async (
  boardId: string,
  currentUserId: string,
  targetEmail: string,
  role: "COLLABORATOR" | "VIEWER" = "COLLABORATOR",
) => {
  if (!targetEmail) {
    throw new Error("Target user email is required");
  }

  const board = await prisma.board.findUnique({
    where: { id: boardId },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  if (board.ownerId !== currentUserId) {
    throw new Error("Forbidden: Only the board owner can share this board");
  }

  const targetUser = await prisma.user.findUnique({
    where: { email: targetEmail },
  });

  if (!targetUser) {
    throw new Error("User with this email was not found");
  }

  if (targetUser.id === currentUserId) {
    throw new Error("You are already the owner of this board");
  }

  const member = await prisma.boardMember.upsert({
    where: {
      boardId_userId: {
        boardId,
        userId: targetUser.id,
      },
    },
    update: {
      role: role as BoardRole,
    },
    create: {
      boardId,
      userId: targetUser.id,
      role: role as BoardRole,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return member;
};

const removeMember = async (
  boardId: string,
  currentUserId: string,
  memberUserId: string,
) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId },
  });

  if (!board) {
    throw new Error("Board not found");
  }

  const isOwner = board.ownerId === currentUserId;
  const isSelf = currentUserId === memberUserId;

  if (!isOwner && !isSelf) {
    throw new Error(
      "Forbidden: You do not have permission to remove this member",
    );
  }

  if (memberUserId === board.ownerId) {
    throw new Error("Cannot remove the board owner");
  }

  await prisma.boardMember.delete({
    where: {
      boardId_userId: {
        boardId,
        userId: memberUserId,
      },
    },
  });

  return { message: "Member removed from board successfully" };
};

export const boardShareService = {
  shareBoard,
  removeMember,
};
