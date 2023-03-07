import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
     // res.status(500)
     res.send({'Error': true, 'message': err.message || 'Internal server error'})
     // next(new Error('boom!'));
     next()
}