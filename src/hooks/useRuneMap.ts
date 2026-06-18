import { useQuery } from "@tanstack/react-query";
import { fetchRuneMap } from "../utils/ddragon";

export function useRuneMap(version?: string) {
    return useQuery({
        queryKey: ["ddragon-runes", version],
        queryFn: () => fetchRuneMap(version!),
        staleTime: 1000 * 60 * 60,
        enabled: !!version,
    });
}
