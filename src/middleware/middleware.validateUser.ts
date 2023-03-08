import { NextFunction, Request, Response } from "express";
import { body, validationResult } from 'express-validator'


export const userValidationRules = () => {
     return [
          body('name').isString(),
          body('age').isInt()
     ]
}

export const validateUser = (req: Request, res: Response, next: NextFunction) => {

     const error = validationResult(req)
     
     if (!error.isEmpty()) {
          console.log("Validation error");
          return res.status(422).json({
               errors: error.array()
          })          
     }else {
          console.log("Validation successful");
          next()
     }
}