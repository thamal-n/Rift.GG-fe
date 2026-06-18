import { DEFAULT_PLATFORM, type Platform } from "../constants/platforms";
import { SearchSchema } from "../schemas/SearchSchema";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

type SearchParams = { platform?: Platform };

type SearchByRiotId = SearchParams & {
    riotId: string;
    gameName?: never;
    tagLine?: never;
};

type SearchByName = SearchParams & {
    gameName: string;
    tagLine: string;
    riotId?: never;
};

function buildSearchUrl(params: SearchByRiotId | SearchByName) {
    const searchParams = new URLSearchParams();
    searchParams.set("platform", params.platform ?? DEFAULT_PLATFORM);

    if ("riotId" in params && params.riotId) {
        searchParams.set("riotId", params.riotId);
    } else {
        const { gameName, tagLine } = params as SearchByName;
        searchParams.set("gameName", gameName);
        searchParams.set("tagLine", tagLine);
    }

    return `${API_BASE}/api/search?${searchParams.toString()}`;
}

async function readErrorMessage(response: Response): Promise<string> {
    try {
        const body = (await response.json()) as {
            message?: string | string[];
        };
        if (Array.isArray(body.message)) {
            return body.message.join(", ");
        }
        if (typeof body.message === "string") {
            return body.message;
        }
    } catch {
        // ignore JSON parse errors
    }

    return `Failed to search for account: ${response.statusText}`;
}

export async function search(params: SearchByRiotId | SearchByName) {
    const response = await fetch(buildSearchUrl(params));
    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }
    const data = await response.json();
    return SearchSchema.parse(data);
}
