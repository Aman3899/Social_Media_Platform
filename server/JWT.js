const { sign, verify } = require("jsonwebtoken");

/**
 * Creates an access token for a given user.
 *
 * @param {Object} user - The user object containing username and id.
 * @returns {string} The generated access token.
 * @example
 * const user = { username: 'johnDoe', id: 1 };
 * const accessToken = createTokens(user);
 * console.log(accessToken); // Output: a generated access token
 */
const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    "jwtsecretplschange"
  );

  return accessToken;
};

/**
 * Validates an access token from the request cookies.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 * @example
 * app.use(validateToken);
 */
 const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
module.exports = { createTokens, validateToken };
