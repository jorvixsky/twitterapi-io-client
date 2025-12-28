export interface AddUserToMonitorRequest {
    x_user_name: string;
}

export interface RemoveUserFromMonitorRequest {
    x_user_name: string;
}

export interface StreamResponse {
    status: "success" | "error";
    msg: string;
}

