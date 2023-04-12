const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const { environment } = require('./config');
const isProduction = environment ==='production';

const { doubleCsrf } = require('csrf-csrf');
const {
  invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
  generateToken, // Use this in your routes to provide a CSRF hash cookie and token.
  validateRequest, // Also a convenience if you plan on making your own middleware.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({ // The only required option is getSecret, the rest have sensible defaults (shown below) other than cookieOptions edited as per AAO
  getSecret: (req) => req.secret,
  cookieName: '__Host.test-x-csrf-token', // The name of the cookie to be used, recommend using Host prefix.
  cookieOptions: {
    httpOnly: true,
    sameSite: isProduction && 'lax', // Recommend you make this strict if possible
    secure: isProduction,
    signed: isProduction
  },
  size: 64, // The size of the generated tokens in bits
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'], // A list of request methods that will not be protected.
  getTokenFromRequest: (req) => { // A function that returns the token from the request
    // If the incoming request is a multipart content type
    // then get the token from the body.
    if (req.is('multipart')) {
      return req.body['CSRFToken']
    }
    // Otherwise use the header for all other request types
    return req.headers['x-csrf-token']
  }
});

const routes = require('./routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Security middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

  // helmet helps set a variety of headers to better secure your app
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: !isProduction && 'cross-origin'
    }
  })
);

  // Set the _csrf token and create req.csrfToken method
app.use(doubleCsrfProtection);


// Connect routes
app.use(routes);

module.exports = app;
