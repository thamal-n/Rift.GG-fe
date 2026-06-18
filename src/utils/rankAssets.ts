const RANK_EMBLEM_BASE = "/ranks";

const RANK_TIERS = [
    "iron",
    "bronze",
    "silver",
    "gold",
    "platinum",
    "emerald",
    "diamond",
    "master",
    "grandmaster",
    "challenger",
] as const;

type RankTier = (typeof RANK_TIERS)[number];

const RANK_TIER_SET = new Set<string>(RANK_TIERS);

export function rankEmblemUrl(tier: string): string | undefined {
    const normalized = tier.toLowerCase();
    if (!RANK_TIER_SET.has(normalized)) {
        return undefined;
    }

    return `${RANK_EMBLEM_BASE}/emblem-${normalized as RankTier}.png`;
}
