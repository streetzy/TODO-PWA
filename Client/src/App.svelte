<script lang="ts">
    import { onMount } from "svelte";
    import UserTodo from "./lib/components/UserTodo.svelte";
    import LoginRegistePage from "./lib/components/LoginRegistePage.svelte";
    import Calendar from "./lib/components/Calendar.svelte";
    import { isLoggedIn } from "./lib/stores/auth.js";
    import { inCalendarView } from "./lib/stores/buttons.js";
    
    let isUserAuthenticated = false;
    let isInCalendarView = false;

    onMount(() => {
        isLoggedIn.subscribe(value => {
            isUserAuthenticated = value;
        })

        inCalendarView.subscribe(value => {
            isInCalendarView = value;
        })
    });
</script>

<main>
    {#if $isLoggedIn}
        {#if isInCalendarView}
        <Calendar></Calendar>
        {:else}
        <UserTodo></UserTodo>
        {/if}
    {:else}
        <LoginRegistePage></LoginRegistePage>
    {/if}
</main>

<style>
</style>
