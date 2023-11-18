var bcrypt = require('bcrypt');
const saltRounds = 10;

const { Storage } = require("../storage");

const register = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const usersStorage = new Storage('users');
    usersStorage.create(email, {
      name, email, password: encryptedPassword
    });

    res.status(200).send({ result: "OK" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const usersStorage = new Storage('users');
    const user = usersStorage.get(email);

    if (!user) {
      res.status(400).send({ result: "Невірний імейл" });
    }

    var result = bcrypt.compareSync(password, user.password);
    if (result) {
      res.status(200).send({ token: "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva" });
    } else {
      res.status(400).send({ result: "Невірний пароль" });
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  register,
  login
};
