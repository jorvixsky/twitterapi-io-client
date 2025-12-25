import type { HttpClient } from "../httpClient";
import type { UserFollowersResponse, UserInfoResponse, UserLatestTweetsResponse, UserProfileAboutResponse } from "../types/users";

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
} 