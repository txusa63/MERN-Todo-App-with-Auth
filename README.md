# MERN-Todo-App-with-Auth

A MERN Todo app that uses authentication and authorization. 

A user can create an account with an email and password that keeps track of his/her todos. The user can only access the account with those credentials. 

The app will display a message if something is wrong such as entering information for an account that doesn't exist, entering wrong password, password mismatch, etc. 

Once logged in, the user will be able to add items in their todos list and see the list update in real-time. Each item that is added to the list will have a personal button that deletes the item. 
All the data is stored in a local MongoDB database or in a MongoDB Atlas cloud database. 

The user is able to delete their account via a button at the bottom of the todos page. The action will display a prompt modal to verify if the user wants to delete the account in case the button is accidently pressed. 

The app uses route protection and if an unauthorized user tries to manually enter the route to the page where the todos are located, the app will always redirect the user to the login page. 

This is a neat and basic app that uses a lot of different technologies. Further expanding the app is possible and it can also serve as a basic blueprint for other apps.

## Available Scripts

In the project directory, you can run:
### `npm run dev`

Runs the whole app by running the client-side and server-side code at the same time.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
