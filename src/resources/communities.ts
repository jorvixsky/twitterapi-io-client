import type { HttpClient } from "../httpClient";
import type {
    CommunityInfoResponse,
    CommunityMembersResponse,
    CommunityModeratorsResponse,
    CommunityTweetsResponse,
    CommunitySearchResponse,
} from "../types/communities";

export class CommunitiesApi {
    constructor(private http: HttpClient) {}

    async getCommunityInfo(communityId: string): Promise<CommunityInfoResponse> {
        const params = new URLSearchParams({ community_id: communityId });
        const response = await this.http.request<CommunityInfoResponse>(`/twitter/community/info?${params.toString()}`);
        return response;
    }

    async getCommunityMembers(communityId: string, cursor?: string): Promise<CommunityMembersResponse> {
        const params = new URLSearchParams({ community_id: communityId, cursor: cursor ?? "" });
        const response = await this.http.request<CommunityMembersResponse>(`/twitter/community/members?${params.toString()}`);
        return response;
    }

    async getCommunityModerators(communityId: string, cursor?: string): Promise<CommunityModeratorsResponse> {
        const params = new URLSearchParams({ community_id: communityId, cursor: cursor ?? "" });
        const response = await this.http.request<CommunityModeratorsResponse>(`/twitter/community/moderators?${params.toString()}`);
        return response;
    }

    async getCommunityTweets(communityId: string, cursor?: string): Promise<CommunityTweetsResponse> {
        const params = new URLSearchParams({ community_id: communityId, cursor: cursor ?? "" });
        const response = await this.http.request<CommunityTweetsResponse>(`/twitter/community/tweets?${params.toString()}`);
        return response;
    }

    async searchCommunityTweets(query: string, queryType?: "latest" | "top", cursor?: string): Promise<CommunitySearchResponse> {
        const params = new URLSearchParams({ query, queryType: queryType ?? "latest", cursor: cursor ?? "" });
        const response = await this.http.request<CommunitySearchResponse>(`/twitter/community/search?${params.toString()}`);
        return response;
    }
}

