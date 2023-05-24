import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

passport.use(
	new GoogleStrategy(
		{
			clientID:"1067185663508-uocqp4l10ur5rjn92jilmotb761iceau.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "/bazar/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});