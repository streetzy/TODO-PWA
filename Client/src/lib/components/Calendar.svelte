<script lang="ts">
  import { onMount } from "svelte";
  import { viewedGroup, inCalendarView } from "../stores/data";

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"]

    let displayedGroup: {} | null= null;

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = months[currentDate.getMonth()];
    let amountOfTodos = 0;
    let displayedDate: string = "";
    let showDayInfoWindow = false;

    let calendarDays : (null|number)[][] = [];


    async function showDayInfo(day: number) {
        const dateForData = `${day}-${months.findIndex(month => month == currentMonth) + 1}-${currentYear}`; // (all as numbers) DAY-MONTH-YEAR
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

        viewedGroup.subscribe(() => {

        })
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
        <div class="dropdown">
            <h1 class="username">USERNAME</h1>
            <button class="sign-out">SIGN OUT</button>
        </div>
    </nav>
    <div class="calendar-grid">
        {#if showDayInfoWindow}
            <div class="day-info-container">
                <div class="day-info-day">
                    {displayedDate}
                </div>
                <div class="day-info-todos">
                    <!-- {#each todos as todo}
                        <div class="todo-item">
                            <p class="todo-name"></p>
                            <p class="todo-description"></p>
                        </div>
                    {/each} -->
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
                                {amountOfTodos == 0 ? "No TODOs" : `${amountOfTodos}x TODOs`}
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
        font-size: 3rem;
    }

    .sign-out {
        height: 100%;
        width: 100%;
        display: none;
        padding-top: 4rem;
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
        height: 20%;
        font-size: 1.5rem;
    }

    .day-info-todos {
        overflow: scroll;
        width: 100%;
        height: 70%;
    }

    .todo-item {
        display: flex;
        flex-direction: row;
        height: 20%;
        width: 100%;
    }
</style>
