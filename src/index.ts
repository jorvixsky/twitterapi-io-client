import { MyAccountInfoResponse } from "./responses";

export interface TwitterAPIIOClientOptions {
    apiKey: string;
    baseUrl?: string;
}

export class TwitterAPIIOClient {
    protected apiKey: string;
    protected baseUrl: string;

    constructor({ apiKey, baseUrl = "https://api.twitterapi.io" }: TwitterAPIIOClientOptions) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public async getMyAccountInfo(): Promise<MyAccountInfoResponse> {
        const response = await fetch(`${this.baseUrl}/oapi/my/info`, {
            headers: {
                "X-API-Key": this.apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`${response.statusText}`);
        }

        const json = await response.json();
        console.log(json);
        return json as MyAccountInfoResponse;
    }
}