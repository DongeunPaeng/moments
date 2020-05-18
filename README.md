## Moments

#### Created by Dongeun Paeng

Moments is a small and cute video sharing platform.<br/>
This project will include below parts.<br/>
Omissions will be added later.

---

#### To do lists & used modules

- [x] server setup with **express**
- [x] user authentication with **passport**
- [ ] show messages with **express-flash**
- [x] build with **webpack & babel**
- [x] manage data with **mongoose**
- [ ] handle file uploads with **multer**
- [ ] save files with **aws-sdk & multer-s3**
- [x] log HTTP request with **morgan**
- [x] security with **helmet**
- [x] store sessions with **express-session & connect-mongo**
- [x] Authenticate user with **nodemailer**
- [x] get req.body wiht **body-parser**
- [ ] npm scripts on windows with **cross-env**
- [ ] AJAX requests with **axios**
- [ ] get video file duration with **get-blob-duration**
- [x] make views with **pug**
- [x] make beautiful with **tailwind css**

---

#### Jobs to get done

##### Day 1

- [x] Directory setup for build (src, dist)
- [x] Install webpack and webpack-cli
- [x] Write scripts to run webpack and watch the files
- [x] Install 'mini-css-extract-plugin' in order to extract css into separate files.
- [x] Install 'postcss-loader' and 'css-loader' to load those files on webpack
- [x] Install 'Tailwind'
- [x] Install 'autoprefixer'
- [x] Install 'postcss-cli'
- [x] Add Tailwind to my css
- [x] Set webpack configurations to use Tailwind CSS
- [x] Check index.html can be rendered with Tailwind CSS
- [x] Install 'express'
- [x] Make .env file
- [x] Install 'nodemon'
- [x] Install 'babel'
- [x] Run server on port localhost:4000
- [x] Install middlewares (morgan, compression, helmet, body-parser)
- [x] Setup 'pug' view engine
- [x] Make view folder
- [x] Make a basic router

##### Day 2

- [x] Read through all babel documents
- [x] Understand babel/node
- [x] Understand what dirname is
- [x] Fix webpack.config.js using dirname and path.resolve()
- [x] Understand express.static and fix it to serve dist/main.js and dist/style.css
- [x] Understand babel polyfill, core-js, regenerator-runtime/runtime
- [x] Understand what babel-loader is for
- [x] Fix 'import ...' error on the browser
- [x] Serve static files
- [x] Make webpack watch the files
- [x] Make header with responsive navbar
- [x] Make fake contents at home page

##### Day 3

- [x] Populate cards up to 10 fake cards
- [x] Brings cards closer to each other in the large screen
- [x] Fix footer (center items)
- [x] Make Join page
- [x] Understand try, catch, and finally
- [x] Install 'mongoose'
- [x] Install 'dotenv' to bring variables from .env file into process.env
- [x] Configure mongoose options - useNewUrlParser, useFindAndModify
- [x] Build and connect to mongoDB
- [x] Make User, Video, Comments Schema
- [x] Install 'passport'
- [x] Install 'passport-local-mongoose' to easily register new users
- [x] Make passport.js file to configure passport-local-mongoose methods
- [x] Add passport.initialize middleware in app.js
- [x] Install 'express-session'
- [x] Understand serialize/deserialize methods and passport.js configuration
- [x] Import crypto
- [x] Add emailVerified and verificationKey to User model
- [x] Use nodemailer to make e-mail authentication
- [x] Send user to pre-email-verification page after join activity
- [x] Insert new users to MongoDB
- [x] Install 'connect-mongo'
- [x] Make login page
- [x] Install 'passport-local'
- [x] Modify header.pug to show different menu to loggedUser
- [x] Split routers and make MVC structure
- [x] Make user logged in right after register
- [x] Study how to process postLogin with a user who's just registered
- [x] Test user flow from join to login to logout
- [x] Fix postLogin
- [x] Fix getConfirmEmail - header changes after refresh
- [x] Enable delete account
- [x] Check if passwords match
- [x] Use passport to authenticate users
- [x] Understand what bodyparser does exactly, and what urlencoded means

##### Day 4

- [x] Enable duplicate login
- [x] Fix login page in mobile view
- [x] Make page to reset password
- [x] Install 'express-flash'
- [x] Understand mixin in pug
- [x] Understand how to make variables in pug
- [x] Add flash messages to every login/password cases
- [ ] Limit each image's size
- [ ] Apply work sans font to body texts
- [ ] Recap when to enable resave and saveUninitialized options
- [ ] Separate router and controller
- [ ] Make Login/Logout
- [ ] File upload/delete
- [ ] Profile Editing
- [ ] Apply CSS
- [ ] Video Editing
- [ ] Access control
- [ ] Comments
- [ ] Message
- [ ] Ask user if he/she is certain to delete his/her account (client-side JS)

---

#### Learnings

_Day 1_</br>

The official webpack documentation says **not to** use 'extract-text-webpack-plugin' for webpack v4 or above. I should use 'mini-css-extract-plugin' instead.

It's recommended to use 'i' modifier when using Regexp to refer to a file name or extensions. (e.g. CSS or css)

I need babel in order to use ES6 scripts. (e.g. import, etc.)

Many errors are thrown when I try to convert server-side .js file through webpack. It is for client-side .js files.

app.use means app.\* including app.get, app.delete, app.post, etc., and will take a bit more time to process.

Order of express middlewares are **IMPORTANT**. Helmet comes first. Others come later.

_Day 2_</br>

Without express.static, I would have to make thousands of routers for every image files, etc.

Installation of babel consists of installing two npm packages - @bable/core and @babel/cli.

'babel' doesn't do anything out-of-the-box! It's the babel presets and plugins that do the work.

@babel/preset-env is just one preset that includes many useful and generally accepted plugins, named 'env'.

.babelrc is not recommended. Use babel.config.json especially when you're using a monorepo.

babel-loader is made by webpack, not by babel. It's used for webpack to load babel to process .js files.

Without babel-node, you can't execute app.js file if it is written in ES6.

_Day 3_</br>

To let body-parser to parse POSTed data, you have to put in 'name' attributes in your form. body-parser can't read id attributes.

We need body-parser's urlencoded middleware to get contents from the client. Otherwise we will get empty object in `req.body`.

When you submit form data with a POST request, that form data can be encoded in many ways. The default type for HTML forms is application/x-www-urlencoded. In this case, we need to use body-parser's urlencoded middleware to parse this data.

Destructuring assignment makes life easier by replacing, for example, `req.body.email` to just 'email' within a scope.

It seems like I have to use square brackets to join(?) another Schema to the Schema I'm building. For example, if I want to connect a User with his/her Comments, I have to write like `comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]`

Passport serializes and deserializes user instances to and from the session to enable persistent login sessions. This will make possible to use req.user anywhere in the application.

To use `passport.serializeUser` and `passport.deserializeUser` (session) I have to use express-session first.

Actually, it's `passport.deserializeUser` method that generates and pass the `req.user`.

If I set express-session option resave to true, the session will be saved every time regardless if there was a change in the session.

If I set express-session option `saveUninitialized` to false, the session will not save any session which is not initialized(empty).

If I don't need a User document returned after updating it, I can use `updateOne` method instead of `findOneAndUpdate`.

When you're using mongoose, you don't need to use mongoDB's update operator(e.g. `updateOne`); rather, you can update the object like `user.emailVerified = true.`

I can make a new user log in right after he/she registers by adding `req.login(user)` inside the `postJoin` function.

I couldn't make async function and put `passport.authenticate` inside the function. So I made another function and gave it the 'next' parameter to move onto `passport.authenticate(postLogin)`

When you find a user using `User`, don't forget to put async and await; otherwise you'll get a very long Query object instead.

_Day 4_</br>

Unlike the official document, I don't need `cookie-parser` to use `express-flash`.

I have to put ```req.flash``` before ```res.redirect``` or so.