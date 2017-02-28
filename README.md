# MEAN Stack Google Authentication
An update to the "Easy Node Authentication:Google" tutorial on [scotch.io]("https://scotch.io/tutorials/easy-node-authentication-google"). Uses the file/app structure most commonly used by Prime students and makes use of the Express Router module for routing.

# Customization
1. Register your application at the Google Developer's Console.
2. Make sure you application has permissions for the Google Plus API (required for the Google Passport module we will use).
3. Make a copy of the `auth.template.js`  and rename to `auth.js`. NOTE: Do not include this file in your git repo.
4. Update the new file with your Google API credentials (from the Google Developer's Console) and the client secret for your sessions.

# The Least You Need To Know
A brief overview of the concepts behind how this actually works.

## About OAuth 2.0
OAuth 2.0 is an *authorization* protocol that allows a party (like your Node app)
to access resources from another party (like Google).

The basic OAuth workflow is:

1. Client requests a resource from Third Party.
2. Server redirects Client to the Third Party to get confirmation that this request is valid.
3. Client says OK.
4. Third Party sends a tag to the Server.
5. Server sends tag back to request the original resource.
6. Third Party checks tag validity and sends a key/token to Server.
7. Server sends key/token to Third Party to, finally, get the resource.
8. Server sends resource to Client.

## Google OAuth for Authentication
OpenID is an extension of the OAuth protocol that allows us to *authenticate* a user. The flow is basically the same as for OAuth, however now we get data
that allows us to uniquely identify a Third Party user.

# Overview of Project
A brief explanation of the project structure and what is super important to know. There are comments throughout most of the code which might be more interesting.

## Server
Server files and directories

### app.js - The starting point for our app

* Creates an Express app for server-side routing.
* Connects to a Mongo database via mongoose.
* Instantiates middleware for creating our sessions - how we keep track of if a user is logged in or not.
* Initializes our passport middleware for authentication.
* Initializes passport sessions middleware for keeping track of and identifying which user is attached to a session.
* Defines our routes. Note that the `/private` route first uses middleware to check if a user is authenticated.
* Starts our server.

### auth - passport configuration
* `passport.js`
  * Defines how a user is serialized and deserialized. We must have this defined if we are using sessions. It allows passport to append our user data to our request object.
  * It also includes our Google Authentication strategy. It simplifies much of the OAuth workflow for us and allows us to determine if we already have the user we wish to authenticate in our database or not. We add any users that are new to our application.

### config - configuration variables to run our application
* `auth.template.js`/`auth.js`
  * Will hold data that identifies your client to Google and also the secret for securing your session data.
* `database.js`
  * Connection string for your database

### models - database schemas that represent our collections
* `user.js`
  * A Mongoose user schema that houses our Google-provided user data.

### routes - our Express routes
* `private` has our routes that require authentication
  * `index.js` is our umbrella handler for any routes that start with `/private`
  * `calendar.js` would provide an authenticated user with Google Calendar data, but check out the links and TODOs for how to actually make that happen
* `auth.js` has all of our authentication-related routes
  * `GET /google` is triggered by the Client requesting to log in
  * `GET /google/callback` is triggered by Google to send us the user's data
  * logout handling is also in here
* `index.js` serves our initial index.html file to the client

### services - our service layer handles our database queries
* `user.js` - has all of our user queries

### utils - helper files
* `auth.js` - our middleware that checks if a user is authenticated
* `database.js` - encapsulates our database connection logic

## Client
All client-side files are in the `public` directory.
* `assets` has images
* `scripts` has angular app logic including controllers and services
  * The workhorses for authentication are the `NavController` and `AuthFactory`
  * `NavController` does initial check of user login status, via a factory method, and updates factory accordingly
  * `AuthFactory` allows for sharing of login state amongst all other controllers
* `styles` uh...nothing here!
* `vendors` has all of our third-party libraries
* `views` has our index.html and `templates`
  * `login.html` displays log-in button if user not logged in
  * `calendar.html` displays a message that confirms or denies that you are logged in
