const User = require('../models/User');

const checkForToken = function(req) {
  const token = req.cookies.session;
  if(!token){
    const err = new Error('Login required.');
    err.status = 403;
    throw err;
  }
  return token;
};

const ensureUserAuth = (req, res, next) => {
  const token = checkForToken(req);
  User
    .findByAuthToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

const ensureAdminAuth = (req, res, next) => {
  const token = checkForToken(req);
  User
    .findByAuthToken(token)
    .then(user => {
      if(user.role !== 'admin') {
        const err = new Error('Admin role required.');
        err.status = 403;
        throw err;
      }
      req.user = user;
      next();
    })
    .catch(next);
};

module.exports = { 
  ensureUserAuth, 
  ensureAdminAuth,
};
