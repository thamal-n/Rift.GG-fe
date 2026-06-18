export function searchQueryKey(gameName: string, tagLine: string) {
    return ["search", gameName, tagLine] as const;
}
