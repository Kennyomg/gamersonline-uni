import db from '../models/index';

export default function login(req) {
  return new Promise((resolve) => {
    db.User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
      }
    }).then(user => {
      return resolve(user);
    });
  });
}
