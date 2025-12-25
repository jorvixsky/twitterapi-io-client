import type { HttpClient } from "../httpClient";
import type { TrendsResponse } from "../types/trends";

export class TrendsApi {
    constructor(private http: HttpClient) {}

    async getTrends(woeid: number): Promise<TrendsResponse> {
        const params = new URLSearchParams({ woeid: woeid.toString() });
        const response = await this.http.request<TrendsResponse>(`/twitter/trends?${params.toString()}`);
        return response;
    }
}

