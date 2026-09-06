/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { createTaskAction } from "../_actions/task.actions";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

export const ColumnContainer = ({
  column,
  boardId,
}: {
  column: any;
  boardId: string;
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setIsLoading(true);
    try {
      const res = await createTaskAction(column.id, boardId, {
        title: taskTitle,
      });
      if (res.success) {
        toast.success("Task added!");
        setTaskTitle("");
        setIsAddingTask(false);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error("Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-80 flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-md shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-sm text-slate-200 tracking-wide">
            {column.title}
          </h3>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-slate-400">
            {column.tasks?.length || 0}
          </span>
        </div>
      </div>

      {/* Task Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-3 min-h-[150px] rounded-xl p-1 transition-colors ${
              snapshot.isDraggingOver
                ? "bg-indigo-500/5 ring-1 ring-indigo-500/20"
                : ""
            }`}
          >
            {column.tasks?.map((task: any, index: number) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                boardId={boardId}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Task Input/Button */}
      <div className="pt-3 border-t border-slate-800/80 mt-2">
        {isAddingTask ? (
          <form onSubmit={handleAddTask} className="space-y-2">
            <input
              type="text"
              required
              autoFocus
              placeholder="Task title..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  "Add Task"
                )}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="flex w-full items-center gap-2 rounded-xl border border-dashed border-slate-800 py-2.5 px-3 text-xs font-medium text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};
