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
    const newUser = {
      username: req.body.username.toLowerCase(),
      password: hashPassword,
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

userController.login = async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  const user = await UserSch.findOne({ username: username });
  if (!user) return res.status(404).send("Tên đăng nhập không tồn tại.");

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if(!isPasswordValid){
    return res.status(401).send('Mật khẩu không chính xác.');
  }
  const dataForAccessToken = {
    username: user.username
  }

  const AccessToken = generateAccessToken(dataForAccessToken);
  res.status(200)
  .send({
    success: true,
    data: {
        AccessToken: AccessToken,
    }
})
};

module.exports = userController;
