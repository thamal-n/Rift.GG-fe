import { useDdragonVersion } from "../hooks/useDdragonVersion";
import type { RecentMatch } from "../schemas/SearchSchema";
import KdaDisplay from "./KdaDisplay";
import { RecentMatchIcons, RecentMatchTimestamp } from "./RecentMatchColumn";

type RecentSummarySectionProps = {
    recentMatches?: RecentMatch[];
    className?: string;
};

function RecentSummarySection({
    recentMatches,
    className = "",
}: RecentSummarySectionProps) {
    const { data: ddragonVersion } = useDdragonVersion();
    const matches = recentMatches?.slice(0, 10) ?? [];

    return (
        <section className={`flex h-full flex-col ${className}`}>
            <h2 className="mb-3 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                Recent Summary
            </h2>
            {matches.length > 0 ? (
                <div
                    className="grid flex-1 content-center gap-y-1.5 rounded-xl border border-white/5 bg-zinc-950/60 px-2 py-3"
                    style={{
                        gridTemplateColumns: `repeat(${matches.length}, minmax(0, 1fr))`,
                    }}
                >
                    {matches.map((match) => (
                        <div
                            key={`${match.matchId}-icons`}
                            className="flex min-w-0 items-center justify-center"
                        >
                            <RecentMatchIcons
                                match={match}
                                ddragonVersion={ddragonVersion}
                            />
                        </div>
                    ))}
                    {matches.map((match) => (
                        <div
                            key={`${match.matchId}-kda`}
                            className="flex min-w-0 items-center justify-center"
                        >
                            <KdaDisplay
                                kda={match.kda}
                                className="text-sm font-medium text-green-100"
                            />
                        </div>
                    ))}
                    {matches.map((match) => (
                        <div
                            key={`${match.matchId}-time`}
                            className="-mt-1 flex min-w-0 items-start justify-center"
                        >
                            <RecentMatchTimestamp gameEndTime={match.gameEndTime} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/5 bg-zinc-950/40 px-5 py-8 text-center text-sm text-zinc-600">
                    No recent match data available
                </div>
            )}
        </section>
    );
}

export default RecentSummarySection;
