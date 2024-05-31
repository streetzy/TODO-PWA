import { writable } from "svelte/store";
export const userJsonData = writable(null);
export const viewedGroup = writable("");
export const inCalendarView = writable(false);
