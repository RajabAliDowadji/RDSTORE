require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModal = require("../models/User.modal");
const { USER_API, LOGIN_API, COMMON } = require("../constants/User.message");
const { STATUS, ACCOUNT_TYPE } = require("../constants/Constants");
const { apiResponse } = require("../helpers/apiResponse");
const { errorResponse } = require("../helpers/errorResponse");

module.exports.createUser = async (req, resp) => {
  const { name, email, password, phone_number, phone_code, role } = req.body;
  const user = await UserModal.findOne({
    $or: [{ email: email }, { phone_number: phone_number }],
  }).exec();

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModal({
      name: name,
      role: role,
      email: email,
      phone_code: phone_code,
      phone_number: phone_number,
      password: hashedPassword,
    });
    await user.save();
    const token = await jwt.sign(
      { user_id: user._id, phone_number },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    const userResponse = {
      ...user.toObject(),
      password: undefined,
      _id: undefined,
      token: token,
    };

    return resp
      .status(STATUS.CREATED)
      .send(
        apiResponse(STATUS.CREATED, USER_API.USER_CREATE.message, userResponse)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, USER_API.USER_ALREADY_REGISTER.message));
  }
};

module.exports.updateUser = async (req, resp) => {
  const { name, email, phone_number, phone_code, role } = req.body;
  const user_id = req.params.id;
  const user = await UserModal.findOne({ id: user_id });

  if (user) {
    user.name = name;
    user.role = role;
    user.email = email;
    user.phone_code = phone_code;
    user.phone_number = phone_number;

    await user.save();

    const userResponse = {
      ...user.toObject(),
      password: undefined,
      _id: undefined,
    };

    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, USER_API.USER_UPDATE.message, userResponse)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, USER_API.USER_NOT_FOUND.message));
  }
};

module.exports.deleteUser = async (req, resp) => {
  const userId = req.params.id;
  const user = await UserModal.findOne({ id: userId });
  if (user) {
    if (user.role === ACCOUNT_TYPE.USER || user.role === ACCOUNT_TYPE.SHIPPER) {
      const deletedUser = await UserModal.findByIdAndRemove(userId);
      if (deletedUser) {
        return resp
          .status(STATUS.SUCCESS)
          .send(apiResponse(STATUS.SUCCESS, USER_API.USER_DELETE.message));
      }
    } else if (user.role === ACCOUNT_TYPE.SHOP_ADMIN) {
      user.activity = {
        ...user.activity,
        is_blocked: true,
      };
      return resp
        .status(STATUS.SUCCESS)
        .send(apiResponse(STATUS.SUCCESS, USER_API.USER_DELETE.message));
    } else {
      return resp
        .status(STATUS.UNAUTHORIZE)
        .send(
          apiResponse(
            STATUS.UNAUTHORIZE,
            USER_API.USER_NOT_AUTHORIZED_FOUND.message
          )
        );
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, USER_API.USER_NOT_FOUND.message));
  }
};

module.exports.getUser = async (req, resp) => {
  const userId = req.params.id;
  const user = await UserModal.findOne({ id: userId });
  if (user) {
    const userResponse = {
      ...user.toObject(),
      _id: undefined,
      password: undefined,
    };
    return resp
      .status(STATUS.SUCCESS)
      .send(
        apiResponse(STATUS.SUCCESS, USER_API.USER_SUCCESS.message, userResponse)
      );
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, USER_API.USER_NOT_FOUND.message));
  }
};

module.exports.loginUser = async (req, resp, next) => {
  const { phone_number, email, password } = req.body;
  const user = await UserModal.findOne({
    $or: [{ email: email }, { phone_number: phone_number }],
  }).exec();
  if (user) {
    const response = await bcrypt.compare(password, user.password);
    if (response) {
      const token = await jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      const userResponse = {
        ...user.toObject(),
        password: undefined,
        token: token,
        _id: undefined,
      };

      return resp
        .status(STATUS.SUCCESS)
        .send(
          apiResponse(
            STATUS.SUCCESS,
            LOGIN_API.LOGIN_API_SUCCESS.message,
            userResponse
          )
        );
    } else {
      return resp
        .status(STATUS.BAD)
        .send(errorResponse(STATUS.BAD, COMMON.PASSWORD_ERROR.message));
    }
  } else {
    return resp
      .status(STATUS.BAD)
      .send(errorResponse(STATUS.BAD, COMMON.BAD_REQUEST.message));
  }
};
