
const AUTH_TOKEN_COOKIE = 'auth';
const DOMAIN = '.localhost';

const oneYear = 365 * 24 * 60 * 60 * 1000;
const expirationDate = new Date(Date.now() + oneYear);

const cookieHandler = (res, token) => {
  // console.log("cookie set with name authToken");
  // console.log(token);

  res.cookie(AUTH_TOKEN_COOKIE, token, {
    httpOnly: true,
    domain: DOMAIN,
    expires: expirationDate,
  });
};

module.exports = cookieHandler;
