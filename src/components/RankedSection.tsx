import type { Rank } from "../schemas/SearchSchema";
import { rankEmblemUrl } from "../utils/rankAssets";

type RankedSectionProps = {
    rank?: Rank;
    className?: string;
};

function RankedSection({ rank, className = "" }: RankedSectionProps) {
    const totalGames = rank ? rank.wins + rank.losses : 0;
    const winRate =
        rank && totalGames > 0 ? Math.round((rank.wins / totalGames) * 100) : null;
    const emblemSrc = rank ? rankEmblemUrl(rank.tier) : undefined;

    return (
        <section className={`flex h-full flex-col ${className}`}>
            <h2 className="mb-3 text-xs font-medium tracking-widest text-zinc-600 uppercase">
                Ranked
            </h2>
            {rank ? (
                <div className="flex flex-1 items-center gap-4 rounded-2xl border border-green-500/15 bg-zinc-950/60 p-5 backdrop-blur-sm">
                    {emblemSrc ? (
                        <img
                            src={emblemSrc}
                            alt=""
                            className="h-24 w-24 shrink-0 object-contain"
                        />
                    ) : (
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-sm font-semibold text-zinc-500">
                            ?
                        </div>
                    )}
                    <div>
                        <p className="text-lg font-semibold text-green-300">
                            {rank.tier} {rank.rank}
                        </p>
                        <p className="mt-1 text-sm text-zinc-500">{rank.lp} LP</p>
                        <p className="mt-2 text-sm text-zinc-400">
                            {rank.wins}W {rank.losses}L
                            {winRate !== null && ` · ${winRate}% WR`}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-white/5 bg-zinc-950/40 px-5 py-8 text-center text-sm text-zinc-600">
                    Rank data unavailable
                </div>
            )}
        </section>
    );
}

export default RankedSection;
