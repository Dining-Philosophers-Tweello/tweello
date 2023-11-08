import { ArrowRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";

interface WorkspaceBoardCardProps {
  title: string;
  description?: string;
  link: string;
  updatedAt: string;
  createdAt: string;
}

export const WorkspaceBoardCard = ({
  title,
  description,
  link,
  updatedAt,
  createdAt,
}: WorkspaceBoardCardProps) => {
  const truncateString = (inputString: string): string => {
    const maxLength = 132;
    if (inputString.length <= maxLength) {
      return inputString;
    } else {
      return inputString.slice(0, maxLength - 3) + "...";
    }
  };

  const displayDesc = truncateString(description || "");

  const updatedAtDate = moment(updatedAt || null);
  const createdAtDate = moment(createdAt || null);

  return (
    <Link
      className="flex flex-col bg-secondary w-96 h-fit rounded-lg gap-3 p-5 hover:shadow-xl transition-shadow duration-300 justify-between"
      href={link}
    >
      <div className="flex flex-col gap-3">
        <div className="text-xl">{title}</div>
        <div className="font-light text-gray-500">{displayDesc}</div>
        <div className="flex flex-row items-end justify-between">
          <div>
            {updatedAtDate && createdAtDate && (
              <div className="font-light text-sm text-gray-500">
                <div>Last updated {updatedAtDate.fromNow()} </div>
                <div>Created {createdAtDate.fromNow()} </div>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <ArrowRight className="text-gray-400" size={24} />
          </div>
        </div>
      </div>
    </Link>
  );
};
