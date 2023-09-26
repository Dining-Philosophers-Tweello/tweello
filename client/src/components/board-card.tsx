import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface BoardCardProps {
  title: string;
  description: string;
  link: string;
}

export const BoardCard = ({ title, description, link }: BoardCardProps) => {
  return (
    <Link href={link}>
      <div className="group flex flex-col bg-sky-100 w-96 h-fit-content rounded-lg gap-3 p-5 hover:shadow-xl transition-shadow duration-300">
        <div className="text-xl">{title}</div>
        <div className="font-light text-gray-500">{description}</div>
        <div className="flex justify-end">
          <ArrowRight className="text-gray-400" size={24} />
        </div>
      </div>
    </Link>
  );
};
