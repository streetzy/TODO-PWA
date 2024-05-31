<script lang="ts">
    
    import { onMount } from "svelte";
    import { userJsonData, viewedGroupId, viewedGroupName, inCalendarView } from "../stores/data";

    const URL: string = "http://localhost:3000/";

    let isInInviteView: boolean = false;
    let acceptingInvites: boolean = false;
    let showAddInviteWindow: boolean = false;
    let groupInvites: {inviteId: string, userName: string}[];

    let isInGroupView: boolean = false;
    let addingGroup: boolean = false;
    let addingTodoWindow: boolean = false;
    let editingTodoWindow: boolean = false;

    let groupPopUpFlag: boolean = true;
    let userTokenId: {userId: string, accessToken: string, refreshToken: string} | null;
    let userId: string | undefined;
    let userGroupData: {groupId: string; groupName: string}[];
    let currentTodoId: string = "";

    let currentGroupId: string = "";
    let currentGroupName: string = "";

    let currentTodo: {todoName: string, status: string, todoContent: string, authorId: string, deadline: string | undefined};

    let wantedUserId: string | undefined = "";

    let requestedUserInfo: {userName: string, email: string};

    let todoItems : {todoName: string, status: string, todoId: string}[] = [];

    let accessToken: string | undefined;

    onMount(() => {
        userJsonData.subscribe(value => {
            userTokenId = value;
        })
        accessToken = userTokenId?.accessToken;
        userId = userTokenId?.userId;
        findUserGroups();
    })

    function selectGroup(groupId: string, groupName: string) {
        viewedGroupId.set(groupId)
        
        viewedGroupName.set(groupName)

        viewedGroupName.subscribe(value => {
            currentGroupName = value;
        })

        viewedGroupId.subscribe(value => {
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
    }

    async function getTodo() {
        const response = await fetch(URL + "todo/" + currentTodoId, {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "GET"
        })

        currentTodo = await response.json();
    }

    function showAddingGroupWindow() {
        addingGroup = !addingGroup;

        findUserGroups();
    }

    async function getUserInfo() {
        const response = await fetch(URL + "user/" + wantedUserId, {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "GET",
        })

        requestedUserInfo = await response.json();
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
        await fetch(URL + "todo", {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                "todoName": (document.getElementById("todo-name") as HTMLInputElement).value,
                "todoDescription": (document.getElementById("todo-description") as HTMLInputElement).value,
                "todoDeadline": (document.getElementById("todo-date") as HTMLInputElement).value,
                "groupId": currentGroupId,
            })
        })
        showAddingTodoWindow();
        getTodos();
    }

    async function removeTodo(todoId: string) {
        await fetch(URL + "todo/" + todoId, {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "DELETE",
            body: JSON.stringify({
                groupId: currentGroupId
            })
        })
        getTodos();
    }

    async function editTodo(todoId: string) {
        await fetch(URL + "todo/" + todoId, {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "PATCH",
            body: JSON.stringify({
                "changeInformation": true,
                "changeName": (document.getElementById("edit-todo-name") as HTMLInputElement).value,
                "changeDescription": (document.getElementById("edit-todo-description") as HTMLInputElement).value,
                "changeDeadline": (document.getElementById("edit-todo-date") as HTMLInputElement).value
            })
        })
        showEditingTodoWindow()
        getTodos();
    }

    async function moveTo(todoId: string, where: string) { // where being the working-on tab or the done tab
        await fetch(URL + "todo/" + todoId, {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "PATCH",
            body: JSON.stringify({
                "changeStatus": where
            })
        })

        getTodos();
    }

    async function addGroup() {
        await fetch(URL + "group", {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                "groupName": (document.getElementById("group-name") as HTMLInputElement).value
            })
        })

        findUserGroups();
        showAddingGroupWindow();
        
    }

    async function showInformation(todoId: string) {
        currentTodoId = todoId;
        await getTodo(); //before showing the editor window, wait for the getTodo to run
        wantedUserId = currentTodo.authorId;
        await getUserInfo();
        showEditingTodoWindow();
    }

    async function addInvite() {

    }

    async function getGroupInvites() {
        const response = await fetch(URL + "group/" + currentGroupId + "/invite", {
            headers: {
                "Authorization": `${accessToken}`,
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "GET"
        })

        groupInvites = await response.json();
        console.log(groupInvites);
    }

    function acceptingInviteView() {
        acceptingInvites = !acceptingInvites;
    }
    
    function showInviteView () {
        isInInviteView = !isInInviteView

        wantedUserId = userId;
        getUserInfo();
        getGroupInvites();
    }

    function showGroupPopUp() {
        groupPopUpFlag = !groupPopUpFlag;

        findUserGroups();
    }

    function showAddingTodoWindow() {
        addingTodoWindow = !addingTodoWindow;
    }

    function showEditingTodoWindow() {
        editingTodoWindow = !editingTodoWindow;
    }

</script>
    
<main>
    {#if isInInviteView}
        <div class="invite-view-content">
            <nav>
                <button class="button-text" on:click={()=>showInviteView()}>TODOs</button>
                <button class="button-text" on:click={()=>addInvite()}>ADD</button>
                <button class="button-text" on:click={()=>acceptingInviteView()}>{acceptingInvites ? "GROUP VIEW" : "USER VIEW"}</button>
                <h1 class="username">{acceptingInvites ? requestedUserInfo.userName : currentGroupName}</h1>
            </nav>
        </div>
    {/if}
    {#if editingTodoWindow} <!--haha same chunk of code but too dumb to remake this in a smart away whilst utilizing Svelte-->
        <div class="adding-todo-window">
            <div class="input">
                <h1 class="add-todo-header">Name Of Todo</h1>
                <input class="todo-input" value={currentTodo.todoName} type="text" id="edit-todo-name">
            </div>
            <div class="input">
                <h1 class="add-todo-header">Author of Todo</h1>
                <h3>{requestedUserInfo.userName}</h3>
            </div>
            <div class="input">
                <h1 class="add-todo-header">Description Of Todo</h1>
                <input class="todo-input" value={currentTodo.todoContent} type="text" id="edit-todo-description">
            </div>
            <div class="input">
                <h1 class="add-todo-header">Deadline</h1>
                <input class="todo-input" value={currentTodo.deadline ? currentTodo.deadline : ""} type="date" id="edit-todo-date" min="1970-01-01">
            </div>
            <button class="add-button" on:click={()=>editTodo(currentTodoId)}>SUBMIT</button>
            <button class="add-button" on:click={()=>showEditingTodoWindow()}>CANCEL</button>
        </div>
    {/if}
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
                    <button class="select-group" on:click={()=>selectGroup(userGroup.groupId, userGroup.groupName)}>{userGroup.groupName}</button>
                {/each}
            </div>
        </div>
        {#if addingGroup}
        <div class="groupDetails">
            <h1 class="groupHeader">ADD GROUP</h1>
            <div class="groupInput">
                <input class="inputText" id="group-name" type="text" placeholder="More than 4 characters!">
                <button class="inputButton" on:click={()=>addGroup()}>SUBMIT</button>
                <button class="inputButton" on:click={()=>showAddingGroupWindow()}>GROUP VIEW</button>
            </div>
        </div>
        {/if}
    {:else}
    <nav>
        <button class="calendar-view" on:click={() => swapToCalendar()}><h1 class="button-text">CALENDAR VIEW</h1></button>
        <button class="group-view" on:click={() => showGroupPopUp()}><h1 class="button-text">GROUP VIEW</h1></button>
        <button class="invite-view" on:click={() => showInviteView()}><h1 class="button-text">INVITES</h1></button>
        <div class="dropdown">
            <h1 class="username">{currentGroupName}</h1>
            <button class="sign-out">SIGN OUT</button>
        </div>
    </nav>

    <div class="content">
        <div class="todo to-do-tab">
            <div class="header">
                <h1>TO-DO</h1>
                <button class="addTodoButton" on:click={()=>showAddingTodoWindow()}>+</button>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                {#each todoItems as todo}
                {#if todo.status == "to-do"}
                <div class="todo-item">
                    <div class="todo-item-name">
                        <h3>{todo.todoName}</h3>
                    </div>
                    <div class="buttons">
                        <button on:click={() => moveTo(`${todo.todoId}`, "working-on")} class="to-working-on"></button>
                        <button on:click={() => showInformation(`${todo.todoId}`)} class="todo-info"></button>
                        <button on:click={() => removeTodo(`${todo.todoId}`)} class="remove"></button>
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
                {#if todo.status == "working-on"}
                <div class="todo-item">
                    <div class="todo-item-name">
                        <h3>{todo.todoName}</h3>
                    </div>
                    <div class="buttons">
                        <button on:click={() => moveTo(`${todo.todoId}`, "done")} class="to-working-on"></button>
                        <button on:click={() => showInformation(`${todo.todoId}`)} class="todo-info"></button>
                        <button on:click={() => removeTodo(`${todo.todoId}`)} class="remove"></button>
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
                {#if todo.status == "done"}
                <div class="todo-item">
                    <div class="todo-item-name">
                        <h3>{todo.todoName}</h3>
                    </div>
                    <div class="buttons">
                        <button on:click={() => showInformation(`${todo.todoId}`)} class="todo-info"></button>
                        <button on:click={() => removeTodo(`${todo.todoId}`)} class="remove"></button>
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

    .invite-view-content {
        position: absolute;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 3;
        background-color: #393939;
    }

    .invite-view-content {
        z-index: 3;
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
        border-radius: 20px;
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
        z-index: 3;
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
        z-index: 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #393939;
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
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

    .todo-item-name {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
    }
</style>
