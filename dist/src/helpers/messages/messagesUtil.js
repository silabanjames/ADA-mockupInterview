"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = getMessage;
exports.formatMessage = formatMessage;
const messages_en_1 = require("./messages_en");
const messages_id_1 = require("./messages_id");
function getMessage(req, key) {
    const language = req.headers['accept-language'];
    let messages;
    if (language === 'id') {
        messages = messages_id_1.messages_id;
    }
    else {
        messages = messages_en_1.messages_en;
    }
    return messages[key] ?? 'Message not defined';
}
function formatMessage(message, replacements) {
    return message.replace(/{(\d+)}/g, function (match, number) {
        return typeof replacements[number] != 'undefined'
            ? replacements[number]
            : match;
    });
}
