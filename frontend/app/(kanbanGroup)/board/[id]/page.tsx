import { notFound } from "next/navigation";
import { KanbanBoard } from "../../_components/KanbanBoard";
import { getSingleBoardAction } from "../../_actions/board.actions";

const BoardDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await getSingleBoardAction(id);

  if (!res.success || !res.data) {
    notFound();
  }

  return <KanbanBoard board={res.data} />;
};

export default BoardDetailsPage;
