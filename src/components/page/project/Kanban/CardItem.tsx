import { CalendarFold, MoreHorizontal } from "lucide-react";
import type { Card } from "../../../../type";
import { useSortable } from "@dnd-kit/react/sortable";
import { formatDuration, intervalToDuration } from "date-fns";
import { Link } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../../db";
import PriorityTags from "../../utilityComponent/PriorityTags";

interface CardType {
    card: Card;
    index: number;
    columnId: string;
}

function CardItem({ card, index, columnId }: CardType) {
    const { ref, isDragging } = useSortable({
        id: card.id,
        index,
        group: columnId,
        type: "card",
        accept: ["card"],
    });

    const tags = useLiveQuery(() =>
        db.tag.where("id").equals(card.tagId).first(),
    );

    const deadlineDuration = intervalToDuration({
        start: new Date(),
        end: card.deadlineDate,
    });

    if (!tags) return;

    return (
        <Link
            to={`detail/${card.id}`}
            ref={ref}
            className={`rounded-lg p-3 w-62.5 space-y-2 bg-white ${isDragging && "opacity-50"}`}
        >
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <p
                        style={{
                            color: tags.tagColor,
                            backgroundColor: `rgb(from ${tags.tagColor} r g b / 15%)`,
                        }}
                        className="py-1 px-2 text-[12px] rounded-lg font-semibold"
                    >
                        {tags.tagName}
                    </p>
                    <PriorityTags>{card.priority}</PriorityTags>
                </div>
                <MoreHorizontal size={14} />
            </div>
            <p className="text-[14px] font-semibold mt-3">{card.cardName}</p>
            <p className="truncate text-sm text-[12px]">
                {card.description || "No Description"}
            </p>
            <div className="h-2 w-full bg-gray-300 rounded-full">
                <div
                    style={{ backgroundColor: tags.tagColor }}
                    className="h-2 w-[20%] rounded-full"
                ></div>
            </div>
            <p className="flex justify-end text-[12px]">Progress 4/7</p>
            <div className="flex gap-2 items-center text-red-600">
                <CalendarFold size={10} />
                <p className="text-[12px]">{`${formatDuration(deadlineDuration, { format: ["days"] })} remaining`}</p>
            </div>
        </Link>
    );
}

export default CardItem;
