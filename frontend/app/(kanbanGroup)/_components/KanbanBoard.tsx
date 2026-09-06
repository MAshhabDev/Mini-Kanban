/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { ColumnContainer } from "./ColumnContainer";
import { moveTaskAction, createColumnAction } from "../_actions/task.actions";
import { toast } from "sonner";
import { Plus, Users } from "lucide-react";

const getNewPosition = (tasks: any[], dropIndex: number) => {
  if (tasks.length === 0) return 1000.0;
  if (dropIndex === 0) return tasks[0].position / 2;
  if (dropIndex >= tasks.length)
    return tasks[tasks.length - 1].position + 1000.0;

  const prevPos = tasks[dropIndex - 1].position;
  const nextPos = tasks[dropIndex].position;
  return (prevPos + nextPos) / 2;
};

export const KanbanBoard = ({ board }: { board: any }) => {
  const [columns] = useState(board.columns || []);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const targetCol = columns.find(
      (c: any) => c.id === destination.droppableId,
    );
    const targetTasks = targetCol?.tasks || [];

    const newPosition = getNewPosition(targetTasks, destination.index);

    const res = await moveTaskAction(
      draggableId,
      destination.droppableId,
      newPosition,
      board.id,
    );
    if (!res.success) {
      toast.error("Failed to move task");
    }
  };

  const handleAddColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!columnTitle.trim()) return;

    const res = await createColumnAction(board.id, columnTitle);
    if (res.success) {
      toast.success("Column created!");
      setColumnTitle("");
      setIsAddingColumn(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col space-y-4 p-4 overflow-hidden">
      {/* Board Header Bar */}
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-extrabold text-white">{board.title}</h1>
          {board.description && (
            <p className="text-xs text-slate-400 mt-0.5">{board.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300">
            <Users className="h-3.5 w-3.5 text-indigo-400" />
            <span>{board.members?.length || 1} Members</span>
          </div>
        </div>
      </div>

      {/* Drag & Drop Board Canvas */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1 gap-6 overflow-x-auto pb-4 pt-2 align-top">
          {columns.map((col: any) => (
            <ColumnContainer key={col.id} column={col} boardId={board.id} />
          ))}

          {/* Add Column Button */}
          <div className="w-80 shrink-0">
            {isAddingColumn ? (
              <form
                onSubmit={handleAddColumn}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3"
              >
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Column name..."
                  value={columnTitle}
                  onChange={(e) => setColumnTitle(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingColumn(false)}
                    className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Add Column
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingColumn(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-4 text-sm font-semibold text-slate-400 hover:border-slate-700 hover:text-white transition-all cursor-pointer"
              >
                <Plus className="h-5 w-5" />
                Add Column
              </button>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};
