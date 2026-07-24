import { Dot, Flag, MoreHorizontal } from "lucide-react";
import type { Card } from "../../../../type";
import { useSortable } from "@dnd-kit/react/sortable";
import { format } from "date-fns";
import { Link } from "react-router";

interface CardType {
    card: Card;
    index: number;
    columnId: string;
}

function CardItem({ card, index, columnId }: CardType) {
    const { ref } = useSortable({
        id: card.id,
        index,
        group: columnId,
        type: "card",
        accept: ["card"],
    });

    return (
        <Link
            to={`detail/${card.id}`}
            ref={ref}
            className="rounded-lg p-3 space-y-3 bg-white"
        >
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <p className="py-1 px-2 text-sm rounded-lg bg-blue-600/20 text-blue-600 font-semibold">
                        Database
                    </p>
                    <p className="py-1 px-2 text-sm rounded-lg bg-red-600/20 text-red-600 font-semibold flex">
                        <Dot size={20} />
                        <span>High</span>
                    </p>
                </div>
                <MoreHorizontal />
            </div>
            <p className="text-[20px] font-semibold mt-3">{card.cardName}</p>
            <p className="truncate text-sm">{card.description}</p>
            <div className="h-2 w-full bg-gray-300 rounded-full">
                <div className="h-2 bg-blue-600 w-[20%] rounded-full"></div>
            </div>
            <p className="flex justify-end text-sm">Progress 4/7</p>
            <div className="flex justify-between text-sm">
                <div className="flex gap-2 items-center text-red-600">
                    <Flag size={18} />
                    <p>{format(card.deadlineDate, "PPPP")}</p>
                </div>
                <p>22 Days remaining</p>
            </div>
        </Link>
    );
}

export default CardItem;
