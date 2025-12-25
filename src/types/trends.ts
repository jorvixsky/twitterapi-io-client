export interface Trend {
    name: string;
    url: string;
    promoted_content?: unknown;
    query: string;
    tweet_volume?: number;
}

export interface TrendLocation {
    name: string;
    woeid: number;
}

export interface TrendsResponse {
    trends: Trend[];
    as_of: string;
    created_at: string;
    locations: TrendLocation[];
    status: string;
    message?: string;
}

