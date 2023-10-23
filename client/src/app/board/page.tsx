import ShareBoardDialog from "@/components/share-board-dialog";

const emails = [
  "diego@gmail.com",
  "jordan@gmail.com",
  "sarah@gmail.com",
  "grant@gmail.com",
  "daniel@gmail.com",
];
export default function Board() {
  return (
    <div className="flex flex-col gap-5 p-5 w-screen h-screen">
      <div className="flex flex-row gap-5">
        <div className="text-3xl">Insert board name here</div>
        <ShareBoardDialog emails={emails} />
      </div>
      <div className="flex gap-5 flex-wrap">Insert Columns Here</div>
    </div>
  );
}
