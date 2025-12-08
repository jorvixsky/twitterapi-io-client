import type { HttpClient } from "../httpClient";
import type { MyAccountInfoResponse } from "../types/myEndpoint";

export class MyEndpointApi {
    constructor(private http: HttpClient) { }

    getMyAccountInfo(): Promise<MyAccountInfoResponse> {
        return this.http.request<MyAccountInfoResponse>("/oapi/my/info");
    }
}