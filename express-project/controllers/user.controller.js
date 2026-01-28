const userService = require("../services/user.service");
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
// CRUD - Create, Read, Update, Delete

const createUser = (req, res, next) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = (req, res) => {
  const updated = userService.updateUser(req.params.id, req.body);
  console.log(updated);

  if (!updated) {
    return res.status(404).json({
      success: false,
    });
  }
  return res.json({
    success: true,
    data: updated,
  });
};

const patchUser = (req, res) => {
  const updated = userService.patchUser(req.params.id, req.body);
  console.log(updated);

  if (!updated) {
    return res.status(404).json({
      success: false,
    });
  }
  return res.json({
    success: true,
    data: updated,
  });
};

const deleteUser = (req, res) => {
  const deleted = userService.deleteUser(req.params.id);
  if (!deleted) {
    return res.status(404).json({
      success: false,
    });
  }
  res.status(204).json();
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
};
