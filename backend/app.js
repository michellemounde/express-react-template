const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { doubleCsrf } = require('csrf-csrf');

const { environment } = require('./config');
const isProduction = environment ==='production';

const routes = require('./routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

/* This is the default CSRF protection middleware. */
const { doubleCsrfProtection, generateToken } =
  doubleCsrf({
    // The only required option is getSecret, the rest have sensible defaults (shown below) other than cookieOptions edited as per AAO
    getSecret: (req) => req.secret,
    cookieName: isProduction && '__Host-test.x-csrf-token' || 'Test.x-csrf-token', // The name of the cookie to be used, recommend using `__Host-` prefix.
    cookieOptions: {
      httpOnly: true,
      sameSite: isProduction && 'Lax', // Recommend you make this strict if possible
      secure: isProduction,
      path: "/"
    },
    size: 64, // The size of the generated tokens in bits
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getTokenFromRequest: (req) => req.headers["x-csrf-token"] // A function that returns the token from the request
  });


// Security middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

  // helmet helps set a variety of headers to better secure your app
if (!isProduction) {
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: 'cross-origin'
    })
  );
} else {
  app.use(helmet())
}


  // Set the _csrf token and create req.csrfToken method;
app.use(doubleCsrfProtection);


// Connect routes
app.use(routes);

module.exports = app;
