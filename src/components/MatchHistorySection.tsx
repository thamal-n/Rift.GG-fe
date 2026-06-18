import type { Match } from "../schemas/SearchSchema";
import { useDdragonVersion } from "../hooks/useDdragonVersion";
import { useRuneMap } from "../hooks/useRuneMap";
import { useSummonerSpellMap } from "../hooks/useSummonerSpellMap";
import MatchSection from "./MatchSection";

type MatchHistorySectionProps = {
    matchHistory?: Match[];
    className?: string;
};

function MatchHistorySection({ matchHistory, className = "" }: MatchHistorySectionProps) {
    const { data: ddragonVersion } = useDdragonVersion();
    const { data: summonerSpellMap } = useSummonerSpellMap(ddragonVersion);
    const { data: runeMap } = useRuneMap(ddragonVersion);

    return (
        <section className={className}>
            <h2 className="mb-3 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                Match History
            </h2>
            {matchHistory && matchHistory.length > 0 ? (
                <ul className="flex flex-col gap-2">
                    {matchHistory.map((match) => (
                        <MatchSection
                            key={match.matchId}
                            match={match}
                            ddragonVersion={ddragonVersion}
                            summonerSpellMap={summonerSpellMap}
                            runeMap={runeMap}
                        />
                    ))}
                </ul>
            ) : (
                <div className="rounded-2xl border border-white/5 bg-zinc-950/40 px-5 py-8 text-center text-sm text-zinc-600">
                    No match history available
                </div>
            )}
        </section>
    );
}

export default MatchHistorySection;
