/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { LayoutGrid, Users, ArrowRight } from "lucide-react";
import { CreateBoardModal } from "../_components/CreateModal";
import { getBoardsAction } from "../_actions/board.actions";

const DashboardPage = async () => {
  const res = await getBoardsAction();
  const boards = res.success ? res.data : [];

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Your Boards
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your project workflows and team boards
          </p>
        </div>
        <CreateBoardModal />
      </div>

      {/* Board Grid */}
      {boards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 p-12 text-center bg-slate-900/50 space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
            <LayoutGrid className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No boards found</h3>
            <p className="text-sm text-slate-400">
              Get started by creating your first Kanban board.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board: any) => (
            <Link
              key={board.id}
              href={`/board/${board.id}`}
              className="group relative flex flex-col justify-between rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-md transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {board.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {board.description || "No description provided"}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 mt-6 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <LayoutGrid className="h-3.5 w-3.5 text-slate-500" />
                    {board._count?.columns || 0} Columns
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-slate-500" />
                    {board._count?.members || 1} Members
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
