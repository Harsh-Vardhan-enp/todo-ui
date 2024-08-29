import { writable } from "svelte/store";

export const tokenS = writable<string | null>(null);