import Result from "./result";

const API_URL = "https://vanoce-api.robincloud.xyz/api";

export type Countdown = {
    started: boolean,
    starts_at: number,
    current_timestamp: number,
    redirect_url: string | undefined,
}

export type Register = {
    success: boolean,
    role: "runner" | "solver" | null,
    role_description: string | null,
    team: Team | null,
    error: string | null,
}

export type TeamInfo = {
    success: boolean;
    role: "runner" | "solver" | null;
    team: Team;
    error: string | null;
}

export type Team = {
    id: string;
    members: string[];
    number: number;
    score: number;
}

export type QrCode = {
    success: boolean;
    task_group: string | null;
    error: string | null;
}

export type Task = {
    identifier: string,
    scanner_task: TaskBasic,
    team_task: TaskBasic,
}

export type TaskBasic = {
    title: string,
    description: string | null,
    points: number,
    no_answer: boolean,
};

export type QrInfo = {
    success: boolean,
    task: Task,
};

export type QrAnswer = {
    success: boolean,
    correct: boolean | null,
    error: string | null,
}

export type ActiveTasks = {
    success: boolean,
    active_tasks: TaskBasic[] | null,
    error: string | null,
}

export type CompletedTasks = {
    success: boolean,
    completed_tasks: TaskBasic[] | null,
    error: string | null,
}

async function req(url: string, body: object | null = null) {
    const req_url = API_URL + url;
    if (body !== null) {
        return await fetch(req_url, { method: "POST", body: JSON.stringify(body), credentials: "include" });
    }
    return await fetch(req_url, { credentials: "include" });
}

export async function getEventCountdown(spoof: number | null = null): Promise<Result<Countdown, any>> {
    let response = await req("/event/countdown/" + (spoof !== null ? "?start_timestamp=" + spoof : ""));
    if (response.ok) {
        return Result.Ok(await response.json());
    }
    return Result.Error(response);
}

export async function register(username: string, email: string): Promise<Result<Register, string>> {
    const body = { username: username, email: email };
    let response = await req("/auth/register/", body);
    try {
        const json = await response.json()
        if (json.success) {
            return Result.Ok(json);
        } else {
            console.log(json);
            return Result.Error(json.error!);
        }
    } catch (e) {
        return Result.Error("Failed to register");
    }
}

export async function getTeamInfo(): Promise<Result<TeamInfo, string>> {
    let response = await req(`/teams/get-info/`);
    if (response.status === 500) {
        return Result.Error("Internal server error");
    }
    const j = await response.json();
    if (j.success) {
        return Result.Ok(j);
    }
    return Result.Error(j.error);
}

export async function getQr(code: string): Promise<Result<QrCode, string>> {
    let response = await req(`/tasks/on-scan/?task=${code}`);
    if (response.status === 500) {
        return Result.Error("Internal server error");
    }
    const j = await response.json();
    if (j.success) {
        return Result.Ok(j);
    }
    return Result.Error(j.error);
}

export async function getQrInfo(code: string): Promise<Result<QrInfo, string>> {
    let response = await req(`/tasks/get-info/?task=${code}`);
    if (response.status === 500) {
        return Result.Error("Internal server error");
    }
    const j = await response.json();
    if (j.success) {
        return Result.Ok(j);
    }
    return Result.Error(j.error);
}

export async function answerQrCode(code: string, answer: string, type: "scanner" | "team"): Promise<Result<QrAnswer, string>> {
    const body = { task: code, answer: answer, type: type };
    let response = await req(`/tasks/answer/`, body);
    if (response.status === 500) {
        return Result.Error("Internal server error");
    }
    const j = await response.json();
    if (j.success) {
        return Result.Ok(j);
    }
    return Result.Error(j.error);
}

export async function getActiveTasks(): Promise<Result<ActiveTasks, string>> {
    let response = await req(`/tasks/list-active/`);
    if (response.status === 500) {
        return Result.Error("Internal server error");
    }
    const j = await response.json();
    if (j.success) {
        return Result.Ok(j);
    }
    return Result.Error(j.error);
}

export async function getCompletedTasks(): Promise<Result<CompletedTasks, string>> {
    let response = await req(`/tasks/list-completed/`);
    if (response.status === 500) {
        return Result.Error("Internal server error");
    }
    const j = await response.json();
    if (j.success) {
        return Result.Ok(j);
    }
    return Result.Error(j.error);
}