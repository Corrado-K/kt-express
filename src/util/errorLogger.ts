import { NextFunction, Request, Response } from 'express'
import fs from 'fs'

export const errorLogger = (err:any, req: Request, res: Response, next: NextFunction) => {
     // Log the error to a file
     const errorMessage = `${new Date().toISOString()}: ${err.stack}\n`;
     fs.appendFile('./src/error.log', errorMessage, (err) => {
     if (err) {
          console.error(err);
     }
     });
     res.status(500).json({ error: 'Something went wrong!' });
     next(err)
}