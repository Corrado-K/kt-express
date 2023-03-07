import { filter } from "compression";
import { NextFunction, Request, Response } from "express";

const REQUESTS_PER_IP = 10

// const requestDetails: Array<{ip: string}> = []
const requestDetails: Array<{ip: string}> = []


export function requestLimitPerIP(req: Request, res: Response, next: NextFunction) {
     
     // const ip_requests: number = 10
     const ip_requests = requestDetails.filter((request) => request.ip === req.ip).length

     if (ip_requests < REQUESTS_PER_IP) {
          console.log("Success");
          requestDetails.push({ ip: req.ip })
          next();
     } else {
          res.send({
               message: "Requests exceeded"
          })
          console.log("Requests exceeded");
     }
}