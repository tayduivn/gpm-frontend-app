# GPM Frontend

#### Technologies
- Angular 7
- Firebase
- Paypal integration
- Stripe integration
- Mapbox

--------------
#### Required install
node

--------------
#### Installation
run ```npm install```

--------------
#### Folder(src/environments) File (environment.ts)
Configuration to Firebase project

1. Create firebase project with the next collections
- users
- chats

2. Update environment.ts file

--------------
#### The project is divide in tree parts
1. Folder: src/app/c-panel
Login required to an user with role 'admin'

2. Folder: src/app/client-panel
Login required to an user with role 'buyer' o 'seller'

3. Folder: src/app/page
Start the application, no login required

3. Folder: src/app/dialog
All dialog utilized in the project

> Note: each module handle his own routes

--------------
#### Services: Folder(src/app/services)

1. api: all the request to the backend
2. firebase: all the request to Firebase
3. Services to chat and map
