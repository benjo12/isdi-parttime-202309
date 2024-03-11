import bcrypt from "bcryptjs";
import { User } from "../data/models.js";
import { validate, errors } from "com";

const { SystemError, NotFoundError, CredentialsError, ContentError } = errors;

export default async function changeUserPassword(userId,  password, newPassword,  newPasswordConfirm){

  validate.id(userId, "user id");
  validate.password(password, "password");
  validate.password(newPassword, "new password");
  validate.password(newPasswordConfirm, "new password confirm");

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    throw new SystemError(error.message);
  }

  if (!user) {
    throw new NotFoundError("user not found");
  }

  let match;
  try {
    match = await bcrypt.compare(password, user.password);
  } catch (error) {
    throw new SystemError(error.message);
  }

  if (!match) {
    throw new CredentialsError("wrong credentials");
  }

  if (newPassword !== newPasswordConfirm) {
    throw new ContentError("new password and its confirmation do not match");
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 8);
  } catch (error) {
    throw new SystemError(error.message);
  }
  user.password = hashedPassword;

  try {
    await user.save();
  } catch (error) {
    throw new SystemError(error.message);
  }
}
