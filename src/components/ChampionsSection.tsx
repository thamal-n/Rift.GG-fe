import type { Match } from "../schemas/SearchSchema";

type ChampionsSectionProps = {
    matchHistory?: Match[];
    className?: string;
};

function getChampionStats(matches: Match[]) {
    const stats = new Map<string, { games: number; wins: number }>();

    for (const match of matches) {
        if (match.result === "remake") continue;

        const entry = stats.get(match.champion) ?? { games: 0, wins: 0 };
        entry.games += 1;
        if (match.result === "win") entry.wins += 1;
        stats.set(match.champion, entry);
    }

    return [...stats.entries()]
        .map(([champion, { games, wins }]) => ({
            champion,
            games,
            wins,
            winRate: Math.round((wins / games) * 100),
        }))
        .sort((a, b) => b.games - a.games);
}

function ChampionsSection({ matchHistory, className = "" }: ChampionsSectionProps) {
    const champions = matchHistory ? getChampionStats(matchHistory).slice(0, 2) : [];

    return (
        <section className={`flex h-full flex-col ${className}`}>
            <h2 className="mb-3 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                Recent Summary
            </h2>
            {champions.length > 0 ? (
                <ul className="flex flex-1 flex-col gap-2">
                    {champions.map(({ champion, games, wins, winRate }) => (
                        <li
                            key={champion}
                            className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3"
                        >
                            <div>
                                <p className="font-medium text-green-100">{champion}</p>
                                <p className="text-xs text-zinc-400">
                                    {wins}W {games - wins}L · {games} games
                                </p>
                            </div>
                            <span className="text-sm font-semibold text-green-400">
                                {winRate}% WR
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/5 bg-zinc-950/40 px-5 py-8 text-center text-sm text-zinc-600">
                    No champion data available
                </div>
            )}
        </section>
    );
}

export default ChampionsSection;
