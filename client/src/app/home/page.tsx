import { BoardCard } from "@/components/board-card";

export default function Home() {
  return (
    <div className="p-5">
      <BoardCard
        link="/"
        title="Application Development"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </div>
  );
}
