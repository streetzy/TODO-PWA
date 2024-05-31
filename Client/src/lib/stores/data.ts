import { writable } from "svelte/store";
export const userJsonData = writable(null);
export const viewedGroupId = writable("");
export const viewedGroupName = writable("");
export const inCalendarView = writable(false);
export const viewedTodo = writable(null);
