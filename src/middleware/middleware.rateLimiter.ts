import { NextFunction, Request, Response } from "express";

const REQUESTS_PER_MINUTE_LIMIT = 10

interface IRequestDetails{
     ip: string,
     reqTime: number
}

const requestTracker: IRequestDetails[] = [];

// limit the number of requests client can make per second
export function rateLimiter(req: Request, res: Response, next: NextFunction) {
     const requestsMade: number  = requestTracker
          .filter((request) => request.ip === req.ip)
          .filter((request) => (new Date().getTime() - request.reqTime) / 1000 <= 60).length;     
     
     if (requestsMade < REQUESTS_PER_MINUTE_LIMIT) {
          console.log("Success");
          requestTracker.push({ ip: req.ip, reqTime: new Date().getTime() })
          next();
     } else {
          res.send({
               message: "Too many requests per minute"
          })
          console.log("Too many requests per minute");
     }
}
