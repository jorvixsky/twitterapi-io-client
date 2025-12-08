import type { HttpClient } from "../httpClient";
import type { UserInfoResponse } from "../types/users";

export class UsersApi {
  constructor(private http: HttpClient) {}

  getUserInfo(userId: string): Promise<UserInfoResponse> {
    return this.http.request<UserInfoResponse>(`/oapi/users/${userId}`);
  }

}