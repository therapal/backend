// Sign in user with email and password
module.exports.signinTherapist = async function (req, res, next) {
  const { email, password } = req.body;

  // Find user by email
  const user = await findUser({
    query: { email },
    attributes: [
      "password",
      "id",
      "verified_email",
      "oauth_provider",
      "profile_picture",
    ],
  });
  if (!user) {
    return next(new ApiError("Incorrect Credentials", 401));
  }

  // Check if user is signed in with OAuth provider
  if (user.oauth_provider) {
    return next(new ApiError("Please sign in using your OAuth provider.", 401));
  }

  // Verify password
  if (!bcrypt.compareSync(password, user.password)) {
    return next(new ApiError("Incorrect Credentials", 401));
  }

  // Check if email is verified
  if (!user.verified_email) {
    return next(new ApiError("Email must be verified to continue", 401));
  }

  // Generate JWT token and set cookie
  generateJwtTokenAndSetSigninCookie(user.id, res);
  res.status(200).json({
    success: true,
    message: "Sign-in successful",
    data: {
      id: user.id,
      verified_email: user.verified_email,
      email: user.email,
      profile_picture: user.profile_picture,
      oauth_provider: user.oauth_provider,
    },
  });
};
