import type { Match } from "../schemas/SearchSchema";

const LANE_ICON_BASE = "/lanes";

const LANE_ICON_FILES: Record<Match["lane"], string> = {
    TOP: "lane-top.png",
    JUNGLE: "lane-jungle.png",
    MIDDLE: "lane-middle.png",
    BOTTOM: "lane-bottom.png",
    UTILITY: "lane-utility.png",
};

export function laneIconUrl(lane: Match["lane"]): string {
    return `${LANE_ICON_BASE}/${LANE_ICON_FILES[lane]}`;
}
