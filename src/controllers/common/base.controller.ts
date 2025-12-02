import { Request, Response } from 'express';
import { getMessage } from '../../helpers/messages/messagesUtil';
import { MessagesKey } from "../../helpers/messages/messagesKey"
import { IResultVM } from '../../helpers/view-model/result.vm';

export abstract class BaseController {
  /**
   * Sends a successful response.
   */
  protected sendSuccess(res: Response, vm: IResultVM): Response {
    return res.status(vm.status).json({
      data: vm.data,
      page: vm.page,
      page_sise: vm.page_size,
      total: vm.total,
      message: vm.message,
      returnId: vm.returnId,
      isSuccess: vm.isSuccess,
      status: vm.status,
    });
  }

  protected sendSuccessGet(
    req: Request,
    res: Response,
    data: any,
    messageKey: MessagesKey,
    status: number = 200,
  ): Response {
    const message = getMessage(req, messageKey);
    const vm: IResultVM = {
      data,
      message,
      isSuccess: true,
      status,
    };
    return this.sendSuccess(res, vm);
  }

  protected sendSuccessGetList(
    req: Request,
    res: Response,
    data: any,
    page: number,
    page_size: number,
    total: number,
    messageKey: MessagesKey,
    status: number = 200,
  ): Response {
    const message = getMessage(req, messageKey);
    const vm: IResultVM = {
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

  protected sendSuccessCreate(
    req: Request,
    res: Response,
    data: any,
    returnId?: number | string,
  ): Response {
    const message = getMessage(req, MessagesKey.SUCCESSCREATE);
    const vm: IResultVM = {
      data,
      message,
      returnId,
      isSuccess: true,
      status: 201, // HTTP status code for Created
    };
    return this.sendSuccess(res, vm);
  }

  protected sendSuccessUpdate(
    req: Request,
    res: Response,
    data: any,
    returnId?: number | string,
  ): Response {
    const message = getMessage(req, MessagesKey.SUCCESSUPDATE);
    const vm: IResultVM = {
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
  protected handleError(
    req: Request,
    res: Response,
    error: any,
    statusCode: number = 500,
  ): Response {
    const errorMessage =
      error instanceof Error
        ? error.message
        : getMessage(req, MessagesKey.UNKNOWNERROR);
    const vm: IResultVM = {
      data: null,
      message: errorMessage,
      isSuccess: false,
      status: statusCode,
    };
    return this.sendSuccess(res, vm);
  }

  protected sendErrorBadRequest(req: Request, res: Response): Response {
    return this.handleError(
      req,
      res,
      new Error(getMessage(req, MessagesKey.BADREQUEST)),
      400,
    );
  }

  protected sendErrorUnauthorized(req: Request, res: Response): Response {
    return this.handleError(
      req,
      res,
      new Error(getMessage(req, MessagesKey.UNAUTHORIZED)),
      401,
    );
  }

  protected sendErrorNotFound(req: Request, res: Response): Response {
    return this.handleError(
      req,
      res,
      new Error(getMessage(req, MessagesKey.NODATAFOUND)),
      200,
    );
  }

  protected sendErrorNoDataFoundSuccess(req: Request, res: Response): Response {
    return this.handleError(
      req,
      res,
      new Error(getMessage(req, MessagesKey.NODATAFOUND)),
      200,
    );
  }

  protected sendSuccessDelete(req: Request, res: Response): Response {
    const message = getMessage(req, MessagesKey.SUCCESSDELETE);
    const vm: IResultVM = {
      data: null,
      message,
      isSuccess: true,
      status: 200, // HTTP status code for OK
    };
    return this.sendSuccess(res, vm);
  }
}