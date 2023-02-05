const bcrypt = require("bcrypt");
const UserSch = require("../modules/user");
const generateAccessToken = require("../middleware/methods");
const userController = {};

userController.register = async (req, res) => {
  const user = await UserSch.findOne({
    username: req.body.username.toLowerCase(),
  });
  if (user) res.status(409).send("Tên tài khoản đã tồn tại.");
  else {
    const hashPassword = bcrypt.hashSync(req.body.password, 8);
    const dataForAccessToken = {
      username: req.body.username.toLowerCase(),
    };
    const AccessToken = generateAccessToken(dataForAccessToken);
    const newUser = {
      username: req.body.username.toLowerCase(),
      password: hashPassword,
      accessToken: AccessToken,
      role: "User",
    };
    const createUser = await UserSch.create(newUser);
    if (!createUser) {
      return res
        .status(400)
        .send("Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.");
    }

    return res.send({
      username: newUser.username,
      AccessToken: newUser.accessToken,
    });
  }
};

userController.addNewAdmin = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  const user = await UserSch.findOne({
    username: username,
  });
  if (user) res.status(409).send("Tên tài khoản đã tồn tại.");
  else {
    const hashPassword = bcrypt.hashSync(password, 8);
    const newUser = {
      username: req.body.username.toLowerCase(),
      password: hashPassword,
      role: "Admin",
    };
    const createUser = await UserSch.create(newUser);
    if (!createUser) {
      return res
        .status(400)
        .send("Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.");
    }

    return res.send({
      username: newUser.username,
    });
  }
};

userController.getAllUser = async (req, res) => {
  const listUser = await UserSch.find();
  return res.send(listUser);
};

userController.editUser = async (req, res) =>{
  const user = new UserSch(req.user);
  if(req.body.username!==user.username)
    return res.status(403).send("Forbidden");
  const newPassword = req.body.password
  user.password = bcrypt.hashSync(newPassword, 8);
  try{
    user.save();
    return res.status(200).send({username: user.username});
  }catch(error){
    return res.status(401).send(error);
  }
}

userController.login = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  const user = await UserSch.findOne({ username: username });
  if (!user) return res.status(404).send("Tên đăng nhập không tồn tại.");
  const userUpdate = new UserSch(user);
  const isPasswordValid = bcrypt.compareSync(password, userUpdate.password);
  if (!isPasswordValid) {
    return res.status(401).send("Mật khẩu không chính xác.");
  }

  const dataForAccessToken = {
    username: userUpdate.username,
  };

  const AccessToken = generateAccessToken(dataForAccessToken);

  userUpdate.accessToken = AccessToken;

  await userUpdate.save();

  res.status(200).send({
    username: user.username,
    AccessToken: AccessToken,
  });
};

userController.logout = async (req, res) => {
  await UserSch.updateOne(req.user, { $unset: { accessToken: "" } });
  res.send();
};

module.exports = userController;
