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
- [ ] manage data with **mongoose & connect-mongo**
- [ ] handle file uploads with **multer**
- [ ] save files with **aws-sdk & multer-s3**
- [x] log HTTP request with **morgan**
- [x] security with **helmet**
- [ ] store sessions with **express-session**
- [ ] set cookies with **cookie-parser**
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
- [ ] Check if passwords match
- [x] Use passport to authenticate users
- [ ] Make e-mail authentication
- [ ] Make page to reset password
- [ ] Build and connect to mongoDB
- [ ] Limit each image's size
- [x] Understand what bodyparser does exactly, and what urlencoded means

##### Day 4

- [ ] Separate router and controller
- [ ] Make Login/Logout
- [ ] File upload/delete
- [ ] Profile Editing
- [ ] Apply CSS
- [ ] Video Editing
- [ ] Access control
- [ ] Comments
- [ ] Message

---

#### Learnings

_Day 1_</br>

The official webpack documentation says **not to** use 'extract-text-webpack-plugin' for webpack v4 or above. I should use 'mini-css-extract-plugin' instead.

It's recommended to use 'i' modifier when using Regexp to refer to a file name or extensions. (e.g. CSS or css)

I need babel in order to use ES6 scripts. (e.g. import, etc.)

Many errors are thrown when I try to convert server-side .js file through webpack. It is for client-side .js files.

app.use means app.\* including app.get, app.delete, app.post, etc., and will take a bit more time to process.

Order of express middlewares are **IMPORTANT**. Helmet comes first. Others come later.

---

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

We need body-parser's urlencoded middleware to get contents from the client. Otherwise we will get empty object in req.body.

When you submit form data with a POST request, that form data can be encoded in many ways. The default type for HTML forms is application/x-www-urlencoded. In this case, we need to use body-parser's urlencoded middleware to parse this data.

Destructuring assignment makes life easier by replacing, for example, 'req.body.email' to just 'email' within a scope.
