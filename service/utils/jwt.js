// const jwt = require("jsonwebtoken");
// exports.generateToken = (payload, expiresIn = "30d") => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
// };

// exports.verifyToken = (token) => {
//   try {
//     return jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     return null;
//   }
// };


const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET = process.env.JWT_SECRET;
const ENC_SECRET = process.env.ENC_SECRET;
const ENC_IV = process.env.ENC_IV || "default_iv";

const getPaddedIV = () => {
  const padded = ENC_IV.padEnd(16, "0");
  if (padded.length !== 16) throw new Error("IV must be exactly 16 characters after padding.");
  return Buffer.from(padded, "utf8");
};

function encrypt(text) {
  if (!ENC_SECRET || ENC_SECRET.length !== 32) {
    throw new Error("ENC_SECRET must be exactly 32 characters.");
  }
  const iv = getPaddedIV();
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENC_SECRET), iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(encryptedText) {
  const iv = getPaddedIV();
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENC_SECRET), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

exports.generateToken = (payload, expiresIn = "30d") => {
  const cloned = { ...payload };
  if (cloned.email) {
    cloned.email = encrypt(cloned.email);
  }
  return jwt.sign(cloned, JWT_SECRET, { expiresIn });
};


exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.email) {
      decoded.email = decrypt(decoded.email);
    }
    return decoded;
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};

