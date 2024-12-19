import { writable, type Writable } from "svelte/store";

export type State = {
    username: string;
    email: string;
    role: string | null;
}

export const state: Writable<State> = writable({username: ""} as State);

state.subscribe((value) => {
    console.log("State changed", value);
});