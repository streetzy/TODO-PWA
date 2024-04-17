<script lang="ts">
	let text:boolean = false;

</script>
<main>
    
        <div class="top">
            <div class="logo">
                <a href="#"><img class="img"  src="\src\logo-placeholder-image.png" alt=""></a>
            </div>
            <div  class="links">
                <div class = "link">
                   <p> <a  href="https://github.com/">GITHUB</a></p>
                
                </div>
                <div  class = "link">
                    <p><a href="https://github.com/">GGfgfdgdfgALKANE</a></p>
                 </div>
                 <div  class = "link">
                    <p><a href="https://github.com/">GG ALKANE</a></p>
                 </div>
                 <div  class = "link">
                    <p><a href="https://github.com/">GG ALKANE</a></p>
                 </div>
    
            </div>
            
            
        </div>
        <div class="body1">
           <div class="gg">
            <div class="input"><h1>{text == false ? 'LOGIN' : 'REGISTER'}</h1></div>
             <div class="input"><input placeholder="EMAIL"  type="text"></div>   
             <div class="input"><input  placeholder="PASSWORD" type="password"></div>
             <div class="input"><button class="buttom">SUBMIT</button></div>
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
        width: 30%;
        height: 30vh;
        background-color: grey;
        border-radius: 25px;
        
        
    }
    .input{
        display: flex;
        justify-content: center;
        border-radius: 25px;
        
    }
    .buttom{
        width: 120px;
        height: 40px;
    }
    h1{
        color: white;
    }
</style>
