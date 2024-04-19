<script lang="ts">
</script>
    
<main>
    <nav>
        <button class="calendar-view">CALENDAR VIEW</button>
        <button class="group-view">GROUP VIEW</button>
        <div class="dropdown">
            <h1 class="username">USERNAME</h1>
            <button class="sign-out"></button>
        </div>
    </nav>

    <div class="content">
        <div class="todo">
            <div class="header">
                <h1>TO-DO</h1>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                <div class="todo-item">
                    <h3>TODOITEM</h3>
                    <button class="to-working-on"></button>
                    <button class="todo-info"></button>
                    <button class="remove"></button>
                </div>
            </div>
            
        </div>
        <div class="todo">
            <div class="header">
                <h1>WORKING ON</h1>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                <div class="todo-item">
                    <h3>TODOITEM</h3>
                    <button class="to-completed"></button>
                    <button class="todo-info"></button>
                    <button class="remove"></button>
                </div>
            </div>
            
        </div>
        <div class="todo">
            <div class="header">
                <h1>DONE</h1>
            </div>

            <div class="todo-items">
                <!--Basic todo item template, to be replaced-->
                <div class="todo-item">
                    <h3>TODOITEM</h3>
                    <button class="todo-info"></button>
                    <button class="remove"></button>
                </div>
            </div>
            
        </div>
    </div>
</main>

<style>

    main {
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
    }

    .content {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .todo {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 33.33%;
        justify-content: center;
        align-items: center;
    }
</style>
