import { NextFunction, Request, Response } from "express";


export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
     // console.error(err.stack);
     // res.status(500).json({ message: "Something went wrong!" });

     if (err instanceof Error) {
          // Synchronous error
          console.error(err);
          res.status(500).json({ message: 'Something went wrong!' });
     } else if (typeof err.then === 'function') {
          // Asynchronous error
          err.catch((error: any) => {
               console.error(error.stack);
               res.status(500).json({ message: 'Something went wrong!' });
          });
     } else {
          next(err);
     }
}
