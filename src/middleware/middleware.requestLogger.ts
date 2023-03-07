import { NextFunction, Request, Response } from "express";

// middleware that logs each incoming request and its parameters to the console
export function requestLogger(req:Request, res: Response, next: NextFunction): void {
     const time = Date().toString()
     console.log(
          `${req.method} ${req.path} : ${time}`
     );
     next()
}