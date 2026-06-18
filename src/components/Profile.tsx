import { Link, useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { Search } from "../schemas/SearchSchema";
import { searchQueryKey } from "../utils/searchQueryKey";
import ChampionsSection from "./ChampionsSection";
import MatchHistorySection from "./MatchHistorySection";
import OverviewSection from "./OverviewSection";
import ProfileSection from "./ProfileSection";
import RankedSection from "./RankedSection";

function Profile() {
    const location = useLocation();
    const queryClient = useQueryClient();
    const { gameName = "", tagLine = "" } = useParams();
    const decodedName = decodeURIComponent(gameName);
    const decodedTag = decodeURIComponent(tagLine);

    const data =
        (location.state as Search | null) ??
        queryClient.getQueryData<Search>(searchQueryKey(decodedName, decodedTag));

    if (!data) {
        return (
            <div className="flex min-h-full items-center justify-center px-4">
                <div className="rounded-xl border border-green-500/20 bg-zinc-950/60 px-6 py-5 text-center backdrop-blur-sm">
                    <p className="text-sm text-zinc-400">
                        No profile data available. Search for a summoner first.
                    </p>
                    <Link
                        to="/"
                        className="mt-4 inline-block text-sm font-medium text-green-400 hover:text-green-300"
                    >
                        Back to search
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-full overflow-hidden p-6">
            <div className="search-glow pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-linear-to-br from-green-500/20 via-emerald-600/10 to-transparent blur-3xl" />
            <div className="relative w-full">
                <ProfileSection
                    gameName={data.gameName}
                    tagLine={data.tagLine}
                    profileIconId={data.profileIconId}
                    summonerLevel={data.summonerLevel}
                />
                <div className="mt-6 grid grid-cols-[1fr_3fr] items-stretch gap-6">
                    <RankedSection rank={data.rank} className="min-w-0" />
                    <ChampionsSection
                        matchHistory={data.matchHistory}
                        className="min-w-0"
                    />
                    <OverviewSection
                        matchHistory={data.matchHistory}
                        className="min-w-0"
                    />
                    <MatchHistorySection
                        matchHistory={data.matchHistory}
                        className="min-w-0"
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
