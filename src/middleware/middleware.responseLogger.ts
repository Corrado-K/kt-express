import { Request, Response, NextFunction } from 'express';


export function responseLogger(req: Request, res: Response, next: NextFunction) {
     res.setHeader('Header-Response-Date', new Date().toUTCString());
     next()
}