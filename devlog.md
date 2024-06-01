WEEK 15.4. - 21.4 {
    features:
    - added UserTodo page, developed most of the frontend part
    - created some endpoint scripts, tested their functionality with DB (yes, they work)
    - structured how all endpoints should look

    - added LoginRegisterPage, developed auth middleware and endpoints for auth.


    issues and how they were fixed:
    - most issues were problems with library knowledge, mostly solved by banging head against the wall and looking at docs (mainly mongoose)
    - decision on whether to keep users and groups separate, decided to have a user be a group, just with 1 member for the sake of simplicity
    - how to decide which page to go to? we used svelte stores to resolve this issue, to check when the user is logged in via a condition that's set to true during login handling and based off of that I selected the page to go to.

    For next week I plan to focus on creating the frontend for groups 
}
WEEK 19.5 - 26.5{
     
    work:
    -  further development of the user todo page.
    -  completion of group endpoints.
    -  testing of group endpoints(surprisingly successful).

    issues and how they were fixed:
    -  Most issues were minor, mostly misspelling and some communication errors.
    -  All of them were quickly resolved so this stage went relatively smoothly
}
WEEK 27.5 - 1.6{
    work:
    -  Frontend for user invites, todos and calendar.
    -  Creation of invite endpoints.
    -  Completion of todo endpoints.
    -  Creation of documentation.
    -  Testing funcionality of final product

    issues and how they were fixed:
    - Trying out mongoose populate function. It took some work to get it set up and running with TypeScript, mostly because of our inexperience with mongoose. After some googling and hit or miss type conversion, we made it work.
    - req.body.id (mainly a communication error)
    - We had a few problems with some endpoints not responding correctly, doing nothing and returning status 500, but we relatively quickly realised that it was caused by an incorect order of our endpoints in the index file. Some endpoints were handling requests that they weren't supposed to. We quickly solved the problem by rearranging the endpoints.

}
