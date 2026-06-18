import type { Match } from "../schemas/SearchSchema";
import {
    championIconUrl,
    runeIconUrl,
    runeStyleIconUrl,
    summonerSpellIconUrl,
} from "../utils/ddragon";
import { laneIconUrl } from "../utils/laneAssets";
import DdragonIcon from "./DdragonIcon";
import MatchItemGrid from "./MatchItemGrid";

type MatchSectionProps = {
    match: Match;
    ddragonVersion?: string;
    summonerSpellMap?: Map<number, string>;
    runeMap?: Map<number, string>;
};

function MatchSection({
    match,
    ddragonVersion,
    summonerSpellMap,
    runeMap,
}: MatchSectionProps) {
    const resultLabel =
        match.result === "win" ? "WIN" : match.result === "loss" ? "LOSS" : "REMAKE";

    const rowClassName =
        match.result === "win"
            ? "border-blue-500/20 bg-blue-950/50"
            : match.result === "loss"
              ? "border-red-500/20 bg-red-950/50"
              : "border-white/5 bg-zinc-800/50";

    const resultClassName =
        match.result === "win"
            ? "text-sm font-semibold text-blue-800"
            : match.result === "loss"
              ? "text-sm font-semibold text-red-400"
              : "text-sm font-semibold text-zinc-400";

    const championIconSrc =
        ddragonVersion && match.championKey
            ? championIconUrl(ddragonVersion, match.championKey)
            : undefined;

    const summonerSpellSrcs = match.summonerSpells.map((spellId) => {
        if (!ddragonVersion || !summonerSpellMap) {
            return undefined;
        }

        const imageFull = summonerSpellMap.get(spellId);
        return imageFull
            ? summonerSpellIconUrl(ddragonVersion, imageFull)
            : undefined;
    });

    const primaryRuneIcon = runeMap?.get(match.primaryRuneId);
    const primaryRuneSrc = primaryRuneIcon
        ? runeIconUrl(primaryRuneIcon)
        : undefined;

    return (
        <li
            className={`flex h-[120px] items-center gap-3 rounded-xl border px-4 ${rowClassName}`}
        >
            <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-0.5">
                <span className={resultClassName}>{resultLabel}</span>
                <span className="text-xs text-zinc-400">{match.gameDuration}</span>
                <span className="text-xs text-zinc-400">{match.gameEndTime}</span>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
                <div className="group relative">
                    {championIconSrc ? (
                        <img
                            src={championIconSrc}
                            alt={match.champion}
                            className="w-[65px] rounded-lg border border-white/10"
                        />
                    ) : (
                        <div className="flex aspect-square w-[65px] items-center justify-center rounded-lg border border-white/10 bg-zinc-900 text-xs font-semibold text-zinc-500">
                            ?
                        </div>
                    )}
                    <img
                        src={laneIconUrl(match.lane)}
                        alt=""
                        aria-hidden="true"
                        className="absolute -bottom-2 -left-2 size-7 rounded-full border-2 border-zinc-900 bg-zinc-900 object-contain p-0.5"
                    />
                    <span className="absolute -top-2 -right-2 flex size-7 min-w-7 items-center justify-center rounded-full border-2 border-zinc-900 bg-zinc-900 text-xs font-bold leading-none text-green-100">
                        {match.championLevel}
                    </span>
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-zinc-900 px-2 py-1 text-xs font-medium text-green-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        {match.champion}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-0.5">
                    <DdragonIcon src={summonerSpellSrcs[0]} className="size-6" />
                    <DdragonIcon src={primaryRuneSrc} className="size-6" />
                    <DdragonIcon src={summonerSpellSrcs[1]} className="size-6" />
                    <DdragonIcon
                        src={runeStyleIconUrl(match.secondaryRuneStyleId)}
                        className="size-6"
                    />
                </div>
            </div>

            <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-0.5">
                <span className="text-sm font-medium text-green-100">{match.kda}</span>
                <span className="text-xs text-zinc-400">{match.kdaDecimal}</span>
                <span className="text-xs text-zinc-400">{match.cs}</span>
                <span className="text-xs text-zinc-400">{match.killParticipation}</span>
            </div>

            <MatchItemGrid
                items={match.items}
                roleBoundItem={match.roleBoundItem}
                ddragonVersion={ddragonVersion}
            />

            <div className="min-w-0 flex-1" />
        </li>
    );
}

export default MatchSection;
