"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.fail = fail;
exports.error = error;
function ok(data, message = "OK", status = 200) {
    return { data, message, status, success: true };
}
function fail(message, status = 400) {
    return { data: null, message, status, success: false };
}
function error(message, status = 500) {
    return { data: null, message, status, success: false };
}
