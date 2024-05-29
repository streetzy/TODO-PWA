<script lang="ts">
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"]

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = months[currentDate.getMonth()];

    function changeMonth(previousFlag: boolean) {
        if (previousFlag) {
            if (currentMonth == "January") {
                currentYear--;
                currentMonth = "December";
                return;
            }
        }
        else {
            if (currentMonth == "December") {
                currentYear++;
                currentMonth = "January";
                return;
            }
        }


        //get the index of the month selected, then add 1
        previousFlag ?   
        currentMonth = months[months.findIndex(month => month == currentMonth) - 1] :
        currentMonth = months[months.findIndex(month => month == currentMonth) + 1];

    }
</script>

<main>
    <nav>
        <button class="return"><h1 class="button-text">RETURN</h1></button>
        <div class="date-content">
            <button on:click={()=> changeMonth(true)}>&lt</button>
            <div class="date-header-container">
                <h1 class="date">{currentMonth} {currentYear}</h1>
            </div>
            <button on:click={()=> changeMonth(false)}>&gt</button>
        </div>
        <div class="dropdown">
            <h1 class="username">USERNAME</h1>
            <button class="sign-out">SIGN OUT</button>
        </div>
    </nav>
    <div class="calendar-content"></div>
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

    .date-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        height: 100%;
        width: 50%;
    }
    
    .return {
        height: 90%;
        width: 25%;
         
    }

    .date-content > button {
        height: 50%;
        width: 10%;
        border-style: solid;
        border-radius: 100%;
        border-color: #4e4e4e;
        font-size: 2rem;
    }

    .date-header-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 50%;
    }

    .date {
        text-align: center;
        width: 100%;
        font-size: 3rem;
        line-height: 0;
        margin: 0;
    }

    .username {
        line-height: 0;
        font-size: 3rem;
        width: 25%;
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

    .dropdown:hover .username {
        position: absolute;
    }

    .calendar-content {
        height: 87.5vh;
        width: 100vw;
    }
</style>
