import { HttpClient, type HttpClientOptions } from "./httpClient";
import { UsersApi } from "./resources/users";
import { MyEndpointApi } from "./resources/myEndpoint";

export interface TwitterAPIIOClientOptions extends HttpClientOptions { }

export class TwitterAPIIOClient {
    public readonly users: UsersApi;
    public readonly myEndpoint: MyEndpointApi;

    constructor(options: TwitterAPIIOClientOptions) {
        const http = new HttpClient(options);
        this.users = new UsersApi(http);
        this.myEndpoint = new MyEndpointApi(http);
    }
}