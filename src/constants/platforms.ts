export const PLATFORMS = [
    { value: "na1", label: "North America" },
    { value: "br1", label: "Brazil" },
    { value: "la1", label: "LAN" },
    { value: "la2", label: "LAS" },
    { value: "euw1", label: "Europe West" },
    { value: "eun1", label: "Europe Nordic & East" },
    { value: "tr1", label: "Turkey" },
    { value: "ru", label: "Russia" },
    { value: "kr", label: "Korea" },
    { value: "jp1", label: "Japan" },
    { value: "oc1", label: "Oceania" },
    { value: "ph2", label: "Philippines" },
    { value: "sg2", label: "Singapore" },
    { value: "th2", label: "Thailand" },
    { value: "tw2", label: "Taiwan" },
    { value: "vn2", label: "Vietnam" },
] as const;

export type Platform = (typeof PLATFORMS)[number]["value"];

export const DEFAULT_PLATFORM: Platform = "sg2";
