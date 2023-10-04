import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface BoardCardProps {
  title: string;
  description: string;
  link: string;
}

export const BoardCard = ({ title, description, link }: BoardCardProps) => {
  const truncateString = (inputString: string): string => {
    const maxLength = 132;
    if (inputString.length <= maxLength) {
      return inputString;
    } else {
      return inputString.slice(0, maxLength - 3) + "...";
    }
  };

  const displayDesc = truncateString(description);

  return (
    <Link
      className="flex flex-col bg-secondary w-96 h-56 rounded-lg gap-3 p-5 hover:shadow-xl transition-shadow duration-300 justify-between"
      href={link}
    >
      <div className="flex flex-col gap-3">
        <div className="text-xl">{title}</div>
        <div className="font-light text-gray-500">{displayDesc}</div>
      </div>
      <div className="flex justify-end">
        <ArrowRight className="text-gray-400" size={24} />
      </div>
    </Link>
  );
};
