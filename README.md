## Moments

#### Created by Dongeun Paeng

Moments is a small and cute video sharing platform.<br/>
This project will include below parts.<br/>
Omissions will be added later.

---

#### To do lists & used modules

- [x] server setup with **express**
- [ ] user authentication with **passport**
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

- [ ] Understand what __dirname is
- [ ] Fix webpack.config.js using __dirname and path.resolve()
- [ ] Understand what express.static is for and fix it to serve dist/main.js and dist/style.css
- [ ] Understand what babel polyfill is and what its role is
- [x] Understand what babel-loader is for
- [x] Fix 'import ...' error on the browser
- [x] Serve static files
- [x] Make webpack watch the files
- [ ] Make front page (nav)
- [ ] Make MVC directory structure
- [ ] Login/Logout
- [ ] File upload/delete
- [ ] Profile Editing
- [ ] Apply CSS
- [ ] Video Editing
- [ ] Access control
- [ ] Comments
- [ ] Message

---

#### Learnings

_Day 1_<br/>

The official webpack documentation says **not to** use 'extract-text-webpack-plugin' for webpack v4 or above. I should use 'mini-css-extract-plugin' instead.

It's recommended to use 'i' modifier when using Regexp to refer to a file name or extensions. (e.g. CSS or css)

I need babel in order to use ES6 scripts. (e.g. import, etc.)

Many errors are thrown when I try to convert server-side .js file through webpack. It is for client-side .js files.

app.use means app.\* including app.get, app.delete, app.post, etc., and will take a bit more time to process.

Order of express middlewares are **IMPORTANT**. Helmet comes first. Others come later.

---
