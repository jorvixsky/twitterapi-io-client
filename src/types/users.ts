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