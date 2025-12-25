export interface UserInfoResponse {
    type: string;
    userName: string;
    url: string;
    id: string;
    name: string;
    isBlueVerified: boolean;
    verifiedType: string;
    profilePicture: string;
    coverPicture: string;
    description: string;
    location: string;
    followers: number;
    following: number;
    canDm: boolean;
    createdAt: string;
    favouritesCount: number;
    hasCustomTimelines: boolean;
    isTranslator: boolean;
    mediaCount: number;
    statusesCount: number;
    withheldInCountries: string[];
    affiliatesHighlightedLabel: unknown;
    possiblySensitive: boolean;
    pinnedTweetIds: string[];
    isAutomated: boolean;
    automatedBy: string;
    unavailable?: boolean;
    message?: string;
    unavailableReason?: string;
    profile_bio: {
        description: string;
        entities: {
            description: {
                urls: {
                    url: string;
                    expanded_url: string;
                    display_url: string;
                    indices: number[];
                }[];
            };
            url: {
                urls: {
                    url: string;
                    expanded_url: string;
                    display_url: string;
                    indices: number[];
                }[];
            };
        };
    };
}

export interface UserFollowersResponse {
    followers: UserInfoResponse[];
    has_next_page: boolean;
    next_cursor: string;
}

export interface UserFollowingsResponse {
    followings: UserInfoResponse[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

export interface UserProfileAboutResponse {
    data: {
        id: string;
        name: string;
        userName: string;
        createdAt: string;
        isBlueVerified: boolean;
        protected: boolean;
        affiliates_highlighted_label?: {
            label: {
                badge?: {
                    url: string;
                };
                description: string;
                url?: {
                    url: string;
                    urlType: string;
                };
                userLabelDisplayType: string;
                userLabelType: string;
            };
        };
        about_profile?: {
            account_based_in?: string;
            location_accurate?: boolean;
            learn_more_url?: string;
            affiliate_username?: string;
            source?: string;
            username_changes?: {
                count: string;
            };
        };
        identity_profile_labels_highlighted_label?: {
            label: {
                description: string;
                badge?: {
                    url: string;
                };
                url?: {
                    url: string;
                    urlType: string;
                };
                userLabelDisplayType: string;
                userLabelType: string;
            };
        };
    };
}

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

export interface UserLatestTweetsResponse {
    tweets: Tweet[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

export interface UserMentionsResponse {
    tweets: Tweet[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

export interface FollowRelationshipResponse {
    data: {
        following: boolean;
        followed_by: boolean;
    };
    status: string;
    message?: string;
}

export interface SearchUserByKeywordResponse {
    users: UserInfoResponse[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    msg?: string;
}