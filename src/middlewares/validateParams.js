
export function validateParams(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send('Missing required fields');
    }
    next();
  }
  