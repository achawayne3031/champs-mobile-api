In the project directory, you can run:

## `npm install`
this command will install all the packages needed for the project

### `npm start`
this command will start up the api server with the port on 4000;

Open [http://localhost:4000/api](http://localhost:4000/api).


## Add, Get all, Edit and Delete user data (api)

1. /create: this api will be used for adding new users to the system (POST method)
2. /users: this api will get you all the users we have in the system in descending order (GET method)
3. /users/:id: this api will be used to remove a user in from the system and it accepts a params (GET method)
4. /users/:id this api will be used to update a user's data in the system (POST method)



## ISSUES
1. During the course of completing this test, i encountered some CORS issues on the two http request methods (PUT & DELETE)
2. Due to this setbacks, i have to improvise in order to get the task done
3. I made use of the two http request methods (GET & POST) which seemd to allow the integration locally, but no doubt all http request methods must be working fine been deployed on the live server





