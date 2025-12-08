export interface HttpClientOptions {
    apiKey: string;
    baseUrl?: string;
}

export class HttpClient {
    private apiKey: string;
    private baseUrl: string;

    constructor({ apiKey, baseUrl = "https://api.twitterapi.io" }: HttpClientOptions) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async request<T>(path: string, init: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${path}`, {
            ...init,
            headers: {
                "X-API-Key": this.apiKey,
                ...(init.headers ?? {}),
            },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const json = await response.json();
        return json as T;
    }
}