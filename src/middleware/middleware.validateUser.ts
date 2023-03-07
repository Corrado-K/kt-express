import { NextFunction, Request, Response } from "express";
import { body, validationResult } from 'express-validator'


export function validateUser(req: Request, res: Response, next: NextFunction) {
     body('name').isString()
     body('age').isInt()

     const error = validationResult(req)
     
     if (!error.isEmpty()) {
          return res.status(422).json({
               errors: error.array()
          })          
     }

     next()
}