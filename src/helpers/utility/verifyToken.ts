import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { getMessage } from '../messages/messagesUtil';
import { MessagesKey } from '../messages/messagesKey';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-api-key'];

  if (!token) {
    return res
      .status(403)
      .json({ message: getMessage(req, MessagesKey.UNAUTHORIZED) });
  }

  const tokenSecret = process.env.TOKEN_SECRET as string;

  if (token !== tokenSecret) {
    return res
      .status(401)
      .json({ message: getMessage(req, MessagesKey.UNAUTHORIZED) });
  }

  next();
}
