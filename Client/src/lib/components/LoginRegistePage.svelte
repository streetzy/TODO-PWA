<script lang="ts">
  import { onMount } from 'svelte';
    import { isLoggedIn } from '../stores/auth.js'
    import { userJsonData } from '../stores/data.js';

    const URL = "http://localhost:3000";

    async function loginHandler() {
        if(!isLoggingIn) {
            await fetch(URL + "/user", {
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                    "username": (document.getElementById("username-input") as HTMLInputElement).value,
                    "email": (document.getElementById("email-input") as HTMLInputElement).value,
                    "password": (document.getElementById("password-input") as HTMLInputElement).value
                })
            })
            return;
        }

        let objData = null;
        const res = await fetch(`http://localhost:3000/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                "email": (document.getElementById("email-input") as HTMLInputElement).value,
                "password": (document.getElementById("password-input") as HTMLInputElement).value
            })
        })

        objData = await res.json();
        userJsonData.set(objData);
        isLoggedIn.set(true);
    }

    function changeRegistrationMode() { 
        isLoggingIn = !isLoggingIn;
    }

	let isLoggingIn:boolean = false;

</script>
<main>
    
        <div class="top">
            <div class="logo">
                <a href="https://github.com/"><img class="img"  src="\src\logo-placeholder-image.png" alt=""></a>
            </div>
            <div  class="links">
                <div class = "link">
                   <p> <a  href="https://github.com/">GITHUB</a></p>
                
                </div>
                <div  class = "link">
                    <p><a href="https://github.com/">Documentation</a></p>
                 </div>
                 <div  class = "link">
                    <p><a href="https://github.com/">News</a></p>
                 </div>
                 <div  class = "link">
                    <p><a href="https://github.com/">Support</a></p>
                 </div>
    
            </div>
            
            
        </div>
        <div class="body1">
           <div class="gg">
            <div class="LRForm">
            <div class="input"><h1>{isLoggingIn ? 'LOGIN' : 'REGISTER'}</h1></div>
            {#if !isLoggingIn}
                <div class="input"><input id="username-input" placeholder="USERNAME" type="text"></div>
            {/if}
             <div class="input"><input id="email-input" placeholder="EMAIL" type="text"></div>   
             <div class="input"><input id="password-input" placeholder="{isLoggingIn ? "PASSWORD" : "MINIMUM 10 CHARACTERS"}" type="password"></div>
            </div>
             <div class="input"><button class="buttom" on:click={() => loginHandler()}>SUBMIT</button></div>
             <div class="input"><button class="buttom" on:click={() => changeRegistrationMode()}>{isLoggingIn ? 'REGISTER' : 'LOGIN'}</button></div>
           </div>
        </div>
    
   
</main>

<style>
    .logo{
        width: 20%; 
        height: 60px; 

    }
    .img{
        height: 60px;
        width: 60px;
    }
    .top{
        display: flex;
        
        width: 100%;
        background-color: grey;
        height: 60px;
    }
    .link{
        margin-right: 10%;
        height: 10%;
        
    }
    .links{
        display: flex;
        justify-content: end;
        width: 80%;
    }
    
    a:link {
        color: rgb(255, 255, 255);
        background-color: transparent;
        text-decoration: none;
    }
    a:hover {
     color: rgb(253, 253, 253);
     background-color: transparent;
    }

    a:active {
         color: rgb(0, 255, 34);
         background-color: transparent;
        text-decoration: underline;
    }
    a{
        color: white;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
    .body1{
        height:calc(100vh - 60px);
        width: 100%;
        background-color: rgb(56, 56, 56);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .gg{
        width: 320px;
        height: 450px;
        background-color: grey;
        border-radius: 25px;
        
        
    }
    .input{
        display: flex;
        justify-content: center;
        border-radius: 25px;
        width: 100%;
        margin-top: 10px;
    }
    .buttom{
        width: 150px;
        height: 40px;
        border-radius: 10px;
    }
    h1{
        color: white;
    }
    #username-input{
        width: 200px;
        height: 30px;
        border-radius: 10px;
    }
    #email-input{
        width: 200px;
        height: 30px;
        border-radius: 10px;
    }
    #password-input{
        width: 200px;
        border-radius: 10px;
        height: 30px;
    }
    .LRForm{
        margin-bottom: 40px;
        height: 228px;
    }
</style>
