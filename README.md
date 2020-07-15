## Moments

#### Created by Dongeun Paeng

Moments is a small and cute video sharing platform.<br/>
This project will include below parts.<br/>
Omissions will be added later.

---

#### To do lists & used modules

- [x] server setup with **express**
- [x] user authentication with **passport**
- [x] show messages with **express-flash**
- [x] build with **webpack & babel**
- [x] manage data with **mongoose**
- [x] handle file uploads with **multer**
- [x] handle date and time with **moment**
- [x] fuzzy search with **fuse**
- [x] log HTTP request with **morgan**
- [x] security with **helmet**
- [x] store sessions with **express-session & connect-mongo**
- [x] Authenticate user with **nodemailer**
- [x] get req.body with **body-parser**
- [x] AJAX requests with **axios**
- [x] Validate forms with **password-validator** and **email-validator**
- [x] make views with **pug**
- [x] make beautiful with **tailwind css**
- [x] save files with **aws-sdk & multer-s3**
- [x] save data on **Atlas**
- [x] deploy with **heroku**

---

#### Jobs to get done

##### Chapter 1

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

##### Chapter 2

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

##### Chapter 3

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

##### Chapter 4

- [x] Enable duplicate login
- [x] Fix login page in mobile view
- [x] Make page to reset password
- [x] Install 'express-flash'
- [x] Understand mixin in pug
- [x] Understand how to make variables in pug
- [x] Add flash messages to every login/password cases
- [x] Limit each image's size
- [x] Apply work sans font to body texts
- [x] Profile Editing
- [x] Apply CSS
- [x] Make upload.pug
- [x] Install 'multer'
- [x] Use multer to save files to uploads directory
- [x] Save file's path to MongoDB
- [x] Populate videos to home.pug
- [x] Make videos playable
- [x] Remove uploads folder from github repository
- [x] Make videos listed horizontally in large devices
- [x] Show each video's creator in each video card
- [x] Enable deleting videos

##### Chapter 5

- [x] Install 'password-validator'
- [x] Install 'email-validator'
- [x] Add 'password-validator' to join.pug
- [x] Add 'email-validator' to join.pug and login.pug
- [x] Disable required input forms to block social login
- [x] Let Kakao users skip email verification process
- [x] Add Kakao login to login.pug and join.pug
- [x] Show flash after Kakao Login
- [x] Hide change password for Kakao users
- [x] Validate password at changePassword.pug
- [x] Show flash when a user tries to login with wrong email address

##### Chapter 6

- [x] Fix CSS in header, upload, etc.
- [x] Use 'Metro UI' to make tags input
- [x] Work on some client-side JS
  - [x] Count views
    - [x] Make video.js
    - [x] Install 'axios'
  - [x] Video Editing
    - [x] Edit title icon beside the title
    - [x] Limit overflow in the editing text area
    - [x] Diable line break in the editing text area
    - [x] Edit description
    - [x] Allow only creators edit their videos
    - [x] Create modal for editing tags
    - [x] Edit tags
    - [x] Send tags to the server
    - [x] Show tags in the video section
    - [x] Prevent users input same tags repeatedly
    - [x] Break words for tags
  - [x] Ask user if he/she is certain to delete his/her account
  - [x] Make comments hidden at default
  - [x] Install 'moment.js'
  - [x] Post and delete comments
- [x] Modify 'Delete' button's position to stick to the bottom

##### Chapter 7

- [x] Install 'fuse.js'
- [x] Search
- [x] Install 'multer-s3'
- [x] Install 'aws-sdk'
- [x] Change upload directory to AWS S3
- [x] Move MongoDB from local to Atlas cloud
- [x] Deploy

##### Chapter 8

- [x] Bug fix - when editing tags, sample list consists of the most recent content's tags
- [x] Bug fix - can't delete tags
- [x] Bug fix - heroku app doesn't display added tags after editing unlike localhost; however, once refreshed, it work...
- [x] Bug fix - can't edit tags in video detail page
- [x] Bug fix - enable video player on iOS devices
- [x] Apply custom domain to the heroku app
- [x] Understand the difference between HTTP and HTTPS
- [x] Understand RSA encryption mechanism
- [x] Apply TLS/SSL certificate to the heroku app

---

#### Learnings

_Chapter 1_<br>

- The official webpack documentation says **not to** use 'extract-text-webpack-plugin' for webpack v4 or above. I should use 'mini-css-extract-plugin' instead.

- It's recommended to use 'i' modifier when using Regexp to refer to a file name or extensions. (e.g. CSS or css)

- I need babel in order to use ES6 scripts. (e.g. import, etc.)

- Many errors are thrown when I try to convert server-side .js file through webpack. It is for client-side .js files.

- app.use means app.\* including app.get, app.delete, app.post, etc., and will take a bit more time to process.

- Order of express middlewares are **IMPORTANT**. Helmet comes first. Others come later.

_Chapter 2_<br>

- Without express.static, I would have to make thousands of routers for every image files, etc.

- Installation of babel consists of installing two npm packages - @bable/core and @babel/cli.

- 'babel' doesn't do anything out-of-the-box! It's the babel presets and plugins that do the work.

- @babel/preset-env is just one preset that includes many useful and generally accepted plugins, named 'env'.

- .babelrc is not recommended. Use babel.config.json especially when you're using a monorepo.

- babel-loader is made by webpack, not by babel. It's used for webpack to load babel to process .js files.

- Without babel-node, you can't execute app.js file if it is written in ES6.

_Chapter 3_<br>

- To let body-parser to parse POSTed data, you have to put in 'name' attributes in your form. body-parser can't read id attributes.

- We need body-parser's urlencoded middleware to get contents from the client. Otherwise we will get empty object in `req.body`.

- When you submit form data with a POST request, that form data can be encoded in many ways. The default type for HTML forms is application/x-www-urlencoded. In this case, we need to use body-parser's urlencoded middleware to parse this data.

- Destructuring assignment makes life easier by replacing, for example, `req.body.email` to just 'email' within a scope.

- It seems like I have to use square brackets to join(?) another Schema to the Schema I'm building. For example, if I want to connect a User with his/her Comments, I have to write like `comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]`

- Passport serializes and deserializes user instances to and from the session to enable persistent login sessions. This will make possible to use req.user anywhere in the application.

- To use `passport.serializeUser` and `passport.deserializeUser` (session) I have to use express-session first.

- Actually, it's `passport.deserializeUser` method that generates and pass the `req.user`.

- If I set express-session option resave to true, the session will be saved every time regardless if there was a change in the session.

- If I set express-session option `saveUninitialized` to false, the session will not save any session which is not initialized(empty).

- If I don't need a User document returned after updating it, I can use `updateOne` method instead of `findOneAndUpdate`.

- When you're using mongoose, you don't need to use mongoDB's update operator(e.g. `updateOne`); rather, you can update the object like `user.emailVerified = true.`

- I can make a new user log in right after he/she registers by adding `req.login(user)` inside the `postJoin` function.

- I couldn't make async function and put `passport.authenticate` inside the function. So I made another function and gave it the 'next' parameter to move onto `passport.authenticate(postLogin)`

- When you find a user using `User`, don't forget to put async and await; otherwise you'll get a very long Query object instead.

_Chapter 4_<br>

- Unlike the official document, I don't need `cookie-parser` to use `express-flash`.

- I have to put `req.flash` before `res.redirect` or so.

- I can use `object-fit` class in tailwind css to make images shrink to the size I want.

- `multer` is much alike `body-parser`. It processes `multipart/form-data` just like `body-parser` processes `application/x-www-form-urlencoded`.

- Most 404 errors have something to do with files' path. I should look into express.static and related file paths in such case.

- Typically, MongoDB can understand 'id' property. However, when sorting, the property should have underscore like '\_id'.

- Mongoose has `popolation` that works similarly as `SQL join`.

- Plus signs in URL can't be read via `req.query` and cause e-mail verification error. I should use `req.originalUrl.split` to get the full URL.

_Chapter 5_<br>

- I can use `findOneAndUpdate` to delete a user's comments or videos easily.

- Don't forget to add node_modules to .gitignore.

- I have to put a tag inside the button tag to make a link related to the button. Otherwise I can't apply designs to the button because a tag can't be applied with designs.

- When adding custom color to tailwind.config.js, I have to put my colors using `theme.extend.colors` to maintain the default theme.

- It is recommended to use `res.render` most times rather than `res.redirect`.

- If I want to make `if` statement to check if `req.user` exists or not, I have to declare the user first.

_Chapter 6_<br>

- Don't forget to add class `w-full` to prevent words overflow to outside its container.

- I can easily send query or `$set` via mongoose with dynamic properties by 'computed member access operator(a.k.a. square brackets).

- I can't use `getElementById()` inside other elements because ID is meant to be unique, thus it doesn't have to be looked for inside other elements.

- I can manipulate multiple DOM elements in a single page using for loops and querySelector, getElementsByClassName.

- I can pass tags in `<li>` elements to the server by giving them `<input>` elements with names `tags[]` inside.

- I can make users redirected to the last page using `res.redirect('back)`

- I must make `overflow-y: visible` to enable scroll when a modal is open

- I must not use `enctype="multipart/form-data"` when a form doesn't include file uploads. I don't know why for now.

- When using `axios`, the server-side `res.redirect` doesn't work. I have to handle response within axios, using `window.location`.

- submit action works with form tag, not the input tag.

- Read-only error happens in strict mode when I try to change a value of an object that refers to another object (which is more original(?)) -- I didn't understand this thoroughly, thus need to study further about this concept.

- When I use `axios`, I must not forget to put `res.end()` in the server-side javascript.

- Don't forget `self-end` to make an element stick to the bottom of its parent div.

_Chapter 7_<br>

- Mongoose spits out 'Maximum call stack size exceed' error at 'cloneObject' when there's a circular reference among Schemas; in this case, I should use update(), instead of .push method.

- I must add `acl: 'public-read'` property to multer-s3; otherwise people will get 403 error from AWS.

- As of 14 June 2020, MongoDB Compass GUI is easier to use than Atlas.

_Chapter 8_<br>

- addEventListner must be added once. Otherwise the same event will be invoked multiple times.

- If something fires many times repeatedly, it is highly likely to be the scoping issue of the addEventListener.

- When posting with axios, I must not redirect or render. I must only send res.status and res.end. Otherwise, the controller will send user duplicate repsonses.

- Video can't be played on iOS devices because of the wrong content type. To fix this, I have to add contentType property like `contentType: multers3.AUTO_CONTENT_TYPE`.

- To show thumbnail of the video on iPhone, I must add `autoplay="false"` to the video tag. Or, I can add `autoplay` and `muted` as well.

- Keycode of space is not 32 on Chrome for Android. This makes impossible to separate tags by 'space' key.
