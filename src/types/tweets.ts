import type { UserInfoResponse } from "./users";

export interface Tweet {
    type: string;
    id: string;
    url: string;
    text: string;
    source: string;
    retweetCount: number;
    replyCount: number;
    likeCount: number;
    quoteCount: number;
    viewCount: number;
    createdAt: string;
    lang: string;
    bookmarkCount: number;
    isReply: boolean;
    inReplyToId?: string;
    conversationId: string;
    displayTextRange?: number[];
    inReplyToUserId?: string;
    inReplyToUsername?: string;
    author: UserInfoResponse;
    entities: {
        hashtags: { indices: number[]; text: string }[];
        urls: { display_url: string; expanded_url: string; indices: number[]; url: string }[];
        user_mentions: { id_str: string; name: string; screen_name: string }[];
    };
    quoted_tweet?: unknown;
    retweeted_tweet?: unknown;
    isLimitedReply?: boolean;
}

export interface TweetsByIdsResponse {
    tweets: Tweet[];
    status: string;
    message?: string;
}

export interface TweetRepliesResponse {
    tweets: Tweet[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

export interface TweetQuotationsResponse {
    tweets: Tweet[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

export interface TweetRetweetersResponse {
    retweeters: UserInfoResponse[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

export interface TweetThreadContextResponse {
    tweets: Tweet[];
    status: string;
    message?: string;
}

export interface ArticleResponse {
    article: {
        id: string;
        title: string;
        description?: string;
        url: string;
        author?: UserInfoResponse;
        published_at?: string;
        content?: string;
    };
    status: string;
    message?: string;
}

export interface SearchTweetsResponse {
    tweets: Tweet[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

