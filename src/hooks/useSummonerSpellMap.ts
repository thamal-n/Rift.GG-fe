import { useQuery } from "@tanstack/react-query";
import { fetchSummonerSpellMap } from "../utils/ddragon";

export function useSummonerSpellMap(version?: string) {
    return useQuery({
        queryKey: ["ddragon-summoner-spells", version],
        queryFn: () => fetchSummonerSpellMap(version!),
        staleTime: 1000 * 60 * 60,
        enabled: !!version,
    });
}
