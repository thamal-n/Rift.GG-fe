import { useQuery } from "@tanstack/react-query";
import { fetchDdragonVersion } from "../utils/ddragon";

export function useDdragonVersion() {
    return useQuery({
        queryKey: ["ddragon-version"],
        queryFn: fetchDdragonVersion,
        staleTime: 1000 * 60 * 60,
    });
}
