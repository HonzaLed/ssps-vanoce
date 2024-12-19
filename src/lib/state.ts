import { writable, type Writable } from "svelte/store";
import type { Team } from "./api";
import { browser } from "$app/environment";

export type State = {
    username: string;
    email: string;
    loggedIn: boolean;
    role: string | null;
    team: Team | null;
}

export const state: Writable<State> = writable(browser ? JSON.parse(localStorage.getItem("state")??"{}") : {} as State);

state.subscribe((value) => {
    console.log("State changed", value);
    if (!browser) {return;}
    localStorage.setItem("state", JSON.stringify(value));
});