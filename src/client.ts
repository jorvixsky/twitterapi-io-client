import { HttpClient, type HttpClientOptions } from "./httpClient";
import { UsersApi } from "./resources/users";
import { MyEndpointApi } from "./resources/myEndpoint";
import { ListApi } from "./resources/list";
import { CommunitiesApi } from "./resources/communities";
import { TrendsApi } from "./resources/trends";
import { SpacesApi } from "./resources/spaces";

export interface TwitterAPIIOClientOptions extends HttpClientOptions { }

export class TwitterAPIIOClient {
    public readonly users: UsersApi;
    public readonly myEndpoint: MyEndpointApi;
    public readonly list: ListApi;
    public readonly communities: CommunitiesApi;
    public readonly trends: TrendsApi;
    public readonly spaces: SpacesApi;

    constructor(options: TwitterAPIIOClientOptions) {
        const http = new HttpClient(options);
        this.users = new UsersApi(http);
        this.myEndpoint = new MyEndpointApi(http);
        this.list = new ListApi(http);
        this.communities = new CommunitiesApi(http);
        this.trends = new TrendsApi(http);
        this.spaces = new SpacesApi(http);
    }
}