"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesKey = void 0;
var MessagesKey;
(function (MessagesKey) {
    // Common Error Messages
    MessagesKey["NODATAFOUND"] = "NODATAFOUND";
    MessagesKey["UNKNOWNERROR"] = "UNKNOWNERROR";
    MessagesKey["BADREQUEST"] = "BADREQUEST";
    MessagesKey["UNAUTHORIZED"] = "UNAUTHORIZED";
    MessagesKey["FORBIDDEN"] = "FORBIDDEN";
    // Common Success Messages
    MessagesKey["SUCCESSGET"] = "SUCCESSGET";
    MessagesKey["SUCCESSGETBYID"] = "SUCCESSGETBYID";
    MessagesKey["SUCCESSCREATE"] = "SUCCESSCREATE";
    MessagesKey["SUCCESSUPDATE"] = "SUCCESSUPDATE";
    MessagesKey["SUCCESSDELETE"] = "SUCCESSDELETE";
    // Repository Error Messages
    MessagesKey["ERRORFINDINGALL"] = "ERRORFINDINGALL";
    MessagesKey["ERRORFINDINGBYID"] = "ERRORFINDINGBYID";
    MessagesKey["ERRORCREATE"] = "ERRORCREATE";
    MessagesKey["ERRORDELETE"] = "ERRORDELETE";
    MessagesKey["DUPLICATE_SAVE"] = "DUPLICATE_SAVE";
    MessagesKey["UNAVAILABLE_IN_COUNTRY"] = "UNAVAILABLE_IN_COUNTRY";
    MessagesKey["NOT_FOUND"] = "NOT_FOUND";
    MessagesKey["BAD_REQUEST"] = "BAD_REQUEST";
})(MessagesKey || (exports.MessagesKey = MessagesKey = {}));
