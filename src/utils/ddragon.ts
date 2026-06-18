const DDRAGON_CDN = "https://ddragon.leagueoflegends.com/cdn";
const VERSIONS_URL = "https://ddragon.leagueoflegends.com/api/versions.json";

export async function fetchDdragonVersion(): Promise<string> {
    const response = await fetch(VERSIONS_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch Data Dragon version");
    }

    const versions = (await response.json()) as string[];
    const latest = versions[0];
    if (!latest) {
        throw new Error("No Data Dragon versions available");
    }

    return latest;
}

export function championIconUrl(version: string, championKey: string): string {
    return `${DDRAGON_CDN}/${version}/img/champion/${championKey}.png`;
}

export function profileIconUrl(version: string, profileIconId: number): string {
    return `${DDRAGON_CDN}/${version}/img/profileicon/${profileIconId}.png`;
}

export function itemIconUrl(
    version: string,
    itemId: number,
): string | undefined {
    if (itemId === 0) {
        return undefined;
    }
    return `${DDRAGON_CDN}/${version}/img/item/${itemId}.png`;
}

type DdragonSummonerSpell = {
    key: string;
    image: { full: string };
};

type DdragonSummonerResponse = {
    data: Record<string, DdragonSummonerSpell>;
};

export async function fetchSummonerSpellMap(
    version: string,
): Promise<Map<number, string>> {
    const response = await fetch(
        `${DDRAGON_CDN}/${version}/data/en_US/summoner.json`,
    );
    if (!response.ok) {
        throw new Error("Failed to fetch Data Dragon summoner spells");
    }

    const { data } = (await response.json()) as DdragonSummonerResponse;
    const map = new Map<number, string>();

    for (const spell of Object.values(data)) {
        map.set(Number(spell.key), spell.image.full);
    }

    return map;
}

export function summonerSpellIconUrl(
    version: string,
    imageFull: string,
): string {
    return `${DDRAGON_CDN}/${version}/img/spell/${imageFull}`;
}

const RUNE_STYLE_ICONS: Record<number, string> = {
    8000: "perk-images/Styles/7201_Precision.png",
    8100: "perk-images/Styles/7200_Domination.png",
    8200: "perk-images/Styles/7202_Sorcery.png",
    8300: "perk-images/Styles/7203_Whimsy.png",
    8400: "perk-images/Styles/7204_Resolve.png",
};

export function runeStyleIconUrl(styleId: number): string | undefined {
    const path = RUNE_STYLE_ICONS[styleId];
    return path ? `${DDRAGON_CDN}/img/${path}` : undefined;
}

type DdragonRune = {
    id: number;
    icon: string;
};

type DdragonRuneStyle = {
    slots: Array<{ runes: DdragonRune[] }>;
};

export async function fetchRuneMap(
    version: string,
): Promise<Map<number, string>> {
    const response = await fetch(
        `${DDRAGON_CDN}/${version}/data/en_US/runesReforged.json`,
    );
    if (!response.ok) {
        throw new Error("Failed to fetch Data Dragon runes");
    }

    const styles = (await response.json()) as DdragonRuneStyle[];
    const map = new Map<number, string>();

    for (const style of styles) {
        for (const slot of style.slots) {
            for (const rune of slot.runes) {
                map.set(rune.id, rune.icon);
            }
        }
    }

    return map;
}

export function runeIconUrl(iconPath: string): string {
    return `${DDRAGON_CDN}/img/${iconPath}`;
}
