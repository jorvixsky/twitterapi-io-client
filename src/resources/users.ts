import type { HttpClient } from "../httpClient";
import type { FollowRelationshipResponse, SearchUserByKeywordResponse, UserFollowersResponse, UserFollowingsResponse, UserInfoResponse, UserLatestTweetsResponse, UserMentionsResponse, UserProfileAboutResponse, UserVerifiedFollowersResponse } from "../types/users";

export class UsersApi {
  constructor(private http: HttpClient) {}

  async getUserProfileAbout(userName: string): Promise<UserProfileAboutResponse> {
    const params = new URLSearchParams({ userName });
    const response = await this.http.request<UserProfileAboutResponse>(`/twitter/user_about?${params.toString()}`);
    return response;
  }

  async getUserInfo(userName: string): Promise<UserInfoResponse> {
    const params = new URLSearchParams({ userName });
    const response = await this.http.request<{ data: UserInfoResponse }>(`/twitter/user/info?${params.toString()}`);
    return response.data;
  }

  async getUserLatestTweets(userId?: string, userName?: string, cursor?: string, pageSize?: number, includeReplies?: boolean): Promise<UserLatestTweetsResponse> {
    if (!userId && !userName) {
      throw new Error("Either userId or userName is required");
    }
    const params = new URLSearchParams({ userId: userId ?? "", userName: userName ?? "", cursor: cursor ?? "", pageSize: pageSize?.toString() ?? "200", includeReplies: includeReplies?.toString() ?? "false" });
    const response = await this.http.request<UserLatestTweetsResponse>(`/twitter/user/latest_tweets?${params.toString()}`);
    return response;
  }

  async getUserFollowers(userName: string, cursor?: string, pageSize?: number): Promise<UserFollowersResponse> {
    const params = new URLSearchParams({ userName, cursor: cursor ?? "", pageSize: pageSize?.toString() ?? "200" });
    const response = await this.http.request<UserFollowersResponse>(`/twitter/user/followers?${params.toString()}`);
    return response;
  }

  async getUserFollowings(userName: string, cursor?: string, pageSize?: number): Promise<UserFollowingsResponse> {
    const params = new URLSearchParams({ userName, cursor: cursor ?? "", pageSize: pageSize?.toString() ?? "200" });
    const response = await this.http.request<UserFollowingsResponse>(`/twitter/user/followings?${params.toString()}`);
    return response;
  }

  async getUserMentions(username: string, sinceTime: number, untilTime: number, cursor?: string): Promise<UserMentionsResponse> {
    const params = new URLSearchParams({ username, sinceTime: sinceTime.toString(), untilTime: untilTime.toString(), cursor: cursor ?? "" });
    const response = await this.http.request<UserMentionsResponse>(`/twitter/user/mentions?${params.toString()}`);
    return response;
  }

  async checkFollowRelationship(sourceUserName: string, targetUserName: string): Promise<FollowRelationshipResponse> {
    const params = new URLSearchParams({ source_user_name: sourceUserName, target_user_name: targetUserName });
    const response = await this.http.request<FollowRelationshipResponse>(`/twitter/user/check_follow_relationship?${params.toString()}`);
    return response;
  }

  async searchUserByKeyword(query: string, cursor?: string): Promise<SearchUserByKeywordResponse> {
    const params = new URLSearchParams({ query, cursor: cursor ?? "" });
    const response = await this.http.request<SearchUserByKeywordResponse>(`/twitter/user/search?${params.toString()}`);
    return response;
  }

  async getUserVerifiedFollowers(userId: string, cursor?: string): Promise<UserVerifiedFollowersResponse> {
    const params = new URLSearchParams({ user_id: userId, cursor: cursor ?? "" });
    const response = await this.http.request<UserVerifiedFollowersResponse>(`/twitter/user/verifiedFollowers?${params.toString()}`);
    return response;
  }
} 