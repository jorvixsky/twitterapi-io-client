import type { UserInfoResponse } from "./users";

export interface ListFollowersResponse {
    followers: UserInfoResponse[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    msg?: string;
}

export interface ListMembersResponse {
    members: UserInfoResponse[];
    has_next_page: boolean;
    next_cursor: string;
    status: string;
    msg?: string;
}

