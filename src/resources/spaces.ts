import type { HttpClient } from "../httpClient";
import type { SpaceDetailResponse } from "../types/spaces";

export class SpacesApi {
    constructor(private http: HttpClient) {}

    async getSpaceDetail(spaceId: string): Promise<SpaceDetailResponse> {
        const params = new URLSearchParams({ space_id: spaceId });
        const response = await this.http.request<SpaceDetailResponse>(`/twitter/space/detail?${params.toString()}`);
        return response;
    }
}

