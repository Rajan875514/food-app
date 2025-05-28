require("dotenv").config();

module.exports = {
  // MongoDB
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  
  // Server
  PORT: process.env.PORT || 5000,
  LOCALHOST_ORIGIN: process.env.LOCALHOST_ORIGIN,

  // Cloudinary
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // JWT
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRY,

  // OTP and Email
  FORGOT_PASSWORD_EXPIRY: process.env.FORGOT_PASSWORD_EXPIRY,
  OTP_EXPIRY: process.env.OTP_EXPIRY,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  GMAIL_EMAIL_ID: process.env.GMAIL_EMAIL_ID,
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
  MAILING_EMAIL_ID: process.env.MAILING_EMAIL_ID,

  // IP Info
  IP_INFO_URL: process.env.IP_INFO_URL,
  IPINFO_API_TOKEN: process.env.IPINFO_API_TOKEN,

  // Cookie
  COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE,

  // Stripe
  STRIPE_TEST_PUBLISHABLE_KEY: process.env.STRIPE_TEST_PUBLISHABLE_KEY,
  STRIPE_TEST_SECRET_KEY: process.env.STRIPE_TEST_SECRET_KEY,
   // --- ADD THESE TWO LINES ---
  PAYMENT_SUCCESS_URL: process.env.PAYMENT_SUCCESS_URL,
  PAYMENT_FAIL_URL: process.env.PAYMENT_FAIL_URL,
};
