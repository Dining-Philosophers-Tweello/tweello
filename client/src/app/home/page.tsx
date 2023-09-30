import { BoardCard } from "@/components/board-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BoardCardData {
  link: string;
  title: string;
  description: string;
}

const boardsData: BoardCardData[] = [
  {
    link: "/",
    title: "Project A",
    description:
      "Ut enim ad minim veniam, exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    link: "/",
    title: "Project B",
    description:
      "Lorem ipsum dolor sit amet, ut labore et dolore magna aliqua.",
  },
  {
    link: "/",
    title: "Project B",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisci, sed do eiusmod tempor incididunt ut.",
  },
  {
    link: "/",
    title: "Project D",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    link: "/",
    title: "Project E",
    description:
      "Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis nostrud exerci nisi ut aliquip ex ea commodo consequat.",
  },
  {
    link: "/",
    title: "Project F",
    description: "Lorem ipsum dolor sit amet.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5 p-5 w-screen h-screen">
      <div className="flex flex-row gap-5">
        <div className="text-3xl">Workspace 1 Boards</div>
        <Dialog>
          <DialogTrigger>
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Create Board
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new board</DialogTitle>
              <DialogDescription>Create new board</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-5 flex-wrap">
        {boardsData.map((board) => (
          <BoardCard
            key={board.title}
            link={board.link}
            title={board.title}
            description={board.description}
          />
        ))}
      </div>
    </div>
  );
}
