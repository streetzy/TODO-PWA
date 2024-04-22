<script lang="ts">
    import { onMount } from "svelte";
    import { userJsonData } from "../stores/data";

    let userData;
    let userId: string | null = null;

    onMount(() => {
        userJsonData.subscribe(value => {
            userId = value;
        })
        getAllUserData();
    })
    async function getAllUserData() {
        const response = await fetch(`http://localhost:3000/user/${userId}`, {
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "GET"
        })
    }

    async function removeTodo(todoId: string) {

    }

    async function moveTo(todoId: string) {

    }

    async function showInformation(todoId: string) {

    }  


</script>
    
<main>
    <form>
        <h1>ENTER GROUP NAME</h1>
        <p></p>
        <label for="groupName">Group name:</label>
        <input id="groupName" type="text">
    </form>


    <nav>
        <button class="calendar-view"><h1 class="button-text">CALENDAR VIEW</h1></button>
        <button class="group-view"><h1 class="button-text">GROUP VIEW</h1></button>
        <div class="dropdown">
            <h1 class="username">USERNAME</h1>
            <button class="sign-out"></button>
        </div>
    </nav>

    <div class="content">
        <div class="todo to-do-tab">
            <div class="header">
                <h1>TO-DO</h1>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                <div class="todo-item">
                    <div class="todo-item-name">
                        <h3>TODOITEM</h3>
                    </div>
                    <div class="buttons">
                        <button on:click={() => moveTo("tempString")} class="to-working-on"></button>
                        <button on:click={() => showInformation("tempString")} class="todo-info"></button>
                        <button on:click={() => removeTodo("tempString")} class="remove"></button>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="todo working-on-tab">
            <div class="header">
                <h1>WORKING ON</h1>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                <div class="todo-item">
                    <div class="todo-item-name">
                        <h3>TODOITEM</h3>
                    </div>
                    <div class="buttons">
                        <button on:click={() => moveTo("tempString")} class="to-completed"></button>
                        <button on:click={() => showInformation("tempString")} class="todo-info"></button>
                        <button on:click={() => removeTodo("tempString")} class="remove"></button>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="todo done-tab">
            <div class="header">
                <h1>DONE</h1>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                <div class="todo-item">
                    <div class="todo-item-name">
                        <h3>TODOITEM</h3>
                    </div>
                    <div class="buttons">
                        <button on:click={() => showInformation("tempString")} class="todo-info"></button>
                        <button on:click={() => removeTodo("tempString")} class="remove"></button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</main>

<style>

    main {
        height: 100vh;
        width: 100vw;
        background-color: #393939;
    }

    nav {
        height: 12.5vh;
        background-color: #4E4E4E;
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    nav > button {
        height: 90%;
        width: 28rem;
        font-size: 3rem;
        border-radius: 2rem;
        border-style: solid;
        border-color: #4E4E4E;
    }

    .button-text {
        line-height: 0;
        font-size: 3rem;
    }

    .username {
        line-height: 0;
        font-size: 3rem;
        position: absolute;
    }

    .sign-out {
        height: 100%;
        width: 100%;
        display: none;
    }

    .dropdown {
        height: 90%;
        width: 28rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .dropdown:hover button {
        display: initial;
        background-color: #4E4E4E;
        border-color: #4E4E4E;
        border-style: solid;
    }

    .content {
        height: 87.5vh;
        width: 100vw;
        display: flex;
        gap: 4rem;
        justify-content: space-around;
        align-items: center;
    }

    .todo {
        display: flex;
        flex-direction: column;
        height: 95%;
        width: 25%;
        justify-content: center;
        align-items: center;
        border-radius: 2.5rem;
    }

    .to-do-tab {
        background-color: #8F8585;
    }

    .to-do-tab .todo-item {
        background-color: #B19C9C;
    }

    .working-on-tab {
        background-color: #8F867B;
    }

    .working-on-tab .todo-item {
        background-color: #B3A492;
    }

    .done-tab {
        background-color: #889C82;
    }

    .done-tab .todo-item {
        background-color: #9FB798;
    }

    .header {
        width: 90%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
    }

    .todo-items {
        width: 90%;
        height: 80%;
    }

    .todo-item {
        border-radius: 1.5rem;
        width: 100%;
        height: 20%;
        display: flex;
    }

    .buttons {
        width: 40%;
        height: 100%;
        gap: 0.125rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .buttons > button {
        border-style: solid;
        border-color:#e0dede;
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        overflow: hidden;
    }

    .todo-info {
        background-color: #A6C4FF;
    }

    .remove {
        background-color: #EBAFAF;
    }

    .to-working-on {
        background-color: #E8BF8C;
    }

    .to-completed {
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        background-color: #B8E6AB;
    }

    .todo-item-name {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }
</style>
