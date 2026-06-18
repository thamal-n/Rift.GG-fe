import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { search } from "../APIs/searchById";
import { DEFAULT_PLATFORM, PLATFORMS, type Platform } from "../constants/platforms";
import { searchQueryKey } from "../utils/searchQueryKey";

function Search() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [input, setInput] = useState("");
    const [platform, setPlatform] = useState<Platform>(DEFAULT_PLATFORM);
    const [validationError, setValidationError] = useState<string | null>(null);

    const { mutate, isPending, error } = useMutation({
        mutationFn: ({ riotId, platform }: { riotId: string; platform: Platform }) =>
            search({ riotId, platform }),
        onSuccess: (data) => {
            queryClient.setQueryData(searchQueryKey(data.gameName, data.tagLine), data);
            navigate(
                `/profile/${encodeURIComponent(data.gameName)}/${encodeURIComponent(data.tagLine)}`,
                { state: data }
            );
        },
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = input.trim();

        if (!trimmed.includes("#")) {
            setValidationError("Enter a Riot ID as GameName#Tag");
            return;
        }

        setValidationError(null);
        mutate({ riotId: trimmed, platform });
    }

    return (
        <div className="relative min-h-full overflow-hidden px-4 py-16">
            <div className="search-glow pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-linear-to-br from-green-500/30 via-emerald-600/20 to-transparent blur-3xl" />
            <div className="search-glow pointer-events-none absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-linear-to-tl from-emerald-700/25 via-green-900/15 to-transparent blur-3xl [animation-delay:2s]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.08)_0%,transparent_50%)]" />

            <div className="relative mx-auto w-full max-w-xl">
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5 text-xs font-medium tracking-widest text-green-400/80 uppercase backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-green-400 to-emerald-500 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        League Lookup
                    </div>
                    <h1 className="search-shimmer bg-linear-to-r from-green-300 via-emerald-400 to-green-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                        Summoner Search
                    </h1>
                    <p className="mt-3 text-sm text-zinc-500">Find any player by their Riot ID</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="group relative rounded-2xl border border-white/6 bg-zinc-950/60 p-2 shadow-[0_0_40px_-12px_rgba(34,197,94,0.25)] backdrop-blur-xl transition-shadow focus-within:border-green-500/30 focus-within:shadow-[0_0_50px_-8px_rgba(34,197,94,0.35)]"
                >
                    <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-linear-to-r from-transparent via-green-500/50 to-transparent opacity-0 transition-opacity group-focus-within:opacity-100" />
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value as Platform)}
                            aria-label="Server region"
                            className="rounded-xl border border-white/6 bg-zinc-900/80 px-3 py-3.5 text-sm text-green-50 outline-none transition focus:border-green-500/30 sm:max-w-44"
                        >
                            {PLATFORMS.map(({ value, label }) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="GameName#Tag"
                            className="flex-1 rounded-xl bg-transparent px-4 py-3.5 text-green-50 placeholder:text-zinc-600 outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isPending}
                            className="relative overflow-hidden rounded-xl bg-linear-to-r from-green-600 via-emerald-500 to-green-500 px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-green-900/40 transition hover:from-green-500 hover:via-emerald-400 hover:to-green-400 hover:shadow-green-800/50 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
                        >
                            {isPending ? (
                                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                            ) : (
                                "Search"
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 min-h-20">
                    {validationError && (
                        <div className="rounded-xl border border-red-500/20 bg-red-950/20 px-5 py-4 text-sm text-red-300 backdrop-blur-sm">
                            {validationError}
                        </div>
                    )}
                    {!validationError && isPending && (
                        <div className="flex items-center gap-3 rounded-xl border border-green-500/10 bg-zinc-950/40 px-5 py-4 backdrop-blur-sm">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-900 border-t-green-400" />
                            <span className="text-sm text-green-700">Searching summoner...</span>
                        </div>
                    )}
                    {!validationError && error && (
                        <div className="rounded-xl border border-red-500/20 bg-red-950/20 px-5 py-4 text-sm text-red-300 backdrop-blur-sm">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
