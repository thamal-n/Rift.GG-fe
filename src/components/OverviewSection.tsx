import type { Match } from "../schemas/SearchSchema";

type OverviewSectionProps = {
    matchHistory?: Match[];
    className?: string;
};

function OverviewSection({ matchHistory, className = "" }: OverviewSectionProps) {
    const wins = matchHistory?.filter((m) => m.result === "win").length ?? 0;
    const losses = matchHistory?.filter((m) => m.result === "loss").length ?? 0;
    const remakes = matchHistory?.filter((m) => m.result === "remake").length ?? 0;
    const rankedGames = wins + losses;
    const winRate =
        rankedGames > 0 ? Math.round((wins / rankedGames) * 100) : null;

    return (
        <section className={className}>
            <h2 className="mb-3 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                Overview
            </h2>
            {matchHistory && matchHistory.length > 0 ? (
                <div className="flex flex-col gap-2">
                    <div className="rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3">
                        <p className="text-xs text-zinc-400">Win Rate</p>
                        <p className="mt-1 text-lg font-semibold text-green-300">
                            {winRate !== null ? `${winRate}%` : "—"}
                        </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3">
                        <p className="text-xs text-zinc-400">Record</p>
                        <p className="mt-1 text-sm text-zinc-300">
                            {wins}W {losses}L
                            {remakes > 0 && ` · ${remakes}R`}
                        </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3">
                        <p className="text-xs text-zinc-400">Games Shown</p>
                        <p className="mt-1 text-sm text-zinc-300">{matchHistory.length}</p>
                    </div>
                </div>
            ) : (
                <div className="rounded-2xl border border-white/5 bg-zinc-950/40 px-5 py-8 text-center text-sm text-zinc-600">
                    No overview data available
                </div>
            )}
        </section>
    );
}

export default OverviewSection;
