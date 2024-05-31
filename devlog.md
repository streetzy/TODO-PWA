WEEK 15.4. - 21.4 {
    features:
    - added UserTodo page, developed most of the frontend part
    - created some endpoint scripts, tested their functionality with DB (yes, they work)
    - structured how all endpoints should look
    - started SWAGGER API to document API

    - added LoginRegisterPage, developed auth middleware and endpoints for auth.


    issues and how they were fixed:
    - most issues were problems with library knowledge, mostly solved by banging head against the wall and looking at docs (mainly mongoose)
    - decision on whether to keep users and groups separate, decided to have a user be a group, just with 1 member for the sake of simplicity
    - how to decide which page to go to? we used svelte stores to resolve this issue, to check when the user is logged in via a condition that's set to true during login handling and based off of that I selected the page to go to.

    For next week I plan to focus on creating the frontend for groups and further develop the SWAGGER API and ADD todo button and make it work
}