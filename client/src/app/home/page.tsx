import { BoardCard } from "@/components/board-card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5">
      <Link href="/">
        <BoardCard
          title="Application Development"
          description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </Link>
    </div>
  );
}
