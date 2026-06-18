import { z } from "zod";
import { MatchSchema } from "./MatchSchema";
import { RankSchema } from "./RankSchema";

export const SearchSchema = z.object({
    puuid: z.string(),
    gameName: z.string(),
    tagLine: z.string(),
    profileIconId: z.number().optional(),
    summonerLevel: z.number().optional(),
    rank: RankSchema.optional(),
    matchHistory: z.array(MatchSchema).optional(),
});

export type Search = z.infer<typeof SearchSchema>;
export type Rank = z.infer<typeof RankSchema>;
export type Match = z.infer<typeof MatchSchema>;
