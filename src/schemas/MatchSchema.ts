import z from "zod";

export const MatchSchema = z.object({
    matchId: z.string(),
    champion: z.string(),
    championKey: z.string(),
    result: z.enum(["win", "loss", "remake"]),
    kda: z.string(),
    gameDuration: z.string(),
    gameEndTime: z.string(),
    lane: z.enum(["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]),
    items: z.array(z.number()),
    roleBoundItem: z.number(),
    summonerSpells: z.array(z.number()),
    cs: z.string(),
    kdaDecimal: z.string(),
    killParticipation: z.string(),
    championLevel: z.number(),
    primaryRuneId: z.number(),
    secondaryRuneStyleId: z.number(),
});