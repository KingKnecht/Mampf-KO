# Frontend

`cd frontend`
`yarn install`

`yarn run serve`

Reminder for me for debugging:

`<div data-bind="text: console.log($component)"></div>`

# Backend

`cd frontend`
`yarn install`
`yarn dev`

`http://localhost:3000/v1/docs` 

create admin user via mongosh
`mongosh --eval 'db.users.insertOne({ "name": "Administrator", "email": "admin@admin.com", "password": "$2b$08$XNx4snBSEOwQIRT.3e9RGOW0NzZbdSP7dffZAQNBax3H6qXw9LVMS", "role": "admin", "isEmailVerified": true });' Mampf`

login: admin@admin.com
pwd: Pool12345

see also Readme.md in `backend/` folder.