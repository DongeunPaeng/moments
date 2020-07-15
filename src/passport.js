import KakaoStrategy from "passport-kakao";
import passport from "passport";
import User from "./models/User";
import { kakaoLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: "https://dongeun.io/auth/kakao/callback",
    },
    kakaoLoginCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
