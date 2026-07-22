import { Dot, Flag, MoreHorizontal } from "lucide-react";

function CardItem() {
    return (
        <div className="rounded-lg p-3 space-y-3 bg-white">
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
            <p className="text-[20px] font-semibold mt-3">Card title</p>
            <p className="truncate text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                placeat, dignissimos beatae autem asperiores eligendi facere
                laudantium enim ipsa, non consequuntur aspernatur earum odit
                iusto, fugiat vel eaque. Illo, ab!
            </p>
            <div className="h-2 w-full bg-gray-300 rounded-full">
                <div className="h-2 bg-blue-600 w-[20%] rounded-full"></div>
            </div>
            <p className="flex justify-end text-sm">Progress 4/7</p>
            <div className="flex justify-between text-sm">
                <div className="flex gap-2 items-center text-red-600">
                    <Flag size={18} />
                    <p>12 June 2026</p>
                </div>
                <p>22 Days remaining</p>
            </div>
        </div>
    );
}

export default CardItem;
