import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ✅ Hash password
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// ✅ Compare password
export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// ✅ Generate JWT
export function generateToken(admin) {
  return jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// ✅ Verify JWT
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
