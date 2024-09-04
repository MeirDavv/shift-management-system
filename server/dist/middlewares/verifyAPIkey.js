"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAPIkey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === process.env.AI_API_KEY) {
        next(); // API is valid, procceed with request
    }
    else {
        res.status(403).json({ meessage: 'Forbidden: Invalid API key' });
    }
};
exports.default = verifyAPIkey;
