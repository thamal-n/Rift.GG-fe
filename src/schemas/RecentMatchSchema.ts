import z from "zod";

export const RecentMatchSchema = z.object({
    matchId: z.string(),
    champion: z.string(),
    championKey: z.string(),
    result: z.enum(["win", "loss", "remake"]),
    kda: z.string(),
    gameEndTime: z.string(),
    opponentChampion: z.string(),
    opponentChampionKey: z.string(),
});

export type RecentMatch = z.infer<typeof RecentMatchSchema>;
