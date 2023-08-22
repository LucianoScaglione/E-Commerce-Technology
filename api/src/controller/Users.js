const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../db');

const registerUser = async (req, res, next) => {
  try {
    const { name, lastname, age, email, password, phone, is_admin } = req.body;
    if (!(name && lastname && age && email && password)) {
      res.status(400).send("Required fields were not filled");
    }
    const findEmail = await Users.findOne({ where: { email: email } });
    if (!findEmail) {
      const encryptPassword = await bcrypt.hash(password, 10);
      await Users.create({
        name,
        lastname,
        age,
        email,
        password: encryptPassword,
        phone,
        is_admin: is_admin ? is_admin : false
      });
      res.status(200).send("User created successfully");
    } else {
      res.status(400).send("There is already a registered email");
    };
  } catch (error) {
    next(error);
  };
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usuario = await Users.findOne({ where: { email } });
    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const token = jwt.sign({ usuario_id: usuario.id, email }, "secret", { expiresIn: "10h" });
      usuario.token = token;
      res.status(201).json({
        "usuario": usuario,
        "token": token
      });
    } else {
      res.status(400).send("Incorrect data");
    };
  } catch (error) {
    next(error);
  };
};

const findAllUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll();
    users.length ? res.status(200).send(users) : res.status(400).send("There are no registered users");
  } catch (error) {
    next(error);
  }
}

const findOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findUser = await Users.findOne({ where: { id } });
    findUser ? res.status(200).send(findUser) : res.status(400).send("There is no registered user");
  } catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, lastname, age, password, phone, is_admin } = req.body;
    const findUser = await Users.findByPk(id);
    await findUser.update({
      name: name ? name : findUser.name,
      lastname: lastname ? lastname : findUser.lastname,
      age: age ? age : findUser.age,
      password: password ? password : findUser.password,
      phone: phone ? phone : findUser.phone,
      is_admin: is_admin ? is_admin : findUser.is_admin
    });
    findUser.save();
    res.status(200).send({ update: true, user: findUser });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
  findAllUsers,
  findOneUser,
  updateUser
};