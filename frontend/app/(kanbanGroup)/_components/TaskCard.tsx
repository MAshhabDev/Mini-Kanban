/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Draggable } from "@hello-pangea/dnd";
import { deleteTaskAction } from "../_actions/task.actions";
import { toast } from "sonner";
import { Trash2, GripVertical, AlertCircle } from "lucide-react";

export const TaskCard = ({ task, index, boardId }: { task: any; index: number; boardId: string }) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await deleteTaskAction(task.id, boardId);
      if (res.success) {
        toast.success("Task deleted");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error("Failed to delete task");
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "HIGH":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "LOW":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`group relative rounded-xl border border-slate-800 bg-slate-900/90 p-4 shadow-md transition-all hover:border-slate-700 ${
            snapshot.isDragging ? "shadow-2xl shadow-indigo-500/20 border-indigo-500 ring-2 ring-indigo-500/30 rotate-1" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <div {...provided.dragHandleProps} className="mt-0.5 cursor-grab text-slate-600 hover:text-slate-400">
                <GripVertical className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-slate-100 leading-snug">{task.title}</h4>
            </div>

            <button onClick={handleDelete} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity cursor-pointer">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {task.description && (
            <p className="mt-2 text-xs text-slate-400 line-clamp-2 pl-6">{task.description}</p>
          )}

          <div className="mt-3 flex items-center justify-between pl-6 pt-2 border-t border-slate-800/60">
            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getPriorityBadge(task.priority)}`}>
              <AlertCircle className="h-3 w-3" />
              {task.priority || "MEDIUM"}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};