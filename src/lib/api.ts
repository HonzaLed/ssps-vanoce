const API_URL = "https://vanoce-api.robincloud.xyz/api";

export async function getEventCountdown(spoof: number|null = null) {
    let response = await fetch(API_URL + "/event/countdown" + (spoof !== null ? "?start_timestamp=" + spoof : ""));
    if (response.ok) {
        return await response.json();
    }
    return {};
}