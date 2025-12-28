import type { HttpClient } from "../httpClient";
import type { AddUserToMonitorRequest, RemoveUserFromMonitorRequest, StreamResponse } from "../types/stream";

export class StreamApi {
    constructor(private http: HttpClient) { }

    async addUserToMonitor(xUserName: string): Promise<StreamResponse> {
        const body: AddUserToMonitorRequest = {
            x_user_name: xUserName,
        };
        return this.http.request<StreamResponse>("/oapi/x_user_stream/add_user_to_monitor_tweet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    async removeUserFromMonitor(xUserName: string): Promise<StreamResponse> {
        const body: RemoveUserFromMonitorRequest = {
            x_user_name: xUserName,
        };
        return this.http.request<StreamResponse>("/oapi/x_user_stream/remove_user_from_monitor_tweet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }
}

