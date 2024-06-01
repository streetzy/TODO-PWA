<script lang="ts">
  import { onMount } from "svelte";
  import { viewedGroupId, viewedGroupName , inCalendarView, userJsonData } from "../stores/data";
  import App from "../../App.svelte";
    const URL = "http://localhost:3000/";
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"]

    let userTokenId: {userId: string, accessToken: string, refreshToken: string} | null;
    let accessToken: string | undefined;
    let currentGroupId: string;
    let displayedGroupName: string;

    let todoItems : {todoName: string, status: string, todoId: string, deadline: string}[] = [];
    let orderedTodos : {[date: string]: {todoName: string, status: string, todoId: string}[]} = {};

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = months[currentDate.getMonth()];
    let amountOfTodos = 0;
    let displayedDate: string = "";
    let showDayInfoWindow = false;
    let dateForLookUp: string = "";

    let calendarDays : (null|number)[][] = [];

    function orderTodos() { // clear the orderedTodos from previous entries, then go through todoItems, use key that we sort the deadline with
        // then make an array for the date/day and add the todo to it, but if the deadline is "", then continue w/ the next todo item
        // need to make the day in the format so that the month AND day doesn't start with 0 when they're of length 1
        // will achieve this by converting them to numbers and then sending them back to the restructuredDate
        let restructuredDate = "";
        let dateToNumArray: number[] = [];
        orderedTodos = {};
        for(let todo = 0; todo < todoItems.length; todo++) {
            if(!todoItems[todo].deadline) continue;
            dateToNumArray.push(...todoItems[todo].deadline.split("-").map((datePart) => parseInt(datePart)));
            restructuredDate = `${dateToNumArray[0]}-${dateToNumArray[1]}-${dateToNumArray[2]}`

            if (!orderedTodos[restructuredDate]) {
                orderedTodos[restructuredDate] = [];
            }
            orderedTodos[restructuredDate].push(todoItems[todo]);

            dateToNumArray = [];
        }
       
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
        orderTodos();
        console.log(orderedTodos);
    }

    async function showDayInfo(day: number) {
        dateForLookUp = `${currentYear}-${months.findIndex(month => month == currentMonth) + 1}-${day}`
        displayedDate = `${day}. ${currentMonth} ${currentYear}`;

        toggleDayInfoWindow();
    }

    function toggleCalendarView() {
        inCalendarView.set(false);
    }

    function toggleDayInfoWindow() {
        showDayInfoWindow = !showDayInfoWindow;
    }

    function firstDayIndexInMonth(month: number) {
        const date = new Date(currentYear, month, 1) // the first day of the month in the year
        return date.getDay(); // returns the number index of the day, so if it gave 0, then we'd get Sunday
    }

    function daysInMonth(month: number) { // get the amount of days in the month, then sort that into an array of arrays, where each has 7 (or less for the last week) days
        const firstDayOfMonth = firstDayIndexInMonth(months.findIndex(month => month == currentMonth)); // returns an index, we then look it up in the days array and
        // create the calendar grid off of that
        calendarDays = [];
        let week = [];
        const date = new Date(currentYear, month + 1, 0); // returns last day, remember that month index starts from 0
        const lengthOfMonth = date.getDate();
        
        // go through the amount of days in the month, as well as the beginning null days
        for(let day = 0; day < firstDayOfMonth + lengthOfMonth; day++) {
            if(week.length == 7) {
                calendarDays.push(week)
                week = [];
            }

            if(day < firstDayOfMonth) {
                week.push(null)
                continue;
            }

            week.push(day - firstDayOfMonth + 1); // push the index of the day (starts from zero hence + 1) and subtract the starting null days
        }

        while(week.length < 7) {
            week.push(null);
        }
        calendarDays.push(week); // push the remainder
    }

    // ensure that if transitioning from year to year, we don't return undefined, instead we retrieve the previous/next year
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


        //get the index of the month selected, then add/subtract 1, then get name of that month
        previousFlag ?   
        currentMonth = months[months.findIndex(month => month == currentMonth) - 1]:
        currentMonth = months[months.findIndex(month => month == currentMonth) + 1];

    }

    onMount(() => {
        daysInMonth(months.findIndex(month => month == currentMonth));

        viewedGroupId.subscribe((value) => currentGroupId = value);
        viewedGroupName.subscribe((value) => displayedGroupName = value);
        userJsonData.subscribe((value) => userTokenId = value);
        accessToken = userTokenId?.accessToken;

        getTodos();
    });
</script>

<main>
    <nav>
        <button class="return" on:click={() => toggleCalendarView()}><h1 class="button-text">RETURN</h1></button>
        <div class="date-content">
            <button on:click={()=> {changeMonth(true); daysInMonth(months.findIndex(month => month == currentMonth));}}>&lt</button>
            <div class="date-header-container">
                <h1 class="date">{currentMonth} {currentYear}</h1>
            </div>
            <button on:click={()=> {changeMonth(false); daysInMonth(months.findIndex(month => month == currentMonth));}}>&gt</button>
        </div>
        <h1 class="username">{displayedGroupName}</h1>
    </nav>
    <div class="calendar-grid">
        {#if showDayInfoWindow}
            <div class="day-info-container">
                <div class="day-info-day">
                    {displayedDate}
                </div>
                <h1 class="day-info-header">TODOs:</h1>
                <div class="day-info-todos">
                    {#each orderedTodos[`${dateForLookUp}`] as viewedDay}
                        <div class="todo-item">
                            <p class="todo-name">Name: {viewedDay.todoName}</p>
                            <p class="todo-status">Status: {viewedDay.status}</p>
                        </div>
                    {/each}
                </div>
                <button on:click={()=>toggleDayInfoWindow()}>RETURN TO CALENDAR</button>
            </div>
        {:else}
            <div class="day-header">
                {#each days as weekDay}
                        <div class="day-header-content">{weekDay}</div>
                {/each}
                </div>
                <div class="calendar-content">
                {#each calendarDays as week} <!--Go through the weeks in the calendarDays array, then go through the days of every week,
                then check if the day is null or not, based off of that apply class-->
                    {#each week as day}
                        <div class={day == null ? "null-day" : "normal-day"}>
                            <button on:click={() => {if (day != null) {showDayInfo(day)}}}>
                            <div class="date-number">
                                {day}
                            </div>
                            <div class="day-content">
                                {orderedTodos[`${currentYear}-${months.findIndex(month => month == currentMonth) + 1}-${day}`]?.length || 0}
                            </div>
                            </button>
                    </div>
                    {/each}
                {/each}
            </div>
        {/if}
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
        width: 20%;
         
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
        font-size: 1.5rem;
    }

    .calendar-grid {
        height: 87.5vh;
        width: 100vw;
    }

    .calendar-content {
        height: 92%;
        width: 100vw;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
    }

    .day-header {
        height: 8%;
        width: 100vw;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
    }

    .day-header-content {
        font-size: 2rem;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 1px;
        border-color: white;
        border-style: solid;
    }
    
    .null-day {
        background-color: #303030;
    }

    .null-day > * {
        display: none;
    }

    .normal-day {
        border-style: solid;
        border-color:#4e4e4e;
        border-width: 1px;
        background-color: #393939;
    }

    .normal-day button {
        display: flex;
        background-color: #393939;
        flex-direction: column;
        border-color: #393939;
        border-style: none;
        width: 100%;
        height: 100%;
        justify-content: center;
    }
    .date-number {
        display: flex;
        height: 30%;
        align-items: center;
        align-self: center;
        font-size: 1.5rem;
    }

    .day-content {
        height: 70%;
        align-self: center;
        display: flex;
        align-items: center;
    }

    .day-info-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 87.5vh;
        border-style: solid;
        border-color:#303030;
        background-color: #393939;
    }

    .day-info-container button {
        width: 100%;
        height: 10%;
        font-size: 2rem;
    }

    .day-info-day {
        width: 100%;
        text-align: center;
        height: 8%;
        font-size: 1.5rem;
    }

    .day-info-todos {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        width: 100%;
        height: 70%;
    }

    .todo-item {
        overflow-x: auto;
        display: flex;
        flex-direction: row;
        border-style: solid;
        border-width: 1px;
        border-color:#4e4e4e;
    }

    .todo-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        gap: 2rem;
        height: 20%;
        width: 100%;
    }
</style>
