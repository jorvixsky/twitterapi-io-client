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
    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (userName) params.append("userName", userName);
    if (cursor && cursor.trim() !== "") params.append("cursor", cursor);
    params.append("pageSize", pageSize?.toString() ?? "200");
    params.append("includeReplies", includeReplies?.toString() ?? "false");

    const url = `/twitter/user/latest_tweets?${params.toString()}`;

    const response = await this.http.request<{ status: string; msg?: string; data?: UserLatestTweetsResponse } | UserLatestTweetsResponse>(url);

    // Check if tweets are at the top level (direct response)
    if ('tweets' in response && Array.isArray(response.tweets)) {
      return response as UserLatestTweetsResponse;
    }

    // Handle response wrapped in { status, msg, data }
    if ('data' in response && response.data) {
      const data = response.data;

      // Check if data contains tweets array (expected structure per docs)
      if ('tweets' in data && Array.isArray(data.tweets)) {
        return {
          tweets: data.tweets,
          has_next_page: data.has_next_page ?? false,
          next_cursor: data.next_cursor ?? "",
          status: data.status || response.status || "success",
          message: data.message || response.msg
        };
      }

      // If data doesn't have tweets, return empty structure (API might be returning wrong data)
      return {
        tweets: [],
        has_next_page: false,
        next_cursor: "",
        status: response.status || "success",
        message: response.msg
      };
    }

    return response as UserLatestTweetsResponse;
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

  async getUserMentions(userName: string, sinceTime: number, untilTime: number, cursor?: string): Promise<UserMentionsResponse> {
    const params = new URLSearchParams({
      userName,
      sinceTime: sinceTime.toString(),
      untilTime: untilTime.toString()
    });

    if (cursor && cursor.trim() !== "") {
      params.append("cursor", cursor);
    }
    const url = `/twitter/user/mentions?${params.toString()}`;

    const response = await this.http.request<{ status: string; msg?: string; data?: UserMentionsResponse } | UserMentionsResponse>(url);

    // Check if tweets are at the top level (direct response)
    if ('tweets' in response && Array.isArray(response.tweets)) {
      return response as UserMentionsResponse;
    }

    // Handle response wrapped in { status, msg, data }
    if ('data' in response && response.data) {
      const data = response.data;

      // Check if data contains tweets array (expected structure per docs)
      if ('tweets' in data && Array.isArray(data.tweets)) {
        return {
          tweets: data.tweets,
          has_next_page: data.has_next_page ?? false,
          next_cursor: data.next_cursor ?? "",
          status: data.status || response.status || "success",
          message: data.message || response.msg
        };
      }

      // If data doesn't have tweets, return empty structure
      return {
        tweets: [],
        has_next_page: false,
        next_cursor: "",
        status: response.status || "success",
        message: response.msg
      };
    }

    return response as UserMentionsResponse;
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