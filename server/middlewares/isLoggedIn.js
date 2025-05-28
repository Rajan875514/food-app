// const jwt = require("jsonwebtoken");
// const { JWT_SECRET_KEY } = require("../config/appConfig");
// const User = require("../models/User");

// module.exports = isLoggedIn = async (req, res, next) => {
//     try {
//         const token =
//             req.cookies.access_token ||
//             (req.header("Authorization") || "").replace("Bearer ", "");
//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 error: "First Login to access this page",
//             });
//         }

//         let decoded;
//         try {
//             decoded = jwt.verify(token, JWT_SECRET_KEY);
//         } catch (error) {
//             if (error.name === "TokenExpiredError") {
//                 // Handle token expiration here, e.g., logout the user
//                 // You can clear cookies, invalidate session, etc.
//                 // For example, clear the cookie:
//                 res.clearCookie("access_token");
//                 return res.status(401).json({
//                     success: false,
//                     error: "Token expired. Please log in again.",
//                 });
//             }
//             throw error; // Rethrow other errors
//         }

//         if (!decoded || !decoded.id) {
//             return res
//                 .status(401)
//                 .json({ success: false, error: "Invalid token" });
//         }

//         req.user = await User.findById(decoded.id);
//         next();
//     } catch (error) {
//         console.error("Error in isLoggedIn middleware:", error);
//         return res
//             .status(500)
//             .json({ success: false, error: "Internal server error" });
//     }
// };



// middlewares/isLoggedIn.js
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/appConfig"); // Make sure this path and variable are correct
const User = require("../models/User");

module.exports = isLoggedIn = async (req, res, next) => {
    try {
        const token =
            req.cookies.access_token ||
            (req.header("Authorization") || "").replace("Bearer ", ""); // Correctly extracts token
        if (!token) {
            return res.status(401).json({
                success: false,
                error: "First Login to access this page",
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET_KEY); // Verifies token
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                res.clearCookie("access_token"); // Clears expired cookie
                return res.status(401).json({
                    success: false,
                    error: "Token expired. Please log in again.",
                });
            }
            throw error; // Rethrow other errors like JsonWebTokenError (invalid signature)
        }

        if (!decoded || !decoded.id) { // Checks if decoded token has an ID
            return res
                .status(401)
                .json({ success: false, error: "Invalid token" });
        }

        req.user = await User.findById(decoded.id); // Fetches user from DB and attaches to req.user
        if (!req.user) { // IMPORTANT: Add this check!
            return res.status(404).json({ success: false, error: "User not found" });
        }
        next();
    } catch (error) {
        console.error("Error in isLoggedIn middleware:", error);
        // More specific error for JWT errors that are not TokenExpiredError
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, error: "Invalid or malformed token." });
        }
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
};