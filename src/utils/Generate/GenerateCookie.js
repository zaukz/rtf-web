const argon2 = require("argon2");

const crypto = require("node:crypto");

async function GenerateCookie(
  res,
  name,
  value,
  httpOnly,
  sameSite,
  secure,
  maxAge_in_milisecond,
  path
) {
  let success = false;
  try {
    await res.cookie(name, value, {
      httpOnly: httpOnly,
      sameSite: sameSite,
      secure: secure,
      maxAge: maxAge_in_milisecond,
      path: path,
    });

    success = true;
  } catch (error) {
    success = false;
  }

  return success;
}
module.exports = { GenerateCookie };
