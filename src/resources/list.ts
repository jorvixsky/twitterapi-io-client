import type { HttpClient } from "../httpClient";
import type { ListFollowersResponse, ListMembersResponse } from "../types/list";

export class ListApi {
    constructor(private http: HttpClient) { }

    async getListFollowers(listId: string, cursor?: string): Promise<ListFollowersResponse> {
        const params = new URLSearchParams({ list_id: listId, cursor: cursor ?? "" });
        const response = await this.http.request<ListFollowersResponse>(`/twitter/list/followers?${params.toString()}`);
        return response;
    }

    async getListMembers(listId: string, cursor?: string): Promise<ListMembersResponse> {
        const params = new URLSearchParams({ list_id: listId, cursor: cursor ?? "" });
        const response = await this.http.request<ListMembersResponse>(`/twitter/list/members?${params.toString()}`);
        return response;
    }
}