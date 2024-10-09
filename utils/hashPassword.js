import bcrypt, { hash } from "bcrypt";

async function hashPassword(stringPassword) {
  return await bcrypt.hash(stringPassword, 10);
}

async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

export { hashPassword, verifyPassword };
