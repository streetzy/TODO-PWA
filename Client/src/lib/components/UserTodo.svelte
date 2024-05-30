<script lang="ts">
    
    import { onMount } from "svelte";
    import { userJsonData, viewedGroup, inCalendarView } from "../stores/data";

    const URL: string = "http://localhost:3000/";

    let isInGroupView: boolean = false;
    let addingGroup: boolean = false;
    let addingTodoWindow: boolean = false;

    let groupPopUpFlag: boolean = true;
    let userTokenId: {userId: string, accessToken: string, refreshToken: string} | null;
    let userId: string | undefined;
    let currentUserInfo = null;
    let userGroupData: {groupId: string; groupName: string}[];


    let currentGroupId: string = "";
    let groupInformation: {groupId: string, todos: [], groupName: string, invitedUsers: [], ownerId: string, members: []} | null = null;

    let todoItems : {todoName: string, todoStatus: string, todoContent: string, authorId: string, deadline: string | null, group: string | null }[] = [];

    let accessToken: string | undefined;

    onMount(() => {
        userJsonData.subscribe(value => {
            userTokenId = value;
        })
        accessToken = userTokenId?.accessToken;
        userId = userTokenId?.userId;
        findUserGroups();
    })

    function selectGroup(groupId: string) {
        viewedGroup.set(groupId)
        
        viewedGroup.subscribe(value => {
            currentGroupId = value;
        })

        showGroupPopUp();
        getTodos();
    }

    function swapToCalendar() {
        inCalendarView.set(true);
    }

    async function getTodos() {
        const response = await fetch(URL + "group/" + currentGroupId + "/todo" , {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "GET"
        })

        todoItems = await response.json();
        console.log(todoItems);
    }
    function showAddingGroupWindow() {
        addingGroup = !addingGroup;
    }

    async function getUserInfo() {
        const response = await fetch(URL + "user/" + userId, {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "GET",
        })

        currentUserInfo = await response.json();
    }

    async function findUserGroups() {
        const response = await fetch(URL + "user/" + userId + "/group", {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "GET"
        })

        userGroupData = await response.json();
    }


    async function addTodo() {
        const response = await fetch(URL + "todo", {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify({

            })
        })
    }

    async function removeTodo(todoId: string) {

    }

    async function moveTo(todoId: string) {

    }

    function showInformation(todoId: string) {

    }  

    // async function addGroup() { // not used yet
    //     const response = await fetch(URL + "group", {
    //         headers: {
    //             "Authorization": `${accessToken}`,
    //             "Content-Type": "application/json"
    //         },
    //         mode: "cors",
    //         method: "POST",
    //         body: JSON.stringify({
    //             "groupName": (document.getElementById("groupName") as HTMLInputElement).value
    //         })
    //     })
    //     showGroupPopUp();

    //     groupId = await response.json();
    //     console.log(groupId);
        
    // }

    function showGroupPopUp() {
        groupPopUpFlag = !groupPopUpFlag;

        findUserGroups();
    }

    function showAddingTodoWindow() {
        addingTodoWindow = !addingTodoWindow;
    }

</script>
    
<main>
    {#if addingTodoWindow}
        <div class="adding-todo-window">
            <div class="input">
                <h1 class="add-todo-header">Name Of Todo</h1>
                <input class="todo-input" type="text" id="todo-name">
            </div>
            <div class="input">
                <h1 class="add-todo-header">Description Of Todo</h1>
                <input class="todo-input" type="text" id="todo-description">
            </div>
            <div class="input">
                <h1 class="add-todo-header">Deadline</h1>
                <input class="todo-input" type="date" id="todo-date" min="1970-01-01">
            </div>
            <button class="add-button" on:click={()=>addTodo()}>SUBMIT</button>
            <button class="add-button" on:click={()=>showAddingTodoWindow()}>CANCEL</button>
        </div>
    {/if}
    {#if groupPopUpFlag && userGroupData != null && userGroupData != undefined}
        <div class="group-pop-up-container">
            <div class="group-pop-up-header">
                <h1 class="group-view-header">GROUP VIEW</h1>
                <button class="return-to-todo-menu" on:click={() => showGroupPopUp()}>RETURN TO TODO</button>
                <button class="add-group" on:click={() => showAddingGroupWindow()}>ADD GROUP</button>
            </div>
            <div class="group-display">
                {#each userGroupData as userGroup}
                    <button class="select-group" on:click={()=>selectGroup(userGroup.groupId)}>{userGroup.groupName}</button>
                {/each}
            </div>
        </div>
        {#if addingGroup}
        <div class="groupDetails">
            <h1 class="groupHeader">SHOWN GROUPS</h1>
            <div class="groupInput">
                <input class="inputText" id="groupName" type="text">
                <button class="inputButton">SUBMIT</button>
                <button class="inputButton" on:click={()=>showAddingGroupWindow()}>RETURN TO GROUP VIEW</button>
            </div>
        </div>
        {/if}
    {:else}
    <nav>
        <button class="calendar-view" on:click={() => swapToCalendar()}><h1 class="button-text">CALENDAR VIEW</h1></button>
        <button class="group-view" on:click={() => showGroupPopUp()}><h1 class="button-text">GROUP VIEW</h1></button>
        <div class="dropdown">
            <h1 class="username">USERNAME</h1>
            <button class="sign-out">SIGN OUT</button>
        </div>
    </nav>

    <div class="content">
        <div class="todo to-do-tab">
            <div class="header">
                <h1>TO-DO</h1>
                {#if !addingTodoWindow}
                <button class="addTodoButton" on:click={()=>showAddingTodoWindow()}>+</button>
                {/if}
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                {#each todoItems as todo}
                {#if todo.todoStatus == "todo"}
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
                {/if}
                {/each}
            </div>
            
        </div>
        <div class="todo working-on-tab">
            <div class="header">
                <h1>WORKING ON</h1>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                {#each todoItems as todo}
                {#if todo.todoStatus == "working-on"}
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
                {/if}
                {/each}
            </div>
            
        </div>
        <div class="todo done-tab">
            <div class="header">
                <h1>DONE</h1>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                {#each todoItems as todo}
                {#if todo.todoStatus == "done"}
                <div class="todo-item">
                    <div class="todo-item-name">
                        <h3>TODOITEM</h3>
                    </div>
                    <div class="buttons">
                        <button on:click={() => showInformation("tempString")} class="todo-info"></button>
                        <button on:click={() => removeTodo("tempString")} class="remove"></button>
                    </div>
                </div>
                {/if}
                {/each}
            </div>
            
        </div>
    </div>

    {/if}
</main>

<style>

    main {
        height: 100vh;
        width: 100vw;
        background-color: #393939;
    }

    .todo-input {
        height: 100%;
        width: 50%;
        justify-content: center;
        text-align: center;
        font-size: 1.125rem;
        line-break: auto;
    }

    .add-button {
        width: 75%;
        height: 10%;
        font-size: 1.5rem;
    }

    .add-todo-header {
        margin: 0;
        font-size: 2rem;
    }

    .input {
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .adding-todo-window {
        top: 25%;
        left: 25%;
        width: 50vw;
        height: 60vh;
        position: absolute;
        background-color: #393939;
        z-index: 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.125rem;
    }

    .select-group {
        width: 80vw;
        height: 5vh;
        font-size: 1.5rem;
    }

    .group-view-header {
        font-size: 2rem;
        text-align: center;
        margin-top: 0;
    }

    .group-pop-up-container {
        display: flex;
        flex-direction: column;
    }

    .group-pop-up-header {
        height: 10vh;
        width: 100vw;
    }

    .group-display {
        width: 100vw;
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        gap: 0.125rem;
    }

    .return-to-todo-menu {
        width: 20vw;
        height: 8vh;
        font-size: 2rem;
        position: absolute;
        top: 0px;
        right: 0px;
    }

    .add-group {
        z-index: 0;
        width: 20vw;
        height: 8vh;
        font-size: 2rem;
        position: absolute;
        top: 0px;
        left: 0px;
    }

    .groupHeader {
        font-size: 3rem;
        height: 40%;
        width: 100%;
        text-align: center;
        margin: 0;
    }

    .groupInput {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 15rem;
        height: 60%
    }

    .groupInput input {
        width: 30vw;
        height: 10%;
    }

    .groupInput button {
        width: 30.5vw;
        height: 11.25%;
        font-size: 1.5rem;
    }

    .groupDetails {
        z-index: 1;
        display: flex;
        flex-direction: column;
        position: absolute;
        justify-content: center;
        align-items: center;
        background-color: #393939;
        height: 100vh;
        width: 100vw;
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
        z-index: 2;
        line-height: 0;
        font-size: 3rem;
    }

    .sign-out {
        z-index: 1;
        height: 100%;
        width: 100%;
        display: none;
        padding-top: 6rem;
        font-size: 2rem;
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

    .dropdown:hover .username {
        position: absolute;
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
        position: relative;
        display: flex;
        flex-direction: column;
        height: 95%;
        width: 25%;
        justify-content: center;
        align-items: center;
        border-radius: 2.5rem;
    }

    .addTodoButton { 
        position: absolute;
        left: 80%;
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        border-style: solid;
        font-size: 2rem;
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
