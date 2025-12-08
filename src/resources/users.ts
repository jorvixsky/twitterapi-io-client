import type { HttpClient } from "../httpClient";
import type { UserInfoResponse } from "../types/users";

export class UsersApi {
  constructor(private http: HttpClient) {}

  async getUserInfo(userName: string): Promise<UserInfoResponse> {
    const params = new URLSearchParams({ userName });
    const response = await this.http.request<{ data: UserInfoResponse }>(`/twitter/user/info?${params.toString()}`);
    console.log(response);
    return response.data;
  }
}