import type { UserInfoResponse } from "./users";
import type { Tweet } from "./tweets";

export interface CommunityInfoResponse {
    id: string;
    name: string;
    description: string;
    member_count: number;
    moderator_count: number;
    created_at: string;
    rules?: string[];
    banner_image?: string;
    profile_image?: string;
    status: string;
    message?: string;
}

export interface CommunityMembersResponse {
    members: UserInfoResponse[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    msg?: string;
}

export interface CommunityModeratorsResponse {
    moderators: UserInfoResponse[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    msg?: string;
}

export interface CommunityTweetsResponse {
    tweets: Tweet[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

export interface CommunitySearchResponse {
    tweets: Tweet[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    message?: string;
}

