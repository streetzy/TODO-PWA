<script lang="ts">
    import { onMount } from "svelte";
    import UserTodo from "./lib/components/UserTodo.svelte";
    import LoginRegistePage from "./lib/components/LoginRegistePage.svelte";
    import { isLoggedIn } from "./lib/stores/auth.js";
    
    let isUserAuthenticated = false;

    onMount(() => {
        isLoggedIn.subscribe(value => {
            isUserAuthenticated = value;
        })
    });
</script>

<main>
    {#if $isLoggedIn}
        <UserTodo></UserTodo>
    {:else}
        <LoginRegistePage></LoginRegistePage>
    {/if}
</main>

<style>
</style>
