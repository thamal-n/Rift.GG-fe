import type { RecentMatch } from "../schemas/SearchSchema";
import { championIconUrl } from "../utils/ddragon";

type RecentMatchIconsProps = {
    match: RecentMatch;
    ddragonVersion?: string;
};

export function RecentMatchIcons({ match, ddragonVersion }: RecentMatchIconsProps) {
    const championBorderClassName =
        match.result === "win"
            ? "border-2 border-[#3273fa]"
            : match.result === "loss"
              ? "border-2 border-red-500"
              : "border border-white/10";

    const championIconSrc =
        ddragonVersion && match.championKey
            ? championIconUrl(ddragonVersion, match.championKey)
            : undefined;

    const opponentIconSrc =
        ddragonVersion && match.opponentChampionKey
            ? championIconUrl(ddragonVersion, match.opponentChampionKey)
            : undefined;

    return (
        <div className="flex h-14 w-full items-center justify-center">
            <div className="group relative h-12 w-12 shrink-0">
                {championIconSrc ? (
                    <img
                        src={championIconSrc}
                        alt={match.champion}
                        className={`size-12 rounded-sm ${championBorderClassName}`}
                    />
                ) : (
                    <div
                        className={`flex size-12 items-center justify-center rounded-sm bg-zinc-900 text-xs font-semibold text-zinc-500 ${championBorderClassName}`}
                    >
                        ?
                    </div>
                )}
                {opponentIconSrc ? (
                    <img
                        src={opponentIconSrc}
                        alt={match.opponentChampion}
                        title={match.opponentChampion}
                        className="absolute -bottom-1 -right-3 size-7 rounded-sm border border-zinc-900"
                    />
                ) : null}
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-zinc-900 px-2 py-1 text-xs font-medium text-green-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {match.champion}
                    {match.opponentChampion ? ` vs ${match.opponentChampion}` : ""}
                </span>
            </div>
        </div>
    );
}

export function RecentMatchTimestamp({ gameEndTime }: { gameEndTime: string }) {
    return (
        <span className="block min-h-6 w-full px-0.5 text-center text-[12px] leading-tight text-zinc-300">
            {gameEndTime}
        </span>
    );
}
