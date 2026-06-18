import z from "zod";

export const RankSchema = z.object({
    tier: z.string(),
    rank: z.string(),
    lp: z.number(),
    wins: z.number(),
    losses: z.number(),
});