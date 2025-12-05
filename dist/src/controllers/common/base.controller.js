"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const messagesUtil_1 = require("../../helpers/messages/messagesUtil");
const messagesKey_1 = require("../../helpers/messages/messagesKey");
class BaseController {
    /**
     * Sends a successful response.
     */
    sendSuccess(res, vm) {
        return res.status(vm.status).json({
            data: vm.data,
            page: vm.page,
            page_size: vm.page_size,
            total: vm.total,
            message: vm.message,
            returnId: vm.returnId,
            isSuccess: vm.isSuccess,
            status: vm.status,
        });
    }
    sendSuccessGet(req, res, data, messageKey, status = 200) {
        const message = (0, messagesUtil_1.getMessage)(req, messageKey);
        const vm = {
            data,
            message,
            isSuccess: true,
            status,
        };
        return this.sendSuccess(res, vm);
    }
    sendSuccessGetList(req, res, data, page, page_size, total, messageKey, status = 200) {
        const message = (0, messagesUtil_1.getMessage)(req, messageKey);
        const vm = {
            data,
            page,
            page_size,
            total,
            message,
            isSuccess: true,
            status,
        };
        return this.sendSuccess(res, vm);
    }
    sendSuccessCreate(req, res, data, returnId) {
        const message = (0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.SUCCESSCREATE);
        const vm = {
            data,
            message,
            returnId,
            isSuccess: true,
            status: 201, // HTTP status code for Created
        };
        return this.sendSuccess(res, vm);
    }
    sendSuccessUpdate(req, res, data, returnId) {
        const message = (0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.SUCCESSUPDATE);
        const vm = {
            data,
            message,
            returnId,
            isSuccess: true,
            status: 200, // HTTP status code for OK
        };
        return this.sendSuccess(res, vm);
    }
    /**
     * Handles errors and sends an error response.
     * Now uses the message utility to fetch error messages based on request language.
     */
    handleError(req, res, error, statusCode = 500, stringCode = '', details = {}) {
        const errorMessage = error instanceof Error
            ? error.message
            : (0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.UNKNOWNERROR);
        const vm = {
            data: null,
            error: {
                code: `${statusCode} ${stringCode}`,
                message: errorMessage,
                details,
            },
            message: errorMessage,
            isSuccess: false,
            status: statusCode,
        };
        return res.status(vm.status).json({
            ...vm
        });
    }
    sendErrorBadRequest(req, res) {
        return this.handleError(req, res, new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.BADREQUEST)), 400, messagesKey_1.MessagesKey.BADREQUEST, {});
    }
    sendErrorUnauthorized(req, res) {
        return this.handleError(req, res, new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.UNAUTHORIZED)), 401, messagesKey_1.MessagesKey.UNAUTHORIZED);
    }
    sendErrorNoDataFoundSuccess(req, res) {
        return this.handleError(req, res, new Error((0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.NODATAFOUND)), 200);
    }
    sendSuccessDelete(req, res) {
        const message = (0, messagesUtil_1.getMessage)(req, messagesKey_1.MessagesKey.SUCCESSDELETE);
        const vm = {
            data: null,
            message,
            isSuccess: true,
            status: 200, // HTTP status code for OK
        };
        return this.sendSuccess(res, vm);
    }
}
exports.BaseController = BaseController;
