import type { UserInfoResponse } from "./users";

export interface SpaceDetailResponse {
    id: string;
    state: string;
    title?: string;
    created_at?: string;
    started_at?: string;
    ended_at?: string;
    updated_at?: string;
    host_ids?: string[];
    speaker_ids?: string[];
    creator_id?: string;
    lang?: string;
    is_ticketed?: boolean;
    participant_count?: number;
    subscriber_count?: number;
    scheduled_start?: string;
    creator?: UserInfoResponse;
    hosts?: UserInfoResponse[];
    speakers?: UserInfoResponse[];
    status: string;
    msg: string;
}

