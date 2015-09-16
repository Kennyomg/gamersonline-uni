export default function login(req) {
  const user = {
    username: req.body.username,
    password: req.body.password
  };
  req.session.user = user;
  return Promise.resolve(user);
}
