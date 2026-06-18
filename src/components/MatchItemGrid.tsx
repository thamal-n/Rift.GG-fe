import { itemIconUrl } from "../utils/ddragon";
import DdragonIcon from "./DdragonIcon";

type MatchItemGridProps = {
    items: number[];
    roleBoundItem: number;
    ddragonVersion?: string;
};

function MatchItemGrid({
    items,
    roleBoundItem,
    ddragonVersion,
}: MatchItemGridProps) {
    const slots = [
        items[0] ?? 0,
        items[1] ?? 0,
        items[2] ?? 0,
        items[6] ?? 0,
        items[3] ?? 0,
        items[4] ?? 0,
        items[5] ?? 0,
        roleBoundItem,
    ];

    const mainSlots = [slots[0], slots[1], slots[2], slots[4], slots[5], slots[6]];
    const lastColumnSlots = [slots[3], slots[7]];

    function itemSrc(itemId: number) {
        return ddragonVersion ? itemIconUrl(ddragonVersion, itemId) : undefined;
    }

    return (
        <div className="flex shrink-0 items-center gap-1">
            <div className="grid grid-cols-3 grid-rows-2 gap-1">
                {mainSlots.map((itemId, index) => (
                    <DdragonIcon
                        key={`main-${index}-${itemId}`}
                        src={itemSrc(itemId)}
                        className="size-7"
                    />
                ))}
            </div>
            <div className="flex flex-col justify-center gap-1">
                {lastColumnSlots.map((itemId, index) => (
                    <DdragonIcon
                        key={`last-${index}-${itemId}`}
                        src={itemSrc(itemId)}
                        className="size-5"
                    />
                ))}
            </div>
        </div>
    );
}

export default MatchItemGrid;
