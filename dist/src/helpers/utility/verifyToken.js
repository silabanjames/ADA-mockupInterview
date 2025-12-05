"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
require("dotenv/config");
const messagesUtil_1 = require("../messages/messagesUtil");
const messagesKey_1 = require("../messages/messagesKey");
function verifyToken(req, res, next) {
    const token = req.headers['x-api-key'];
    if (!token) {
        return res
            .status(403)
            .json({ message: (0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.UNAUTHORIZED) });
    }
    const tokenSecret = process.env.TOKEN_SECRET;
    if (token !== tokenSecret) {
        return res
            .status(401)
            .json({ message: (0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.UNAUTHORIZED) });
    }
    next();
}
