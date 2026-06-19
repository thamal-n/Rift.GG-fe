import { useDdragonVersion } from "../hooks/useDdragonVersion";
import { profileIconUrl } from "../utils/ddragon";

type ProfileSectionProps = {
    gameName: string;
    tagLine: string;
    profileIconId?: number;
    summonerLevel?: number;
    onRefresh?: () => void;
    isRefreshing?: boolean;
};

function ProfileSection({
    gameName,
    tagLine,
    profileIconId,
    summonerLevel,
    onRefresh,
    isRefreshing,
}: ProfileSectionProps) {
    const { data: ddragonVersion } = useDdragonVersion();

    const profileIconSrc =
        ddragonVersion && profileIconId
            ? profileIconUrl(ddragonVersion, profileIconId)
            : undefined;

    return (
        <section className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-linear-to-br from-zinc-950/90 via-zinc-950/70 to-green-950/30 p-6 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green-400/60 to-transparent" />
            <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                    {profileIconSrc ? (
                        <img
                            src={profileIconSrc}
                            alt=""
                            className="h-20 w-20 rounded-2xl border border-green-500/30 shadow-lg shadow-green-900/30"
                        />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-green-500/20 bg-zinc-900 text-2xl font-bold text-green-700">
                            ?
                        </div>
                    )}
                    <div>
                        <p className="text-xs font-medium tracking-widest text-green-700 uppercase">
                            Summoner Profile
                        </p>
                        <h1 className="mt-1 text-3xl font-bold">
                            <span className="bg-linear-to-r from-green-200 to-emerald-400 bg-clip-text text-transparent">
                                {gameName}
                            </span>
                            <span className="text-green-700">#{tagLine}</span>
                        </h1>
                        {summonerLevel && (
                            <p className="mt-1 text-sm text-zinc-500">Level {summonerLevel}</p>
                        )}
                    </div>
                </div>
                {onRefresh && (
                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        className="shrink-0 rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-2.5 text-sm font-medium text-green-400 transition hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isRefreshing ? (
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-green-900 border-t-green-400" />
                        ) : (
                            "Refresh"
                        )}
                    </button>
                )}
            </div>
        </section>
    );
}

export default ProfileSection;
