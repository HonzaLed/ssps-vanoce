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
    role: string | null,
    role_description: string | null,
    error: string | null,
}

async function req(url: string, body: object | null = null) {
    const req_url = API_URL + url;
    if (body !== null) {
        return await fetch(req_url, { method: "POST", body: JSON.stringify(body) });
    }
    return await fetch(req_url);
}

export async function getEventCountdown(spoof: number | null = null): Promise<Result<Countdown, any>> {
    let response = await req("/event/countdown" + (spoof !== null ? "?start_timestamp=" + spoof : ""));
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

export async function getQR(code: string): Promise<Result<string, string>> {
    let response = await req(`/tasks/getqr?code=${code}`);
    if (response.ok) {
        return Result.Ok(await response.json());
    }
    return Result.Error("Failed to get QR code");
}

// export async function answerQrTask(code: string, answer: string): Promise<Result<string, string>> {
//     const body = { answer: answer };
//     let response = await req(`/api/tasks/answer?task=${code}&answer=${answer}`);
//     if (response.ok) {
//         return Result.Ok(await response.text());
//     }
//     return Result.Error("Failed to answer task");
// }