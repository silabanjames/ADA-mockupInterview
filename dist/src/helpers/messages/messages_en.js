"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages_en = void 0;
const messagesKey_1 = require("./messagesKey");
exports.messages_en = {
    // Common Error messages
    [messagesKey_1.MessagesKey.NODATAFOUND]: 'No data found',
    [messagesKey_1.MessagesKey.UNKNOWNERROR]: 'An unknown error occurred',
    [messagesKey_1.MessagesKey.BADREQUEST]: 'Bad request.',
    [messagesKey_1.MessagesKey.UNAUTHORIZED]: 'Unauthorized.',
    [messagesKey_1.MessagesKey.FORBIDDEN]: 'Forbidden.',
    // Common Success messages
    [messagesKey_1.MessagesKey.SUCCESSGET]: 'Data has been found.',
    [messagesKey_1.MessagesKey.SUCCESSGETBYID]: 'Data has been found by the specified criteria.',
    [messagesKey_1.MessagesKey.SUCCESSCREATE]: 'Data has been created.',
    // [MessagesKey.SUCCESSBULKCREATE]: 'Data has been bulk created.',
    [messagesKey_1.MessagesKey.SUCCESSUPDATE]: 'Data has been updated.',
    [messagesKey_1.MessagesKey.SUCCESSDELETE]: 'Data has been deleted.',
    // Repository Error messages
    [messagesKey_1.MessagesKey.ERRORFINDINGALL]: 'Error finding all instances',
    [messagesKey_1.MessagesKey.ERRORFINDINGBYID]: 'Error finding instance by ID',
    [messagesKey_1.MessagesKey.ERRORCREATE]: 'Error creating instance',
    [messagesKey_1.MessagesKey.ERRORDELETE]: 'Error deleting instance',
    [messagesKey_1.MessagesKey.DUPLICATE_SAVE]: 'Duplicate save',
    [messagesKey_1.MessagesKey.UNAVAILABLE_IN_COUNTRY]: 'Unavailable in country',
    [messagesKey_1.MessagesKey.NOT_FOUND]: 'Not found',
    [messagesKey_1.MessagesKey.BAD_REQUEST]: 'Bad request'
};
