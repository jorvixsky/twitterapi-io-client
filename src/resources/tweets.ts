import type { HttpClient } from "../httpClient";
import type {
    TweetsByIdsResponse,
    TweetRepliesResponse,
    TweetQuotationsResponse,
    TweetRetweetersResponse,
    TweetThreadContextResponse,
    ArticleResponse,
    SearchTweetsResponse,
} from "../types/tweets";

export class TweetsApi {
    constructor(private http: HttpClient) {}

    async getTweetsByIds(tweetIds: string[]): Promise<TweetsByIdsResponse> {
        const params = new URLSearchParams({ tweet_ids: tweetIds.join(",") });
        const response = await this.http.request<TweetsByIdsResponse>(`/twitter/tweet/by_ids?${params.toString()}`);
        return response;
    }

    async getTweetReplies(tweetId: string, cursor?: string): Promise<TweetRepliesResponse> {
        const params = new URLSearchParams({ tweet_id: tweetId, cursor: cursor ?? "" });
        const response = await this.http.request<TweetRepliesResponse>(`/twitter/tweet/replies?${params.toString()}`);
        return response;
    }

    async getTweetQuotations(tweetId: string, cursor?: string): Promise<TweetQuotationsResponse> {
        const params = new URLSearchParams({ tweet_id: tweetId, cursor: cursor ?? "" });
        const response = await this.http.request<TweetQuotationsResponse>(`/twitter/tweet/quotations?${params.toString()}`);
        return response;
    }

    async getTweetRetweeters(tweetId: string, cursor?: string): Promise<TweetRetweetersResponse> {
        const params = new URLSearchParams({ tweet_id: tweetId, cursor: cursor ?? "" });
        const response = await this.http.request<TweetRetweetersResponse>(`/twitter/tweet/retweeters?${params.toString()}`);
        return response;
    }

    async getTweetThreadContext(tweetId: string): Promise<TweetThreadContextResponse> {
        const params = new URLSearchParams({ tweet_id: tweetId });
        const response = await this.http.request<TweetThreadContextResponse>(`/twitter/tweet/thread_context?${params.toString()}`);
        return response;
    }

    async getArticle(articleId: string): Promise<ArticleResponse> {
        const params = new URLSearchParams({ article_id: articleId });
        const response = await this.http.request<ArticleResponse>(`/twitter/article?${params.toString()}`);
        return response;
    }

    async searchTweets(query: string, queryType?: "latest" | "top", cursor?: string): Promise<SearchTweetsResponse> {
        const params = new URLSearchParams({ query, queryType: queryType ?? "latest", cursor: cursor ?? "" });
        const response = await this.http.request<SearchTweetsResponse>(`/twitter/search?${params.toString()}`);
        return response;
    }
}

