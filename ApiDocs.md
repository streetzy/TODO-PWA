**Základní informace**
Api přenáší data pouze ve formátu JSON
**Datové struktury objektů**
    **group**
        group{
            todos: [array object id todo dokumentů],
            groupName: jméno skupiny,
            invitedUsers: [ array object id invite dokumentů],
            owner?: Object Id tvůrce skupiny,
            members?: [array object id user dokumentů]
        }
    **todo**
        todo{
            todoName: jméno todo,
            status:  status todo,
            todoContent: obsah tohoto todo,
            authorId: Object Id dokumentu user který toto todo vytvořil,
            deadline: datum deadlinu,
            group: ObjectId dokumentu group ve ktrém je toto todo,
        }
    **user**
        user{
            userName: jméno usera,
            email: email,
            refreshToken: Refresh token usera,
            password:  heslo uživatele,
            groups: [array Object Id dokumentů group jejichž membrem je user,]
            invitelist: [ array Object Id dokumentů invite ve kterých je uživatel pozván],
        }
    **invite**
       invite{
            invited:  Object Id dokumentu user, který je pozván,
            group: Object Id dokumentu group do, kterého je user pozván,
        }

**Endpointy**
    **Register request**
        POST http://localhost:3000/user
        Content-Type: application/json
        {
            "username":"Uživatelovo přihlašovací jméno",
            "email":"Uživatelův email", - email musí být jedinečný
            "password":"Uživatelovo heslo"
        }
        Vytvoří nového uživatele. 
    **Login request**
        POST http://localhost:3000/login
        Content-Type: application/json
        {
            "email":"Uživatelův email",
            "password":"Uživatelovo heslo"
        }
        Pokud hodnoty odpovídají existujícímu uživateli, vrátí access a refresh token. Access token platí 30 minut. Refresh token není časově omezen.
    **Odhlášení**
        DELETE http://localhost:3000/login
        Po zaslání bude smazán userův refresh token z databáze a pro další práci na stránce po vypršení access tokenu bude nutné se znovu přihlásit.
    **Nový token**
        POST http://localhost:3000/token
        Content-Type: application/json
        {
            "Token":"Uživatelův refresh token"   
        }
        Po zaslání refresh token dostane user zpět nový access token v tomto formátu.
        {
            "accessToken":"Nový user access token"   
        }
    **Auth middleware**
        Každý následující request pořebuje pro správné fungování platný access token. 
        Access token získáte při loginu, nebo po zaslání refresh tokenu v tomto requestu.
            POST http://localhost:3000/token
            Content-Type: application/json
            {
                "token":"Uživatelův refresh token"
            }
        Token se do requestů vkládá ve formátu Authorization: : Uživatelův access token
    **Získání dat usera**
        GET http://localhost:3000/user/:userId
        Content-Type: application/json
        Authorization: : Uživatelův access token
        Pokud Identifikátor uživatele existuje v databázi tak vrátí základní informace o uživateli ve formátu.
        {
            userName:"",
            email:"",
            groups:"", ve formátu array objectId
            inviteList:"",ve formátu array objectId
        }
    **úprava dat usera**
        PATCH http://localhost:3000/user
        Content-Type: application/json
        Authorization: : Uživatelův access token
        {
            "userName":"Jméno na, které se chce uživatel přejmenovat"
        }
        Uživate může zatím pouze měnit své jméno
    **Tvorba group**
        POST http://localhost:3000/group
        Content-Type: application/json
        Authorization: : Uživatelův access token
        {
            "groupName":"Jméno nové skupiny"
        }
        Vytvoří group se zvoleným jménem a nastavý ownera na uživatele co jí vytvořil. Zároveň přidá uživatele  do members.
    **Získání dat group**
        GET http://localhost:3000/group/:groupId
        Content-Type: application/json
        Authorization: : Uživatelův access token
        Pokud existuje group s daným id tak jí vrátí vr formátu
            group{
                todos: [array object id todo dokumentů],
                groupName: jméno skupiny,
                invitedUsers: [ array object id invite dokumentů],
                owner?: Object Id tvůrce skupiny,
                members?: [array object id user dokumentů]
            }
    **Úprava group**
        PATCH http://localhost:3000/group/:groupId
        Content-Type: application/json
        Authorization: : Uživatelův access token
            Pokud existuje group s daným id tak její groupName změní na group name zaslané v tomto formátu.
            Musí být majitelem skupiny
            {
                "groupName":"npová jméno group"
            }
    **Získání všech todos ze group**
        GET http://localhost:3000/group/:groupId/todos
        Authorization: : Uživatelův access token
            Pokud existuje group s daným id a user je member tak vrátí všechny todo. Ve formátu array todo objektů
                todo{
                        todoName: jméno todo,
                        status:  status todo,
                        todoContent: obsah tohoto todo,
                        authorId: Object Id dokumentu user který toto todo vytvořil,
                        deadline: datum deadlinu,
                        group: ObjectId dokumentu group ve ktrém je toto todo,
                    }
    **Zaslání nového invite**
        POST http://localhost:3000/group/:Identifikátor group/invite
        Content-Type: application/json
        Authorization: : Uživatelův access token
            {
                "userId":"6658c5f663ad7a0cfd3cf79e"
            }
        Pokud je group id platné a user je member této group a userId je platné tak vytvoří nový objekt invite
            invite{
                invited:  Object Id dokumentu user, který je pozván,
                group: Object Id dokumentu group do, kterého je user pozván,
            }
        Tento objekt se přidá do userova listu invitů a do listu invitů group.
    **Přijmutí invitu**
        POST http://localhost:3000/user/invite/:id invitu
        Content-Type: application/json
        Authorization: : Uživatelův access token
        Pokud id invitu platné a user je ten který je pozván tak bude přidán to members group ze které byl invite poslán.
        Invite se smaže
    **Zrušení invite**
        DELETE  http://localhost:3000/user/invite/:id invite
        Content-Type: application/json
        Authorization: : Uživatelův access token
        Pokud id invitu platné a user je ten který je pozván tak bude invite smazán
    **odmítnití invite**
        DELETE  http://localhost:3000/group/:groupId/invite/invite/:invite id
        Content-Type: application/json
        Authorization: : Uživatelův access token
        Pokud id invitu platné a group id je group která invite poslala a user který request posílá je member této group, tak bude invite smazán
    **Získání invitů usera**
        GET  http://localhost:3000/user/invite
        Content-Type: application/json
        Authorization: : Uživatelův access token
        Vrací aray všech invitů usera.
        Vrací ve formátu
            {
                inviteId: id invitu,
                groupName: jméno group kam je user pozván,
            }
    **Získání invitů group**
        GET  http://localhost:3000/group/:groupId/invite
        Content-Type: application/json
        Authorization: : Uživatelův access token
        Vrací aray všech invitů group s tímto group id. User, který request posílá musí být member tété group
        Vrací ve formátu
            {
                inviteId: invite id,
                UserName: Jméno pozvaného usera,
            }
    **Nové todo**
        POST http://localhost:3000/todo
        Content-Type: application/json
        Authorization: : Uživatelův access token
            Přijímá data v tomto formátu. Uživatel musí být členem group se poslaným group id.
            {
                groupId: id group,
                todoName: Jméno todo,
                todoContent: obsah todo,
                status: status daného todo
            }
    **smazání todo**
        DELETE http://localhost:3000/todo/:todoId
        Content-Type: application/json
        Authorization: : Uživatelův access token
            User musí být členem group ve, které se todo nachází. Pokud je tak bude smazáno todo se zadaným todoId.
    **získání dat todo**
        GET http://localhost:3000/todo/:todoId
        Content-Type: application/json
        Authorization: : Uživatelův access token
            Pokud je user členem group ve, které je todo s daným todoId tak získá všechna dat todo. Ve formáru:
                todo{
                    todoName: jméno todo,
                    status:  status todo,
                    todoContent: obsah tohoto todo,
                    authorId: Object Id dokumentu user který toto todo vytvořil,
                    deadline: datum deadlinu,
                    group: ObjectId dokumentu group ve ktrém je toto todo,
                }
    **upravení todo**
        PATCH http://localhost:3000/todo/:todoId
        Content-Type: application/json
        Authorization: : Uživatelův access token
        Pokud je user členem group ve, které je todo s daným todoId tak můžeupravit jeho jméno a obsah.
        Pro změnu obsahu odesílá data ve formátu :
            {
                todoName = Nové jméno todo;
                todoContent = Nový obsah todo;
            }

         
            
            
