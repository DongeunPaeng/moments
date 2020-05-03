## Moments

#### Created by Dongeun Paeng

Moments is a small and cute video sharing platform.<br/>
This project will include below parts.<br/>
Omissions will be added later.

---

#### To do lists & used modules

- [ ] server setup with **express**
- [ ] user authentication with **passport**
- [ ] show messages with **express-flash**
- [ ] build with **webpack & babel**
- [ ] manage data with **mongoose & connect-mongo**
- [ ] connect-mongo
- [ ] handle file uploads with **multer**
- [ ] save files with **aws-sdk & multer-s3**
- [ ] log HTTP request with **morgan**
- [ ] security with **helmet**
- [ ] store sessions with **express-session**
- [ ] set cookies with **cookie-parser**
- [ ] get req.body wiht **body-parser**
- [ ] npm scripts on windows with **cross-env**
- [ ] AJAX requests with **axios**
- [ ] get video file duration with **get-blob-duration**
- [ ] make views with **pug**
- [ ] make beautiful with **tailwind css**

#### Jobs to get done

##### Day 1

- [x] Directory setup for build
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

##### Day 2

- [ ] Login/Logout
- [ ] File upload/delete
- [ ] Profile Editing
- [ ] Apply CSS
- [ ] Video Editing
- [ ] Access control
- [ ] Comments
- [ ] Message

#### Learnings

_Day 1_<br/>

The official webpack documentation says **not to** use 'extract-text-webpack-plugin' for webpack v4 or above. I should use 'mini-css-extract-plugin' instead.

It's recommended to use 'i' modifier when using Regexp to refer to a file name or extensions. (e.g. CSS or css)
